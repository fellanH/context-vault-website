#!/usr/bin/env node
/**
 * Deploy pre-rendered dist/ to Cloudflare R2 bucket.
 *
 * Pattern from not-wiki: incremental uploads via a .last-deploy marker,
 * content-type inference from file extension, wrangler r2 object put.
 *
 * Usage:
 *   node scripts/deploy-r2.mjs              # incremental (only changed files)
 *   node scripts/deploy-r2.mjs --full       # upload everything
 */

import { execSync } from 'node:child_process';
import { readdirSync, statSync, existsSync, writeFileSync } from 'node:fs';
import { join, relative, extname, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const distDir = join(root, 'dist');
const marker = join(root, '.last-deploy');

const BUCKET = 'context-vault-website';
const fullDeploy = process.argv.includes('--full');

const CONTENT_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.xml': 'text/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.webmanifest': 'application/manifest+json',
};

function getContentType(filePath) {
  const ext = extname(filePath).toLowerCase();
  return CONTENT_TYPES[ext] || 'application/octet-stream';
}

function walk(dir) {
  const results = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walk(full));
    } else {
      results.push(full);
    }
  }
  return results;
}

function step(msg) {
  console.log(`\n  \x1b[36m▸\x1b[0m ${msg}`);
}

if (!existsSync(distDir)) {
  console.error('dist/ not found. Run `node scripts/prerender.mjs` first.');
  process.exit(1);
}

// Collect files to upload
const allFiles = walk(distDir);
let filesToUpload;

if (fullDeploy || !existsSync(marker)) {
  step(`Full deploy: ${allFiles.length} files`);
  filesToUpload = allFiles;
} else {
  const markerTime = statSync(marker).mtimeMs;
  filesToUpload = allFiles.filter((f) => statSync(f).mtimeMs > markerTime);
  step(`Incremental deploy: ${filesToUpload.length} changed files (of ${allFiles.length} total)`);
  if (filesToUpload.length === 0) {
    console.log('    Nothing to upload.');
    process.exit(0);
  }
}

// Upload each file
let uploaded = 0;
let failed = 0;

for (const file of filesToUpload) {
  const key = relative(distDir, file);
  const ct = getContentType(file);

  try {
    execSync(
      `npx wrangler r2 object put "${BUCKET}/${key}" --file "${file}" --content-type "${ct}"`,
      { cwd: root, stdio: 'pipe' }
    );
    uploaded++;
    console.log(`    ${key} (${ct})`);
  } catch (err) {
    failed++;
    console.error(`    FAILED: ${key} - ${err.message}`);
  }
}

// Update marker
writeFileSync(marker, new Date().toISOString());

step(`Upload complete: ${uploaded} succeeded, ${failed} failed`);

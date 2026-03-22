#!/usr/bin/env node
/**
 * Pre-render script: generates static HTML for every route.
 *
 * 1. Runs `vite build` (client bundle)
 * 2. Runs `vite build --ssr` (server bundle)
 * 3. Loads the SSR bundle and renders each route into dist/
 * 4. Generates sitemap.xml
 */

import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const distDir = join(root, 'dist');
const ssrOutDir = join(root, 'dist-ssr');

function step(msg) {
  console.log(`\n  \x1b[36m▸\x1b[0m ${msg}`);
}

// 1. Client build
step('Building client bundle...');
execSync('npx vite build', { cwd: root, stdio: 'inherit' });

// 2. SSR build
step('Building SSR bundle...');
execSync(
  `npx vite build --ssr src/entry-server.tsx --outDir dist-ssr`,
  { cwd: root, stdio: 'inherit' }
);

// 3. Load SSR module and HTML template
step('Loading SSR module...');
const ssr = await import(join(ssrOutDir, 'entry-server.js'));
const template = readFileSync(join(distDir, 'index.html'), 'utf-8');

const paths = ssr.getStaticPaths();
step(`Rendering ${paths.length} pages...`);

for (const urlPath of paths) {
  const { html: appHtml, helmet } = await ssr.render(urlPath);

  // Build the head tags from helmet
  const headTags = [
    helmet.title?.toString() ?? '',
    helmet.meta?.toString() ?? '',
    helmet.link?.toString() ?? '',
  ]
    .filter(Boolean)
    .join('\n    ');

  let page = template;

  // Replace the default head tags with page-specific ones from Helmet
  // Remove default title and replace
  if (helmet.title) {
    page = page.replace(/<title>[^<]*<\/title>/, helmet.title.toString());
  }

  // Remove default meta description and og/twitter tags, then inject helmet's
  // We do this by injecting helmet meta tags right after <head> opening
  // and removing the defaults
  const defaultMetaPattern =
    /<!-- Default title & description[\s\S]*?<!-- Default OG image[\s\S]*?<!-- Default Twitter\/X card[\s\S]*?<!-- Default canonical[\s\S]*?<link rel="canonical"[^>]*>/;
  if (defaultMetaPattern.test(page)) {
    page = page.replace(defaultMetaPattern, headTags);
  } else {
    // Fallback: inject after <meta name="viewport">
    page = page.replace(
      /(<meta name="viewport"[^>]*>)/,
      `$1\n    ${headTags}`
    );
  }

  // Inject rendered HTML into the root div
  page = page.replace(
    '<div id="root"></div>',
    `<div id="root">${appHtml}</div>`
  );

  // Determine output path
  let outPath;
  if (urlPath === '/') {
    outPath = join(distDir, 'index.html');
  } else {
    const dir = join(distDir, urlPath.slice(1));
    mkdirSync(dir, { recursive: true });
    outPath = join(dir, 'index.html');
  }

  writeFileSync(outPath, page);
  console.log(`    ${urlPath} -> ${outPath.replace(root + '/', '')}`);
}

// 4. Generate sitemap.xml
step('Generating sitemap.xml...');
const sitemap = ssr.generateSitemap(paths);
writeFileSync(join(distDir, 'sitemap.xml'), sitemap);
console.log(`    sitemap.xml (${paths.length} URLs)`);

// 5. Clean up SSR build artifacts
step('Cleaning up SSR build...');
execSync(`rm -rf "${ssrOutDir}"`, { cwd: root });

step(`Done! ${paths.length} pages pre-rendered in dist/`);

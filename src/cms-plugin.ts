import type { Plugin } from "vite";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import type { IncomingMessage, ServerResponse } from "node:http";

// Parse multipart/form-data — no external deps
function parseMultipart(
  buffer: Buffer,
  boundary: string,
): { filename: string; data: Buffer } | null {
  const delimiter = `--${boundary}`;
  const text = buffer.toString("binary");
  const parts = text.split(delimiter);

  for (const part of parts) {
    if (!part || part === "--\r\n" || part === "--") continue;
    const headerEnd = part.indexOf("\r\n\r\n");
    if (headerEnd === -1) continue;
    const headers = part.slice(0, headerEnd);
    const filenameMatch = headers.match(/filename="([^"]+)"/);
    if (!filenameMatch) continue;
    const filename = path.basename(filenameMatch[1]);
    const dataStart = headerEnd + 4;
    // Strip the trailing \r\n before the next boundary
    const dataEnd = part.length - 2;
    const data = Buffer.from(part.slice(dataStart, dataEnd), "binary");
    return { filename, data };
  }
  return null;
}

function readBody(req: IncomingMessage): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on("data", (chunk: Buffer) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

function sendJson(res: ServerResponse, data: unknown, status = 200) {
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  });
  res.end(JSON.stringify(data));
}

export function cmsPlugin(): Plugin {
  return {
    name: "vite-plugin-cms",
    apply: "serve",
    configureServer(server) {
      const root = server.config.root;
      const postsPath = path.join(root, "src/app/content/posts.json");
      const landingPath = path.join(root, "src/app/content/landing.json");
      const imagesDir = path.join(root, "public/images");

      server.middlewares.use(
        async (req: IncomingMessage, res: ServerResponse, next: () => void) => {
          const url = req.url ?? "";
          const [pathname] = url.split("?");

          if (!pathname.startsWith("/cms/")) return next();

          const method = (req.method ?? "GET").toUpperCase();

          // Preflight
          if (method === "OPTIONS") {
            res.writeHead(204, {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
              "Access-Control-Allow-Headers": "Content-Type",
            });
            res.end();
            return;
          }

          try {
            // ── GET /cms/posts ─────────────────────────────────────────────
            if (pathname === "/cms/posts" && method === "GET") {
              const raw = await fs.readFile(postsPath, "utf-8");
              return sendJson(res, JSON.parse(raw));
            }

            // ── POST /cms/posts ────────────────────────────────────────────
            if (pathname === "/cms/posts" && method === "POST") {
              const body = await readBody(req);
              const newPost = JSON.parse(body.toString("utf-8"));
              const posts = JSON.parse(await fs.readFile(postsPath, "utf-8"));
              posts.unshift(newPost);
              await fs.writeFile(postsPath, JSON.stringify(posts, null, 2));
              return sendJson(res, newPost, 201);
            }

            // ── /cms/posts/:slug ───────────────────────────────────────────
            const slugMatch = pathname.match(/^\/cms\/posts\/(.+)$/);
            if (slugMatch) {
              const slug = decodeURIComponent(slugMatch[1]);
              const posts: Array<{ slug: string }> = JSON.parse(
                await fs.readFile(postsPath, "utf-8"),
              );

              if (method === "PUT") {
                const body = await readBody(req);
                const updated = JSON.parse(body.toString("utf-8"));
                const idx = posts.findIndex((p) => p.slug === slug);
                if (idx === -1)
                  return sendJson(res, { error: "Not found" }, 404);
                posts[idx] = updated;
                await fs.writeFile(postsPath, JSON.stringify(posts, null, 2));
                return sendJson(res, updated);
              }

              if (method === "DELETE") {
                const idx = posts.findIndex((p) => p.slug === slug);
                if (idx === -1)
                  return sendJson(res, { error: "Not found" }, 404);
                posts.splice(idx, 1);
                await fs.writeFile(postsPath, JSON.stringify(posts, null, 2));
                return sendJson(res, { ok: true });
              }
            }

            // ── GET /cms/landing ───────────────────────────────────────────
            if (pathname === "/cms/landing" && method === "GET") {
              const raw = await fs.readFile(landingPath, "utf-8");
              return sendJson(res, JSON.parse(raw));
            }

            // ── PUT /cms/landing ───────────────────────────────────────────
            if (pathname === "/cms/landing" && method === "PUT") {
              const body = await readBody(req);
              const updated = JSON.parse(body.toString("utf-8"));
              await fs.writeFile(landingPath, JSON.stringify(updated, null, 2));
              return sendJson(res, updated);
            }

            // ── GET /cms/images ────────────────────────────────────────────
            if (pathname === "/cms/images" && method === "GET") {
              try {
                const files = await fs.readdir(imagesDir);
                return sendJson(
                  res,
                  files.filter((f) =>
                    /\.(png|jpe?g|gif|webp|svg|avif)$/i.test(f),
                  ),
                );
              } catch {
                return sendJson(res, []);
              }
            }

            // ── POST /cms/images ───────────────────────────────────────────
            if (pathname === "/cms/images" && method === "POST") {
              const contentType = req.headers["content-type"] ?? "";
              const boundaryMatch = contentType.match(/boundary=([^\s;]+)/);
              if (!boundaryMatch)
                return sendJson(
                  res,
                  { error: "No boundary in Content-Type" },
                  400,
                );

              const boundary = boundaryMatch[1];
              const body = await readBody(req);
              const file = parseMultipart(body, boundary);
              if (!file)
                return sendJson(res, { error: "No file part found" }, 400);

              await fs.mkdir(imagesDir, { recursive: true });
              const dest = path.join(imagesDir, file.filename);
              await fs.writeFile(dest, file.data);
              return sendJson(res, { filename: file.filename });
            }

            // ── DELETE /cms/images/:filename ───────────────────────────────
            const imgDeleteMatch = pathname.match(/^\/cms\/images\/(.+)$/);
            if (imgDeleteMatch && method === "DELETE") {
              const filename = path.basename(
                decodeURIComponent(imgDeleteMatch[1]),
              );
              const target = path.join(imagesDir, filename);
              await fs.unlink(target);
              return sendJson(res, { ok: true });
            }

            next();
          } catch (err) {
            console.error("[cms-plugin]", err);
            sendJson(res, { error: String(err) }, 500);
          }
        },
      );
    },
  };
}

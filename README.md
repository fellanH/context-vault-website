# Context Vault Marketing Site

Standalone marketing website for Context Vault. Deployed to **context-vault.com**.

## Goals

- Keep marketing pages isolated from the product dashboard app (`app/` repo)
- Reuse the same visual language (tokens, typography, component primitives)
- Support a high-conversion landing page and blog routes

## Deploy

Cloudflare Pages via wrangler CLI. No CI deploy pipeline.

```bash
npm run deploy           # SSR prerender + wrangler pages deploy → context-vault.com
```

## Routes

- `/` - Landing page
- `/blog` - Blog index
- `/blog/:slug` - Blog post detail

---

## Development

```bash
npm install
npm run dev      # Vite dev server
npm run build    # production build (client only)
npm run build:ssr  # SSR prerender (client + server + static HTML)
```

---

## Cloudflare Pages Configuration

| Setting          | Value                                            |
| ---------------- | ------------------------------------------------ |
| Output directory | `dist`                                           |
| Functions        | `functions/` (API and MCP proxy)                 |
| API proxy        | `/api/*` via Cloudflare Pages Function            |
| MCP proxy        | `/mcp` via Cloudflare Pages Function              |

## Environment Variables

| Variable            | Purpose                                              | Where set                            |
| ------------------- | ---------------------------------------------------- | ------------------------------------ |
| `VITE_APP_BASE_URL` | Base URL for app conversion links (e.g. `/register`) | `.env.local` (dev) / CF Pages (prod) |

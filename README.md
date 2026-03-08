# Context Vault Marketing Site

Standalone marketing website for Context Vault. Deployed to **context-vault.com**.

## Goals

- Keep marketing pages isolated from the product dashboard app (`app/` repo)
- Reuse the same visual language (tokens, typography, component primitives)
- Support a high-conversion landing page and blog routes

## Deploy

Vercel CLI to `klarhimmel/context-vault-marketing`. No CI pipeline.

```bash
npm run preview:deploy   # staging preview URL
npm run deploy           # production → context-vault.com
```

If `.vercel/project.json` points to the wrong project, relink:

```bash
vercel link --scope klarhimmel --project context-vault-marketing --yes
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
npm run build    # production build
```

---

## Vercel Configuration (`vercel.json`)

| Setting          | Value                                            |
| ---------------- | ------------------------------------------------ |
| Output directory | `dist`                                           |
| SPA fallback     | `/*` → `/index.html`                             |
| API proxy        | `/api/*` → `https://api.context-vault.com/api/*` |
| MCP proxy        | `/mcp` → `https://api.context-vault.com/mcp`     |
| Asset cache      | `public, max-age=31536000, immutable`            |

## Environment Variables

| Variable            | Purpose                                              | Where set                                           |
| ------------------- | ---------------------------------------------------- | --------------------------------------------------- |
| `VITE_APP_BASE_URL` | Base URL for app conversion links (e.g. `/register`) | `.env.local` (dev) / Vercel project settings (prod) |

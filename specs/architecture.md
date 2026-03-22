# Context Vault Website — Architecture

## Stack

| Component | Technology |
|-----------|------------|
| Framework | Vite 6 + React 18 + React Router 7 |
| Styling | Tailwind CSS 4, shadcn/ui, Radix UI |
| Deploy | Cloudflare Pages (wrangler CLI, `npm run deploy`) |
| Analytics | GTM, GA4, Google Search Console, Clarity, PostHog |
| Email | Resend |
| Social automation | n8n + Buffer + Claude API |

## Structure

```
website/
├── src/
│   ├── app/
│   │   ├── components/    ← shared layout components
│   │   ├── content/       ← blog post data (posts.ts)
│   │   ├── lib/           ← utilities (links.ts)
│   │   └── pages/         ← route-level page components
│   └── styles/            ← global CSS (fonts, tailwind, theme)
├── public/                ← static assets (robots.txt, sitemap.xml, og images)
├── functions/             ← Cloudflare Pages Functions (API/MCP proxy)
├── scripts/               ← build/deploy helpers (prerender, OG image gen)
├── vite.config.ts
└── specs/
```

## Deploy

```bash
npm run deploy    # SSR prerender + wrangler pages deploy
```

- Cloudflare Pages project: `context-vault-website`
- Production domain: context-vault.com
- No CI deploy pipeline. All deploys are from local CLI.

### Branch Flow

| Change type | Branch | Staging required | PR required |
|-------------|--------|-----------------|-------------|
| Copy fix / typo | main direct | No | No |
| New section or page | feat/* | Yes | Yes |
| Blog post | content/* | Yes | Yes |
| Structural change | feat/* | Yes, with screenshots | Yes |

## Analytics Stack

GTM is the single entry point. All tracking tags are managed inside GTM, not added directly to index.html.

Key events: `cta_click`, `blog_post_view`, `get_started_view`, `outbound_click`, `copy_command`

Primary metric: `site visitor -> register click` conversion rate.

## Content Pipeline

Blog posts are authored as data in `src/app/content/posts.ts`. No external CMS. Each post targets specific search queries and includes internal links to 2+ other posts.

Social distribution: blog publish triggers n8n webhook, Claude API generates platform-specific drafts, queued in Buffer for human approval.

## Constraints

- All social post drafts require human approval before publishing
- No direct script tags in index.html (all tracking via GTM)

## Key Decisions

- SSR prerender for static HTML output: better SEO, Cloudflare edge caching handles performance [2026-03]
- Migrated from Vercel to Cloudflare Pages: unified platform with R2 storage, Pages Functions for proxies [2026-03]
- Blog content as TypeScript data (not CMS): no external dependency, easy to version control [2026-02]
- GTM as single analytics entry point: one script to manage, easy to add/remove tracking [2026-02]
- Wrangler CLI deploy (not git-push auto-deploy): explicit control over what ships [2026-03]

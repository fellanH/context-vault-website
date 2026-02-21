# Context Vault Marketing — Project SOP

This file is the authoritative SOP for all agents and contributors working on
this repository. Read it before starting any task.

---

## Stack

| Layer             | Choice                                                                      |
| ----------------- | --------------------------------------------------------------------------- |
| Framework         | Vite 6 + React 18 + React Router 7                                          |
| Styling           | Tailwind CSS 4, shadcn/ui, Radix UI                                         |
| Deployment        | Vercel (CLI deploy, no CI pipeline)                                         |
| Analytics         | Google Tag Manager → GA4, Google Search Console, Microsoft Clarity, PostHog |
| Email             | Resend                                                                      |
| Social automation | n8n + Buffer + Claude API                                                   |

---

## Repo Structure

```
src/
  app/
    components/    # Shared layout components (MarketingLayout, etc.)
    content/       # Blog post data (posts.ts)
    lib/           # Utilities (links.ts)
    pages/         # Route-level page components
  styles/          # Global CSS (fonts, tailwind, theme)
public/            # Static assets (robots.txt, sitemap.xml, og images)
vercel.json        # Rewrites, headers, output config
```

---

## 1. How We Plan Work

### Tool

GitHub Issues + Milestones, operated via `gh` CLI. No external project management
tools. The issue list is the single source of truth for all planned work.

### Hierarchy

```
Milestone (monthly)
  └── Issue (one self-contained unit of work)
        └── Branch → PR → merge → deploy
```

### Monthly Planning (first Sunday of the month)

1. Close the previous milestone and review what shipped
2. Create the next milestone:
   ```bash
   gh api repos/fellanH/context-vault-marketing/milestones \
     --method POST \
     -f title="April 2026" \
     -f due_on="2026-04-30T00:00:00Z"
   ```
3. Break roadmap themes into Issues and assign to the milestone

### Weekly Rhythm (Mondays, 15 min)

```bash
gh issue list --milestone "March 2026"
```

Review open items, unblock or re-prioritise. No standups. The issue list is the
status report.

### Issue Format (required — no exceptions)

Every issue must follow this template so agents can pick it up cold:

```markdown
## What

One sentence describing the output.

## Why

Why this matters or what it unblocks.

## Acceptance criteria

- [ ] Specific, testable condition
- [ ] Another condition

## Files likely affected

- src/app/pages/LandingPage.tsx

## Notes

Any constraints, prior art, or reference links.
```

### Labels

Set these up once and use them on every issue:

| Label       | Use                                 |
| ----------- | ----------------------------------- |
| `content`   | Blog posts, copy changes            |
| `seo`       | Meta tags, sitemap, structured data |
| `dev`       | Component and page development      |
| `analytics` | Tracking, tag manager, event setup  |
| `growth`    | Distribution, listings, community   |
| `social`    | Social media content and automation |
| `bug`       | Something broken                    |
| `infra`     | Vercel config, CI, build tooling    |

---

## 2. Planning Horizons

| Horizon      | What exists                                 | Format                                      |
| ------------ | ------------------------------------------- | ------------------------------------------- |
| **4 weeks**  | Current milestone with fully written Issues | GitHub Issues                               |
| **12 weeks** | Quarterly themes                            | 3–4 bullet points in a pinned issue         |
| **6 months** | Vision targets                              | Metrics only — users, revenue, integrations |

**Rule:** Only one milestone is ever fully written at a time. The next milestone
gets sketched (titles only) during the final week of the current one. This
prevents planning work that reality will invalidate.

Agents execute what is written. Vague issues produce vague output. Keep the
written window at 4 weeks and keep issues specific.

---

## 3. Implement & Release

### Daily Deploy Workflow

```bash
# 1. Commit and push to GitHub
git add <files>
git commit -m "feat: ..."
git push

# 2. Deploy to Vercel production
npm run deploy
```

`npm run deploy` runs `vite build && vercel --prod`.

### Staging Before Production

```bash
npm run preview:deploy   # vite build && vercel (no --prod flag)
```

This produces a unique Vercel preview URL. Use it to review any change larger
than a copy fix before running `npm run deploy`.

### Branch Naming

```
feat/issue-42-add-sitemap
fix/issue-17-footer-links
content/issue-31-mcp-explainer-post
```

### Release Tiers

| Change type         | Branch        | Staging required         | PR required |
| ------------------- | ------------- | ------------------------ | ----------- |
| Copy fix / typo     | `main` direct | No                       | No          |
| New section or page | `feat/*`      | Yes — review preview URL | Yes         |
| Blog post           | `content/*`   | Yes — review preview URL | Yes         |
| Structural change   | `feat/*`      | Yes — screenshots in PR  | Yes         |

### PR Template

Every PR must close its Issue and include:

```markdown
Closes #[issue number]

## What changed

## Screenshots (if visual)

## Tested on preview URL

- [ ] Yes
```

### CI (GitHub Actions)

Runs on every PR — type-check and build only. No deployment from CI.

```
tsc --noEmit
vite build
```

Deployment always happens from the local CLI, never from CI.

---

## 4. Social Media

### Accounts (in priority order)

1. X/Twitter — `@context_vault`
2. LinkedIn — Context Vault company page
3. Reddit — `u/context_vault`
4. Bluesky — `@context-vault.bsky.social`

### Content Cadence

| Type                   | Frequency      | Source                     |
| ---------------------- | -------------- | -------------------------- |
| Blog post announcement | Every publish  | Auto-generated             |
| Tip or insight         | 2×/week        | Recycled from blog content |
| Community reply        | Daily          | Manual                     |
| Launch or milestone    | As they happen | Manual                     |

### Automation Pipeline

```
New blog post merged to main
        ↓
GitHub Action triggers n8n webhook
        ↓
Claude API generates 3 variants (X short, LinkedIn medium, long-form)
        ↓
Drafts queued in Buffer for human approval
        ↓
Approved posts scheduled and published
```

**Do not go fully autonomous on social posting.** All drafts require approval
before publishing.

**Start automation after 5 posts have been published manually.** You need real
engagement data before automating tone and format.

### Post Content Rules

- Every community post must provide genuine value before linking to the product
- No cross-posting identical text across platforms — adapt format per platform
- Blog post announcements include: title, one-sentence hook, link, relevant hashtags

---

## 5. Analytics & Monitoring

### Stack

| Tool                  | Purpose                                      |
| --------------------- | -------------------------------------------- |
| Google Tag Manager    | Single script entry point for all tags       |
| Google Analytics 4    | Traffic, sessions, acquisition source        |
| Google Search Console | Search queries, rankings, click-through rate |
| Microsoft Clarity     | Heatmaps and session recordings              |
| PostHog               | Funnel tracking, events, retention           |

GTM is the entry point. All other tags are managed inside GTM — do not add
additional tracking scripts directly to `index.html`.

### Events to Track (configure in GTM)

| Event name         | Trigger                                     |
| ------------------ | ------------------------------------------- |
| `cta_click`        | Any "Start free" or "Register" button click |
| `blog_post_view`   | Pageview on `/blog/:slug`                   |
| `get_started_view` | Pageview on `/get-started`                  |
| `outbound_click`   | Any link leaving to the app or docs         |
| `copy_command`     | Clipboard copy button on get-started page   |

### Weekly Analytics Review (Fridays, 10 min)

- **GSC:** which queries are gaining impressions week over week
- **GA4:** top pages, blog → register funnel drop-off
- **Clarity:** rage-clicks or dead zones on the landing page
- **PostHog:** register conversion rate from site traffic

### The primary metric

`site visitor → register click` conversion rate. If that is broken, nothing
else matters. Check it weekly.

### Setup priority

Register the domain in Google Search Console immediately — it takes 2–4 weeks
to populate and you need the baseline before SEO work starts showing results.

---

## 6. Growing the Userbase

Three channels in order of time-to-value:

### A. Community Distribution (fastest — week 1)

Target communities:

- Reddit: r/ClaudeAI, r/LocalLLaMA, r/cursor, r/MachineLearning
- Discord: Claude, Cursor, Windsurf official servers
- HN: Show HN post (coordinate with a launch week)

Directory listings (permanent referral channels — do once):

- `awesome-mcp-servers` GitHub repo
- mcp.so directory
- Cursor MCP docs integration list
- Windsurf docs
- Claude.ai integrations page

Rule: every post must deliver genuine value first. Link second. No spam.

### B. Content SEO (slowest to start, highest long-term ROI)

- 2 posts/month minimum, AI-assisted drafting from briefs
- Target queries: "claude code persistent memory", "mcp memory server",
  "cursor memory across sessions", "ai agent memory layer"
- Each post internally links to 2 other posts
- Each post ends with a register CTA
- Results appear in GSC at ~6–8 weeks and compound for months

### C. Integration-Led Growth (medium effort, permanent)

Get listed in client tool docs:

- Claude Code MCP documentation (highest-priority — largest audience overlap)
- Cursor docs MCP section
- Windsurf marketplace
- Each listing is a permanent inbound channel requiring zero ongoing maintenance

### What we do not do yet

Paid ads, influencer outreach, referral programs. Wrong stage.

---

## Conventions

- Prefer editing existing files over creating new ones
- Do not add comments or docstrings to code you did not change
- Do not add error handling for scenarios that cannot happen
- CSS changes: rewrite the full file rather than piecemeal edits
- Never commit directly to `main` for anything requiring a staging review
- Never run `npm run deploy` without first checking the diff with `git diff`
- All copy changes must be verified on a preview URL before going to production
- Blog posts go live the day they are ready — do not batch or delay content

# Context Vault — Graphic Profile & Style Guide

> **This is the authoritative design reference for the Context Vault marketing
> site.** All contributors and agents must follow these rules. Do not introduce
> exceptions without updating this document.

---

## §1 Brand Foundation

### Positioning

> "Context Vault is the persistent memory layer for AI development workflows —
> local-first, open-core, and developer-controlled."

### Brand personality

| Dimension         | Description                                              |
| ----------------- | -------------------------------------------------------- |
| Precise           | Specific, technical, concrete. Never vague or hand-wavy. |
| Trustworthy       | Calm confidence. No hype. Claims are backed by evidence. |
| Calm intelligence | Measured tone. Smart without being condescending.        |
| Developer-native  | Assumes a technical audience. No marketing jargon.       |

### Voice rules

- Write active sentences. Passive voice is a sign of hedging.
- Prefer concrete over abstract: "saves decisions as markdown files" beats
  "stores your knowledge."
- Remove filler words on every review pass: **powerful**, **seamless**,
  **robust**, **next-generation**, **cutting-edge**, **leverage**.
- No exclamation marks in marketing copy.
- CTAs must state a clear action: "Start free", "See 2-minute setup", "Read
  post". Never "Click here" or "Learn more" alone.

### Audience

Developers using Claude Code, Cursor, or Windsurf who lose context across
sessions and want a structured, local-first way to persist it.

---

## §2 Color Palette

### Design rule

Violet (`--primary` / `--brand`) appears **only on interactive elements and
decorative accents**. The neutral palette (grays) must constitute **85%+ of the
visual weight** on any screen. Never introduce a second accent color — violet is
the one and only brand hue.

### Token reference

| Token                  | Light OKLCH             | Light ~Hex | Dark OKLCH             | Dark ~Hex | Usage                                       |
| ---------------------- | ----------------------- | ---------- | ---------------------- | --------- | ------------------------------------------- |
| `--primary`            | `oklch(0.55 0.22 285)`  | `#6941c6`  | `oklch(0.72 0.18 285)` | `#9b72ef` | Button bg, icon accent, ring, link text     |
| `--primary-foreground` | `oklch(0.98 0.005 285)` | `#f6f5ff`  | `oklch(0.13 0.02 285)` | `#1a1626` | Text on primary bg                          |
| `--brand`              | `oklch(0.55 0.22 285)`  | `#6941c6`  | `oklch(0.72 0.18 285)` | `#9b72ef` | Alias for `--primary`; use for brand tokens |
| `--brand-muted`        | `oklch(0.97 0.02 285)`  | `#f3f0ff`  | `oklch(0.22 0.05 285)` | `#251e33` | Tinted card bg (CTA banner, accented cards) |
| `--brand-foreground`   | `oklch(0.98 0.005 285)` | `#f6f5ff`  | `oklch(0.13 0.02 285)` | `#1a1626` | Alias for `--primary-foreground`            |
| `--accent`             | `oklch(0.97 0.02 285)`  | `#f3f0ff`  | `oklch(0.22 0.05 285)` | `#251e33` | Hover bg on ghost/link buttons              |
| `--accent-foreground`  | `oklch(0.55 0.22 285)`  | `#6941c6`  | `oklch(0.72 0.18 285)` | `#9b72ef` | Text on accent bg                           |
| `--ring`               | `oklch(0.55 0.22 285)`  | `#6941c6`  | `oklch(0.72 0.18 285)` | `#9b72ef` | Focus ring on all focusable elements        |
| `--background`         | `#f8f8f8`               | —          | `#212121`              | —         | Page background                             |
| `--foreground`         | `#212121`               | —          | `#f8f8f8`              | —         | Body text                                   |
| `--card`               | `#ffffff`               | —          | `#2a2a2a`              | —         | Card surface                                |
| `--muted`              | `#e5e5e5`               | —          | `#404040`              | —         | Muted background (section alternation)      |
| `--muted-foreground`   | `#717171`               | —          | `#a3a3a3`              | —         | Supporting text, metadata                   |
| `--border`             | `#e5e5e5`               | —          | `#404040`              | —         | All dividers and card borders               |

### Contrast verification

- Light `--primary` (`oklch(0.55 0.22 285)`) on white: ≈ 5.2:1 — WCAG AA ✓
- Dark `--primary` (`oklch(0.72 0.18 285)`) on `#212121`: ≈ 5.8:1 — WCAG AA ✓

---

## §3 Typography System

### Fonts

| Role      | Family         | Weights         | Source       |
| --------- | -------------- | --------------- | ------------ |
| UI / copy | Inter          | 400 / 500 / 600 | Google Fonts |
| Code      | JetBrains Mono | 400 / 500       | Google Fonts |

Never use `font-bold` (700). Maximum weight is 600 (`font-semibold`).

### Type scale

| Role         | Tailwind classes                                      | Size    | Weight | Line-height | Tracking |
| ------------ | ----------------------------------------------------- | ------- | ------ | ----------- | -------- |
| Hero H1      | `text-4xl sm:text-5xl font-semibold tracking-tight`   | 36–48px | 600    | 1.1         | tight    |
| Section H2   | `text-2xl sm:text-3xl font-semibold tracking-tight`   | 24–30px | 600    | 1.3         | tight    |
| Card title   | `text-base font-medium`                               | 14px    | 500    | 1.4         | normal   |
| Body copy    | `text-base text-muted-foreground`                     | 14px    | 400    | 1.6         | normal   |
| Small / meta | `text-xs text-muted-foreground`                       | 12px    | 400    | 1.5         | normal   |
| Section tag  | `text-xs font-medium uppercase tracking-widest`       | 12px    | 500    | —           | widest   |
| Button       | `text-base font-medium` (inherited from button reset) | 14px    | 500    | 1.5         | normal   |
| Nav link     | `text-sm font-medium`                                 | 13px    | 500    | —           | normal   |
| Code block   | `font-mono text-xs leading-relaxed`                   | 12px    | 400    | relaxed     | normal   |

### Rules

- `tracking-tight` only on H1 and H2 — never on body text, card titles, or
  smaller elements.
- `leading-relaxed` (1.625) mandatory for code blocks; `leading-normal` (1.6)
  mandatory for body paragraphs.
- Card descriptions use `text-muted-foreground` — never plain `text-foreground`.

---

## §4 Spacing and Layout

### Container

```
max-w-6xl px-6 mx-auto        (standard sections)
max-w-3xl                     (prose sections — MCP explainer, blog post body)
```

### Section padding

```
py-14 sm:py-16                (standard sections)
py-20 sm:py-24                (hero only)
py-16                         (CTA banner)
```

### Grid system

| Pattern             | Classes                     | Used in                     |
| ------------------- | --------------------------- | --------------------------- |
| 3-col features      | `grid gap-4 md:grid-cols-3` | VALUE_PROP, OBJECTIONS, FAQ |
| 3-col how-it-works  | `grid gap-4 lg:grid-cols-3` | HOW_IT_WORKS                |
| 3-col proof strip   | `grid gap-3 sm:grid-cols-3` | Hero metrics                |
| Single column prose | `max-w-3xl`                 | EXPLAINER, blog body        |

### Background alternation

Sections alternate to prevent visual monotony without color:

```
1. HERO          — from-muted/60 gradient + dot grid
2. VALUE_PROP    — plain background
3. EXPLAINER     — plain background
4. HOW_IT_WORKS  — border-y bg-muted/30
5. OBJECTIONS    — plain background
6. FAQ           — border-y bg-muted/30
7. BLOG_PREVIEW  — plain background
8. CTA_BANNER    — plain (card provides tinted surface)
```

---

## §5 Section Module Catalog

### HERO

```
Badge (variant="outline") — badge pill above H1
H1 (≤8 words) — tracking-tight
Subtitle (≤25 words) — text-muted-foreground
CTA pair — Button default + Button outline (size="lg")
Social proof strip — "Works with" badges + GitHub link
Dot-grid background — bg-[url('/grid.svg')] bg-repeat
Metric strip — 3-col Card grid
```

### VALUE_PROP

```
SectionTag (icon=Zap, label="Core capabilities")
H2
Prose (1 paragraph max)
3-col Card grid — CardHeader: icon text-primary + CardTitle + CardDescription
                  CardFooter (empty — maintains consistent card height)
```

### EXPLAINER

```
SectionTag (icon=Layers, label="How it connects")
H2
max-w-3xl prose (≤2 paragraphs)
Button variant="link" — optional external link
```

### HOW_IT_WORKS

```
SectionTag (icon=GitFork, label="Get started")
H2
lg:grid-cols-3 — each Card: CardHeader (icon + title + description)
                              CardContent: TerminalMockup
Background: border-y bg-muted/30
```

### OBJECTIONS

```
SectionTag (icon=ShieldCheck, label="Why Context Vault")
H2
3-col Card grid — CardTitle names the objection directly
                  CardDescription gives the answer
```

### FAQ

```
SectionTag (icon=MessageSquare, label="Common questions")
H2
3-col Card grid — CardTitle is the question
                  CardDescription is the answer
Background: border-y bg-muted/30
```

### BLOG_PREVIEW

```
SectionTag (icon=FileText, label="From the blog")
Flex row: H2 + "View all" Button outline
3-col Card grid — category Badge + date + read time
                  CardTitle with Link
                  CardDescription
                  CardFooter: "Read post" Button outline
```

### CTA_BANNER

```
Card (className="border-primary/20 bg-primary/5")
  Centered H2 + subtitle
  CTA pair — Button default + Button outline (size="lg")
  Trust marks: CheckCircle2 icon + label × 3
```

### Target page progression

```
1.  HERO          (live)         6.  SOCIAL_PROOF  (future)
2.  VALUE_PROP    (live)         7.  OBJECTIONS    (live)
3.  EXPLAINER     (live)         8.  FAQ           (live)
4.  HOW_IT_WORKS  (live)         9.  COMPARISON    (future)
5.  USE_CASE      (future)      10.  BLOG_PREVIEW  (live)
                                11.  CTA_BANNER    (live)
```

---

## §6 Graphic Element Vocabulary

### SectionTag

Small icon + uppercase label rendered above every section H2.

```tsx
<SectionTag icon={Zap} label="Core capabilities" />
```

- Icon: `size-3.5 text-primary`
- Label: `text-xs font-medium uppercase tracking-widest text-muted-foreground`
- Margin below: `mb-3`

### Hero dot grid

```html
<!-- public/grid.svg — 20×20px tile, single dot at 6% opacity -->
<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
  <circle cx="10" cy="10" r="0.8" fill="currentColor" opacity="0.06" />
</svg>
```

Apply: `bg-[url('/grid.svg')] bg-repeat` on the hero `<section>`.

### TerminalMockup

Dark terminal frame replacing bare `<pre>` blocks in HOW_IT_WORKS cards.

```tsx
<TerminalMockup title="optional filename">npx context-vault</TerminalMockup>
```

- Frame: `bg-zinc-950 rounded-md border border-border/70`
- Title bar: macOS traffic-light dots + optional filename in `text-zinc-500`
- Content: `font-mono text-xs leading-relaxed text-zinc-100 p-4`

### Decorative star

`✦` or a four-pointed SVG star in `text-primary`. Use sparingly — max 3 per
page — as punctuation, not wallpaper.

### Icon rules (lucide-react)

| Context            | Size class | Color                   |
| ------------------ | ---------- | ----------------------- |
| Section tag        | `size-3.5` | `text-primary`          |
| Card feature icon  | `size-5`   | `text-primary`          |
| Button icon        | `size-4`   | inherits button color   |
| Large feature icon | `size-8`   | `text-primary`          |
| Secondary / meta   | `size-3.5` | `text-muted-foreground` |

Use **lucide-react exclusively**. Do not import from other icon libraries.

---

## §7 Component Patterns

### Button

| Variant   | Usage                             | Rule                            |
| --------- | --------------------------------- | ------------------------------- |
| `default` | Primary CTA (violet fill)         | Max 1 per section               |
| `outline` | Secondary CTA paired with default | Always pair left of default     |
| `ghost`   | Navigation only                   | Never use for CTAs              |
| `link`    | Inline text links within prose    | `px-0` to remove horizontal pad |

- `size="lg"` for hero and CTA banner buttons.
- `size="sm"` for section-level secondary actions (blog "View all", card "Read
  post").
- Never use more than 2 CTAs in any single section block.
- Never write CTAs with exclamation marks.

### Card

| Variant  | Classes                                          | Usage                    |
| -------- | ------------------------------------------------ | ------------------------ |
| Standard | `rounded-xl border bg-card`                      | Features, FAQ, blog      |
| Tinted   | `border-primary/20 bg-primary/5`                 | CTA banner only          |
| Terminal | `bg-zinc-950 rounded-md border border-border/70` | HOW_IT_WORKS code frames |

Rules:

- No Card inside Card.
- No empty `CardFooter` unless used to enforce consistent card height in a grid.
- `CardDescription` always uses `text-muted-foreground` (default; do not override).

### Badge

| Variant     | Usage                                           |
| ----------- | ----------------------------------------------- |
| `outline`   | Hero pill label, section "new" markers          |
| `secondary` | Tool names ("Claude Code"), post categories     |
| `default`   | **Never** in marketing copy (solid violet fill) |

---

## §8 Anti-Patterns

These are recurring mistakes to avoid:

| Anti-pattern                                         | Why it breaks the design         |
| ---------------------------------------------------- | -------------------------------- |
| Adding a second accent color (green, orange, etc.)   | Dilutes brand identity           |
| Using `font-bold` (weight 700) anywhere              | Too heavy for Inter at 14px base |
| `tracking-tight` on body text or card titles         | Reduces legibility               |
| `Badge variant="default"` in marketing copy          | Solid violet is visually loud    |
| CTAs with exclamation marks                          | Undermines calm, precise tone    |
| More than 2 CTAs in one section                      | Decision paralysis               |
| Nesting cards                                        | Visual hierarchy collapse        |
| Star decorations (`✦`) more than 3 times per page    | Loses punctuation function       |
| Bare `<pre>` blocks for code examples                | Use TerminalMockup instead       |
| Direct `<script>` tags for analytics in `index.html` | All tracking goes through GTM    |
| `text-primary` on body copy                          | Violet is for interactive only   |

import { type ReactNode, useEffect, useState } from 'react';
import { Link } from 'react-router';
import { PageHead } from '../components/PageHead';
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  CheckCircle2,
  Copy,
  Check,
  Download,
  FileText,
  Globe,
  HelpCircle,
  Layers,
  Lock,
  Repeat,
  Star,
  Terminal,
  Users,
  Zap,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { posts } from '../content/posts';
import { formatDate } from '../lib/links';
import {
  AnnouncementBar,
  HeroSection,
  LogoCloud,
  FeatureCardGrid,
  CodeDemoSection,
  UseCaseDetailed,
  IntegrationsSplit,
  FAQSection,
  ProblemStrip,
} from '../components/sections';
import landingData from '../content/landing.json';
import { useInView } from '../hooks/useInView';

// ─── Icon map for features ─────────────────────────────────────────────────────

const iconMap = { FileText, Zap, Globe, Lock } as const;
type IconName = keyof typeof iconMap;

// ─── Reveal wrapper ────────────────────────────────────────────────────────────

function Reveal({ children, delay = '' }: { children: ReactNode; delay?: string }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={
        inView
          ? `animate-in fade-in-0 slide-in-from-bottom-6 duration-700 ease-out fill-mode-both ${delay}`
          : 'opacity-0'
      }
    >
      {children}
    </div>
  );
}

// ─── Data ───────────────────────────────────────────────────────────────────────

const logos = [
  { name: 'Claude Code', logo: 'anthropic' },
  { name: 'Cursor', logo: 'cursor' },
  { name: 'Windsurf', logo: undefined },
  { name: 'Zed', logo: 'zed' },
  { name: 'ChatGPT', logo: 'openai' },
  { name: 'n8n', logo: 'n8n' },
  { name: 'Raycast', logo: 'raycast' },
  { name: 'VS Code', logo: 'visualstudiocode' },
];

const codeTabs = [
  {
    label: 'Python',
    code: `import context_vault
vault = context_vault.Client()

# Save a decision once
vault.save(kind="decision", title="Use SQLite",
           body="Local-first, no infra overhead")

# Retrieve it in any future session
results = vault.search("database")
print(results[0].title)  # → Use SQLite`,
  },
  {
    label: 'CLI',
    code: `# Install and setup in one command
npx context-vault

# Save from any session
cv save --kind decision --title "Use SQLite" \\
        --body "Local-first, no infra overhead"

# Retrieve it anytime
cv search "database"
# → Use SQLite  [decision · 2d ago]`,
  },
];

const codeOutput = `# Use SQLite for local storage

**Decision:** Chose SQLite over Postgres
for local-first architecture.

**Tags:** architecture, database
**Created:** 2026-02-21

---

# Auth pattern

Use JWT + refresh tokens

**Tags:** authentication
**Created:** 2026-02-20`;

const useCases = [
  {
    icon: Terminal,
    label: 'Solo developer',
    title: 'Monday morning. Zero re-explaining.',
    description:
      'You open Cursor on Monday. Last Friday you were deep in an auth refactor. JWT chosen, Postgres rejected, a session handler edge case still open. Context Vault already loaded it all. You pick up mid-thought, as if the weekend never happened.',
    mockupBadge: 'session start · Monday 9:04am',
    mockupContent: (
      <div className="font-mono text-xs text-muted-foreground space-y-1.5 w-full px-2">
        <div className="text-primary">▸ context loaded: 3 entries</div>
        <div>• jwt-auth-decision: JWT over sessions (decision)</div>
        <div>• sqlite-arch: local-first, no Postgres (decision)</div>
        <div>• session-bug: edge case in refresh handler (note)</div>
        <div className="text-muted-foreground/50 mt-2">Ready. Picking up from Friday.</div>
      </div>
    ),
  },
  {
    icon: Users,
    label: 'Engineering team',
    title: '"Why did we choose SQLite?" answered in 3 seconds.',
    description:
      'A new team member asks about your database choice. Instead of digging through Slack threads, they run one search and get the full decision: context, trade-offs, date, author. Institutional knowledge that survives team changes.',
    mockupBadge: 'vault search · results',
    mockupContent: (
      <div className="font-mono text-xs text-muted-foreground space-y-1.5 w-full px-2">
        <div className="text-primary">▸ 1 result for "database"</div>
        <div className="mt-1 border border-border/40 rounded px-2 py-1.5 space-y-1">
          <div className="text-foreground font-semibold">Use SQLite for local storage</div>
          <div className="text-muted-foreground/70">
            Chose SQLite over Postgres. Local-first, no infra, easier onboarding. Benchmarks in
            /docs...
          </div>
          <div className="flex gap-2 text-muted-foreground/50">
            <span>[architecture]</span>
            <span>[database]</span>
            <span>· Aug 14</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    icon: Briefcase,
    label: 'Freelancer / consultant',
    title: 'Three clients. Zero context bleed.',
    description:
      'Morning: a React fintech app. Afternoon: a Python data pipeline. Each project has different patterns, different decisions, different constraints. Context Vault keeps a separate namespace per project. Open the session, get the right context automatically.',
    mockupBadge: 'vault · project namespaces',
    mockupContent: (
      <div className="font-mono text-xs text-muted-foreground space-y-1.5 w-full px-2">
        <div>vault/</div>
        <div className="pl-3">├── acme-fintech/</div>
        <div className="pl-6">
          │ ├── decisions/ <span className="text-muted-foreground/40">(4)</span>
        </div>
        <div className="pl-6">
          │ └── patterns/ <span className="text-muted-foreground/40">(7)</span>
        </div>
        <div className="pl-3">├── data-pipeline-co/</div>
        <div className="pl-6">
          │ ├── decisions/ <span className="text-muted-foreground/40">(2)</span>
        </div>
        <div className="pl-6">
          │ └── notes/ <span className="text-muted-foreground/40">(5)</span>
        </div>
        <div className="pl-3">└── saas-startup/</div>
        <div className="pl-6">
          {' '}
          ├── decisions/ <span className="text-muted-foreground/40">(3)</span>
        </div>
        <div className="pl-6">
          {' '}
          └── patterns/ <span className="text-muted-foreground/40">(6)</span>
        </div>
      </div>
    ),
  },
];

const integrationLogos = [
  { name: 'Claude Code', logo: 'anthropic' },
  { name: 'Cursor', logo: 'cursor' },
  { name: 'Windsurf', logo: undefined },
  { name: 'Zed', logo: 'zed' },
  { name: 'VS Code', logo: 'visualstudiocode' },
  { name: 'Raycast', logo: 'raycast' },
];

const commits = [
  { title: 'feat: hybrid search with FTS5', number: '#142', date: '2d ago' },
  {
    title: 'fix: vault path resolution on Windows',
    number: '#139',
    date: '4d ago',
  },
  { title: 'chore: add SQLite WAL mode', number: '#136', date: '1w ago' },
];

// ─── How it works steps ─────────────────────────────────────────────────────────

const howItWorksSteps = [
  {
    icon: Download,
    step: '01',
    title: 'Install in one command',
    description:
      'Run npx context-vault. It auto-detects your AI editor and connects the memory layer. No config files, no API keys.',
  },
  {
    icon: FileText,
    step: '02',
    title: 'Work as usual. Context saves automatically.',
    description:
      'As you code, your AI saves decisions, patterns, and project insights as plain markdown files in your vault. No extra steps.',
  },
  {
    icon: Repeat,
    step: '03',
    title: 'Every session starts where you left off',
    description:
      'Open a new session tomorrow, next week, or next month. Your AI automatically retrieves the right context. No re-explaining.',
  },
];

// ─── Derived data from JSON ────────────────────────────────────────────────────

const { hero, features: rawFeatures, faqs } = landingData;

const features = rawFeatures.map((f) => ({
  ...f,
  icon: iconMap[f.iconName as IconName],
}));

// ─── JSON-LD Structured Data ───────────────────────────────────────────────────

const jsonLdSoftware = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Context Vault',
  description:
    'Persistent memory layer for AI coding tools. Save decisions, patterns, and project context once. They are automatically retrieved in every future session.',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'macOS, Windows, Linux',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  license: 'https://opensource.org/licenses/MIT',
  url: 'https://contextvault.dev',
  downloadUrl: 'https://www.npmjs.com/package/context-vault',
  softwareRequirements: 'Node.js 18+',
  author: {
    '@type': 'Organization',
    name: 'Context Vault',
    url: 'https://contextvault.dev',
  },
};

const jsonLdFaq = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.flatMap((cat) =>
    cat.items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    }))
  ),
};

// ─── Page ──────────────────────────────────────────────────────────────────────

export function LandingPage() {
  const featured = posts.slice(0, 3);
  const [stars, setStars] = useState<number | null>(null);
  const [finalCopied, setFinalCopied] = useState(false);

  useEffect(() => {
    fetch('https://api.github.com/repos/fellanH/context-vault')
      .then((r) => r.json())
      .then((d) => setStars(d.stargazers_count ?? null))
      .catch(() => {});
  }, []);

  function copyFinalCommand() {
    navigator.clipboard.writeText('npx context-vault');
    setFinalCopied(true);
    setTimeout(() => setFinalCopied(false), 1500);
  }

  return (
    <main>
      <PageHead
        title="Context Vault: Persistent Memory for AI Coding Tools"
        description="Your AI forgets everything between sessions. Context Vault saves decisions, patterns, and context once. Claude Code, Cursor, and Windsurf retrieve them automatically. Free, open source, 2-minute setup."
        canonical="/"
      />

      {/* JSON-LD structured data for SEO/AEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdSoftware),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdFaq),
        }}
      />

      {/* 1. Announcement Bar */}
      <AnnouncementBar
        message="Context Vault is open-source. Star the repo, contribute, or self-host."
        linkText="View on GitHub"
        linkHref="https://github.com/fellanH/context-vault"
        variant="brand"
      />

      {/* 2. Hero */}
      <HeroSection
        badge={hero.badge}
        badgeHref={hero.badgeHref || undefined}
        heading={hero.heading}
        accentWord={hero.accentWord}
        subtitle={hero.subtitle}
        quickStartCommand="npx context-vault"
        secondaryCta={{
          label: hero.secondaryCta.label,
          href: hero.secondaryCta.href,
        }}
        trustPoints={hero.trustPoints}
        leftPanelBadge={hero.leftPanelBadge}
        leftPanelLines={hero.leftPanelLines as Parameters<typeof HeroSection>[0]['leftPanelLines']}
        rightPanelBadge={hero.rightPanelBadge}
        rightPanelLines={hero.rightPanelLines}
        dotGrid
      />

      {/* 3. Social proof */}
      <div className="py-4" role="region" aria-label="Trust signals">
        <div className="mx-auto flex w-full max-w-3xl flex-wrap items-center justify-center gap-3 px-6">
          <a
            href="https://github.com/fellanH/context-vault"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-muted/50 px-4 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <Star className="size-3.5" aria-hidden="true" />
            {stars !== null ? (
              <span>{stars.toLocaleString()} stars on GitHub</span>
            ) : (
              <span>Open source on GitHub</span>
            )}
          </a>
          <span className="inline-flex items-center rounded-full bg-muted/50 px-4 py-1.5 text-xs text-muted-foreground">
            MIT License
          </span>
          <a
            href="https://modelcontextprotocol.io"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center rounded-full bg-muted/50 px-4 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Built on MCP standard
          </a>
          <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
            Free forever
          </span>
        </div>
      </div>

      {/* 4. Logo cloud */}
      <LogoCloud headline="Works with your AI tools" logos={logos} />

      {/* 5. The problem */}
      <Reveal>
        <ProblemStrip />
      </Reveal>

      {/* 6. How it works */}
      <Reveal>
        <section aria-labelledby="how-it-works-heading" className="py-16">
          <div className="mx-auto w-full max-w-6xl px-6">
            <div className="text-center mb-12">
              <div className="mb-4 inline-flex items-center gap-1.5">
                <Zap className="size-3.5 text-primary" aria-hidden="true" />
                <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  How it works
                </span>
              </div>
              <h2 id="how-it-works-heading" className="text-3xl font-semibold tracking-tight">
                Three steps. Two minutes. <span className="text-primary">Done.</span>
              </h2>
              <p className="mt-3 text-base text-muted-foreground max-w-lg mx-auto leading-relaxed">
                No accounts, no config files, no cloud setup. Install it and start working.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3" role="list">
              {howItWorksSteps.map((step) => (
                <div
                  key={step.step}
                  role="listitem"
                  className="relative rounded-2xl border border-border/60 bg-card p-8 shadow-[var(--shadow-card)] text-center"
                >
                  <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-primary/8">
                    <step.icon className="size-6 text-primary" aria-hidden="true" />
                  </div>
                  <span className="text-xs font-mono text-primary mb-2 block">
                    Step {step.step}
                  </span>
                  <h3 className="text-base font-semibold tracking-tight mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* 7. Use cases */}
      <Reveal>
        <UseCaseDetailed
          sectionTagIcon={BookOpen}
          sectionTag="Real scenarios"
          heading="From your actual workday"
          accentWord="actual"
          subtitle="Three situations every developer recognises. One tool that solves all of them."
          useCases={useCases}
        />
      </Reveal>

      {/* 8. Features */}
      <Reveal>
        <FeatureCardGrid
          sectionTagIcon={Layers}
          sectionTag="Core capabilities"
          heading="What Context Vault gives you"
          accentWord="gives you"
          subtitle="Built for developers who use multiple AI tools and want to stop starting from zero."
          features={features}
          columns={4}
          cta={{
            label: "Get started, it's free",
            href: 'https://github.com/fellanH/context-vault',
          }}
        />
      </Reveal>

      {/* 9. Code demo */}
      <Reveal>
        <CodeDemoSection
          tabs={codeTabs}
          outputLabel="vault output"
          output={codeOutput}
          skillHeading="Install the Context Vault MCP server"
          skillDescription="One command connects persistent memory to your AI editor."
          skillCommand="npm install -g context-vault"
          skillCapabilities={[
            'Saves context across sessions automatically',
            'Hybrid semantic + full-text search',
            'Works with Claude Code, Cursor, Windsurf',
            'Plain markdown files. Your data, your format.',
          ]}
        />
      </Reveal>

      {/* 10. Integrations + open source */}
      <Reveal>
        <IntegrationsSplit
          integrationsHeading="Connects to your workflow"
          integrationsDescription="Context Vault works with any MCP-compatible AI client. Claude Code, Cursor, Windsurf, Zed. One vault, every tool."
          integrationsCTA="Setup guide"
          integrationsCTAHref="/get-started"
          integrations={integrationLogos}
          openSourceHeading="Open source, MIT licensed"
          openSourceDescription="The entire codebase is open source. Self-host it, audit it, extend it, contribute to it. Plain markdown files, no lock-in, no vendor dependency."
          repoName="fellanH/context-vault"
          stars={stars !== null ? stars.toLocaleString() : undefined}
          commits={commits}
          repoCTA="View on GitHub"
          repoCTAHref="https://github.com/fellanH/context-vault"
        />
      </Reveal>

      {/* 11. FAQ */}
      <Reveal>
        <FAQSection
          sectionTagIcon={HelpCircle}
          sectionTag="FAQ"
          heading="Common questions"
          accentWord="questions"
          subtitle="Everything you need to know before installing."
          categories={faqs}
        />
      </Reveal>

      {/* 12. Final CTA */}
      <section aria-labelledby="final-cta-heading" className="py-20">
        <div className="mx-auto w-full max-w-3xl px-6 text-center">
          <h2 id="final-cta-heading" className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Ready to stop starting from zero?
          </h2>
          <p className="mt-4 text-base text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Install Context Vault in 2 minutes. Every AI session picks up exactly where you left
            off, automatically.
          </p>

          <div className="mt-8 flex flex-col items-center gap-4">
            <div
              role="region"
              aria-label="Install command"
              className="inline-flex items-center gap-3 rounded-2xl bg-zinc-950 px-5 py-3.5 text-sm font-mono shadow-[var(--shadow-hero-panel)]"
            >
              <span className="text-zinc-500 select-none" aria-hidden="true">
                $
              </span>
              <span className="text-zinc-100">npx context-vault</span>
              <button
                onClick={copyFinalCommand}
                aria-label="Copy install command"
                className="ml-1 text-zinc-500 hover:text-zinc-200 transition-colors"
              >
                {finalCopied ? (
                  <Check className="size-3.5 text-green-400" aria-hidden="true" />
                ) : (
                  <Copy className="size-3.5" aria-hidden="true" />
                )}
              </button>
            </div>

            <a
              href="https://github.com/fellanH/context-vault"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-2.5 text-sm font-medium hover:bg-muted/30 transition-colors"
            >
              View on GitHub <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </div>

          <div
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
            role="list"
            aria-label="Product guarantees"
          >
            <span
              role="listitem"
              className="inline-flex items-center gap-1.5 rounded-full bg-muted/50 px-3 py-1 text-xs text-muted-foreground"
            >
              <CheckCircle2 className="size-3.5" aria-hidden="true" />
              MIT License, free forever
            </span>
            <span
              role="listitem"
              className="inline-flex items-center gap-1.5 rounded-full bg-muted/50 px-3 py-1 text-xs text-muted-foreground"
            >
              <CheckCircle2 className="size-3.5" aria-hidden="true" />
              Data stays on your machine
            </span>
            <span
              role="listitem"
              className="inline-flex items-center gap-1.5 rounded-full bg-muted/50 px-3 py-1 text-xs text-muted-foreground"
            >
              <CheckCircle2 className="size-3.5" aria-hidden="true" />
              2-minute setup
            </span>
          </div>
        </div>
      </section>

      {/* 13. Blog posts */}
      {featured.length > 0 && (
        <section aria-labelledby="blog-heading" className="border-t border-border/60">
          <div className="mx-auto w-full max-w-6xl px-6 py-14">
            <div className="flex items-center justify-between gap-3 mb-8">
              <div className="inline-flex items-center gap-2">
                <FileText className="size-3.5 text-primary" aria-hidden="true" />
                <span
                  id="blog-heading"
                  className="text-xs font-semibold uppercase tracking-widest text-muted-foreground"
                >
                  From the blog
                </span>
              </div>
              <Button asChild variant="outline" size="sm">
                <Link to="/blog">View all</Link>
              </Button>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {featured.map((post) => (
                <Card
                  key={post.slug}
                  className="rounded-2xl border border-border/60 shadow-[var(--shadow-card)]"
                >
                  <CardHeader>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Badge variant="secondary">{post.category}</Badge>
                      <span>{formatDate(post.publishedAt)}</span>
                      <span>{post.readTimeMinutes} min read</span>
                    </div>
                    <CardTitle className="text-base">
                      <Link to={`/blog/${post.slug}`} className="hover:underline">
                        {post.title}
                      </Link>
                    </CardTitle>
                    <CardDescription>{post.description}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button asChild variant="outline" size="sm" className="w-fit">
                      <Link to={`/blog/${post.slug}`}>
                        Read post <ArrowRight className="size-4" aria-hidden="true" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

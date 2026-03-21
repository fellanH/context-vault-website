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
  Layers,
  Lock,
  Repeat,
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
  HeroSection,
  LogoCloud,
  FeatureCardGrid,
  UseCaseDetailed,
  IntegrationsSplit,
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


const useCases = [
  {
    icon: Terminal,
    label: 'Solo developer',
    title: 'Monday morning. Zero re-explaining.',
    description: 'You open Cursor. Last Friday you were deep in an auth refactor. Context Vault already loaded it.',
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
    title: '"Why did we choose SQLite?" Answered instantly.',
    description: 'New team member runs one search and gets the full decision: context, trade-offs, date. No Slack archaeology.',
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
    description: 'Each project gets its own namespace. Open the session, get the right context. Nothing leaks across clients.',
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
    description: 'Run npx context-vault. It auto-detects your editor and writes the MCP config.',
  },
  {
    icon: FileText,
    step: '02',
    title: 'Your AI saves as you work',
    description: 'Decisions, patterns, and context saved as plain markdown. No extra steps.',
  },
  {
    icon: Repeat,
    step: '03',
    title: 'Every session picks up where you left off',
    description: 'Open tomorrow or next month. The right context is already there.',
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
  url: 'https://context-vault.com',
  downloadUrl: 'https://www.npmjs.com/package/context-vault',
  softwareRequirements: 'Node.js 22+',
  author: {
    '@type': 'Organization',
    name: 'Context Vault',
    url: 'https://context-vault.com',
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
  const [finalCopied, setFinalCopied] = useState(false);

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

      {/* 1. Hero */}
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
        dotGrid
      />

      {/* 2. Trust strip */}
      <div className="py-4" role="region" aria-label="Trust signals">
        <div className="mx-auto flex w-full max-w-3xl flex-wrap items-center justify-center gap-3 px-6">
          <a
            href="https://github.com/fellanH/context-vault"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-muted/50 px-4 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Open source on GitHub
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
          <Link
            to="/pricing"
            className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary hover:bg-primary/20 transition-colors"
          >
            Free tier forever · See pricing
          </Link>
        </div>
      </div>

      {/* 3. Logo cloud */}
      <LogoCloud headline="Works with your AI tools" logos={logos} />

      {/* 4. The problem */}
      <Reveal>
        <ProblemStrip />
      </Reveal>

      {/* 5. How it works */}
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
                Three steps. Two minutes.
              </h2>
            </div>

            <div className="grid gap-8 md:grid-cols-3" role="list">
              {howItWorksSteps.map((step) => (
                <div
                  key={step.step}
                  role="listitem"
                  className="relative rounded-2xl border border-border/60 bg-card p-8 shadow-[var(--shadow-card)] text-center"
                >
                  <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-muted/50">
                    <step.icon className="size-6 text-muted-foreground" aria-hidden="true" />
                  </div>
                  <span className="text-xs font-mono text-muted-foreground/60 mb-2 block">
                    {step.step}
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

      {/* 6. Use cases */}
      <Reveal>
        <UseCaseDetailed
          sectionTagIcon={BookOpen}
          sectionTag="Real scenarios"
          heading="From your actual workday"
          accentWord="actual"
          subtitle="Three situations every developer recognises."
          useCases={useCases}
        />
      </Reveal>

      {/* 7. Features */}
      <Reveal>
        <FeatureCardGrid
          sectionTagIcon={Layers}
          sectionTag="Core capabilities"
          heading="What Context Vault gives you"
          accentWord="gives you"
          subtitle="Built for developers who use multiple AI tools."
          features={features}
          columns={4}
          cta={{
            label: "Get started, it's free",
            href: 'https://github.com/fellanH/context-vault',
          }}
        />
      </Reveal>

      {/* 8. Session start terminal */}
      <Reveal>
        <section className="py-16">
          <div className="mx-auto w-full max-w-2xl px-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold tracking-tight">What Monday morning looks like</h2>
              <p className="mt-2 text-sm text-muted-foreground">You open your editor. Context Vault already loaded what matters.</p>
            </div>
            <div className="rounded-2xl overflow-hidden border border-border/60 shadow-[var(--shadow-hero-panel)]">
              <div className="flex items-center gap-1.5 border-b border-white/10 bg-zinc-950 px-4 py-2.5">
                <span className="size-2.5 rounded-full bg-red-400/70" />
                <span className="size-2.5 rounded-full bg-yellow-400/70" />
                <span className="size-2.5 rounded-full bg-green-400/70" />
                <span className="ml-auto font-mono text-[10px] text-zinc-500">Monday 9:04am</span>
              </div>
              <div className="bg-zinc-950 px-6 py-5 font-mono text-xs leading-7 space-y-0.5">
                <div className="text-zinc-500">$ cursor .</div>
                <div className="text-zinc-600">&nbsp;</div>
                <div className="text-zinc-500">context-vault · loading session context...</div>
                <div className="text-green-400">✓ 3 entries retrieved</div>
                <div className="text-zinc-600">&nbsp;</div>
                <div className="flex gap-6">
                  <span className="text-zinc-300">jwt-auth-decision</span>
                  <span className="text-zinc-600">decision&nbsp;&nbsp;· last session</span>
                </div>
                <div className="flex gap-6">
                  <span className="text-zinc-300">sqlite-over-postgres</span>
                  <span className="text-zinc-600">decision&nbsp;&nbsp;· 2d ago</span>
                </div>
                <div className="flex gap-6">
                  <span className="text-zinc-300">session-handler-bug</span>
                  <span className="text-zinc-600">note&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;· last session</span>
                </div>
                <div className="text-zinc-600">&nbsp;</div>
                <div className="text-zinc-500">Ready. Picking up where you left off.</div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* 9. Integrations + open source */}
      <Reveal>
        <IntegrationsSplit
          integrationsHeading="Connects to your workflow"
          integrationsDescription="Works with any MCP-compatible AI client. One vault, every tool."
          integrationsCTA="Setup guide"
          integrationsCTAHref="/get-started"
          integrations={integrationLogos}
          openSourceHeading="Open source, MIT licensed"
          openSourceDescription="Self-host it, audit it, extend it. No lock-in. Plain markdown, no vendor dependency."
          repoName="fellanH/context-vault"
          commits={commits}
          repoCTA="View on GitHub"
          repoCTAHref="https://github.com/fellanH/context-vault"
        />
      </Reveal>

      {/* 10. Final CTA */}
      <section aria-labelledby="final-cta-heading" className="py-20">
        <div className="mx-auto w-full max-w-3xl px-6 text-center">
          <h2 id="final-cta-heading" className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Stop starting from zero.
          </h2>
          <p className="mt-4 text-base text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Two minutes to install. Every session picks up exactly where you left off.
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

            <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-muted/50 px-3 py-1">
                <CheckCircle2 className="size-3.5" aria-hidden="true" />
                Free tier forever
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-muted/50 px-3 py-1">
                <CheckCircle2 className="size-3.5" aria-hidden="true" />
                Data stays on your machine
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-muted/50 px-3 py-1">
                <CheckCircle2 className="size-3.5" aria-hidden="true" />
                MIT licensed
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 11. Blog posts */}
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

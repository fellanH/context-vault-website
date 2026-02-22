import { useEffect, useState } from "react";
import { Link } from "react-router";
import { PageHead } from "../components/PageHead";
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  CheckCircle2,
  FileText,
  Globe,
  HelpCircle,
  Layers,
  Lock,
  Star,
  Terminal,
  Users,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { posts } from "../content/posts";
import { appHref, formatDate } from "../lib/links";
import {
  AnnouncementBar,
  HeroSection,
  LogoCloud,
  StatStrip,
  FeatureCardGrid,
  CodeDemoSection,
  UseCaseDetailed,
  IntegrationsSplit,
  FAQSection,
} from "../components/sections";
import landingData from "../content/landing.json";

// ─── Icon map for features ─────────────────────────────────────────────────────

const iconMap = { FileText, Zap, Globe, Lock } as const;
type IconName = keyof typeof iconMap;

// ─── Data (stays in TypeScript — contains JSX) ─────────────────────────────────

const logos = [
  { name: "Claude Code", logo: "anthropic" },
  { name: "Cursor", logo: "cursor" },
  { name: "Windsurf", logo: undefined },
  { name: "Zed", logo: "zed" },
  { name: "ChatGPT", logo: "openai" },
  { name: "n8n", logo: "n8n" },
  { name: "Raycast", logo: "raycast" },
  { name: "VS Code", logo: "visualstudiocode" },
];

const codeTabs = [
  {
    label: "Python",
    code: `import context_vault

# Initialize vault client
vault = context_vault.Client()

# Save context from a session
vault.save(
    kind="decision",
    title="Use SQLite for local storage",
    body="Chose SQLite over Postgres for local-first arch.",
    tags=["architecture", "database"]
)

# Retrieve relevant context
results = vault.search("database architecture")
for entry in results:
    print(entry.title, entry.body)`,
  },
  {
    label: "CLI",
    code: `# Install Context Vault MCP server
npx context-vault setup

# Save context from terminal
cv save --kind insight \\
  --title "Auth pattern" \\
  --body "Use JWT + refresh tokens"

# Search your vault
cv search "authentication"

# List recent entries
cv list --limit 10`,
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
    label: "Solo developer",
    title: "Back after the weekend. Zero re-explaining.",
    description:
      "It's Monday. You open Cursor. Last Friday you were deep in an auth refactor — JWT strategy chosen, Postgres rejected, a session handler edge case still open. Context Vault already retrieved it. You pick up mid-thought.",
    mockupBadge: "Claude Code · Session started",
    mockupContent: (
      <div className="font-mono text-xs text-muted-foreground space-y-1.5 w-full px-2">
        <div className="text-primary">
          ▸ vault scan complete — 3 entries retrieved
        </div>
        <div>• auth-refactor: JWT chosen, Postgres rejected (decision)</div>
        <div>• db-decision: SQLite for local-first arch (decision)</div>
        <div>• session-bug: edge case in handler still open (note)</div>
      </div>
    ),
  },
  {
    icon: Users,
    label: "Engineering team",
    title: "We made that call six months ago.",
    description:
      'New team member asks why SQLite over Postgres. Instead of Slack archaeology, they run `cv search "database"` and get the full decision note — context, trade-offs, the date it was made. Onboarding done in seconds.',
    mockupBadge: "vault search · 'database'",
    mockupContent: (
      <div className="font-mono text-xs text-muted-foreground space-y-1.5 w-full px-2">
        <div className="text-primary">▸ 1 result for "database"</div>
        <div className="mt-1 border border-border/40 rounded px-2 py-1.5 space-y-1">
          <div className="text-foreground font-semibold">
            Use SQLite for local storage
          </div>
          <div className="text-muted-foreground/70">
            Chose SQLite over Postgres — local-first arch, no infra overhead,
            easier onboarding...
          </div>
          <div className="flex gap-2 text-muted-foreground/50">
            <span>[architecture]</span>
            <span>[database]</span>
            <span>· 2025-08-14</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    icon: Briefcase,
    label: "Freelancer / consultant",
    title: "Three clients. Every session starts right.",
    description:
      "Morning: a React fintech app. Afternoon: a Python data pipeline. Each client has a different stack, different conventions, ongoing decisions. Context Vault keeps a separate namespace per project. Open the session, get the right context — automatically.",
    mockupBadge: "vault · project switch",
    mockupContent: (
      <div className="font-mono text-xs text-muted-foreground space-y-1.5 w-full px-2">
        <div>vault/</div>
        <div className="pl-3">├── acme-fintech/</div>
        <div className="pl-6">│ ├── decisions/</div>
        <div className="pl-6">│ └── patterns/</div>
        <div className="pl-3">├── data-pipeline-co/</div>
        <div className="pl-6">│ ├── decisions/</div>
        <div className="pl-6">│ └── notes/</div>
        <div className="pl-3">└── saas-client-three/</div>
        <div className="pl-6"> ├── decisions/</div>
        <div className="pl-6"> └── patterns/</div>
      </div>
    ),
  },
];

const integrationLogos = [
  { name: "Claude Code", logo: "anthropic" },
  { name: "Cursor", logo: "cursor" },
  { name: "Windsurf", logo: undefined },
  { name: "Zed", logo: "zed" },
  { name: "VS Code", logo: "visualstudiocode" },
  { name: "Raycast", logo: "raycast" },
];

const commits = [
  { title: "feat: hybrid search with FTS5", number: "#142", date: "2d ago" },
  {
    title: "fix: vault path resolution on Windows",
    number: "#139",
    date: "4d ago",
  },
  { title: "chore: add SQLite WAL mode", number: "#136", date: "1w ago" },
];

// ─── Derived data from JSON ────────────────────────────────────────────────────

const { hero, stats, features: rawFeatures, faqs } = landingData;

const features = rawFeatures.map((f) => ({
  ...f,
  icon: iconMap[f.iconName as IconName],
}));

// ─── Page ──────────────────────────────────────────────────────────────────────

export function LandingPage() {
  const featured = posts.slice(0, 3);
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    fetch("https://api.github.com/repos/fellanH/context-vault")
      .then((r) => r.json())
      .then((d) => setStars(d.stargazers_count ?? null))
      .catch(() => {});
  }, []);

  return (
    <main>
      <PageHead
        title="Persistent Memory for AI Tools"
        description="Context Vault gives Claude Code, Cursor, Windsurf, and browser-based AI a shared memory layer. Save decisions once, retrieve them in every session. Setup in under 5 minutes."
        canonical="/"
      />

      <AnnouncementBar
        message="Context Vault is open-source — star the repo, contribute, or self-host."
        linkText="View on GitHub"
        linkHref="https://github.com/fellanH/context-vault"
        variant="neutral"
      />

      <HeroSection
        badge={hero.badge}
        badgeHref={appHref(hero.badgeHref)}
        heading={hero.heading}
        accentWord={hero.accentWord}
        subtitle={hero.subtitle}
        quickStartCommand="npx context-vault setup"
        trustPoints={hero.trustPoints}
        leftPanelBadge={hero.leftPanelBadge}
        leftPanelLines={
          hero.leftPanelLines as Parameters<
            typeof HeroSection
          >[0]["leftPanelLines"]
        }
        rightPanelBadge={hero.rightPanelBadge}
        rightPanelLines={hero.rightPanelLines}
        dotGrid
      />

      {/* Social proof strip */}
      <div className="border-b border-border/60 bg-muted/30">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-2 px-6 py-3 text-xs text-muted-foreground">
          <a
            href="https://github.com/fellanH/context-vault"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 hover:text-foreground transition-colors"
          >
            <Star className="size-3.5" />
            {stars !== null ? (
              <span>{stars.toLocaleString()} stars on GitHub</span>
            ) : (
              <span>Open source on GitHub</span>
            )}
          </a>
          <span className="hidden sm:block text-border">·</span>
          <span>MIT License</span>
          <span className="hidden sm:block text-border">·</span>
          <a
            href="https://modelcontextprotocol.io"
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground transition-colors"
          >
            Built on MCP open standard
          </a>
        </div>
      </div>

      <LogoCloud headline="Works with your AI tools" logos={logos} />

      <StatStrip stats={stats} />

      <FeatureCardGrid
        sectionTagIcon={Layers}
        sectionTag="Core capabilities"
        heading="Everything a memory layer needs"
        accentWord="memory layer"
        subtitle="Built for developers who use multiple AI tools and can't afford to start from zero every session."
        features={features}
        columns={4}
      />

      {/* MCP explainer */}
      <section className="border-t border-border">
        <div className="mx-auto w-full max-w-6xl px-6 py-12">
          <div className="max-w-2xl">
            <Badge variant="outline" className="mb-4">
              What is MCP?
            </Badge>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">
                MCP (Model Context Protocol)
              </strong>{" "}
              is an open standard that lets AI tools like Claude Code and Cursor
              connect to external data sources. Context Vault implements MCP to
              give your AI a persistent, searchable memory layer —{" "}
              <a
                href="https://modelcontextprotocol.io"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4 hover:text-foreground transition-colors"
              >
                learn more about MCP
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <CodeDemoSection
        tabs={codeTabs}
        outputLabel="[ .MD ]"
        output={codeOutput}
        skillHeading="Add the Context Vault Skill"
        skillDescription="One command installs the MCP server and registers it with your AI client."
        skillCommand="npx context-vault setup"
        skillCapabilities={[
          "Saves context across sessions automatically",
          "Hybrid semantic + full-text search",
          "Works with Claude Code, Cursor, Windsurf",
          "Plain markdown files — your data, your format",
        ]}
      />

      <UseCaseDetailed
        sectionTagIcon={BookOpen}
        sectionTag="Scenarios"
        heading="From your actual day, not a demo."
        accentWord="actual day"
        subtitle="Three situations every developer recognises. One tool that fixes all of them."
        ctaLabel="Get started free"
        ctaHref={appHref("/register")}
        useCases={useCases}
      />

      <IntegrationsSplit
        integrationsHeading="Works with your tools"
        integrationsDescription="Connect Context Vault to any MCP-compatible AI client. Claude Code, Cursor, Windsurf, Zed, and more — one endpoint, every client."
        integrationsCTA="Browse integrations"
        integrations={integrationLogos}
        openSourceHeading="Open source at its core"
        openSourceDescription="The Context Vault server is open-source. Self-host it, contribute to it, or build on top of it. Plain markdown files, no lock-in."
        repoName="fellanH/context-vault"
        stars={stars !== null ? stars.toLocaleString() : undefined}
        commits={commits}
        repoCTA="View on GitHub"
        repoCTAHref="https://github.com/fellanH/context-vault"
      />

      <FAQSection
        sectionTagIcon={HelpCircle}
        sectionTag="FAQ"
        heading="Frequently asked questions"
        accentWord="questions"
        subtitle="Everything you need to know before you install."
        categories={faqs}
      />

      {/* Blog posts */}
      {featured.length > 0 && (
        <section className="border-t border-border">
          <div className="mx-auto w-full max-w-[80rem] px-[5vw] py-14">
            <div className="flex items-center justify-between gap-3 mb-8">
              <div className="inline-flex items-center gap-1.5 text-muted-foreground/60">
                <span className="font-mono text-xs">//</span>
                <FileText className="size-3.5 text-primary" />
                <span className="text-xs font-medium text-muted-foreground">
                  From the blog
                </span>
                <span className="font-mono text-xs">\</span>
              </div>
              <Button asChild variant="outline" size="sm">
                <Link to="/blog">View all</Link>
              </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {featured.map((post) => (
                <Card key={post.slug}>
                  <CardHeader>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Badge variant="secondary">{post.category}</Badge>
                      <span>{formatDate(post.publishedAt)}</span>
                      <span>{post.readTimeMinutes} min read</span>
                    </div>
                    <CardTitle className="text-base">
                      <Link
                        to={`/blog/${post.slug}`}
                        className="hover:underline"
                      >
                        {post.title}
                      </Link>
                    </CardTitle>
                    <CardDescription>{post.description}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="w-fit"
                    >
                      <Link to={`/blog/${post.slug}`}>
                        Read post <ArrowRight className="size-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="border-t border-border">
        <div className="mx-auto w-full max-w-[80rem] px-[5vw] py-16">
          <div className="rounded-md border border-primary/20 bg-primary/5 px-8 py-12 text-center">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Stop starting from zero.
            </h2>
            <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
              Connect Context Vault to your AI tools in under 5 minutes. Every
              session picks up exactly where you left off.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href={appHref("/register")}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
              >
                Start free <ArrowRight className="size-4" />
              </a>
              <Link
                to="/get-started"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-border px-6 py-2.5 text-sm font-medium hover:bg-muted/30 transition-colors"
              >
                See 2-minute setup
              </Link>
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="size-3.5" />
                Free forever for local use
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="size-3.5" />
                No credit card required
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="size-3.5" />
                Export your data anytime
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

import { Link } from "react-router";
import { PageHead } from "../components/PageHead";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Chrome,
  FileText,
  Globe,
  HelpCircle,
  Layers,
  Lock,
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
npx -y context-vault-cli@latest init

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
    label: "Individual developers",
    title: "Stop re-explaining your decisions",
    description:
      "Architecture calls, debug findings, project conventions — save them once. Context Vault retrieves the right entries automatically at the start of every new session in Claude Code, Cursor, or Windsurf.",
    mockupBadge: "Real-time · Updated 2 min ago",
    mockupContent: (
      <div className="font-mono text-xs text-muted-foreground space-y-1.5 w-full px-2">
        <div className="text-primary">▸ Retrieved 3 relevant entries</div>
        <div>• Use SQLite for local storage (decision)</div>
        <div>• JWT + refresh token auth pattern (insight)</div>
        <div>• Tailwind v4 migration notes (reference)</div>
      </div>
    ),
  },
  {
    icon: Chrome,
    label: "Browser AI users",
    title: "One vault across every AI chat",
    description:
      "Switching between ChatGPT, Claude.ai, and Gemini? The browser extension injects your saved context into any AI chat — no copy-pasting, no re-explaining the same project background for the sixth time.",
    mockupBadge: "Extension · Connected",
    mockupContent: (
      <div className="font-mono text-xs text-muted-foreground space-y-1.5 w-full px-2">
        <div className="text-green-500">● Context Vault connected</div>
        <div className="text-muted-foreground/60">
          3 entries ready to inject
        </div>
        <div className="mt-2">▸ Auth pattern (insight)</div>
        <div>▸ Project stack (reference)</div>
        <div>▸ API conventions (decision)</div>
      </div>
    ),
  },
  {
    icon: Users,
    label: "Engineering teams",
    title: "Decisions that survive the Slack scroll",
    description:
      '"We made that call six months ago — it\'s in a Slack thread somewhere." Context Vault preserves architectural decisions, incident notes, and onboarding context in a shared vault every team member and AI can query.',
    mockupBadge: "Team vault · 3 members",
    mockupContent: (
      <div className="font-mono text-xs text-muted-foreground space-y-1.5 w-full px-2">
        <div>vault/</div>
        <div className="pl-3">├── decisions/</div>
        <div className="pl-3">├── incidents/</div>
        <div className="pl-3">├── patterns/</div>
        <div className="pl-3">└── onboarding/</div>
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
        primaryCta={{
          label: hero.primaryCta.label,
          href: appHref(hero.primaryCta.href),
        }}
        secondaryCta={{
          label: hero.secondaryCta.label,
          href: hero.secondaryCta.href,
        }}
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

      <CodeDemoSection
        tabs={codeTabs}
        outputLabel="[ .MD ]"
        output={codeOutput}
        skillHeading="Add the Context Vault Skill"
        skillDescription="One command installs the MCP server and registers it with your AI client."
        skillCommand="npx -y context-vault-cli@latest init"
        skillCapabilities={[
          "Saves context across sessions automatically",
          "Hybrid semantic + full-text search",
          "Works with Claude Code, Cursor, Windsurf",
          "Plain markdown files — your data, your format",
        ]}
      />

      <UseCaseDetailed
        sectionTagIcon={BookOpen}
        sectionTag="Use Cases"
        heading="Built for how developers actually work"
        accentWord="actually work"
        subtitle="Solo devs, browser-first users, and engineering teams — one vault adapts to every workflow."
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
        stars="1.2K"
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

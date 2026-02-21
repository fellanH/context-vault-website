import { Link } from "react-router";
import { PageHead } from "../components/PageHead";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Code2,
  Database,
  FileText,
  Globe,
  HelpCircle,
  Layers,
  Shield,
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

// ─── Data ─────────────────────────────────────────────────────────────────────

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

const stats = [
  {
    value: "< 5 min",
    label: "Setup time",
    description: "Install once, connect your AI client through MCP, done.",
  },
  {
    value: "100%",
    label: "Local by default",
    description: "Your data stays in plain markdown files on your own machine.",
  },
  {
    value: "3+",
    label: "AI clients supported",
    description:
      "Claude Code, Cursor, Windsurf, and any MCP-compatible client.",
  },
];

const features = [
  {
    icon: Database,
    title: "Persistent memory",
    description:
      "Save context across sessions in plain markdown. Your vault grows with every conversation.",
  },
  {
    icon: Zap,
    title: "Hybrid search",
    description:
      "Semantic + full-text search finds the right entry even when you can't recall the exact words.",
  },
  {
    icon: Shield,
    title: "Local-first",
    description:
      "All data lives in files on your machine. No cloud, no accounts, no data leaving your device.",
  },
  {
    icon: Globe,
    title: "MCP native",
    description:
      "Works with any MCP-compatible AI client out of the box. Claude Code, Cursor, Windsurf, and more.",
  },
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
    label: "Claude Code",
    title: "Persistent memory for every session",
    description:
      "Save architecture decisions, debug findings, and project conventions. Claude Code retrieves them automatically at the start of every session.",
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
    icon: Code2,
    label: "Cursor / Windsurf",
    title: "One vault, any IDE",
    description:
      "The same MCP endpoint works across Cursor, Windsurf, Zed, and more. Context saved in one client is immediately available in all others.",
    mockupBadge: "MCP · Connected",
    mockupContent: (
      <div className="font-mono text-xs text-muted-foreground space-y-1.5 w-full px-2">
        <div className="text-green-500">● MCP server connected</div>
        <div className="text-muted-foreground/60">
          context-vault@localhost:3000
        </div>
        <div className="mt-2">Tools: save_context, get_context,</div>
        <div>list_context, delete_context</div>
      </div>
    ),
  },
  {
    icon: Users,
    label: "Dev teams",
    title: "Shared knowledge layer",
    description:
      "Team conventions, past incident notes, and architecture gotchas — stored once in a shared vault, retrieved automatically by every agent on the team.",
    mockupBadge: "Team vault · 3 members",
    mockupContent: (
      <div className="font-mono text-xs text-muted-foreground space-y-1.5 w-full px-2">
        <div>vault/</div>
        <div className="pl-3">├── decisions/</div>
        <div className="pl-3">├── incidents/</div>
        <div className="pl-3">├── patterns/</div>
        <div className="pl-3">└── references/</div>
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

const faqCategories = [
  {
    category: "General",
    items: [
      {
        question: "What is Context Vault?",
        answer:
          "Context Vault is a local-first MCP memory server. It lets AI coding agents — Claude Code, Cursor, Windsurf, and others — save and retrieve context across sessions using hybrid semantic + full-text search.",
      },
      {
        question: "Which AI clients are supported?",
        answer:
          "Any MCP-compatible client works: Claude Code, Cursor, Windsurf, Zed, and more. For tools like ChatGPT, connect via GPT Actions using the hosted API.",
      },
      {
        question: "Can I stay fully local?",
        answer:
          "Yes. Context Vault runs entirely on your machine by default. Your data stays in a local folder as markdown files, and the SQLite index never leaves your disk. No account or network connection required.",
      },
    ],
  },
  {
    category: "Storage & Privacy",
    items: [
      {
        question: "Where is my data stored?",
        answer:
          "All data is stored locally in plain markdown files on your machine. Nothing is sent to the cloud. The vault directory is configurable.",
      },
      {
        question: "Can I move to hosted later?",
        answer:
          "Yes. Start local and switch to hosted when you need team access or cross-device retrieval. Your entries are portable markdown files, so migration is straightforward with no format conversion.",
      },
    ],
  },
  {
    category: "Billing",
    items: [
      {
        question: "Is Context Vault free?",
        answer:
          "The open-source server is free forever. A hosted tier with team sharing and priority support is available on a subscription basis.",
      },
      {
        question: "Do you charge per request?",
        answer:
          "No. The local server has no usage limits. The hosted tier is priced per seat, not per query.",
      },
    ],
  },
];

// ─── Page ──────────────────────────────────────────────────────────────────────

export function LandingPage() {
  const featured = posts.slice(0, 3);

  return (
    <main>
      <PageHead
        title="Persistent Memory for AI Agents"
        description="Context Vault gives Claude, Cursor, and MCP-compatible AI tools persistent memory across sessions. Local-first, open-core, setup in under 5 minutes."
        canonical="/"
      />

      <AnnouncementBar
        message="Context Vault is open-source — star the repo, contribute, or self-host."
        linkText="View on GitHub"
        linkHref="https://github.com/fellanH/context-vault"
        variant="neutral"
      />

      <HeroSection
        badge="Local-first MCP memory server"
        badgeHref={appHref("/register")}
        heading="Persistent memory for AI agents."
        accentWord="memory"
        subtitle="Context Vault lets Claude Code, Cursor, and MCP-compatible workflows save and retrieve durable context across every session."
        tabs={["Persist", "Search", "Retrieve"]}
        inputPlaceholder="search your vault..."
        leftPanelBadge="[ .vault ]"
        rightPanelBadge="[ .MD ]"
        rightPanelLines={[
          "# Auth pattern",
          "",
          "kind: insight  ·  tags: auth, jwt",
          "created: 2026-02-20",
          "",
          "# SQLite for local storage",
          "",
          "kind: decision  ·  tags: architecture",
          "created: 2026-02-19",
          "",
          "# Tailwind v4 migration notes",
          "",
          "kind: reference  ·  tags: tailwind",
          "created: 2026-02-18",
        ]}
        dotGrid
      />

      <LogoCloud headline="Works with your AI tools" logos={logos} />

      <StatStrip stats={stats} />

      <FeatureCardGrid
        sectionTagIcon={Layers}
        sectionTag="Core capabilities"
        heading="Everything your AI agent needs"
        accentWord="AI agent"
        subtitle="All the building blocks for a persistent, searchable knowledge layer."
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
          "Saves context across sessions",
          "Hybrid semantic + full-text search",
          "Works with Claude Code, Cursor, Windsurf",
          "Local-first — data stays on your machine",
        ]}
      />

      <UseCaseDetailed
        sectionTagIcon={BookOpen}
        sectionTag="Use Cases"
        heading="Built for every AI workflow"
        accentWord="AI workflow"
        subtitle="From solo developers to engineering teams — one vault, any client."
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
        subtitle="Everything you need to know about Context Vault."
        categories={faqCategories}
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
                <span className="font-mono text-xs">\\</span>
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
              Ship persistent memory for your AI stack
            </h2>
            <p className="mt-3 text-muted-foreground max-w-md mx-auto">
              Start free, connect in minutes, and turn stateless sessions into
              cumulative knowledge.
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
            <div className="mt-6 flex items-center justify-center gap-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="size-3.5" />
                Local-first
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="size-3.5" />
                Open-core
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="size-3.5" />
                MCP-native
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

import React from "react";
import { Helmet } from "react-helmet-async";
import {
  Code2,
  Terminal,
  Users,
  Database,
  FileText,
  Zap,
  Shield,
  Clock,
  Globe,
  MessageCircle,
  HelpCircle,
  CreditCard,
  Layers,
  Cpu,
  BookOpen,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  AnnouncementBar,
  SectionMarker,
  FeatureCardGrid,
  SplitFeatureSection,
  FAQSection,
  LogoCloud,
  StatStrip,
  TestimonialStrip,
  ComparisonSection,
  UseCaseGrid,
  HeroSection,
  CodeDemoSection,
  SkillInstallSection,
  IntegrationsSplit,
  PerformanceSection,
  UseCaseDetailed,
} from "../components/sections";

// ─── Sample data ────────────────────────────────────────────────────────────

const sampleLogos = [
  { name: "Claude Code", logo: "anthropic" },
  { name: "Cursor", logo: "cursor" },
  { name: "Windsurf", logo: undefined },
  { name: "Zed", logo: "zed" },
  { name: "ChatGPT", logo: "openai" },
  { name: "n8n", logo: "n8n" },
  { name: "Raycast", logo: "raycast" },
  { name: "VS Code", logo: "visualstudiocode" },
];

const sampleStats = [
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

const sampleTestimonials = [
  {
    quote:
      "Context Vault changed how I work with Claude Code. I no longer re-explain architecture decisions at the start of every session.",
    name: "Alex R.",
    role: "Staff Engineer",
    handle: "@alexr on X",
  },
  {
    quote:
      "The hybrid search actually works. It finds relevant context even when I can't remember the exact words I used to save it.",
    name: "Priya M.",
    role: "AI Product Engineer",
    handle: "@priya_builds on X",
  },
  {
    quote:
      "Setup took 4 minutes. I pointed Cursor at the MCP endpoint and it just worked. Exactly what I wanted.",
    name: "Chris T.",
    role: "Indie developer",
    handle: "@chris_t on X",
  },
];

const sampleFeatures = [
  { label: "Local-first storage", contextVault: true, alternative: false },
  {
    label: "Hybrid search (semantic + FTS)",
    contextVault: true,
    alternative: false,
  },
  { label: "MCP native", contextVault: true, alternative: false },
  { label: "Plain markdown files", contextVault: true, alternative: false },
  { label: "Setup time", contextVault: "5 min", alternative: "Days" },
  { label: "Open-core", contextVault: true, alternative: false },
];

const sampleUseCases = [
  {
    icon: Terminal,
    label: "Claude Code users",
    title: "Stop re-explaining yourself",
    description:
      "Persist project decisions, architecture notes, and recurring patterns across every session. Your agent picks up exactly where you left off.",
  },
  {
    icon: Code2,
    label: "Cursor / Windsurf",
    title: "Shared context across IDE sessions",
    description:
      "Share context across your IDE sessions without re-pasting the same background every chat. One vault, every client.",
  },
  {
    icon: Users,
    label: "Dev teams",
    title: "A knowledge layer for your whole team",
    description:
      "Conventions, past decisions, architecture gotchas — stored once, retrieved by every agent on the team automatically.",
  },
];

const sampleFeatureCards = [
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

const sampleSplitBlocks = [
  {
    icon: Database,
    label: "Local storage",
    title: "Plain markdown files.",
    description:
      "Your context is stored in readable .md files — no proprietary formats, no lock-in. Git-friendly by default.",
  },
  {
    icon: Zap,
    label: "Sub-second retrieval",
    title: "Blazingly fast.",
    description:
      "Hybrid search returns results in milliseconds, fast enough for real-time agent workflows.",
  },
  {
    icon: Shield,
    label: "Zero configuration",
    title: "Five-minute setup.",
    description:
      "Install the server, point your AI client at the MCP endpoint, and start saving context. No config files.",
  },
  {
    icon: Clock,
    label: "Always available",
    title: "Works offline.",
    description:
      "No internet required. The vault server runs locally and is always available — even on a plane.",
  },
];

const sampleFAQCategories = [
  {
    category: "General",
    items: [
      {
        question: "What is Context Vault?",
        answer:
          "Context Vault is a local-first MCP memory server. It lets AI coding agents — Claude Code, Cursor, Windsurf, and others — save and retrieve context across sessions using hybrid semantic + full-text search.",
      },
      {
        question: "Is it open-source?",
        answer:
          "Yes, the core server is open-source on GitHub. You can self-host, contribute, or build on top of it. A hosted version with additional features is also available.",
      },
      {
        question: "Which AI clients are supported?",
        answer:
          "Any MCP-compatible client works: Claude Code, Cursor, Windsurf, Zed, and more. If your client supports the Model Context Protocol, Context Vault will work with it.",
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
        question: "Can I version-control my vault?",
        answer:
          "Yes. Because entries are plain .md files, you can put the vault directory under git and get full version history, diffing, and collaboration for free.",
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

// ─── New section data ────────────────────────────────────────────────────────

const heroTabs = ["Persist", "Search", "Retrieve"];

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
npx context-vault

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

const integrationLogos = [
  { name: "Claude Code", logo: "anthropic" },
  { name: "Cursor", logo: "cursor" },
  { name: "Windsurf", logo: undefined },
  { name: "Zed", logo: "zed" },
  { name: "VS Code", logo: "visualstudiocode" },
  { name: "Raycast", logo: "raycast" },
];

const sampleCommits = [
  { title: "feat: hybrid search with FTS5", number: "#142", date: "2d ago" },
  {
    title: "fix: vault path resolution on Windows",
    number: "#139",
    date: "4d ago",
  },
  { title: "chore: add SQLite WAL mode", number: "#136", date: "1w ago" },
];

const performanceCompetitors = [
  { name: "Context Vault", fillPercent: 98 },
  { name: "BYOM (manual)", fillPercent: 62 },
  { name: "Cloud notes", fillPercent: 45 },
  { name: "Paste-in context", fillPercent: 28 },
];

const performanceBenchmarks = [
  { url: "Exact match", crawlMs: "4 ms", scrapeMs: "2 ms" },
  { url: "Semantic query", crawlMs: "18 ms", scrapeMs: "11 ms" },
  { url: "Full-text search", crawlMs: "6 ms", scrapeMs: "3 ms" },
  { url: "Tag filter", crawlMs: "3 ms", scrapeMs: "1 ms" },
];

const performanceAscii = `  ·:·
 ·:::·
·:::::·
 ·:::·
  ·:·`;

const detailedUseCases = [
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
  {
    icon: BookOpen,
    label: "Knowledge base",
    title: "Searchable by meaning, not just keywords",
    description:
      "Hybrid search combines vector embeddings with full-text search. Find entries even when you can't recall the exact words you used to save them.",
    mockupBadge: "Search · 12 entries",
    mockupContent: (
      <div className="font-mono text-xs text-muted-foreground space-y-1.5 w-full px-2">
        <div>
          <span className="text-muted-foreground/60">query:</span>{" "}
          <span className="text-primary">"database choice"</span>
        </div>
        <div className="text-muted-foreground/60 text-[10px]">
          ↳ semantic match
        </div>
        <div>• Use SQLite for local storage</div>
        <div>• Postgres vs SQLite trade-offs</div>
      </div>
    ),
  },
];

// ─── SectionEntry wrapper ────────────────────────────────────────────────────

function SectionEntry({
  id,
  name,
  usage,
  description,
  children,
}: {
  id: string;
  name: string;
  usage: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div id={id}>
      <div className="mx-auto w-full max-w-none px-6 py-3 flex items-center gap-3 border-b border-border bg-muted/10">
        <code className="rounded bg-muted px-2 py-0.5 text-xs font-mono text-primary">
          {name}
        </code>
        {description && (
          <span className="text-xs text-muted-foreground">{description}</span>
        )}
        <code className="ml-auto rounded bg-muted px-2 py-0.5 text-xs font-mono text-muted-foreground hidden md:block">
          {usage}
        </code>
      </div>
      {children}
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

const allSections: Array<[string, string]> = [
  ["hero", "HeroSection"],
  ["announcement-bar", "AnnouncementBar"],
  ["section-marker", "SectionMarker"],
  ["feature-card-grid", "FeatureCardGrid"],
  ["split-feature", "SplitFeatureSection"],
  ["faq", "FAQSection"],
  ["logo-cloud", "LogoCloud"],
  ["stat-strip", "StatStrip"],
  ["testimonials", "TestimonialStrip"],
  ["comparison", "ComparisonSection"],
  ["use-cases", "UseCaseGrid"],
  ["code-demo", "CodeDemoSection"],
  ["skill-install", "SkillInstallSection"],
  ["integrations-split", "IntegrationsSplit"],
  ["performance", "PerformanceSection"],
  ["use-case-detailed", "UseCaseDetailed"],
];

export function SectionsPage() {
  return (
    <main>
      <Helmet>
        <title>Section Library | Context Vault</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <section className="border-b border-border bg-muted/30 py-10">
        <div className="mx-auto w-full max-w-6xl px-6">
          <Badge variant="outline" className="mb-3">
            Internal
          </Badge>
          <h1 className="text-3xl font-semibold tracking-tight">
            Section Library
          </h1>
          <p className="mt-2 text-muted-foreground">
            Reusable section components. Drop into any page.
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            {allSections.map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}

      <SectionEntry
        id="hero"
        name="HeroSection"
        usage={`<HeroSection heading="..." accentWord="..." tabs={[...]} />`}
        description="Full-bleed dot-grid hero with URL input, tab strip, and dual mockup panel"
      >
        <HeroSection
          badge="Local-first MCP memory server"
          badgeHref="#"
          heading="Your AI agents remember everything"
          accentWord="remember"
          subtitle="Context Vault is a local MCP server that gives your AI coding agents persistent, searchable memory across every session."
          tabs={heroTabs}
          inputPlaceholder="search your vault..."
          leftPanelBadge="[ data-flow ]"
          rightPanelBadge="[ .MD ]"
          dotGrid
        />
      </SectionEntry>

      {/* ── Existing sections ─────────────────────────────────────────────── */}

      <SectionEntry
        id="announcement-bar"
        name="AnnouncementBar"
        usage={`<AnnouncementBar message="..." linkText="..." linkHref="..." />`}
        description="Dismissible top banner — brand or neutral variant"
      >
        <AnnouncementBar
          message="Context Vault 2.0 is here — team sharing, priority support, and more."
          linkText="Read more"
          linkHref="#"
          variant="brand"
        />
        <AnnouncementBar
          message="Maintenance window on Sunday 02:00–04:00 UTC."
          variant="neutral"
        />
      </SectionEntry>

      <SectionEntry
        id="section-marker"
        name="SectionMarker"
        usage={`<SectionMarker index={1} total={7} label="MAIN FEATURES" />`}
        description="Numbered section divider — [01/07] · LABEL with primary left border"
      >
        <SectionMarker index={1} total={7} label="Main Features" />
        <SectionMarker index={3} total={7} label="Core Principles" />
      </SectionEntry>

      <SectionEntry
        id="feature-card-grid"
        name="FeatureCardGrid"
        usage={`<FeatureCardGrid heading="..." features={[{ icon, title, description }]} />`}
        description="Section tag + centered heading + N-column bordered feature cards"
      >
        <FeatureCardGrid
          sectionTagIcon={Layers}
          sectionTag="Developer First"
          heading="Everything your AI agent needs"
          accentWord="AI agent"
          subtitle="All the building blocks for a persistent, searchable knowledge layer."
          features={sampleFeatureCards}
          columns={4}
        />
      </SectionEntry>

      <SectionEntry
        id="split-feature"
        name="SplitFeatureSection"
        usage={`<SplitFeatureSection heading="..." blocks={[{ icon, label, title, description }]} />`}
        description="Section tag + centered heading + 2-col feature blocks with visual placeholder"
      >
        <SplitFeatureSection
          sectionTagIcon={Shield}
          sectionTag="Zero configuration"
          heading="We handle the hard stuff"
          accentWord="hard stuff"
          subtitle="Proxy rotation, search indexing, offline mode — all handled for you."
          blocks={sampleSplitBlocks}
        />
      </SectionEntry>

      <SectionEntry
        id="faq"
        name="FAQSection"
        usage={`<FAQSection categories={[{ category, items: [{ question, answer }] }]} />`}
        description="Section heading + 2-col category/accordion layout"
      >
        <FAQSection
          sectionTagIcon={HelpCircle}
          sectionTag="FAQ"
          heading="Frequently asked questions"
          accentWord="questions"
          subtitle="Everything you need to know about Context Vault."
          categories={sampleFAQCategories}
        />
      </SectionEntry>

      <SectionEntry
        id="logo-cloud"
        name="LogoCloud"
        usage={`<LogoCloud logos={[{ name, logo }]} />`}
        description="Infinite-scroll logo strip — Simple Icons slug or image URL"
      >
        <LogoCloud
          headline="Used across AI tools worldwide"
          logos={sampleLogos}
        />
      </SectionEntry>

      <SectionEntry
        id="stat-strip"
        name="StatStrip"
        usage={`<StatStrip stats={[{ value, label, description }]} />`}
        description="Full-bleed bordered stat cells"
      >
        <StatStrip stats={sampleStats} />
      </SectionEntry>

      <SectionEntry
        id="testimonials"
        name="TestimonialStrip"
        usage={`<TestimonialStrip testimonials={[...]} />`}
        description="Bordered tweet-card grid — name row + quote row"
      >
        <TestimonialStrip
          headline="Developers love Context Vault"
          subtitle="Discover why engineers choose Context Vault every day."
          testimonials={sampleTestimonials}
        />
      </SectionEntry>

      <SectionEntry
        id="comparison"
        name="ComparisonSection"
        usage={`<ComparisonSection features={[...]} />`}
        description="2-panel header + 3-column feature table"
      >
        <ComparisonSection
          features={sampleFeatures}
          subtitle="Native MCP support, plain files, zero cloud dependency."
        />
      </SectionEntry>

      <SectionEntry
        id="use-cases"
        name="UseCaseGrid"
        usage={`<UseCaseGrid useCases={[...]} accentWord="..." />`}
        description="Centered heading + stacked full-width split cards"
      >
        <UseCaseGrid
          heading="Built for every AI workflow"
          accentWord="AI"
          subtitle="From solo developers to engineering teams — one vault, any client."
          useCases={sampleUseCases}
        />
      </SectionEntry>

      {/* ── New sections ──────────────────────────────────────────────────── */}

      <SectionEntry
        id="code-demo"
        name="CodeDemoSection"
        usage={`<CodeDemoSection tabs={[{ label, code }]} output="..." />`}
        description="Tabbed SDK code example with output panel and optional skill install block"
      >
        <CodeDemoSection
          tabs={codeTabs}
          outputLabel="[ .MD ]"
          output={codeOutput}
          skillHeading="Add the Context Vault Skill"
          skillDescription="Install the MCP server and connect any AI client in under 5 minutes."
          skillCommand="npx context-vault"
          skillCapabilities={[
            "Saves context across sessions",
            "Hybrid semantic + full-text search",
            "Works with Claude Code, Cursor, Windsurf",
          ]}
        />
      </SectionEntry>

      <SectionEntry
        id="skill-install"
        name="SkillInstallSection"
        usage={`<SkillInstallSection heading="..." command="..." capabilities={[...]} />`}
        description="2-col install block — heading + description left, terminal mockup right"
      >
        <SkillInstallSection
          heading="Add the Context Vault Skill"
          description="One command installs the MCP server and registers it with your AI client. Works with Claude Code, Cursor, and Windsurf out of the box."
          command="npx context-vault"
          capabilities={[
            "Saves context across sessions",
            "Hybrid semantic + full-text search",
            "Local-first — data stays on your machine",
            "Zero configuration required",
          ]}
          compatibleWith={["Claude Code", "Cursor", "Windsurf", "Zed"]}
        />
      </SectionEntry>

      <SectionEntry
        id="integrations-split"
        name="IntegrationsSplit"
        usage={`<IntegrationsSplit integrations={[...]} repoName="..." stars="..." commits={[...]} />`}
        description="2-col: integrations logo grid left, GitHub repo card right"
      >
        <IntegrationsSplit
          integrationsHeading="Works with your tools"
          integrationsDescription="Connect Context Vault to any MCP-compatible AI client. Claude Code, Cursor, Windsurf, Zed, and more."
          integrationsCTA="Browse integrations"
          integrations={integrationLogos}
          openSourceHeading="Open source at its core"
          openSourceDescription="The Context Vault server is open-source. Self-host it, contribute to it, or build on top of it."
          repoName="fellanH/context-vault"
          stars="1.2K"
          commits={sampleCommits}
          repoCTA="View on GitHub"
        />
      </SectionEntry>

      <SectionEntry
        id="performance"
        name="PerformanceSection"
        usage={`<PerformanceSection heading="..." competitors={[...]} benchmarkRows={[...]} />`}
        description="Section header + 2-col: animated progress bars left, benchmark table right"
      >
        <PerformanceSection
          sectionTagIcon={Cpu}
          sectionTag="Core Principles"
          heading="Proven performance"
          accentWord="performance"
          subtitle="Built on SQLite with hybrid search. Retrieval in milliseconds, reliability at 99%."
          competitors={performanceCompetitors}
          benchmarkRows={performanceBenchmarks}
          asciiArt={performanceAscii}
        />
      </SectionEntry>

      <SectionEntry
        id="use-case-detailed"
        name="UseCaseDetailed"
        usage={`<UseCaseDetailed heading="..." useCases={[{ icon, label, title, description, mockupContent }]} />`}
        description="Stacked use-case cards with mockup panel — 2fr/3fr grid per card"
      >
        <UseCaseDetailed
          sectionTagIcon={BookOpen}
          sectionTag="Use Cases"
          heading="Transform your AI workflow"
          accentWord="AI workflow"
          subtitle="Context Vault adapts to how you work — not the other way around."
          ctaLabel="Get started free"
          ctaHref="/get-started"
          useCases={detailedUseCases}
        />
      </SectionEntry>
    </main>
  );
}

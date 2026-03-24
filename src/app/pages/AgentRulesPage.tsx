import { useState } from 'react';
import { Check, Copy, ArrowRight, History, Pencil, Trash2 } from 'lucide-react';
import { Link } from 'react-router';
import { PageHead } from '../components/PageHead';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

// The agent rules file content (from mcp/assets/agent-rules.md)
const RULES_CONTENT = `<!-- context-vault-rules v1.0 -->
# Context Vault — Agent Rules

You have access to a persistent knowledge vault via MCP tools (\`get_context\`, \`save_context\`, \`list_context\`, \`delete_context\`). Use it to build lasting memory across sessions.

## When to Retrieve

Check the vault when you're about to invest effort that past knowledge could shortcut. Apply this test: "Might I or a previous session have encountered this before?" If yes, search first.

Retrieval triggers:
- **Starting a session**: call \`session_start()\` or \`get_context(query: "<project or task context>")\` to load relevant prior knowledge
- **Hitting an error**: search for the error message or root cause before debugging from scratch
- **Making a decision**: check if this architectural or design choice was already made and why
- **Integrating with an API, library, or service**: search for known quirks, gotchas, or working patterns
- **Entering an unfamiliar area of the codebase**: check for prior insights about that module or domain
- **Before saving**: search to avoid duplicates and to update existing entries instead

A vault search takes milliseconds. Debugging from scratch takes minutes. Always check first.

## When to Save

Save when you encounter something a future session would benefit from knowing. Apply this test: "Would I tell a colleague about this to save them time?" If yes, save it.

Save triggers:
- Solved a non-obvious bug (root cause was not apparent from the error)
- Discovered undocumented API/library/tool behavior
- Found a working integration pattern requiring non-obvious configuration
- Hit a framework limitation and found a workaround
- Made an architectural decision with tradeoffs worth preserving

## When NOT to Save

- Facts derivable from reading the current code or git history
- The fix itself (that belongs in the commit, not the vault)
- Generic programming knowledge you already know
- Session-specific state (files edited, commands run)

## How to Save

Every entry must have:
- \`title\`: clear, specific (not "auth fix" but "Express 5 raw body parser breaks Stripe webhook verification")
- \`tags\`: at minimum a \`bucket:<project>\` tag for scoping
- \`kind\`: insight, pattern, reference, decision, or event
- \`tier\`: \`working\` for active context, \`durable\` for long-term reference

Capture what was learned (the insight), why it matters (what problem it prevents), and when it applies (what context makes it relevant).

## Session Review

At the end of significant work sessions, review what you learned. If the session produced novel knowledge (not every session does), save 1-3 consolidated entries. Prefer one solid entry over multiple fragments.`;

const STANDALONE_PROMPT = `You have access to a persistent knowledge vault via MCP tools (\`get_context\`, \`save_context\`, \`list_context\`, \`delete_context\`). Use it to build lasting memory across sessions. Follow these guidelines to use the vault effectively.

## When to Retrieve

Check the vault when you're about to invest effort that past knowledge could shortcut. Apply this test: "Might I or a previous session have encountered this before?" If yes, search first.

Retrieval triggers:
- Starting a session: call session_start() or get_context(query: "<project or task context>") to load relevant prior knowledge
- Hitting an error: search for the error message or root cause before debugging from scratch
- Making a decision: check if this architectural or design choice was already made and why
- Integrating with an API, library, or service: search for known quirks, gotchas, or working patterns
- Entering an unfamiliar area of the codebase: check for prior insights about that module or domain
- Before saving: search to avoid duplicates and to update existing entries instead

A vault search takes milliseconds. Debugging from scratch takes minutes. Always check first.

## When to Save

Save when you encounter something a future session would benefit from knowing. Apply this test: "Would I tell a colleague about this to save them time?" If yes, save it.

Save triggers:
- Solved a non-obvious bug (root cause was not apparent from the error)
- Discovered undocumented API/library/tool behavior
- Found a working integration pattern requiring non-obvious configuration
- Hit a framework limitation and found a workaround
- Made an architectural decision with tradeoffs worth preserving

## When NOT to Save

- Facts derivable from reading the current code or git history
- The fix itself (that belongs in the commit, not the vault)
- Generic programming knowledge the model already knows
- Session-specific state (files edited, commands run)

## How to Save

Every entry must have:
- title: clear, specific (not "auth fix" but "Express 5 raw body parser breaks Stripe webhook verification")
- tags: at minimum a bucket:<project> tag for scoping
- kind: insight, pattern, reference, decision, or event
- tier: working for active context, durable for long-term reference

Capture what was learned (the insight), why it matters (what problem it prevents), and when it applies (what context makes it relevant).

## Session Review

At the end of significant work sessions, review what you learned. If the session produced novel knowledge (not every session does), save 1-3 consolidated entries. Prefer one solid entry over multiple fragments.`;

const ruleSections = [
  {
    title: 'When to Retrieve',
    description:
      'Triggers that tell the agent to search the vault before doing work. Covers session start, error debugging, architectural decisions, API integrations, and unfamiliar code. The key heuristic: "Might I or a previous session have encountered this before?"',
  },
  {
    title: 'When to Save',
    description:
      'Triggers that tell the agent to preserve new knowledge. Covers non-obvious bugs, undocumented behavior, integration patterns, workarounds, and architectural decisions. The key heuristic: "Would I tell a colleague about this to save them time?"',
  },
  {
    title: 'When NOT to Save',
    description:
      'Guardrails to prevent noise. Excludes facts derivable from code or git history, generic knowledge, the fix itself (belongs in the commit), and session-specific state. Keeps the vault signal-dense.',
  },
  {
    title: 'How to Save',
    description:
      'Required fields for every entry: title (specific), tags (bucket scoped), kind (insight/pattern/reference/decision/event), and tier (working vs durable). Enforces findability by making entries structured from the start.',
  },
  {
    title: 'Session Review',
    description:
      'End-of-session habit to consolidate learnings into 1-3 solid entries. Prevents fragmentation. Not every session produces novel knowledge, and that is fine.',
  },
];

const clients = [
  {
    name: 'Claude Code',
    id: 'claude-code',
    description: 'Installed as a rules file at ~/.claude/rules/context-vault.md',
    installPath: '~/.claude/rules/context-vault.md',
    manualSteps: [
      'Create the directory if it does not exist: mkdir -p ~/.claude/rules',
      'Save the rules file: copy the content above to ~/.claude/rules/context-vault.md',
      'Claude Code automatically loads all .md files from ~/.claude/rules/ on startup.',
    ],
    autoInstall: 'npx context-vault setup',
  },
  {
    name: 'Cursor',
    id: 'cursor',
    description: 'Installed as a rules file at ~/.cursor/rules/context-vault.mdc',
    installPath: '~/.cursor/rules/context-vault.mdc',
    manualSteps: [
      'Create the directory if it does not exist: mkdir -p ~/.cursor/rules',
      'Save the rules file: copy the content above to ~/.cursor/rules/context-vault.mdc',
      'Cursor automatically loads .mdc files from ~/.cursor/rules/ globally.',
    ],
    autoInstall: 'npx context-vault setup',
  },
  {
    name: 'Windsurf',
    id: 'windsurf',
    description: 'Appended to ~/.windsurfrules with delimiters',
    installPath: '~/.windsurfrules',
    manualSteps: [
      'Open ~/.windsurfrules in a text editor (create the file if it does not exist).',
      'Append the rules content wrapped in delimiter comments: <!-- context-vault agent rules --> ... <!-- /context-vault agent rules -->',
      'Windsurf loads ~/.windsurfrules on every session. The delimiters allow future upgrades without touching your other rules.',
    ],
    autoInstall: 'npx context-vault setup',
  },
  {
    name: 'Other MCP clients',
    id: 'other',
    description: 'Paste directly into system prompt or agent instructions',
    installPath: 'System prompt / agent instructions',
    manualSteps: [
      'Copy the rules content above.',
      "Paste it into your client's system prompt, agent instructions, or rules configuration.",
      'The rules work with any MCP-compatible client.',
    ],
    autoInstall: null,
  },
];

const versionHistory = [
  {
    version: 'v1.0',
    date: '2025-01',
    changes: 'Initial release. Five sections: When to Retrieve, When to Save, When NOT to Save, How to Save, Session Review.',
  },
];

function CopyButton({ text, label }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <Button variant="outline" size="sm" onClick={handleCopy} className="gap-1.5">
      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      {label ?? (copied ? 'Copied!' : 'Copy')}
    </Button>
  );
}

export function AgentRulesPage() {
  return (
    <main>
      <PageHead
        title="Agent Rules — Context Vault Docs"
        description="The full agent rules file installed by context-vault setup. Copy-paste buttons for Claude Code, Cursor, Windsurf, and manual install instructions."
        canonical="/docs/agent-rules"
      />

      <div className="mx-auto w-full max-w-3xl px-6 py-16 sm:py-20 space-y-12">

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Link to="/docs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Docs
            </Link>
            <span className="text-muted-foreground/50">/</span>
            <span className="text-sm">Agent Rules</span>
          </div>
          <Badge variant="outline">Agent Rules</Badge>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Agent Rules File
          </h1>
          <p className="text-muted-foreground">
            This is the exact file that <code className="text-foreground text-sm bg-muted px-1.5 py-0.5 rounded">context-vault setup</code> installs on
            your system. You can review it here before running setup, or install it manually.
          </p>
        </div>

        <div className="rounded-md border border-primary/20 bg-primary/5 px-5 py-4 text-sm space-y-1">
          <p className="font-medium text-foreground">Transparency first</p>
          <p className="text-muted-foreground">
            This is the only file context-vault installs outside of the MCP config. It is additive
            (never overwrites your existing rules), versioned, and you can edit or delete it at any
            time. Run{' '}
            <code className="text-foreground bg-muted px-1 rounded">
              context-vault uninstall
            </code>{' '}
            to remove everything setup created.
          </p>
        </div>

        {/* Full rules content */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Rules file content</h2>
            <CopyButton text={RULES_CONTENT} label="Copy all" />
          </div>
          <div className="rounded-lg border border-border bg-muted/20 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-muted/40">
              <span className="text-xs text-muted-foreground font-mono">agent-rules.md</span>
              <span className="text-xs text-muted-foreground">v1.0</span>
            </div>
            <pre className="p-5 text-xs leading-relaxed overflow-x-auto text-muted-foreground whitespace-pre-wrap font-mono">
              {RULES_CONTENT}
            </pre>
          </div>
        </section>

        {/* What each section does */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">What each section does</h2>
          <p className="text-sm text-muted-foreground">
            The rules file has five sections. Each one addresses a different failure mode in how AI
            agents use memory.
          </p>
          <div className="space-y-3">
            {ruleSections.map((section) => (
              <div key={section.title} className="rounded-lg border border-border px-4 py-3.5 space-y-1">
                <p className="text-sm font-medium">{section.title}</p>
                <p className="text-sm text-muted-foreground">{section.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Auto-install */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Automatic install</h2>
          <p className="text-sm text-muted-foreground">
            The fastest way: run setup and it detects your AI client automatically.
          </p>
          <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/20 px-4 py-3">
            <code className="text-sm font-mono flex-1">npx context-vault setup</code>
            <CopyButton text="npx context-vault setup" />
          </div>
          <p className="text-xs text-muted-foreground">
            Prints every file path it creates or modifies. Use{' '}
            <code className="text-foreground bg-muted px-1 rounded">--dry-run</code> to preview
            without writing anything, or{' '}
            <code className="text-foreground bg-muted px-1 rounded">--no-rules</code> to install
            only the MCP config.
          </p>
        </section>

        {/* Per-client manual install */}
        <section className="space-y-4" id="claude-code">
          <h2 className="text-lg font-semibold">Manual install by client</h2>
          <div className="grid gap-3">
            {clients.map((client) => (
              <Card key={client.id} id={client.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <CardTitle className="text-base">{client.name}</CardTitle>
                      <CardDescription className="text-sm mt-0.5">
                        {client.description}
                      </CardDescription>
                    </div>
                    <CopyButton text={RULES_CONTENT} label={`Copy for ${client.name}`} />
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-muted-foreground">Install path:</span>
                    <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-foreground">
                      {client.installPath}
                    </code>
                  </div>
                  <ol className="space-y-1.5 text-sm text-muted-foreground">
                    {client.manualSteps.map((step, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="shrink-0 font-mono text-xs text-muted-foreground/50 mt-0.5">
                          {i + 1}.
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                  {client.autoInstall && (
                    <p className="text-xs text-muted-foreground/70">
                      Or run{' '}
                      <code className="text-foreground bg-muted px-1 rounded">
                        {client.autoInstall}
                      </code>{' '}
                      to install automatically.
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Managing rules */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Managing rules</h2>
          <div className="space-y-3">
            <div className="rounded-lg border border-border bg-muted/20 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-muted/40">
                <span className="text-xs text-muted-foreground">View installed rules</span>
                <CopyButton text="context-vault rules show" />
              </div>
              <pre className="px-4 py-3 text-sm font-mono text-muted-foreground">context-vault rules show</pre>
            </div>
            <div className="rounded-lg border border-border bg-muted/20 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-muted/40">
                <span className="text-xs text-muted-foreground">Check for updates (diff your installed vs bundled version)</span>
                <CopyButton text="context-vault rules diff" />
              </div>
              <pre className="px-4 py-3 text-sm font-mono text-muted-foreground">context-vault rules diff</pre>
            </div>
            <div className="rounded-lg border border-border bg-muted/20 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-muted/40">
                <span className="text-xs text-muted-foreground">Upgrade to latest (shows diff, asks for confirmation)</span>
                <CopyButton text="context-vault setup --upgrade" />
              </div>
              <pre className="px-4 py-3 text-sm font-mono text-muted-foreground">context-vault setup --upgrade</pre>
            </div>
            <div className="rounded-lg border border-border bg-muted/20 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-muted/40">
                <span className="text-xs text-muted-foreground">Show install paths for all clients</span>
                <CopyButton text="context-vault rules path" />
              </div>
              <pre className="px-4 py-3 text-sm font-mono text-muted-foreground">context-vault rules path</pre>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            The rules file is plain markdown. You can edit it directly at the path shown by{' '}
            <code className="text-foreground bg-muted px-1 rounded">context-vault rules path</code>.
            Running{' '}
            <code className="text-foreground bg-muted px-1 rounded">context-vault rules install</code>{' '}
            will overwrite customizations. Back up first, or use{' '}
            <code className="text-foreground bg-muted px-1 rounded">--no-rules</code> during setup to skip.
          </p>
        </section>

        {/* Version history */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <History className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-lg font-semibold">Version history</h2>
          </div>
          <div className="space-y-2">
            {versionHistory.map((entry) => (
              <div key={entry.version} className="rounded-lg border border-border px-4 py-3 flex gap-4 text-sm">
                <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded h-fit shrink-0">
                  {entry.version}
                </code>
                <div className="space-y-0.5 min-w-0">
                  <p className="text-muted-foreground/60 text-xs">{entry.date}</p>
                  <p className="text-muted-foreground">{entry.changes}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            Version is stored in the first line of the rules file as{' '}
            <code className="text-foreground bg-muted px-1 rounded">
              {'<!-- context-vault-rules v1.0 -->'}
            </code>
            . The upgrade command uses this to detect outdated installations.
          </p>
        </section>

        {/* Customization */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Pencil className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-lg font-semibold">Customization</h2>
          </div>
          <p className="text-sm text-muted-foreground">
            The rules file is plain markdown. You can edit it after installation to match your workflow:
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
            <li>Add project-specific save triggers (e.g., "always save when working with the payments module")</li>
            <li>Adjust retrieval triggers to match your domain</li>
            <li>Add custom "When NOT to Save" entries to reduce noise</li>
          </ul>
          <p className="text-sm text-muted-foreground">
            For Claude Code and Cursor, edit the file directly at the path shown by{' '}
            <code className="text-foreground bg-muted px-1 rounded text-xs">context-vault rules path</code>.
            For Windsurf, edit the section between the{' '}
            <code className="text-foreground bg-muted px-1 rounded text-xs">{'<!-- context-vault agent rules -->'}</code>{' '}
            delimiters in <code className="text-foreground bg-muted px-1 rounded text-xs">~/.windsurfrules</code>.
          </p>
          <div className="rounded-md border border-yellow-500/20 bg-yellow-500/5 px-5 py-4 text-sm space-y-1">
            <p className="font-medium text-foreground">Note</p>
            <p className="text-muted-foreground">
              Running <code className="text-foreground bg-muted px-1 rounded">context-vault rules install</code> or{' '}
              <code className="text-foreground bg-muted px-1 rounded">context-vault setup --upgrade</code> will
              overwrite your customizations. If you have changes you want to keep, back up the file before
              upgrading, or skip the rules step during setup with{' '}
              <code className="text-foreground bg-muted px-1 rounded">--no-rules</code>.
            </p>
          </div>
        </section>

        {/* Uninstalling */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Trash2 className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-lg font-semibold">Uninstalling</h2>
          </div>
          <p className="text-sm text-muted-foreground">
            Rules are removed when you uninstall context-vault:
          </p>
          <div className="rounded-lg border border-border bg-muted/20 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-muted/40">
              <span className="text-xs text-muted-foreground">Remove all context-vault files</span>
              <CopyButton text="context-vault uninstall" />
            </div>
            <pre className="px-4 py-3 text-sm font-mono text-muted-foreground">context-vault uninstall</pre>
          </div>
          <p className="text-xs text-muted-foreground">
            This removes the Claude Code and Cursor rules files entirely, and strips the delimited
            section from <code className="text-foreground bg-muted px-1 rounded">.windsurfrules</code>{' '}
            (preserving any other content in that file).
          </p>
        </section>

        {/* Agent-assisted setup prompt */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Agent-assisted setup</h2>
          <p className="text-sm text-muted-foreground">
            After installing the rules file, paste this prompt into your AI session for
            conflict detection, project-aware bucket setup, and rule merging:
          </p>
          <div className="rounded-lg border border-border bg-muted/20 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-muted/40">
              <span className="text-xs text-muted-foreground">Paste into your AI session</span>
              <CopyButton
                text={`/vault setup`}
                label="Copy prompt"
              />
            </div>
            <pre className="p-4 text-xs font-mono text-muted-foreground">
{`/vault setup`}
            </pre>
          </div>
          <p className="text-xs text-muted-foreground">
            This runs the agent-assisted setup flow: verifies the MCP connection, detects active
            projects, proposes vault bucket configuration, and resolves conflicts with existing
            rules.
          </p>
        </section>

        {/* Standalone prompt for non-CLI users */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Standalone prompt (no CLI required)</h2>
          <p className="text-sm text-muted-foreground">
            If you cannot run <code className="text-foreground bg-muted px-1 rounded text-xs">context-vault setup</code> or
            prefer not to install files, copy this self-contained prompt into your AI tool's system prompt or
            chat session. It includes the full agent rules and works with any MCP-compatible client.
          </p>
          <div className="rounded-lg border border-border bg-muted/20 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-muted/40">
              <span className="text-xs text-muted-foreground font-mono">standalone-prompt.md</span>
              <CopyButton text={STANDALONE_PROMPT} label="Copy prompt" />
            </div>
            <pre className="p-5 text-xs leading-relaxed overflow-x-auto text-muted-foreground whitespace-pre-wrap font-mono max-h-64 overflow-y-auto">
              {STANDALONE_PROMPT}
            </pre>
          </div>
        </section>

        <div className="flex items-center gap-3 pt-4 border-t border-border">
          <Button asChild variant="outline" size="sm">
            <Link to="/docs/setup">
              Full setup guide
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Link>
          </Button>
          <Button asChild variant="ghost" size="sm">
            <a
              href="https://github.com/fellanH/context-vault/tree/main/mcp/assets/agent-rules.md"
              target="_blank"
              rel="noreferrer"
            >
              View on GitHub
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </a>
          </Button>
        </div>

      </div>
    </main>
  );
}

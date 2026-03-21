import { useState } from 'react';
import { Check, Copy, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { PageHead } from '../components/PageHead';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <button
      onClick={handleCopy}
      className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded"
      aria-label="Copy to clipboard"
    >
      {copied ? <Check className="h-3.5 w-3.5 text-primary" /> : <Copy className="h-3.5 w-3.5" />}
    </button>
  );
}

function CodeBlock({ code, lang = '' }: { code: string; lang?: string }) {
  return (
    <div className="rounded-md border border-border bg-muted/20 overflow-hidden">
      <div className="flex items-center justify-between px-3 py-2 border-b border-border bg-muted/40">
        <span className="text-xs text-muted-foreground font-mono">{lang || 'shell'}</span>
        <CopyButton text={code} />
      </div>
      <pre className="p-4 text-sm font-mono overflow-x-auto text-muted-foreground">
        <code>{code}</code>
      </pre>
    </div>
  );
}

const setupSteps = [
  {
    id: 'install',
    step: '1',
    title: 'Run the setup command',
    description:
      'This installs the MCP server and connects it to your AI editor in one command. It auto-detects Claude Code, Cursor, and Windsurf.',
    content: (
      <CodeBlock code="npx context-vault setup" />
    ),
    details: (
      <div className="space-y-2 text-sm text-muted-foreground">
        <p>Setup will:</p>
        <ul className="space-y-1 list-disc list-inside">
          <li>Install the context-vault npm package globally</li>
          <li>Detect your AI client and write the MCP config to the correct location</li>
          <li>Install the agent rules file (optional, recommended)</li>
          <li>Print every file path it creates or modifies</li>
        </ul>
        <p className="text-xs">
          Use{' '}
          <code className="bg-muted text-foreground px-1 rounded">--dry-run</code> to preview
          without writing,{' '}
          <code className="bg-muted text-foreground px-1 rounded">--no-rules</code> to skip agent
          rules.
        </p>
      </div>
    ),
  },
  {
    id: 'restart',
    step: '2',
    title: 'Restart your AI editor',
    description:
      'MCP connections are established on editor startup. Restart Claude Code, Cursor, or Windsurf after setup completes.',
    content: null,
    details: (
      <div className="text-sm text-muted-foreground space-y-2">
        <p>
          After restart, your AI editor will connect to the context-vault MCP server automatically.
          You can verify the connection by asking your AI:
        </p>
        <CodeBlock code={`What MCP tools do you have available?`} lang="prompt" />
        <p>You should see <code className="bg-muted text-foreground px-1 rounded">get_context</code>, <code className="bg-muted text-foreground px-1 rounded">save_context</code>, and <code className="bg-muted text-foreground px-1 rounded">list_context</code> in the response.</p>
      </div>
    ),
  },
  {
    id: 'save',
    step: '3',
    title: 'Save your first entry',
    description:
      "Ask your AI to save something to the vault. It'll use the save_context MCP tool automatically.",
    content: (
      <CodeBlock
        code={`Save this decision to the vault: we're using SQLite for local storage because it requires no infra and the data stays on the machine. Tag it as architecture.`}
        lang="prompt"
      />
    ),
    details: (
      <div className="text-sm text-muted-foreground space-y-2">
        <p>Your AI will call <code className="bg-muted text-foreground px-1 rounded">save_context</code> with the title, body, tags, and kind. The entry is saved as a markdown file in your vault folder and indexed in a local SQLite database.</p>
      </div>
    ),
  },
  {
    id: 'retrieve',
    step: '4',
    title: 'Retrieve it in a new session',
    description:
      'Start a new AI session and ask about the thing you saved. It retrieves from the vault automatically.',
    content: (
      <CodeBlock code={`What database are we using and why?`} lang="prompt" />
    ),
    details: (
      <div className="text-sm text-muted-foreground">
        <p>
          The agent rules file (installed in step 1) teaches your AI to search the vault before
          answering questions about architecture, decisions, or past work. It will call{' '}
          <code className="bg-muted text-foreground px-1 rounded">get_context</code> and surface the
          entry you saved.
        </p>
      </div>
    ),
  },
];

const clientSetup: Record<
  string,
  { id: string; name: string; configPath: string; note?: string }
> = {
  'claude-code': {
    id: 'claude-code',
    name: 'Claude Code',
    configPath: '~/.claude/mcp.json',
    note: 'Agent rules are installed to ~/.claude/rules/context-vault.md',
  },
  cursor: {
    id: 'cursor',
    name: 'Cursor',
    configPath: '.cursor/mcp.json (project) or ~/.cursor/mcp.json (global)',
    note: 'Agent rules are appended to .cursorrules in your project root.',
  },
  windsurf: {
    id: 'windsurf',
    name: 'Windsurf',
    configPath: '~/.codeium/windsurf/mcp_config.json',
    note: 'Agent rules are appended to .windsurfrules in your project root.',
  },
};

export function DocsSetupPage() {
  return (
    <main>
      <PageHead
        title="Setup Guide — Context Vault Docs"
        description="Install context-vault in 2 minutes. CLI setup, per-tool config, and agent-assisted customization."
        canonical="/docs/setup"
      />

      <div className="mx-auto w-full max-w-3xl px-6 py-16 sm:py-20 space-y-12">

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Link to="/docs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Docs
            </Link>
            <span className="text-muted-foreground/50">/</span>
            <span className="text-sm">Setup</span>
          </div>
          <Badge variant="outline">Setup Guide</Badge>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Install in 2 minutes
          </h1>
          <p className="text-muted-foreground">
            One command installs the MCP server and connects it to your AI editor. No config files
            to write, no API keys needed.
          </p>
        </div>

        {/* Step-by-step */}
        <section className="space-y-6">
          {setupSteps.map((step) => (
            <div key={step.id} id={step.id} className="flex gap-5">
              <div className="flex flex-col items-center">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-sm font-semibold text-primary">
                  {step.step}
                </div>
                <div className="flex-1 mt-3 w-px bg-border" />
              </div>
              <div className="pb-8 flex-1 space-y-3">
                <div>
                  <h2 className="text-base font-semibold">{step.title}</h2>
                  <p className="text-sm text-muted-foreground mt-0.5">{step.description}</p>
                </div>
                {step.content && <div>{step.content}</div>}
                {step.details && <div>{step.details}</div>}
              </div>
            </div>
          ))}
        </section>

        {/* Per-client config paths */}
        <section className="space-y-4" id="per-client">
          <h2 className="text-xl font-semibold">Config paths by client</h2>
          <p className="text-sm text-muted-foreground">
            Setup writes the MCP config automatically. Here are the exact paths for reference or
            manual setup.
          </p>
          <div className="space-y-3">
            {Object.values(clientSetup).map((client) => (
              <Card key={client.id} id={client.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{client.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <span className="shrink-0">MCP config:</span>
                    <code className="font-mono bg-muted text-foreground px-1.5 py-0.5 rounded text-xs">
                      {client.configPath}
                    </code>
                  </div>
                  {client.note && <p className="text-xs">{client.note}</p>}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Agent-assisted setup */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Agent-assisted setup (optional)</h2>
          <p className="text-sm text-muted-foreground">
            After the CLI setup, run this in your AI session for conflict detection, project-aware
            bucket configuration, and rule merging:
          </p>
          <CodeBlock code="/vault setup" lang="prompt" />
          <p className="text-sm text-muted-foreground">
            The agent verifies the MCP connection, scans existing rules for conflicts, detects
            active projects, and configures vault buckets. It shows everything before writing and
            never modifies user-written files.
          </p>
        </section>

        {/* Requirements */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Requirements</h2>
          <div className="grid grid-cols-2 gap-3 text-sm">
            {[
              ['Node.js', '22 or later'],
              ['Package manager', 'npm or pnpm'],
              ['AI client', 'Any MCP-compatible client'],
              ['OS', 'macOS, Linux, Windows'],
            ].map(([label, value]) => (
              <div key={label} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary shrink-0" />
                <span className="text-muted-foreground">
                  <span className="text-foreground font-medium">{label}:</span> {value}
                </span>
              </div>
            ))}
          </div>
        </section>

        <div className="flex items-center gap-3 pt-4 border-t border-border">
          <Button asChild variant="outline" size="sm">
            <Link to="/docs/agent-rules">
              Agent rules reference
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Link>
          </Button>
          <Button asChild variant="ghost" size="sm">
            <Link to="/support">
              Get help
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}

import { ArrowRight, Download, Shield, BookOpen, Terminal } from 'lucide-react';
import { Link } from 'react-router';
import { PageHead } from '../components/PageHead';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const docSections = [
  {
    icon: Download,
    title: 'Setup',
    description: 'Install the MCP server, connect it to your AI editor, and run your first vault save.',
    href: '/docs/setup',
    internal: true,
    links: [
      { label: 'Quick start (2 minutes)', href: '/docs/setup' },
      { label: 'Claude Code setup', href: '/docs/setup#claude-code' },
      { label: 'Cursor setup', href: '/docs/setup#cursor' },
      { label: 'Windsurf setup', href: '/docs/setup#windsurf' },
    ],
  },
  {
    icon: Shield,
    title: 'Agent Rules',
    description: 'The rules file that makes your AI vault-aware. Review it, install it manually, or let setup handle it.',
    href: '/docs/agent-rules',
    internal: true,
    links: [
      { label: 'Rules file content', href: '/docs/agent-rules' },
      { label: 'Claude Code install', href: '/docs/agent-rules#claude-code' },
      { label: 'Cursor install', href: '/docs/agent-rules#cursor' },
      { label: 'Manual install', href: '/docs/agent-rules#other' },
    ],
  },
  {
    icon: Terminal,
    title: 'CLI Reference',
    description: 'All context-vault commands: setup, save, search, export, import, and more.',
    href: 'https://github.com/fellanH/context-vault/blob/main/docs/distribution/connect-in-2-minutes.md',
    internal: false,
    links: [
      { label: 'context-vault setup', href: 'https://github.com/fellanH/context-vault', external: true },
      { label: 'context-vault rules show', href: 'https://github.com/fellanH/context-vault', external: true },
      { label: 'context-vault uninstall', href: 'https://github.com/fellanH/context-vault', external: true },
    ],
  },
  {
    icon: BookOpen,
    title: 'MCP Tools',
    description: 'Reference for the MCP tools your AI uses: get_context, save_context, list_context, and more.',
    href: 'https://github.com/fellanH/context-vault/blob/main/docs/distribution/connect-in-2-minutes.md',
    internal: false,
    links: [
      { label: 'get_context', href: 'https://github.com/fellanH/context-vault', external: true },
      { label: 'save_context', href: 'https://github.com/fellanH/context-vault', external: true },
      { label: 'session_start', href: 'https://github.com/fellanH/context-vault', external: true },
    ],
  },
];

export function DocsIndexPage() {
  return (
    <main>
      <PageHead
        title="Docs — Context Vault"
        description="Setup guides, agent rules reference, CLI docs, and MCP tool documentation for Context Vault."
        canonical="/docs"
      />

      <div className="mx-auto w-full max-w-4xl px-6 py-16 sm:py-20 space-y-10">

        <div className="space-y-3">
          <Badge variant="outline">Documentation</Badge>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Context Vault Docs
          </h1>
          <p className="text-muted-foreground max-w-xl">
            Everything you need to install, configure, and get the most out of Context Vault.
          </p>
        </div>

        {/* Quick start banner */}
        <div className="rounded-lg border border-primary/20 bg-primary/5 px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
          <div>
            <p className="font-medium text-sm">New? Start here.</p>
            <p className="text-sm text-muted-foreground mt-0.5">
              Install and connect in 2 minutes with one command.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <code className="text-sm font-mono bg-background border border-border rounded px-3 py-1.5">
              npx context-vault setup
            </code>
            <Button asChild size="sm">
              <Link to="/docs/setup">
                Full guide
                <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Doc sections grid */}
        <div className="grid gap-4 sm:grid-cols-2">
          {docSections.map((section) => (
            <Card key={section.title}>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex h-8 w-8 items-center justify-center rounded-md border border-border/70 bg-muted/30">
                    <section.icon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <CardTitle className="text-base">
                    {section.internal ? (
                      <Link to={section.href} className="hover:text-primary transition-colors">
                        {section.title}
                      </Link>
                    ) : (
                      <a
                        href={section.href}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-primary transition-colors"
                      >
                        {section.title}
                      </a>
                    )}
                  </CardTitle>
                </div>
                <CardDescription className="text-sm">{section.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1.5">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      {'external' in link && link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                        >
                          {link.label}
                          <ArrowRight className="h-3 w-3" />
                        </a>
                      ) : (
                        <Link
                          to={link.href}
                          className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                        >
                          {link.label}
                          <ArrowRight className="h-3 w-3" />
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center space-y-3 pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Can&apos;t find what you need?
          </p>
          <Button asChild variant="outline" size="sm">
            <a href="https://github.com/fellanH/context-vault/issues" target="_blank" rel="noreferrer">
              Open an issue on GitHub
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </a>
          </Button>
        </div>
      </div>
    </main>
  );
}

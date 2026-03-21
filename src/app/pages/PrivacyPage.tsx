import { Shield, Eye, ShieldOff, Trash2, ArrowRight, Server, CreditCard } from 'lucide-react';
import { PageHead } from '../components/PageHead';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function PrivacyPage() {
  return (
    <main>
      <PageHead
        title="Privacy Policy"
        description="Context Vault is local-first. Your vault data stays on your machine unless you opt into hosted features. Read how we handle the minimal data we do store."
        canonical="/privacy"
      />
      <section className="mx-auto w-full max-w-3xl px-6 py-16 sm:py-20">
        <div className="space-y-3 mb-10 text-center">
          <Badge variant="outline">Privacy Policy</Badge>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Your data stays yours
          </h1>
          <p className="text-sm text-muted-foreground">Last updated: March 21, 2026</p>
        </div>

        <div className="prose prose-sm dark:prose-invert max-w-none space-y-8 text-muted-foreground">

          <div className="rounded-lg border border-primary/20 bg-primary/5 px-5 py-4 text-sm">
            <p className="font-medium text-foreground mb-1">Local-first design</p>
            <p>
              The MCP server runs entirely on your machine. Your vault entries are plain markdown
              files stored locally. Nothing is sent to any server unless you explicitly sign up
              for a hosted tier.
            </p>
          </div>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">1. MCP Server (local)</h2>
            <p className="mb-2">
              When you run <code className="text-foreground">npx context-vault</code> locally, all
              data stays on your machine:
            </p>
            <ul className="space-y-1 list-disc list-inside">
              <li>Vault entries are stored as markdown files in a folder you choose.</li>
              <li>A SQLite database is created locally as a derived search index.</li>
              <li>No network calls are made. No analytics, no telemetry, no phone-home.</li>
              <li>You can delete the vault folder and the SQLite file at any time.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">2. Hosted App (app.context-vault.com)</h2>
            <p className="mb-2">
              If you create an account, we store the following to provide the service:
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                {
                  icon: Shield,
                  title: 'Account data',
                  items: [
                    'Email address (required for login)',
                    'Name (optional, for team display)',
                    'Hashed password or OAuth provider ID',
                    'API keys you generate (stored as hashes)',
                  ],
                },
                {
                  icon: Server,
                  title: 'Hosted vault entries',
                  items: [
                    'Vault entries you upload to the hosted tier',
                    'Stored on Cloudflare R2 and Turso (libSQL)',
                    'Encrypted in transit (TLS). Not encrypted at rest by default.',
                    'Never shared with third parties or used for training.',
                  ],
                },
                {
                  icon: Eye,
                  title: 'Usage data',
                  items: [
                    'Recall counts per entry (for ranking and vault-brain)',
                    'Session identifiers for search context',
                    'API request logs (standard web server logs, 30-day retention)',
                  ],
                },
                {
                  icon: CreditCard,
                  title: 'Billing (Pro/Team plans)',
                  items: [
                    'Stripe customer ID and subscription status',
                    'Payment details are held by Stripe — we never see card numbers',
                    'Invoice history and plan tier',
                  ],
                },
              ].map((s) => (
                <Card key={s.title}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border/70 bg-muted/30">
                        <s.icon className="h-3.5 w-3.5 text-muted-foreground" />
                      </div>
                      <CardTitle className="text-sm">{s.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1 text-xs text-muted-foreground">
                      {s.items.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-muted-foreground/50" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">3. Browser Extension</h2>
            <p className="mb-2">The Context Vault Chrome extension stores:</p>
            <ul className="space-y-1 list-disc list-inside">
              <li>Your configured Context Vault server URL</li>
              <li>Your API key used to authenticate to your vault server</li>
              <li>Temporary rate-limit metadata from server response headers</li>
            </ul>
            <p className="mt-2">
              Selected text is sent only to the server URL you configure. No browsing history is
              collected beyond pages where the content script runs. No analytics, ad tracking, or
              third-party telemetry is collected by the extension.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">4. Marketing Site (context-vault.com)</h2>
            <p className="mb-2">This website uses analytics to understand how visitors find and use it:</p>
            <ul className="space-y-1 list-disc list-inside">
              <li>Google Analytics 4 (via Google Tag Manager) — page views, traffic sources</li>
              <li>Microsoft Clarity — heatmaps and session recordings</li>
              <li>PostHog — funnel tracking and conversion events</li>
            </ul>
            <p className="mt-2">
              These tools may set cookies. No vault data or personal content is sent to these
              services. You can opt out via your browser's privacy settings or an ad blocker.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">
              <span className="inline-flex items-center gap-2">
                <ShieldOff className="h-4 w-4" />
                What we never do
              </span>
            </h2>
            <ul className="space-y-1 list-disc list-inside">
              <li>We never sell or share your personal data with third parties</li>
              <li>We never use your vault entries to train AI models</li>
              <li>We never read your private vault entries except to provide the service</li>
              <li>We never auto-publish private entries — all sharing is explicit</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">
              <span className="inline-flex items-center gap-2">
                <Trash2 className="h-4 w-4" />
                Deleting your data
              </span>
            </h2>
            <ul className="space-y-1 list-disc list-inside">
              <li>
                <strong className="text-foreground">Local vault:</strong> delete the vault folder
                and SQLite file on your machine.
              </li>
              <li>
                <strong className="text-foreground">Hosted vault:</strong> use the app dashboard
                or API to delete individual entries or export and delete your entire vault.
              </li>
              <li>
                <strong className="text-foreground">Account:</strong> email{' '}
                <a
                  href="mailto:privacy@context-vault.com"
                  className="text-primary underline-offset-4 hover:underline"
                >
                  privacy@context-vault.com
                </a>{' '}
                to request full account deletion.
              </li>
              <li>
                <strong className="text-foreground">Extension:</strong> open extension settings
                and clear values, or uninstall the extension.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">Contact</h2>
            <p>
              Questions about this policy? Email{' '}
              <a
                href="mailto:privacy@context-vault.com"
                className="text-primary underline-offset-4 hover:underline"
              >
                privacy@context-vault.com
              </a>{' '}
              or open an issue on{' '}
              <a
                href="https://github.com/fellanH/context-vault"
                target="_blank"
                rel="noreferrer"
                className="text-primary underline-offset-4 hover:underline"
              >
                GitHub
              </a>
              .
            </p>
          </section>

        </div>

        <div className="mt-10 text-center">
          <Button variant="outline" size="sm" asChild>
            <a href="https://github.com/fellanH/context-vault" target="_blank" rel="noreferrer">
              GitHub Repository
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </a>
          </Button>
        </div>
      </section>
    </main>
  );
}

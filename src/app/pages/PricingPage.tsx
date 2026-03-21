import { Check, ArrowRight, Zap, Users, Globe } from 'lucide-react';
import { Link } from 'react-router';
import { PageHead } from '../components/PageHead';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { appHref } from '../lib/links';

const tiers = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Local vault with no limits. Runs 100% on your machine.',
    icon: Globe,
    cta: 'Get started',
    ctaHref: '/get-started',
    ctaVariant: 'outline' as const,
    highlight: false,
    features: [
      'Unlimited vault entries (local)',
      'Hybrid semantic + full-text search',
      'Works with Claude Code, Cursor, Windsurf, any MCP client',
      'Plain markdown files — you own every byte',
      'Multi-project bucket scoping',
      'Auto-deduplication on save',
      'CLI tools (export, import, reindex)',
      'MIT licensed, self-hostable',
    ],
    note: 'No account needed. No cloud.',
  },
  {
    name: 'Pro',
    price: '$9',
    period: '/month',
    description: 'Hosted personal vault with sync, recall insights, and visualization.',
    icon: Zap,
    cta: 'Start Pro',
    ctaHref: '/register',
    ctaVariant: 'default' as const,
    highlight: true,
    features: [
      'Everything in Free',
      'Hosted personal vault (10K entries)',
      'Multi-device sync via Cloudflare R2',
      'Recall tracking dashboard',
      'Vault-brain 3D knowledge graph',
      'API key management',
      'Entry visibility controls (Private / Team / Public)',
      'Hosted vault backup and restore',
    ],
    note: 'Soft limit — overage billed at $0.001/entry/month.',
  },
  {
    name: 'Team',
    price: '$29',
    period: '/month',
    description: 'Shared team vault with admin controls and SSO included.',
    icon: Users,
    cta: 'Start Team trial',
    ctaHref: '/register?plan=team',
    ctaVariant: 'outline' as const,
    highlight: false,
    badge: '+ $9/seat',
    features: [
      'Everything in Pro',
      'Shared team vault (50K entries)',
      'Member management and invite by email',
      'Team-level agent rules',
      'Admin controls and audit log',
      'SSO (SAML 2.0 + OIDC) included',
      'Role-based access (owner / admin / member)',
      'Priority support',
    ],
    note: 'Base $29/mo covers up to 3 seats. Additional seats at $9/seat/mo.',
  },
];

const faqs = [
  {
    q: 'Do I need an account for the free tier?',
    a: 'No. The free tier is purely local. Run npx context-vault, and you are up and running in 2 minutes. No signup, no email, no account.',
  },
  {
    q: 'What happens when I hit the 10K entry limit on Pro?',
    a: 'You see a dashboard nudge, not a hard block. Overage is billed at $0.001/entry/month (about $1 for every 1,000 extra entries). We will never silently delete entries.',
  },
  {
    q: 'Can I use Pro and keep local-only for sensitive projects?',
    a: 'Yes. The local vault and hosted vault are separate systems. You choose per-session which to use. Private projects stay local, shared or multi-device work goes to hosted.',
  },
  {
    q: 'Is SSO really included on the Team plan?',
    a: 'Yes. We use better-auth (MIT-licensed, self-hosted) for all auth. SSO costs us nothing to operate, so we pass that through to you. No enterprise gating.',
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Yes. Cancel from the billing dashboard at any time. Your hosted vault entries are yours — export them before cancelling if you want local copies.',
  },
];

export function PricingPage() {
  return (
    <main>
      <PageHead
        title="Pricing — Context Vault"
        description="Free local vault forever. Pro for hosted sync and recall insights. Team for shared vaults and SSO."
        canonical="/pricing"
      />

      <section className="mx-auto w-full max-w-5xl px-6 py-16 sm:py-20">
        <div className="space-y-3 mb-12 text-center">
          <Badge variant="outline">Pricing</Badge>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Local is free. Hosted scales with you.
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            The local vault is free forever and has no limits. Pay only if you need cloud sync,
            recall insights, or team sharing.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {tiers.map((tier) => (
            <Card
              key={tier.name}
              className={tier.highlight ? 'border-primary/50 shadow-md relative' : 'relative'}
            >
              {tier.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="text-xs px-3">Most popular</Badge>
                </div>
              )}
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-md border border-border/70 bg-muted/30">
                    <tier.icon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-base">{tier.name}</CardTitle>
                    {'badge' in tier && tier.badge && (
                      <Badge variant="secondary" className="text-xs font-normal">
                        {tier.badge}
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold">{tier.price}</span>
                  <span className="text-sm text-muted-foreground">{tier.period}</span>
                </div>
                <CardDescription className="text-sm">{tier.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  asChild
                  variant={tier.ctaVariant}
                  className="w-full"
                  size="sm"
                >
                  {tier.ctaHref.startsWith('/get-started') ? (
                    <Link to={tier.ctaHref}>
                      {tier.cta}
                      <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                    </Link>
                  ) : (
                    <a href={appHref(tier.ctaHref)}>
                      {tier.cta}
                      <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                    </a>
                  )}
                </Button>

                <ul className="space-y-2">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-2 text-sm">
                      <Check className="h-4 w-4 shrink-0 text-primary mt-0.5" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                {tier.note && (
                  <p className="text-xs text-muted-foreground/70 border-t border-border/50 pt-3">
                    {tier.note}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16">
          <h2 className="text-xl font-semibold text-center mb-8">Frequently asked questions</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {faqs.map((faq) => (
              <div key={faq.q} className="space-y-1.5">
                <p className="text-sm font-medium">{faq.q}</p>
                <p className="text-sm text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center space-y-3">
          <p className="text-sm text-muted-foreground">
            Questions? Compare tiers or check the docs.
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            <Button asChild variant="outline" size="sm">
              <Link to="/docs">View docs</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <a href="https://github.com/fellanH/context-vault" target="_blank" rel="noreferrer">
                GitHub
                <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

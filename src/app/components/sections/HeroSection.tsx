import { useState } from 'react';
import { ArrowRight, Copy, Check } from 'lucide-react';

interface HeroSectionProps {
  badge?: string;
  badgeHref?: string;
  heading: string;
  accentWord?: string;
  subtitle?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  quickStartCommand?: string;
  installCommand?: string;
  trustPoints?: string[];
  dotGrid?: boolean;
}

export function HeroSection({
  badge,
  badgeHref,
  heading,
  accentWord,
  subtitle,
  primaryCta,
  secondaryCta,
  quickStartCommand,
  installCommand,
  trustPoints,
  dotGrid = true,
}: HeroSectionProps) {
  const [copied, setCopied] = useState(false);

  const headingParts =
    accentWord && heading.includes(accentWord) ? heading.split(accentWord) : null;

  function copyCommand() {
    if (!quickStartCommand) return;
    navigator.clipboard.writeText(quickStartCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <section
      id="main-content"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden"
      style={
        dotGrid
          ? {
              backgroundImage: 'radial-gradient(circle, var(--border) 1px, transparent 1px)',
              backgroundSize: '32px 32px',
              maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 40%, transparent 100%)',
              WebkitMaskImage:
                'radial-gradient(ellipse 70% 70% at 50% 50%, black 40%, transparent 100%)',
            }
          : undefined
      }
    >
      <div className="relative mx-auto w-full max-w-3xl px-6 pt-20 pb-16 sm:pt-28 sm:pb-24 text-center">
        {/* Badge */}
        {badge &&
          (badgeHref ? (
            <a
              href={badgeHref}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs text-muted-foreground hover:text-foreground hover:shadow-sm transition-colors"
            >
              <span className="size-1.5 rounded-full bg-primary animate-pulse" />
              {badge}
              <ArrowRight className="size-3" />
            </a>
          ) : (
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs text-muted-foreground hover:shadow-sm">
              <span className="size-1.5 rounded-full bg-primary animate-pulse" />
              {badge}
            </span>
          ))}

        {/* Heading */}
        <h1 id="hero-heading" className="text-4xl font-semibold tracking-tight leading-tight mb-4">
          {headingParts ? (
            <>
              {headingParts[0]}
              <span className="gradient-brand-text">{accentWord}</span>
              {headingParts[1]}
            </>
          ) : (
            heading
          )}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p className="text-base text-muted-foreground leading-relaxed mb-8 max-w-[60ch] mx-auto">
            {subtitle}
          </p>
        )}

        {/* Quick-start commands */}
        {quickStartCommand ? (
          <div className="mb-4 space-y-3">
            <div
              role="region"
              aria-label="Install command"
              className="inline-flex items-center gap-3 rounded-2xl bg-zinc-950 shadow-[var(--shadow-hero-panel)] px-5 py-3.5 text-sm font-mono"
            >
              <span className="text-zinc-500 select-none">$</span>
              <span className="text-zinc-100">{quickStartCommand}</span>
              <button
                onClick={copyCommand}
                aria-label="Copy command"
                className="ml-1 text-zinc-500 hover:text-zinc-200 transition-colors"
              >
                {copied ? (
                  <Check className="size-3.5 text-green-400" />
                ) : (
                  <Copy className="size-3.5" />
                )}
              </button>
            </div>

            {installCommand && (
              <p className="text-xs text-muted-foreground">
                or, prefer permanent&nbsp;·&nbsp;
                <code className="font-mono text-muted-foreground/80">{installCommand}</code>
              </p>
            )}

            {secondaryCta && (
              <p className="text-xs text-muted-foreground">
                or{' '}
                <a
                  href={secondaryCta.href}
                  className="text-primary underline underline-offset-4 hover:opacity-80 transition-opacity"
                >
                  {secondaryCta.label}
                </a>
              </p>
            )}
          </div>
        ) : (
          /* Fallback: original CTA buttons */
          (primaryCta || secondaryCta) && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
              {primaryCta && (
                <a
                  href={primaryCta.href}
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
                >
                  {primaryCta.label}
                  <ArrowRight className="size-4" />
                </a>
              )}
              {secondaryCta && (
                <a
                  href={secondaryCta.href}
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-border px-5 py-2.5 text-sm font-medium hover:bg-muted/30 transition-colors"
                >
                  {secondaryCta.label}
                </a>
              )}
            </div>
          )
        )}

        {/* Trust points */}
        {trustPoints && trustPoints.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
            {trustPoints.map((point) => (
              <span key={point} className="rounded-full bg-muted/50 px-3 py-1">
                {point}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

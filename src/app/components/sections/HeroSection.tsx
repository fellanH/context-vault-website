import { useState, useEffect } from 'react';
import { ArrowRight, Copy, Check } from 'lucide-react';

interface TerminalLine {
  text: string;
  variant?: 'command' | 'success' | 'muted' | 'default';
}

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
  leftPanelBadge?: string;
  leftPanelLines?: TerminalLine[];
  rightPanelBadge?: string;
  rightPanelLines?: string[];
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
  leftPanelBadge = '[ terminal ]',
  leftPanelLines = [],
  rightPanelBadge = '[ .MD ]',
  rightPanelLines = [],
  dotGrid = true,
}: HeroSectionProps) {
  const [copied, setCopied] = useState(false);
  const [revealedCount, setRevealedCount] = useState(0);

  useEffect(() => {
    if (leftPanelLines.length === 0) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setRevealedCount(leftPanelLines.length);
      return;
    }
    let count = 0;
    const timer = setInterval(() => {
      count += 1;
      setRevealedCount(count);
      if (count >= leftPanelLines.length) {
        clearInterval(timer);
      }
    }, 100);
    return () => clearInterval(timer);
  }, [leftPanelLines.length]);

  const rightPanelReady = revealedCount >= leftPanelLines.length;

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
      <div className="relative mx-auto w-full max-w-3xl px-6 pt-20 pb-10 sm:pt-28 sm:pb-16 text-center">
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
          <p className="text-base text-muted-foreground leading-relaxed mb-8 max-w-md mx-auto">
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
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10 text-xs text-muted-foreground">
            {trustPoints.map((point) => (
              <span key={point} className="rounded-full bg-muted/50 px-3 py-1">
                {point}
              </span>
            ))}
          </div>
        )}

        {/* Dual mockup panel */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Left panel — dark terminal */}
          <div className="overflow-hidden rounded-2xl border border-border/50 shadow-[var(--shadow-hero-panel)]">
            <div className="flex items-center gap-1.5 border-b border-white/10 bg-zinc-950 px-3 py-2">
              <span className="size-2 rounded-full bg-red-400/70" />
              <span className="size-2 rounded-full bg-yellow-400/70" />
              <span className="size-2 rounded-full bg-green-400/70" />
              <span className="ml-auto font-mono text-[10px] text-zinc-500">{leftPanelBadge}</span>
            </div>
            <div className="bg-zinc-950 p-4 min-h-[160px] text-left">
              {leftPanelLines.slice(0, revealedCount).map((line, i) => (
                <div
                  key={i}
                  className={`font-mono text-[10px] leading-relaxed ${
                    line.variant === 'command'
                      ? 'text-primary'
                      : line.variant === 'success'
                        ? 'text-green-400'
                        : line.variant === 'muted'
                          ? 'text-zinc-500'
                          : 'text-zinc-400'
                  }`}
                >
                  {line.text || '\u00A0'}
                </div>
              ))}
            </div>
          </div>

          {/* Right panel — light markdown output */}
          <div className="overflow-hidden rounded-2xl border border-border shadow-[var(--shadow-hero-panel)]">
            <div className="flex items-center gap-1.5 border-b border-border bg-muted/10 px-3 py-2">
              <span className="size-2 rounded-full bg-red-400/70" />
              <span className="size-2 rounded-full bg-yellow-400/70" />
              <span className="size-2 rounded-full bg-green-400/70" />
              <span className="ml-auto font-mono text-[10px] text-muted-foreground">
                {rightPanelBadge}
              </span>
            </div>
            <div
              className={`bg-background p-4 min-h-[160px] text-left transition-opacity duration-500 ${
                rightPanelReady ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {rightPanelLines.map((line, i) => (
                <div
                  key={i}
                  className={`font-mono text-[10px] leading-relaxed ${
                    line.startsWith('# ') ? 'text-foreground font-medium' : 'text-muted-foreground'
                  }`}
                >
                  {line || '\u00A0'}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

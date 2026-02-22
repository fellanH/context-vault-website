import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

interface UseCaseItem {
  icon: LucideIcon;
  label: string;
  title: string;
  description: string;
  href?: string;
  mockupContent?: ReactNode;
  mockupBadge?: string;
}

interface UseCaseDetailedProps {
  sectionTagIcon?: LucideIcon;
  sectionTag?: string;
  heading: string;
  accentWord?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  useCases: UseCaseItem[];
}

function AccentHeading({
  heading,
  accentWord,
}: {
  heading: string;
  accentWord?: string;
}) {
  if (!accentWord || !heading.includes(accentWord)) {
    return (
      <h2 className="text-3xl font-semibold tracking-tight text-center">
        {heading}
      </h2>
    );
  }
  const [before, after] = heading.split(accentWord);
  return (
    <h2 className="text-3xl font-semibold tracking-tight text-center">
      {before}
      <span className="text-primary">{accentWord}</span>
      {after}
    </h2>
  );
}

export function UseCaseDetailed({
  sectionTagIcon: TagIcon,
  sectionTag,
  heading,
  accentWord,
  subtitle,
  ctaLabel,
  ctaHref,
  useCases,
}: UseCaseDetailedProps) {
  return (
    <div className="border-y border-border">
      <div className="mx-auto w-full max-w-[80rem] px-[5vw]">
        {/* Header — no CTA here, it fires after the use cases */}
        <div className="border-b border-border py-14 text-center">
          {sectionTag && (
            <div className="mb-4 inline-flex items-center gap-1.5 text-muted-foreground/60">
              <span className="font-mono text-xs">//</span>
              {TagIcon && <TagIcon className="size-3.5 text-primary" />}
              <span className="text-xs font-medium text-muted-foreground">
                {sectionTag}
              </span>
              <span className="font-mono text-xs">\\</span>
            </div>
          )}
          <AccentHeading heading={heading} accentWord={accentWord} />
          {subtitle && (
            <p className="mt-3 text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {/* Use cases list */}
        <div className="divide-y divide-border">
          {useCases.map((item) => (
            <div
              key={item.title}
              className="grid grid-cols-1 md:grid-cols-[2fr_3fr]"
            >
              {/* Left: text */}
              <div className="px-8 py-10">
                <div className="flex items-center gap-2 mb-3">
                  <item.icon className="size-4 text-primary" />
                  <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                    {item.label}
                  </span>
                </div>
                <h3 className="text-xl font-semibold tracking-tight mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
                {item.href && (
                  <a
                    href={item.href}
                    className="mt-3 inline-flex items-center gap-1 text-xs text-primary hover:underline"
                  >
                    Learn more
                    <ArrowRight className="size-3" />
                  </a>
                )}
              </div>
              {/* Right: mockup */}
              <div className="border-l border-border">
                <div className="flex items-center gap-1.5 border-b border-border bg-muted/10 px-4 py-2.5">
                  <span className="size-2 rounded-full bg-red-400/70" />
                  <span className="size-2 rounded-full bg-yellow-400/70" />
                  <span className="size-2 rounded-full bg-green-400/70" />
                  {item.mockupBadge && (
                    <span className="ml-auto text-[10px] font-mono text-muted-foreground">
                      {item.mockupBadge}
                    </span>
                  )}
                </div>
                <div className="p-4 min-h-[140px] flex items-center justify-center bg-muted/5">
                  {item.mockupContent ? (
                    item.mockupContent
                  ) : (
                    <item.icon className="size-16 text-muted-foreground/10 stroke-[0.75]" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA fires after all scenarios have been read */}
        {ctaLabel && ctaHref && (
          <div className="border-t border-border py-10 text-center">
            <a
              href={ctaHref}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
            >
              {ctaLabel}
              <ArrowRight className="size-3.5" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

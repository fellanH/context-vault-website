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
  useCases,
}: UseCaseDetailedProps) {
  return (
    <div className="py-16">
      <div className="mx-auto w-full max-w-6xl px-6">
        {/* Header */}
        <div className="py-14 text-center">
          {sectionTag && (
            <div className="mb-4 inline-flex items-center gap-1.5">
              {TagIcon && <TagIcon className="size-3.5 text-primary" />}
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {sectionTag}
              </span>
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
        <div className="space-y-0">
          {useCases.map((item) => (
            <div
              key={item.title}
              className="grid grid-cols-1 md:grid-cols-[2fr_3fr] border-b border-border/40 last:border-b-0"
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
              <div className="bg-muted/30 md:rounded-r-2xl">
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
                <div className="p-4 min-h-[140px] flex items-center justify-center">
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
      </div>
    </div>
  );
}

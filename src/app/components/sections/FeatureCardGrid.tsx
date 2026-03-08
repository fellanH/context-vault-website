import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";

interface FeatureCard {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface FeatureCardGridProps {
  /** Optional icon shown inside the section tag badge */
  sectionTagIcon?: LucideIcon;
  /** Short label shown above the heading */
  sectionTag?: string;
  heading: string;
  /** Word inside heading to render in primary color */
  accentWord?: string;
  subtitle?: string;
  features: Array<FeatureCard>;
  /** Number of equal-width columns. Defaults to 3. */
  columns?: 2 | 3 | 4;
  /** Optional CTA rendered below the feature grid */
  cta?: { label: string; href: string };
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
      <h2
        id="features-heading"
        className="text-3xl font-semibold tracking-tight text-center"
      >
        {heading}
      </h2>
    );
  }
  const [before, after] = heading.split(accentWord);
  return (
    <h2
      id="features-heading"
      className="text-3xl font-semibold tracking-tight text-center"
    >
      {before}
      <span className="text-primary">{accentWord}</span>
      {after}
    </h2>
  );
}

export function FeatureCardGrid({
  sectionTagIcon: TagIcon,
  sectionTag,
  heading,
  accentWord,
  subtitle,
  features,
  columns = 3,
  cta,
}: FeatureCardGridProps) {
  return (
    <div className="py-16" aria-labelledby="features-heading">
      <div className="mx-auto w-full max-w-6xl px-6">
        {/* Centered section header */}
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

        {/* Feature card grid */}
        <div
          className={`grid gap-5 grid-cols-1 sm:grid-cols-2 ${
            columns === 4
              ? "lg:grid-cols-4"
              : columns === 2
                ? "sm:grid-cols-2"
                : "md:grid-cols-3"
          }`}
        >
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-border/60 bg-card p-8 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-shadow flex flex-col gap-4"
            >
              <div className="flex size-12 items-center justify-center rounded-xl bg-primary/8">
                <feature.icon className="size-6 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {cta && (
          <div className="py-8 text-center">
            <a
              href={cta.href}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
            >
              {cta.label}
              <ArrowRight className="size-4" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

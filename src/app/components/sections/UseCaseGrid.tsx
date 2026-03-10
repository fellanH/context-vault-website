import { Link } from 'react-router';
import { type LucideIcon, ArrowRight } from 'lucide-react';

interface UseCase {
  icon: LucideIcon;
  title: string;
  description: string;
  href?: string;
  label?: string;
}

interface UseCaseGridProps {
  heading?: string;
  accentWord?: string;
  subtitle?: string;
  useCases: Array<UseCase>;
}

function AccentHeading({ heading, accentWord }: { heading: string; accentWord?: string }) {
  if (!accentWord || !heading.includes(accentWord)) {
    return <h2 className="text-3xl font-semibold tracking-tight text-center">{heading}</h2>;
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

export function UseCaseGrid({ heading, accentWord, subtitle, useCases }: UseCaseGridProps) {
  return (
    <div className="border-y border-border">
      <div className="mx-auto w-full max-w-[80rem] px-[5vw]">
        {/* Centered section header — no extra px, container inset handles it */}
        {(heading || subtitle) && (
          <div className="border-b border-border py-14 text-center">
            {heading && <AccentHeading heading={heading} accentWord={accentWord} />}
            {subtitle && (
              <p className="mt-3 text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Stacked full-width cards — left content / right visual */}
        <div className="divide-y divide-border">
          {useCases.map((uc) => {
            const row = (
              <div className="grid grid-cols-[2fr_3fr] min-h-[200px]">
                {/* Left: text content — px-8 is cell-internal padding */}
                <div className="border-r border-border px-8 py-10 flex flex-col justify-between gap-6">
                  <div>
                    <p className="text-xs text-muted-foreground mb-3 flex items-center gap-1.5">
                      <uc.icon className="size-3.5" />
                      {uc.label ?? uc.title}
                    </p>
                    <h3 className="text-lg font-semibold tracking-tight">{uc.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {uc.description}
                    </p>
                  </div>
                  {uc.href && (
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
                      Learn more <ArrowRight className="size-3.5" />
                    </span>
                  )}
                </div>

                {/* Right: large icon visual */}
                <div className="bg-muted/20 flex items-center justify-center px-8 py-10">
                  <uc.icon className="size-20 text-muted-foreground/15 stroke-[0.75]" />
                </div>
              </div>
            );

            return uc.href ? (
              <Link
                key={uc.title}
                to={uc.href}
                className="block hover:bg-muted/10 transition-colors"
              >
                {row}
              </Link>
            ) : (
              <div key={uc.title}>{row}</div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

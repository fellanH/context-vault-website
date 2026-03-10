import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface CompetitorRow {
  name: string;
  logo?: string;
  fillPercent: number;
}

interface BenchmarkRow {
  url: string;
  crawlMs: string;
  scrapeMs: string;
}

interface PerformanceSectionProps {
  sectionTag?: string;
  sectionTagIcon?: LucideIcon;
  heading: string;
  accentWord?: string;
  subtitle?: string;
  competitors: CompetitorRow[];
  benchmarkRows: BenchmarkRow[];
  asciiArt?: string;
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

export function PerformanceSection({
  sectionTag,
  sectionTagIcon: TagIcon,
  heading,
  accentWord,
  subtitle,
  competitors,
  benchmarkRows,
  asciiArt,
}: PerformanceSectionProps) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="border-y border-border">
      <div className="mx-auto w-full max-w-[80rem] px-[5vw]">
        {/* Header */}
        <div className="border-b border-border py-14 text-center">
          {sectionTag && (
            <div className="mb-4 inline-flex items-center gap-1.5 text-muted-foreground/60">
              <span className="font-mono text-xs">//</span>
              {TagIcon && <TagIcon className="size-3.5 text-primary" />}
              <span className="text-xs font-medium text-muted-foreground">{sectionTag}</span>
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

        {/* 2-col body */}
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
          {/* Left: competitors */}
          <div className="px-8 py-10">
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-2">
              Reliability comparison
            </p>
            <p className="font-semibold text-foreground mb-6 text-sm">
              Context Vault vs the alternatives
            </p>
            <div className="space-y-4">
              {competitors.map((c) => (
                <div key={c.name} className="flex items-center gap-3">
                  {c.logo && (
                    <img
                      src={`https://cdn.simpleicons.org/${c.logo}`}
                      width={14}
                      height={14}
                      alt={c.name}
                      className="opacity-50 flex-shrink-0"
                    />
                  )}
                  <span className="text-xs text-muted-foreground w-24 flex-shrink-0 truncate">
                    {c.name}
                  </span>
                  <span className="text-xs px-1.5 py-0.5 bg-muted rounded text-muted-foreground w-10 text-right flex-shrink-0">
                    {c.fillPercent}%
                  </span>
                  <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
                      style={{ width: mounted ? `${c.fillPercent}%` : '0%' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: benchmarks */}
          <div className="px-8 py-10 relative">
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-2">
              Retrieval performance
            </p>
            <p className="font-semibold text-foreground mb-6 text-sm">Speed that feels invisible</p>
            <div className="w-full text-xs">
              <div className="grid grid-cols-3 gap-4 border-b border-border pb-2 mb-2 text-muted-foreground font-medium">
                <span>Query</span>
                <span>Vector</span>
                <span>FTS</span>
              </div>
              {benchmarkRows.map((row, i) => (
                <div
                  key={i}
                  className="grid grid-cols-3 gap-4 py-1.5 border-b last:border-0 border-border/50"
                >
                  <span className="text-foreground truncate">{row.url}</span>
                  <span className="text-primary font-mono">{row.crawlMs}</span>
                  <span className="text-primary font-mono">{row.scrapeMs}</span>
                </div>
              ))}
            </div>
            {asciiArt && (
              <pre className="font-mono text-xs leading-none whitespace-pre select-none pointer-events-none text-primary opacity-20 mt-6 text-right">
                {asciiArt}
              </pre>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

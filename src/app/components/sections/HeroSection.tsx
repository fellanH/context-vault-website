import React from "react";
import { Search, ArrowRight } from "lucide-react";
import { AsciiArt } from "../AsciiArt";

const HERO_FRAMES = [
  `  . · · . : : . · .\n·:: .: ·- ·: .. :·:\n·:- ·· .: ·: +· .:·\n··: -· ·. :· ·: .::\n  ·· .: :· ·. .: ·`,
  `  : · . · : . · : .\n·:· .. ·: -· :: ·:.\n·:· ·: -· ·. +: :-·\n··. ·: :. ·: ·- .::\n  ·: .· :· ·. .: ·`,
  `  · : · . · : · . :\n:·: ·. ·: .: -· :·:\n·-· :· ·. ·: ·+ :·.\n:·: ·- ·. :· ·: ::.\n  .: :· ·. :· ·. :·`,
];

interface HeroSectionProps {
  badge?: string;
  badgeHref?: string;
  heading: string;
  accentWord?: string;
  subtitle?: string;
  tabs?: string[];
  inputPlaceholder?: string;
  leftPanelBadge?: string;
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
  tabs = ["Scrape", "Search", "Agent", "Map", "Crawl"],
  inputPlaceholder = "https://example.com",
  leftPanelBadge = "[ .JSON ]",
  rightPanelBadge = "[ .MD ]",
  rightPanelLines = [],
  dotGrid = true,
}: HeroSectionProps) {
  const [activeTab, setActiveTab] = React.useState(0);

  const headingParts =
    accentWord && heading.includes(accentWord)
      ? heading.split(accentWord)
      : null;

  return (
    <section
      className="relative border-b border-border overflow-hidden"
      style={
        dotGrid
          ? {
              backgroundImage:
                "radial-gradient(circle, var(--border) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }
          : undefined
      }
    >
      {/* Corner accent marks */}
      <span className="absolute top-6 left-6 font-mono text-lg text-primary opacity-50 select-none">
        +
      </span>
      <span className="absolute top-6 right-6 font-mono text-lg text-primary opacity-50 select-none">
        +
      </span>
      <span className="absolute bottom-6 left-6 font-mono text-lg text-primary opacity-50 select-none">
        +
      </span>
      <span className="absolute bottom-6 right-6 font-mono text-lg text-primary opacity-50 select-none">
        +
      </span>

      <div className="relative mx-auto w-full max-w-2xl px-6 py-16 text-center">
        {/* Badge */}
        {badge && (
          <a
            href={badgeHref ?? "#"}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="size-1.5 rounded-full bg-primary" />
            {badge}
            <ArrowRight className="size-3" />
          </a>
        )}

        {/* Heading */}
        <h1 className="text-4xl font-semibold tracking-tight leading-tight mb-4">
          {headingParts ? (
            <>
              {headingParts[0]}
              <span className="text-primary">{accentWord}</span>
              {headingParts[1]}
            </>
          ) : (
            heading
          )}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p className="text-sm text-muted-foreground leading-relaxed mb-8 max-w-md mx-auto">
            {subtitle}
          </p>
        )}

        {/* URL input bar */}
        <div className="flex items-center gap-0 border border-border rounded-md bg-background overflow-hidden mb-10">
          <div className="flex items-center gap-2 px-3 py-2 border-r border-border text-muted-foreground">
            <Search className="size-3.5" />
            <input
              type="text"
              placeholder={inputPlaceholder}
              className="text-xs bg-transparent outline-none placeholder:text-muted-foreground/60 w-36 text-foreground"
            />
          </div>
          <div className="flex items-center px-1 py-1 gap-0.5 flex-1">
            {tabs.map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                className={`px-2.5 py-1 rounded text-xs transition-colors ${
                  i === activeTab
                    ? "bg-muted shadow-sm text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <button className="flex-shrink-0 flex items-center justify-center w-8 h-8 mr-1 rounded bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
            <ArrowRight className="size-3.5" />
          </button>
        </div>

        {/* Dual mockup panel */}
        <div className="grid grid-cols-2 gap-3">
          {/* Left panel — dark, ASCII art */}
          <div className="overflow-hidden rounded-md border border-border/50">
            <div className="flex items-center gap-1.5 border-b border-white/10 bg-zinc-950 px-3 py-2">
              <span className="size-2 rounded-full bg-red-400/70" />
              <span className="size-2 rounded-full bg-yellow-400/70" />
              <span className="size-2 rounded-full bg-green-400/70" />
              <span className="ml-auto font-mono text-[10px] text-zinc-500">
                {leftPanelBadge}
              </span>
            </div>
            <div className="bg-zinc-950 p-4 flex items-center justify-center min-h-[140px]">
              <AsciiArt frames={HERO_FRAMES} className="text-primary" />
            </div>
          </div>

          {/* Right panel — light, output */}
          <div className="overflow-hidden rounded-md border border-border">
            <div className="flex items-center gap-1.5 border-b border-border bg-muted/10 px-3 py-2">
              <span className="size-2 rounded-full bg-red-400/70" />
              <span className="size-2 rounded-full bg-yellow-400/70" />
              <span className="size-2 rounded-full bg-green-400/70" />
              <span className="ml-auto font-mono text-[10px] text-muted-foreground">
                {rightPanelBadge}
              </span>
            </div>
            <div className="bg-background p-4 min-h-[140px]">
              {rightPanelLines.map((line, i) => (
                <div
                  key={i}
                  className="font-mono text-[10px] leading-relaxed text-muted-foreground"
                >
                  {line}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import type { LucideIcon } from 'lucide-react';
import { cn } from '@/components/ui/utils';

interface FeatureBlock {
  icon: LucideIcon;
  /** Small label shown above title, e.g. "No proxy headaches" */
  label: string;
  /** Bold word(s) at the start of the body text */
  title: string;
  /** Rest of the body text after the bold title */
  description: string;
}

interface SplitFeatureSectionProps {
  sectionTagIcon?: LucideIcon;
  sectionTag?: string;
  heading: string;
  /** Word inside heading to render in primary color */
  accentWord?: string;
  subtitle?: string;
  /** Feature blocks — rendered in a 2-column grid, wrapping into pairs */
  blocks: Array<FeatureBlock>;
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

function FeatureBlockCard({ block }: { block: FeatureBlock }) {
  return (
    <div className="flex flex-col">
      {/* Text content area */}
      <div className="px-8 py-8 border-b border-border">
        <p className="text-xs text-muted-foreground mb-3 flex items-center gap-1.5">
          <block.icon className="size-3.5" />
          {block.label}
        </p>
        <p className="text-sm leading-relaxed text-foreground">
          <span className="font-semibold">{block.title}</span> {block.description}
        </p>
      </div>
      {/* Visual placeholder — large dimmed icon */}
      <div className="flex-1 min-h-[180px] flex items-center justify-center bg-muted/10 px-8 py-10">
        <block.icon className="size-20 text-muted-foreground/10 stroke-[0.75]" />
      </div>
    </div>
  );
}

export function SplitFeatureSection({
  sectionTagIcon: TagIcon,
  sectionTag,
  heading,
  accentWord,
  subtitle,
  blocks,
}: SplitFeatureSectionProps) {
  return (
    <div className="border-y border-border">
      <div className="mx-auto w-full max-w-[80rem] px-[5vw]">
        {/* Centered section header */}
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

        {/* 2-column feature block grid */}
        <div className="grid grid-cols-2">
          {blocks.map((block, i) => (
            <div
              key={block.label}
              className={cn(
                i % 2 === 0 ? 'border-r border-border' : '',
                i >= 2 ? 'border-t border-border' : ''
              )}
            >
              <FeatureBlockCard block={block} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

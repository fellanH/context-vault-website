interface SectionMarkerProps {
  /** 1-based index of this section */
  index: number;
  /** Total number of sections */
  total: number;
  /** Short label shown after the index, e.g. "MAIN FEATURES" */
  label: string;
}

export function SectionMarker({ index, total, label }: SectionMarkerProps) {
  const idx = String(index).padStart(2, '0');
  const tot = String(total).padStart(2, '0');

  return (
    <div className="border-y border-border bg-background">
      <div className="mx-auto w-full max-w-[80rem] px-[5vw]">
        <div className="flex items-center gap-3 border-l-2 border-primary py-3 pl-4">
          <span className="font-mono text-xs text-muted-foreground tracking-wider">
            [<span className="text-primary font-semibold">{idx}</span> / {tot}]
          </span>
          <span className="text-muted-foreground/40 select-none">·</span>
          <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
            {label}
          </span>
        </div>
      </div>
    </div>
  );
}

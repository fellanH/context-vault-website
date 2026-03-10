import type { LucideIcon } from 'lucide-react';

interface SectionTagProps {
  icon: LucideIcon;
  label: string;
}

export function SectionTag({ icon: Icon, label }: SectionTagProps) {
  return (
    <div className="mb-3 flex items-center gap-1.5">
      <Icon className="size-3.5 text-primary" />
      <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

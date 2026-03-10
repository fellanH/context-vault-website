import type { ReactNode } from 'react';

interface TerminalMockupProps {
  title?: string;
  children: ReactNode;
}

export function TerminalMockup({ title, children }: TerminalMockupProps) {
  return (
    <div className="overflow-hidden rounded-md border border-border/70 bg-zinc-950">
      <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-red-400/80" />
        <span className="size-2.5 rounded-full bg-yellow-400/80" />
        <span className="size-2.5 rounded-full bg-green-400/80" />
        {title && <span className="ml-auto font-mono text-xs text-zinc-500">{title}</span>}
      </div>
      <div className="p-4 font-mono text-xs leading-relaxed text-zinc-100">{children}</div>
    </div>
  );
}

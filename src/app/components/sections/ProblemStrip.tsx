import { AlertTriangle } from 'lucide-react';

const problems = [
  {
    index: '01',
    label: 'The blank slate',
    body: "It's Monday. You open your editor. Your AI has no idea what you were working on Friday. You spend 10 minutes re-explaining your stack, your patterns, your decisions. Again.",
  },
  {
    index: '02',
    label: 'Lost decisions',
    body: "Three weeks ago you chose JWT over session cookies. You remember the decision, but not the reasoning. It's buried in a Slack thread, a PR comment, or just... gone.",
  },
  {
    index: '03',
    label: 'Siloed tools',
    body: "You told Claude Code about your database choice. Now you're in Cursor. It doesn't know. You told Windsurf your API patterns. Claude Code doesn't know. Every tool is an island.",
  },
];

export function ProblemStrip() {
  return (
    <section aria-labelledby="problem-heading" className="py-16">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="text-center mb-10">
          <div className="mb-4 inline-flex items-center gap-1.5">
            <AlertTriangle className="size-3.5 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Sound familiar?
            </span>
          </div>
          <h2 id="problem-heading" className="text-3xl font-semibold tracking-tight">
            Three problems every developer knows
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3" role="list">
          {problems.map((p) => (
            <div
              key={p.label}
              role="listitem"
              className="rounded-2xl border border-border/60 bg-card p-6 shadow-[var(--shadow-card)]"
            >
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="inline-flex size-7 items-center justify-center rounded-full bg-primary/10 text-xs font-mono text-primary"
                  aria-hidden="true"
                >
                  {p.index}
                </span>
                <p className="text-xs uppercase tracking-widest text-muted-foreground/60">
                  {p.label}
                </p>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <p className="text-base font-medium text-foreground">Context Vault solves all three.</p>
        </div>
      </div>
    </section>
  );
}

const problems = [
  {
    index: "01",
    label: "The blank slate",
    body: "Every AI session starts from zero. You re-explain your stack, your decisions, your constraints — every single time.",
  },
  {
    index: "02",
    label: "Knowledge that doesn't travel",
    body: "Decisions live in Slack threads. Patterns live in your head. Nothing survives a new chat window.",
  },
  {
    index: "03",
    label: "Tools that don't share",
    body: "Claude Code knows nothing about what you told Cursor. Every client is an island.",
  },
];

export function ProblemStrip() {
  return (
    <section className="border-y border-border">
      <div className="mx-auto w-full max-w-6xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {problems.map((p) => (
            <div key={p.label} className="space-y-3">
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-xs text-primary">
                  {p.index}
                </span>
                <p className="text-xs uppercase tracking-widest text-muted-foreground/60">
                  {p.label}
                </p>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {p.body}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-10 pt-8 border-t border-border/50 text-center">
          <p className="text-sm text-muted-foreground">
            Context Vault fixes all three.
          </p>
        </div>
      </div>
    </section>
  );
}

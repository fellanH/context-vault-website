const problems = [
  {
    label: "The blank slate",
    body: "Every AI session starts from zero. You re-explain your stack, your decisions, your constraints — every single time.",
  },
  {
    label: "Knowledge that doesn't travel",
    body: "Decisions live in Slack threads. Patterns live in your head. Nothing survives a new chat window.",
  },
  {
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
              <p className="text-xs uppercase tracking-widest text-muted-foreground/60">
                {p.label}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

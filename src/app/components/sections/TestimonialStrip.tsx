interface Testimonial {
  quote: string;
  name: string;
  role: string;
  handle?: string;
  /** Image URL or 1–2 char initials. Defaults to first letter of name. */
  avatar?: string;
}

interface TestimonialStripProps {
  headline?: string;
  subtitle?: string;
  testimonials: Array<Testimonial>;
}

function Avatar({ testimonial }: { testimonial: Testimonial }) {
  const isUrl = testimonial.avatar?.startsWith('http');
  const initials =
    testimonial.avatar && !isUrl ? testimonial.avatar : testimonial.name.charAt(0).toUpperCase();

  if (isUrl) {
    return (
      <img
        src={testimonial.avatar}
        alt={testimonial.name}
        className="size-8 rounded-full object-cover flex-shrink-0"
      />
    );
  }

  return (
    <div className="size-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
      <span className="text-xs font-medium text-muted-foreground">{initials}</span>
    </div>
  );
}

export function TestimonialStrip({ headline, subtitle, testimonials }: TestimonialStripProps) {
  const cols = testimonials.length;

  return (
    <div className="border-y border-border">
      <div className="mx-auto w-full max-w-[80rem] px-[5vw]">
        {/* Section header — no extra px, container inset handles it */}
        {(headline || subtitle) && (
          <div className="border-b border-border py-10">
            {headline && <h2 className="text-2xl font-semibold tracking-tight">{headline}</h2>}
            {subtitle && <p className="mt-1.5 text-sm text-muted-foreground">{subtitle}</p>}
          </div>
        )}

        {/* Testimonial grid: avatar+name row on top, quote row below */}
        <div
          className="grid divide-x divide-border"
          style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
        >
          {/* Row 1 — avatar + name + handle */}
          {testimonials.map((t) => (
            <div
              key={`name-${t.name}`}
              className="flex items-center gap-3 border-b border-border px-6 py-6"
            >
              <Avatar testimonial={t} />
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{t.name}</p>
                {t.handle && <p className="text-xs text-muted-foreground truncate">{t.handle}</p>}
              </div>
            </div>
          ))}

          {/* Row 2 — quote */}
          {testimonials.map((t) => (
            <div key={`quote-${t.name}`} className="px-6 py-8">
              <p className="text-sm text-muted-foreground leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

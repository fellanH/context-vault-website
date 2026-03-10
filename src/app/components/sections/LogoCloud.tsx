import React from 'react';

interface LogoItem {
  name: string;
  href?: string;
  /** Simple Icons slug (e.g. "openai") or full image URL. Falls back to text. */
  logo?: string;
}

interface LogoCloudProps {
  headline?: string;
  logos: Array<LogoItem>;
  animate?: boolean;
}

function LogoCell({ item }: { item: LogoItem }) {
  const [failed, setFailed] = React.useState(false);

  const src = item.logo
    ? item.logo.startsWith('http')
      ? item.logo
      : `https://cdn.simpleicons.org/${item.logo}/717171`
    : null;

  const visual =
    src && !failed ? (
      <img src={src} alt={item.name} className="h-5 w-auto" onError={() => setFailed(true)} />
    ) : (
      <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">
        {item.name}
      </span>
    );

  return (
    <div className="flex-shrink-0 flex items-center justify-center px-8 py-5">
      {item.href ? (
        <a href={item.href} target="_blank" rel="noopener noreferrer" className="flex items-center">
          {visual}
        </a>
      ) : (
        visual
      )}
    </div>
  );
}

export function LogoCloud({ headline, logos, animate = true }: LogoCloudProps) {
  // Duplicate logos for a seamless loop
  const items = [...logos, ...logos];

  return (
    <section className="py-10">
      <div className="mx-auto max-w-6xl px-6">
        {headline && (
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground text-center mb-6">
            {headline}
          </p>
        )}

        {/* Marquee container */}
        <div className="rounded-2xl border border-border/60 bg-muted/20 overflow-hidden">
          <div
            className="overflow-hidden group"
            style={{
              maskImage: 'linear-gradient(to right, transparent, black 4%, black 96%, transparent)',
              WebkitMaskImage:
                'linear-gradient(to right, transparent, black 4%, black 96%, transparent)',
            }}
          >
            <div
              className="flex w-max group-hover:[animation-play-state:paused]"
              style={animate ? { animation: 'marquee 32s linear infinite' } : undefined}
            >
              {items.map((logo, i) => (
                <LogoCell key={i} item={logo} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

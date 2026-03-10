import React from 'react';

interface AsciiArtProps {
  frames?: string[];
  art?: string;
  interval?: number;
  className?: string;
}

export function AsciiArt({ frames, art, interval = 800, className }: AsciiArtProps) {
  const [idx, setIdx] = React.useState(0);
  React.useEffect(() => {
    if (!frames || frames.length <= 1) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % frames.length), interval);
    return () => clearInterval(t);
  }, [frames, interval]);
  const content = frames ? frames[idx] : (art ?? '');
  return (
    <pre
      className={`font-mono text-xs leading-none whitespace-pre select-none pointer-events-none${className ? ` ${className}` : ''}`}
    >
      {content}
    </pre>
  );
}

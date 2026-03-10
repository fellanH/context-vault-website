import React from 'react';
import { X, ArrowRight } from 'lucide-react';
import { cn } from '@/components/ui/utils';

interface AnnouncementBarProps {
  message: string;
  linkText?: string;
  linkHref?: string;
  /** "brand" = primary color bg; "neutral" = muted bg */
  variant?: 'brand' | 'neutral';
}

export function AnnouncementBar({
  message,
  linkText,
  linkHref,
  variant = 'brand',
}: AnnouncementBarProps) {
  const [dismissed, setDismissed] = React.useState(false);
  if (dismissed) return null;

  return (
    <div
      className={cn(
        'relative flex items-center justify-center gap-2 px-10 py-2.5 text-sm border-b border-border',
        variant === 'brand' ? 'bg-primary text-primary-foreground' : 'bg-muted/60 text-foreground'
      )}
    >
      <span>{message}</span>
      {linkText && linkHref && (
        <a
          href={linkHref}
          className="inline-flex items-center gap-1 font-medium underline underline-offset-2 hover:opacity-80 transition-opacity"
        >
          {linkText}
          <ArrowRight className="size-3" />
        </a>
      )}
      <button
        onClick={() => setDismissed(true)}
        className="absolute right-4 top-1/2 -translate-y-1/2 opacity-60 hover:opacity-100 transition-opacity"
        aria-label="Dismiss announcement"
      >
        <X className="size-4" />
      </button>
    </div>
  );
}

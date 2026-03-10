import { cn } from '@/components/ui/utils';

interface StatStripProps {
  stats: Array<{ value: string; label: string; description?: string }>;
  variant?: 'default' | 'tinted';
}

export function StatStrip({ stats, variant = 'default' }: StatStripProps) {
  return (
    <div className={cn('border-y border-border', variant === 'tinted' && 'bg-muted/20')}>
      <div className="mx-auto w-full max-w-[80rem] px-[5vw]">
        <div
          className="grid divide-x divide-border"
          style={{
            gridTemplateColumns: `repeat(${stats.length}, minmax(0, 1fr))`,
          }}
        >
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-2 px-8 py-10">
              <span className="text-4xl font-semibold tracking-tight text-foreground">
                {stat.value}
              </span>
              <span className="text-sm font-medium text-foreground">{stat.label}</span>
              {stat.description && (
                <span className="text-sm text-muted-foreground leading-relaxed">
                  {stat.description}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

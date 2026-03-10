import { CheckCircle2, X } from 'lucide-react';

interface ComparisonFeature {
  label: string;
  contextVault: boolean | string;
  alternative: boolean | string;
}

interface ComparisonSectionProps {
  heading?: string;
  subtitle?: string;
  features: Array<ComparisonFeature>;
  alternativeLabel?: string;
}

function Cell({ value }: { value: boolean | string }) {
  if (value === true) return <CheckCircle2 className="size-4 text-primary" />;
  if (value === false) return <X className="size-4 text-muted-foreground" />;
  return <span className="text-sm font-medium">{value}</span>;
}

export function ComparisonSection({
  heading = 'Context Vault vs. alternatives',
  subtitle,
  features,
  alternativeLabel = 'DIY / BYOM',
}: ComparisonSectionProps) {
  return (
    <div className="border-y border-border">
      <div className="mx-auto w-full max-w-[80rem] px-[5vw]">
        {/* 2-column header — cells use their own px-8 for internal spacing */}
        <div className="grid grid-cols-2 border-b border-border">
          <div className="border-r border-border px-8 py-10">
            <h2 className="text-2xl font-semibold tracking-tight">{heading}</h2>
            {subtitle && (
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{subtitle}</p>
            )}
          </div>
          <div className="px-8 py-10 flex flex-col justify-end">
            <div className="grid grid-cols-2 gap-2 text-xs font-medium mb-1">
              <span className="text-primary">Context Vault</span>
              <span className="text-muted-foreground">{alternativeLabel}</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Green = native support. X = not supported or requires custom work.
            </p>
          </div>
        </div>

        {/* Feature rows */}
        <div className="divide-y divide-border">
          {features.map((row) => (
            <div key={row.label} className="grid grid-cols-3 items-center">
              <div className="border-r border-border px-8 py-5">
                <span className="text-sm text-muted-foreground">{row.label}</span>
              </div>
              <div className="border-r border-border px-8 py-5 flex items-center">
                <Cell value={row.contextVault} />
              </div>
              <div className="px-8 py-5 flex items-center">
                <Cell value={row.alternative} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

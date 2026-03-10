import { TerminalMockup } from '../TerminalMockup';

interface SkillInstallSectionProps {
  heading: string;
  description?: string;
  command: string;
  capabilities?: string[];
  compatibleWith?: string[];
}

export function SkillInstallSection({
  heading,
  description,
  command,
  capabilities = [],
  compatibleWith = [],
}: SkillInstallSectionProps) {
  return (
    <div className="border-y border-border">
      <div className="mx-auto w-full max-w-[80rem] grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
        <div className="px-8 py-10">
          <h2 className="text-2xl font-semibold tracking-tight mb-3">{heading}</h2>
          {description && (
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">{description}</p>
          )}
          {compatibleWith.length > 0 && (
            <p className="text-xs text-muted-foreground">
              Works with{' '}
              {compatibleWith.map((item, i) => (
                <span key={item}>
                  <span className="text-foreground">{item}</span>
                  {i < compatibleWith.length - 1 ? ', ' : ''}
                </span>
              ))}
            </p>
          )}
        </div>
        <div className="px-8 py-10">
          <TerminalMockup title="bash">
            <div>
              <span className="text-green-400">$</span>{' '}
              <span className="text-primary">{command}</span>
            </div>
            {capabilities.map((cap, i) => (
              <div key={i} className="text-zinc-500">
                # {cap}
              </div>
            ))}
          </TerminalMockup>
        </div>
      </div>
    </div>
  );
}

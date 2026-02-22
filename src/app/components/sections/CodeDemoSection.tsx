import React from "react";
import { TerminalMockup } from "../TerminalMockup";

interface CodeTab {
  label: string;
  code: string;
}

interface CodeDemoSectionProps {
  tabs: CodeTab[];
  activeTab?: number;
  outputLabel?: string;
  output?: string;
  skillHeading?: string;
  skillDescription?: string;
  skillCommand?: string;
  skillCapabilities?: string[];
}

function renderCodeLine(line: string, i: number) {
  if (line.trimStart().startsWith("#") || line.trimStart().startsWith("//")) {
    return (
      <div key={i} className="flex gap-3">
        <span className="select-none text-zinc-600 w-6 text-right flex-shrink-0">
          {i + 1}
        </span>
        <span className="text-zinc-500">{line}</span>
      </div>
    );
  }
  return (
    <div key={i} className="flex gap-3">
      <span className="select-none text-zinc-600 w-6 text-right flex-shrink-0">
        {i + 1}
      </span>
      <span className="text-zinc-100">{line}</span>
    </div>
  );
}

export function CodeDemoSection({
  tabs,
  activeTab: initialTab = 0,
  outputLabel = "[ .MD ]",
  output = "",
  skillHeading,
  skillDescription,
  skillCommand,
  skillCapabilities = [],
}: CodeDemoSectionProps) {
  const [activeTab, setActiveTab] = React.useState(initialTab);
  const [copied, setCopied] = React.useState(false);
  const currentCode = tabs[activeTab]?.code ?? "";
  const lines = currentCode.split("\n");

  function copyCode() {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="border-y border-border">
      <div className="mx-auto w-full max-w-[80rem] px-[5vw]">
        {/* Browser chrome */}
        <div className="flex items-center gap-1.5 border-b border-border px-4 py-2.5 bg-muted/10">
          <span className="size-2.5 rounded-full bg-red-400/80" />
          <span className="size-2.5 rounded-full bg-yellow-400/80" />
          <span className="size-2.5 rounded-full bg-green-400/80" />
          <div className="ml-4 flex items-center gap-1">
            {tabs.map((tab, i) => (
              <button
                key={tab.label}
                onClick={() => setActiveTab(i)}
                className={`px-3 py-1 rounded text-xs transition-colors ${
                  i === activeTab
                    ? "bg-background shadow-sm text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <button
            onClick={copyCode}
            className="ml-auto text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            {copied ? "Copied!" : "Copy code"}
          </button>
        </div>

        {/* Code + output panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
          <div className="bg-zinc-950 p-4 font-mono text-xs leading-relaxed overflow-x-auto">
            {lines.map((line, i) => renderCodeLine(line, i))}
          </div>
          <div className="relative bg-background p-4 font-mono text-xs leading-relaxed">
            <span className="absolute top-3 right-4 text-[10px] font-mono text-muted-foreground">
              {outputLabel}
            </span>
            <pre className="text-muted-foreground whitespace-pre-wrap mt-4">
              {output}
            </pre>
          </div>
        </div>

        {/* Optional skill block */}
        {skillCommand && (
          <div className="border-t border-border bg-muted/10 px-8 py-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              {skillHeading && (
                <h3 className="text-base font-semibold mb-1">{skillHeading}</h3>
              )}
              {skillDescription && (
                <p className="text-sm text-muted-foreground">
                  {skillDescription}
                </p>
              )}
            </div>
            <TerminalMockup title="bash">
              <div>
                <span className="text-green-400">$</span>{" "}
                <span className="text-primary">{skillCommand}</span>
              </div>
              {skillCapabilities.map((cap, i) => (
                <div key={i} className="text-zinc-500">
                  # {cap}
                </div>
              ))}
            </TerminalMockup>
          </div>
        )}
      </div>
    </div>
  );
}

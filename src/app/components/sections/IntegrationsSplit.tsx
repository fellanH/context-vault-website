import { Github, Puzzle } from "lucide-react";
import { ArrowRight } from "lucide-react";

interface LogoItem {
  name: string;
  logo?: string;
}

interface CommitItem {
  title: string;
  number: string;
  date: string;
}

interface IntegrationsSplitProps {
  integrationsHeading?: string;
  integrationsDescription?: string;
  integrationsCTA?: string;
  integrationsCTAHref?: string;
  integrations: LogoItem[];
  openSourceHeading?: string;
  openSourceDescription?: string;
  repoName?: string;
  stars?: string;
  commits?: CommitItem[];
  repoCTA?: string;
  repoCTAHref?: string;
}

export function IntegrationsSplit({
  integrationsHeading = "Works with your tools",
  integrationsDescription = "Connect Context Vault to any MCP-compatible AI client in minutes.",
  integrationsCTA = "Browse integrations",
  integrationsCTAHref = "#",
  integrations = [],
  openSourceHeading = "Open source at its core",
  openSourceDescription = "The Context Vault server is open-source. Self-host it, contribute to it, or build on top of it.",
  repoName,
  stars,
  commits = [],
  repoCTA = "View on GitHub",
  repoCTAHref = "#",
}: IntegrationsSplitProps) {
  return (
    <div className="border-y border-border">
      <div className="mx-auto w-full max-w-[80rem] grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
        {/* Left: integrations */}
        <div className="px-8 py-10">
          <Puzzle className="size-5 text-muted-foreground/40 stroke-[1.25] mb-4" />
          <h3 className="text-xl font-semibold tracking-tight mb-2">
            {integrationsHeading}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            {integrationsDescription}
          </p>
          <a
            href={integrationsCTAHref}
            className="inline-flex items-center gap-1.5 rounded-md border border-border px-4 py-2 text-sm hover:bg-muted/30 transition-colors"
          >
            {integrationsCTA}
            <ArrowRight className="size-3.5" />
          </a>
          {integrations.length > 0 && (
            <div className="grid grid-cols-3 gap-3 mt-6">
              {integrations.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center gap-2 rounded-md border border-border px-3 py-2 text-xs text-muted-foreground overflow-hidden"
                >
                  {item.logo && (
                    <img
                      src={`https://cdn.simpleicons.org/${item.logo}`}
                      width={14}
                      height={14}
                      alt=""
                      className="flex-shrink-0 opacity-60"
                    />
                  )}
                  <span className="truncate">{item.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: open source */}
        <div className="px-8 py-10">
          <Github className="size-5 text-muted-foreground/40 stroke-[1.25] mb-4" />
          <h3 className="text-xl font-semibold tracking-tight mb-2">
            {openSourceHeading}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            {openSourceDescription}
          </p>
          <a
            href={repoCTAHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md border border-border px-4 py-2 text-sm hover:bg-muted/30 transition-colors"
          >
            {repoCTA}
            <ArrowRight className="size-3.5" />
          </a>
          {repoName && (
            <div className="mt-6 rounded-md border border-border overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/10">
                <span className="font-mono text-xs text-primary">
                  {repoName}
                </span>
                {stars && (
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                    ★ {stars}
                  </span>
                )}
              </div>
              {commits.map((commit, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between px-4 py-2.5 border-b last:border-0 border-border text-xs"
                >
                  <span className="text-foreground truncate mr-4">
                    {commit.title}
                  </span>
                  <span className="text-muted-foreground flex-shrink-0 font-mono">
                    {commit.number} · {commit.date}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import { Link, Outlet, useLocation } from "react-router";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { docsQuickstartUrl } from "../lib/links";

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <Button
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      variant="ghost"
      size="icon"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="hidden sm:inline-flex"
    >
      {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </Button>
  );
}

export function MarketingLayout() {
  const location = useLocation();
  const onBlog = location.pathname.startsWith("/blog");
  const onGetStarted = location.pathname === "/get-started";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground focus:shadow-lg"
      >
        Skip to content
      </a>
      <header className="sticky top-0 z-50 border-b border-border/80 backdrop-blur-xl backdrop-saturate-150 bg-background/80">
        <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-6">
          <Link to="/" className="text-base font-semibold tracking-tight">
            context-vault<span className="text-primary ml-0.5">✦</span>
          </Link>

          <nav className="flex items-center gap-2">
            <Button asChild variant={onBlog ? "secondary" : "ghost"} size="sm">
              <Link to="/blog">Blog</Link>
            </Button>
            <Button
              asChild
              variant={onGetStarted ? "secondary" : "ghost"}
              size="sm"
            >
              <Link to="/get-started">Get Started</Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <a href={docsQuickstartUrl} target="_blank" rel="noreferrer">
                Docs
              </a>
            </Button>
            <ThemeToggle />
            <Button asChild size="sm" className="rounded-full">
              <a
                href="https://github.com/fellanH/context-vault"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            </Button>
          </nav>
        </div>
      </header>

      <Outlet />

      <footer className="border-t border-border/80">
        <div className="mx-auto w-full max-w-6xl px-6 py-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Context Vault. Memory layer for AI
              agents.
            </p>
            <div className="flex items-center gap-3">
              <Button asChild variant="link" size="sm" className="px-0">
                <a
                  href="https://github.com/fellanH/context-vault"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
              </Button>
              <Button asChild variant="link" size="sm" className="px-0">
                <Link to="/privacy">Privacy</Link>
              </Button>
              <Button asChild variant="link" size="sm" className="px-0">
                <Link to="/support">Support</Link>
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

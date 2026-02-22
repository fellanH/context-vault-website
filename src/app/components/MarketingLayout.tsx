import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { appHref, docsQuickstartUrl } from "../lib/links";

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

type SubscribeStatus = "idle" | "loading" | "success" | "error";

export function MarketingLayout() {
  const location = useLocation();
  const onBlog = location.pathname.startsWith("/blog");
  const onGetStarted = location.pathname === "/get-started";
  const [email, setEmail] = useState("");
  const [subscribeStatus, setSubscribeStatus] =
    useState<SubscribeStatus>("idle");

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    setSubscribeStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setSubscribeStatus(res.ok ? "success" : "error");
    } catch {
      setSubscribeStatus("error");
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border/80 bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
          <Link to="/" className="text-base font-semibold tracking-tight">
            context-vault
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
            <Button asChild size="sm">
              <a href={appHref("/register")}>Start free</a>
            </Button>
          </nav>
        </div>
      </header>

      <Outlet />

      <footer className="border-t border-border/80">
        <div className="mx-auto w-full max-w-6xl px-6 py-10">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium">Stay updated</p>
              <p className="text-xs text-muted-foreground">
                Get updates on new features and releases.
              </p>
            </div>
            {subscribeStatus === "success" ? (
              <p className="text-sm text-muted-foreground">
                You're subscribed. Thanks!
              </p>
            ) : (
              <div className="flex flex-col gap-1.5">
                <form
                  onSubmit={handleSubscribe}
                  className="flex w-full gap-2 sm:w-auto"
                >
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={subscribeStatus === "loading"}
                    className="w-full sm:w-56"
                  />
                  <Button
                    type="submit"
                    size="sm"
                    disabled={subscribeStatus === "loading"}
                  >
                    {subscribeStatus === "loading" ? "..." : "Subscribe"}
                  </Button>
                </form>
                {subscribeStatus === "error" && (
                  <p className="text-xs text-destructive">
                    Something went wrong. Please try again.
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3 border-t border-border/40 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Context Vault — memory layer for AI
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

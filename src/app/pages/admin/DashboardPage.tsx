import { useEffect, useState } from "react";
import { Link } from "react-router";
import { FileText, Image, PenSquare, Type } from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { BlogPost } from "../../content/posts";

export function DashboardPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/cms/posts")
      .then((r) => r.json())
      .then((data: BlogPost[]) => {
        setPosts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const recent = posts.slice(0, 5);

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage blog posts, landing copy, and images.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total posts</CardDescription>
            <CardTitle className="text-2xl">
              {loading ? "—" : posts.length}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="text-sm font-medium mb-3">Quick actions</h2>
        <div className="grid grid-cols-3 gap-3">
          <Link
            to="/admin/posts/new"
            className="flex flex-col items-center gap-2 rounded-lg border border-border p-4 text-center hover:bg-muted/40 transition-colors"
          >
            <PenSquare className="size-5 text-primary" />
            <span className="text-sm font-medium">New post</span>
          </Link>
          <Link
            to="/admin/copy"
            className="flex flex-col items-center gap-2 rounded-lg border border-border p-4 text-center hover:bg-muted/40 transition-colors"
          >
            <Type className="size-5 text-primary" />
            <span className="text-sm font-medium">Edit copy</span>
          </Link>
          <Link
            to="/admin/images"
            className="flex flex-col items-center gap-2 rounded-lg border border-border p-4 text-center hover:bg-muted/40 transition-colors"
          >
            <Image className="size-5 text-primary" />
            <span className="text-sm font-medium">Images</span>
          </Link>
        </div>
      </div>

      {/* Recent posts */}
      {recent.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-medium">Recent posts</h2>
            <Button asChild variant="ghost" size="sm">
              <Link to="/admin/posts">View all</Link>
            </Button>
          </div>
          <div className="rounded-lg border border-border divide-y divide-border">
            {recent.map((post) => (
              <div
                key={post.slug}
                className="flex items-center justify-between px-4 py-3 hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <FileText className="size-4 text-muted-foreground shrink-0" />
                  <span className="text-sm truncate">{post.title}</span>
                  <span className="text-xs text-muted-foreground shrink-0">
                    {post.category}
                  </span>
                </div>
                <Button asChild variant="ghost" size="sm">
                  <Link to={`/admin/posts/${post.slug}`}>Edit</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

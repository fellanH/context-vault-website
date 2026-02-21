import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type { BlogPost } from "../../content/posts";

export function PostsListPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadPosts() {
    const res = await fetch("/cms/posts");
    setPosts(await res.json());
    setLoading(false);
  }

  useEffect(() => {
    loadPosts();
  }, []);

  async function deletePost(slug: string) {
    await fetch(`/cms/posts/${encodeURIComponent(slug)}`, { method: "DELETE" });
    setPosts((prev) => prev.filter((p) => p.slug !== slug));
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Posts</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {posts.length} post{posts.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Button asChild size="sm">
          <Link to="/admin/posts/new">
            <Plus className="size-4" />
            New post
          </Link>
        </Button>
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground">Loading…</p>
      ) : posts.length === 0 ? (
        <p className="text-sm text-muted-foreground">No posts yet.</p>
      ) : (
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">
                  Title
                </th>
                <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">
                  Category
                </th>
                <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">
                  Date
                </th>
                <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">
                  Read time
                </th>
                <th className="px-4 py-2.5" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {posts.map((post) => (
                <tr
                  key={post.slug}
                  className="hover:bg-muted/20 transition-colors"
                >
                  <td className="px-4 py-3 font-medium max-w-xs">
                    <span className="line-clamp-1">{post.title}</span>
                    <span className="text-xs text-muted-foreground font-normal block font-mono">
                      {post.slug}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {post.category}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {post.publishedAt}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {post.readTimeMinutes} min
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 justify-end">
                      <Button
                        asChild
                        variant="ghost"
                        size="icon"
                        className="size-8"
                      >
                        <Link to={`/admin/posts/${post.slug}`}>
                          <Pencil className="size-3.5" />
                        </Link>
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-8 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="size-3.5" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete post?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will remove "{post.title}" from posts.json.
                              This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => deletePost(post.slug)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

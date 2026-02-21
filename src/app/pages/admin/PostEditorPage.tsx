import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Plus, Trash2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { BlogPost, BlogPostSection } from "../../content/posts";

const CATEGORIES = [
  "Integration",
  "Playbook",
  "Architecture",
  "Education",
  "Comparison",
] as const;

function slugify(str: string) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function emptyPost(): BlogPost {
  return {
    slug: "",
    title: "",
    description: "",
    category: "Integration",
    publishedAt: new Date().toISOString().slice(0, 10),
    readTimeMinutes: 5,
    ctaLabel: "Start free",
    ctaHref: "/register",
    sections: [{ heading: "", paragraphs: [""] }],
  };
}

export function PostEditorPage() {
  const { slug } = useParams<{ slug?: string }>();
  const navigate = useNavigate();
  const isNew = !slug || slug === "new";

  const [post, setPost] = useState<BlogPost>(emptyPost());
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isNew) return;
    fetch("/cms/posts")
      .then((r) => r.json())
      .then((posts: BlogPost[]) => {
        const found = posts.find((p) => p.slug === slug);
        if (found) {
          setPost(found);
          setSlugManuallyEdited(true);
        }
      });
  }, [slug, isNew]);

  function setField<K extends keyof BlogPost>(key: K, value: BlogPost[K]) {
    setPost((prev) => ({ ...prev, [key]: value }));
  }

  function handleTitleChange(title: string) {
    setPost((prev) => ({
      ...prev,
      title,
      slug: slugManuallyEdited ? prev.slug : slugify(title),
    }));
  }

  function updateSection(idx: number, updates: Partial<BlogPostSection>) {
    setPost((prev) => {
      const sections = [...prev.sections];
      sections[idx] = { ...sections[idx], ...updates };
      return { ...prev, sections };
    });
  }

  function addParagraph(sectionIdx: number) {
    setPost((prev) => {
      const sections = [...prev.sections];
      sections[sectionIdx] = {
        ...sections[sectionIdx],
        paragraphs: [...sections[sectionIdx].paragraphs, ""],
      };
      return { ...prev, sections };
    });
  }

  function removeParagraph(sectionIdx: number, paraIdx: number) {
    setPost((prev) => {
      const sections = [...prev.sections];
      const paragraphs = sections[sectionIdx].paragraphs.filter(
        (_, i) => i !== paraIdx,
      );
      sections[sectionIdx] = { ...sections[sectionIdx], paragraphs };
      return { ...prev, sections };
    });
  }

  function addSection() {
    setPost((prev) => ({
      ...prev,
      sections: [...prev.sections, { heading: "", paragraphs: [""] }],
    }));
  }

  function removeSection(idx: number) {
    setPost((prev) => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== idx),
    }));
  }

  async function save() {
    setSaving(true);
    setError("");
    try {
      const method = isNew ? "POST" : "PUT";
      const url = isNew
        ? "/cms/posts"
        : `/cms/posts/${encodeURIComponent(slug!)}`;
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post),
      });
      if (!res.ok) throw new Error(await res.text());
      navigate("/admin/posts");
    } catch (e) {
      setError(String(e));
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-2xl space-y-8">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/admin/posts")}
          className="size-8"
        >
          <ArrowLeft className="size-4" />
        </Button>
        <h1 className="text-xl font-semibold tracking-tight">
          {isNew ? "New post" : "Edit post"}
        </h1>
      </div>

      {error && (
        <p className="text-sm text-destructive bg-destructive/10 rounded-md px-3 py-2">
          {error}
        </p>
      )}

      <div className="space-y-4">
        {/* Title */}
        <div className="space-y-1.5">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={post.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Post title"
          />
        </div>

        {/* Slug */}
        <div className="space-y-1.5">
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            value={post.slug}
            onChange={(e) => {
              setSlugManuallyEdited(true);
              setField("slug", e.target.value);
            }}
            placeholder="url-slug"
            className="font-mono text-sm"
          />
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="description">Description</Label>
            <span className="text-xs text-muted-foreground">
              {post.description.length} chars
            </span>
          </div>
          <Textarea
            id="description"
            value={post.description}
            onChange={(e) => setField("description", e.target.value)}
            placeholder="One-sentence description for the blog index and SEO"
            rows={2}
          />
        </div>

        {/* Category + date + read time row */}
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <Label>Category</Label>
            <Select
              value={post.category}
              onValueChange={(v) =>
                setField("category", v as BlogPost["category"])
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="publishedAt">Published</Label>
            <Input
              id="publishedAt"
              type="date"
              value={post.publishedAt}
              onChange={(e) => setField("publishedAt", e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="readTime">Read time (min)</Label>
            <Input
              id="readTime"
              type="number"
              min={1}
              value={post.readTimeMinutes}
              onChange={(e) =>
                setField("readTimeMinutes", parseInt(e.target.value) || 1)
              }
            />
          </div>
        </div>

        {/* CTA */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="ctaLabel">CTA label</Label>
            <Input
              id="ctaLabel"
              value={post.ctaLabel}
              onChange={(e) => setField("ctaLabel", e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="ctaHref">CTA href</Label>
            <Input
              id="ctaHref"
              value={post.ctaHref}
              onChange={(e) => setField("ctaHref", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium">Sections</h2>
          <Button variant="outline" size="sm" onClick={addSection}>
            <Plus className="size-3.5" />
            Add section
          </Button>
        </div>

        {post.sections.map((section, si) => (
          <div
            key={si}
            className="rounded-lg border border-border p-4 space-y-3"
          >
            <div className="flex items-center justify-between gap-2">
              <Input
                value={section.heading}
                onChange={(e) => updateSection(si, { heading: e.target.value })}
                placeholder="Section heading"
                className="font-medium"
              />
              {post.sections.length > 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8 shrink-0 text-destructive hover:text-destructive"
                  onClick={() => removeSection(si)}
                >
                  <Trash2 className="size-3.5" />
                </Button>
              )}
            </div>

            <div className="space-y-2">
              {section.paragraphs.map((para, pi) => (
                <div key={pi} className="flex gap-2">
                  <Textarea
                    value={para}
                    onChange={(e) => {
                      const paragraphs = [...section.paragraphs];
                      paragraphs[pi] = e.target.value;
                      updateSection(si, { paragraphs });
                    }}
                    placeholder={`Paragraph ${pi + 1}`}
                    rows={3}
                    className="flex-1 text-sm"
                  />
                  {section.paragraphs.length > 1 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8 shrink-0 self-start mt-1 text-muted-foreground hover:text-destructive"
                      onClick={() => removeParagraph(si, pi)}
                    >
                      <Trash2 className="size-3.5" />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => addParagraph(si)}
              className="text-xs"
            >
              <Plus className="size-3" />
              Add paragraph
            </Button>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3 pt-2 border-t border-border">
        <Button onClick={save} disabled={saving}>
          {saving ? "Saving…" : isNew ? "Create post" : "Save changes"}
        </Button>
        <Button variant="ghost" onClick={() => navigate("/admin/posts")}>
          Cancel
        </Button>
      </div>
    </div>
  );
}

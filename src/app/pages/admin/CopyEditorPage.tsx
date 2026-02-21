import { useEffect, useState } from "react";
import { Plus, Trash2, Save } from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// ─── Types (mirror landing.json shape) ────────────────────────────────────────

type PanelLine = { text: string; variant?: string };

type HeroData = {
  badge: string;
  badgeHref: string;
  heading: string;
  accentWord: string;
  subtitle: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  trustPoints: string[];
  leftPanelBadge: string;
  leftPanelLines: PanelLine[];
  rightPanelBadge: string;
  rightPanelLines: string[];
};

type StatItem = { value: string; label: string; description: string };
type FeatureItem = {
  iconName: string;
  title: string;
  description: string;
};
type FaqItem = { question: string; answer: string };
type FaqCategory = { category: string; items: FaqItem[] };

type LandingData = {
  hero: HeroData;
  stats: StatItem[];
  features: FeatureItem[];
  faqs: FaqCategory[];
};

const ICON_OPTIONS = [
  "FileText",
  "Zap",
  "Globe",
  "Lock",
  "Layers",
  "Database",
  "Shield",
  "Star",
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function SaveButton({
  onSave,
  saving,
}: {
  onSave: () => void;
  saving: boolean;
}) {
  return (
    <Button onClick={onSave} disabled={saving} size="sm" className="gap-1.5">
      <Save className="size-3.5" />
      {saving ? "Saving…" : "Save"}
    </Button>
  );
}

// ─── Hero Tab ─────────────────────────────────────────────────────────────────

function HeroTab({
  hero,
  onChange,
}: {
  hero: HeroData;
  onChange: (h: HeroData) => void;
}) {
  function set<K extends keyof HeroData>(key: K, value: HeroData[K]) {
    onChange({ ...hero, [key]: value });
  }

  function updateTrustPoint(idx: number, val: string) {
    const tp = [...hero.trustPoints];
    tp[idx] = val;
    set("trustPoints", tp);
  }

  function updateLeftLine(idx: number, field: keyof PanelLine, val: string) {
    const lines = [...hero.leftPanelLines];
    lines[idx] = { ...lines[idx], [field]: val };
    set("leftPanelLines", lines);
  }

  function updateRightLine(idx: number, val: string) {
    const lines = [...hero.rightPanelLines];
    lines[idx] = val;
    set("rightPanelLines", lines);
  }

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label>Badge text</Label>
          <Input
            value={hero.badge}
            onChange={(e) => set("badge", e.target.value)}
          />
        </div>
        <div className="space-y-1.5">
          <Label>Badge href</Label>
          <Input
            value={hero.badgeHref}
            onChange={(e) => set("badgeHref", e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label>Heading</Label>
        <Input
          value={hero.heading}
          onChange={(e) => set("heading", e.target.value)}
        />
      </div>

      <div className="space-y-1.5">
        <Label>Accent word (highlighted in heading)</Label>
        <Input
          value={hero.accentWord}
          onChange={(e) => set("accentWord", e.target.value)}
        />
      </div>

      <div className="space-y-1.5">
        <Label>Subtitle</Label>
        <Textarea
          value={hero.subtitle}
          onChange={(e) => set("subtitle", e.target.value)}
          rows={2}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label>Primary CTA label</Label>
          <Input
            value={hero.primaryCta.label}
            onChange={(e) =>
              set("primaryCta", { ...hero.primaryCta, label: e.target.value })
            }
          />
        </div>
        <div className="space-y-1.5">
          <Label>Primary CTA href</Label>
          <Input
            value={hero.primaryCta.href}
            onChange={(e) =>
              set("primaryCta", { ...hero.primaryCta, href: e.target.value })
            }
          />
        </div>
        <div className="space-y-1.5">
          <Label>Secondary CTA label</Label>
          <Input
            value={hero.secondaryCta.label}
            onChange={(e) =>
              set("secondaryCta", {
                ...hero.secondaryCta,
                label: e.target.value,
              })
            }
          />
        </div>
        <div className="space-y-1.5">
          <Label>Secondary CTA href</Label>
          <Input
            value={hero.secondaryCta.href}
            onChange={(e) =>
              set("secondaryCta", {
                ...hero.secondaryCta,
                href: e.target.value,
              })
            }
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label>Trust points</Label>
        {hero.trustPoints.map((tp, i) => (
          <Input
            key={i}
            value={tp}
            onChange={(e) => updateTrustPoint(i, e.target.value)}
            placeholder={`Trust point ${i + 1}`}
          />
        ))}
      </div>

      <div className="space-y-1.5">
        <Label>Left panel badge</Label>
        <Input
          value={hero.leftPanelBadge}
          onChange={(e) => set("leftPanelBadge", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>Left panel lines</Label>
        {hero.leftPanelLines.map((line, i) => (
          <div key={i} className="flex gap-2">
            <Input
              value={line.text}
              onChange={(e) => updateLeftLine(i, "text", e.target.value)}
              placeholder="Line text"
              className="flex-1 font-mono text-xs"
            />
            <Select
              value={line.variant ?? "default"}
              onValueChange={(v) =>
                updateLeftLine(i, "variant", v === "default" ? "" : v)
              }
            >
              <SelectTrigger className="w-28 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">default</SelectItem>
                <SelectItem value="command">command</SelectItem>
                <SelectItem value="success">success</SelectItem>
                <SelectItem value="muted">muted</SelectItem>
              </SelectContent>
            </Select>
          </div>
        ))}
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            set("leftPanelLines", [...hero.leftPanelLines, { text: "" }])
          }
        >
          <Plus className="size-3.5" />
          Add line
        </Button>
      </div>

      <div className="space-y-2">
        <Label>Right panel lines</Label>
        {hero.rightPanelLines.map((line, i) => (
          <Input
            key={i}
            value={line}
            onChange={(e) => updateRightLine(i, e.target.value)}
            placeholder="Line text"
            className="font-mono text-xs"
          />
        ))}
        <Button
          variant="outline"
          size="sm"
          onClick={() => set("rightPanelLines", [...hero.rightPanelLines, ""])}
        >
          <Plus className="size-3.5" />
          Add line
        </Button>
      </div>
    </div>
  );
}

// ─── Stats Tab ────────────────────────────────────────────────────────────────

function StatsTab({
  stats,
  onChange,
}: {
  stats: StatItem[];
  onChange: (s: StatItem[]) => void;
}) {
  function update(idx: number, field: keyof StatItem, val: string) {
    const next = [...stats];
    next[idx] = { ...next[idx], [field]: val };
    onChange(next);
  }

  return (
    <div className="space-y-4">
      {stats.map((stat, i) => (
        <div key={i} className="rounded-lg border border-border p-4 space-y-3">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Stat {i + 1}
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Value</Label>
              <Input
                value={stat.value}
                onChange={(e) => update(i, "value", e.target.value)}
                placeholder="e.g. < 5 min"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Label</Label>
              <Input
                value={stat.label}
                onChange={(e) => update(i, "label", e.target.value)}
                placeholder="e.g. Setup time"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>Description</Label>
            <Textarea
              value={stat.description}
              onChange={(e) => update(i, "description", e.target.value)}
              rows={2}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Features Tab ─────────────────────────────────────────────────────────────

function FeaturesTab({
  features,
  onChange,
}: {
  features: FeatureItem[];
  onChange: (f: FeatureItem[]) => void;
}) {
  function update(idx: number, field: keyof FeatureItem, val: string) {
    const next = [...features];
    next[idx] = { ...next[idx], [field]: val };
    onChange(next);
  }

  return (
    <div className="space-y-4">
      {features.map((feat, i) => (
        <div key={i} className="rounded-lg border border-border p-4 space-y-3">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Feature {i + 1}
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Icon</Label>
              <Select
                value={feat.iconName}
                onValueChange={(v) => update(i, "iconName", v)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ICON_OPTIONS.map((name) => (
                    <SelectItem key={name} value={name}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Title</Label>
              <Input
                value={feat.title}
                onChange={(e) => update(i, "title", e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>Description</Label>
            <Textarea
              value={feat.description}
              onChange={(e) => update(i, "description", e.target.value)}
              rows={2}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── FAQs Tab ─────────────────────────────────────────────────────────────────

function FaqsTab({
  faqs,
  onChange,
}: {
  faqs: FaqCategory[];
  onChange: (f: FaqCategory[]) => void;
}) {
  function updateItem(
    catIdx: number,
    itemIdx: number,
    field: keyof FaqItem,
    val: string,
  ) {
    const next = faqs.map((cat, ci) => {
      if (ci !== catIdx) return cat;
      const items = cat.items.map((item, ii) =>
        ii === itemIdx ? { ...item, [field]: val } : item,
      );
      return { ...cat, items };
    });
    onChange(next);
  }

  function addItem(catIdx: number) {
    const next = faqs.map((cat, ci) => {
      if (ci !== catIdx) return cat;
      return { ...cat, items: [...cat.items, { question: "", answer: "" }] };
    });
    onChange(next);
  }

  function removeItem(catIdx: number, itemIdx: number) {
    const next = faqs.map((cat, ci) => {
      if (ci !== catIdx) return cat;
      return { ...cat, items: cat.items.filter((_, ii) => ii !== itemIdx) };
    });
    onChange(next);
  }

  return (
    <div className="space-y-6">
      {faqs.map((cat, ci) => (
        <div key={ci} className="space-y-3">
          <h3 className="text-sm font-medium">{cat.category}</h3>
          {cat.items.map((item, ii) => (
            <div
              key={ii}
              className="rounded-lg border border-border p-4 space-y-3"
            >
              <div className="flex items-center justify-between gap-2">
                <Input
                  value={item.question}
                  onChange={(e) =>
                    updateItem(ci, ii, "question", e.target.value)
                  }
                  placeholder="Question"
                  className="font-medium"
                />
                {cat.items.length > 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 shrink-0 text-destructive hover:text-destructive"
                    onClick={() => removeItem(ci, ii)}
                  >
                    <Trash2 className="size-3.5" />
                  </Button>
                )}
              </div>
              <Textarea
                value={item.answer}
                onChange={(e) => updateItem(ci, ii, "answer", e.target.value)}
                placeholder="Answer"
                rows={3}
                className="text-sm"
              />
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={() => addItem(ci)}>
            <Plus className="size-3.5" />
            Add question
          </Button>
        </div>
      ))}
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export function CopyEditorPage() {
  const [data, setData] = useState<LandingData | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/cms/landing")
      .then((r) => r.json())
      .then((d: LandingData) => setData(d));
  }, []);

  async function save() {
    if (!data) return;
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/cms/landing", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(await res.text());
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (e) {
      setError(String(e));
    } finally {
      setSaving(false);
    }
  }

  if (!data) {
    return <p className="text-sm text-muted-foreground">Loading…</p>;
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Copy editor</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Edit landing page content. Changes save to{" "}
            <code className="font-mono text-xs">landing.json</code>.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {saved && (
            <span className="text-xs text-green-600 font-medium">Saved!</span>
          )}
          <SaveButton onSave={save} saving={saving} />
        </div>
      </div>

      {error && (
        <p className="text-sm text-destructive bg-destructive/10 rounded-md px-3 py-2">
          {error}
        </p>
      )}

      <Tabs defaultValue="hero">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="hero">Hero</TabsTrigger>
          <TabsTrigger value="stats">Stats</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="faqs">FAQs</TabsTrigger>
        </TabsList>

        <TabsContent value="hero" className="pt-4">
          <HeroTab
            hero={data.hero}
            onChange={(hero) => setData((prev) => prev && { ...prev, hero })}
          />
        </TabsContent>

        <TabsContent value="stats" className="pt-4">
          <StatsTab
            stats={data.stats}
            onChange={(stats) => setData((prev) => prev && { ...prev, stats })}
          />
        </TabsContent>

        <TabsContent value="features" className="pt-4">
          <FeaturesTab
            features={data.features}
            onChange={(features) =>
              setData((prev) => prev && { ...prev, features })
            }
          />
        </TabsContent>

        <TabsContent value="faqs" className="pt-4">
          <FaqsTab
            faqs={data.faqs}
            onChange={(faqs) => setData((prev) => prev && { ...prev, faqs })}
          />
        </TabsContent>
      </Tabs>

      <div className="flex items-center gap-2 pt-4 border-t border-border">
        {saved && (
          <span className="text-xs text-green-600 font-medium">Saved!</span>
        )}
        <SaveButton onSave={save} saving={saving} />
      </div>
    </div>
  );
}

import { useEffect, useRef, useState } from "react";
import { Copy, Trash2, Upload } from "lucide-react";
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

export function ImagesPage() {
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function loadImages() {
    const res = await fetch("/cms/images");
    setImages(await res.json());
  }

  useEffect(() => {
    loadImages();
  }, []);

  async function uploadFile(file: File) {
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    await fetch("/cms/images", { method: "POST", body: fd });
    await loadImages();
    setUploading(false);
  }

  async function handleFiles(files: FileList | null) {
    if (!files) return;
    for (const file of Array.from(files)) {
      await uploadFile(file);
    }
  }

  async function deleteImage(filename: string) {
    await fetch(`/cms/images/${encodeURIComponent(filename)}`, {
      method: "DELETE",
    });
    setImages((prev) => prev.filter((f) => f !== filename));
  }

  function copyPath(filename: string) {
    navigator.clipboard.writeText(`/images/${filename}`);
    setCopied(filename);
    setTimeout(() => setCopied(null), 1500);
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Images</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Files in <code className="font-mono text-xs">public/images/</code>
        </p>
      </div>

      {/* Upload zone */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
        className="rounded-lg border-2 border-dashed border-border p-8 text-center hover:border-primary/40 transition-colors cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
      >
        <Upload className="size-6 mx-auto text-muted-foreground mb-2" />
        <p className="text-sm font-medium">
          {uploading ? "Uploading…" : "Drop files here or click to upload"}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          PNG, JPG, WebP, SVG, GIF
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {/* Image grid */}
      {images.length === 0 ? (
        <p className="text-sm text-muted-foreground">No images yet.</p>
      ) : (
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-4">
          {images.map((filename) => (
            <div
              key={filename}
              className="group relative rounded-lg border border-border overflow-hidden bg-muted/20"
            >
              <img
                src={`/images/${filename}`}
                alt={filename}
                className="w-full h-32 object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => copyPath(filename)}
                  className="text-xs h-7"
                >
                  <Copy className="size-3" />
                  {copied === filename ? "Copied!" : "Copy path"}
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="text-xs h-7"
                    >
                      <Trash2 className="size-3" />
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete image?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete "{filename}".
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => deleteImage(filename)}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
              <p className="text-xs text-muted-foreground truncate px-2 py-1.5">
                {filename}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

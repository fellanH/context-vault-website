import raw from "./posts.json";

export type BlogPostSection = {
  heading: string;
  paragraphs: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  category:
    | "Integration"
    | "Playbook"
    | "Architecture"
    | "Education"
    | "Comparison";
  publishedAt: string;
  readTimeMinutes: number;
  ctaLabel: string;
  ctaHref: string;
  sections: BlogPostSection[];
};

export const posts: BlogPost[] = raw as BlogPost[];

export function getPostBySlug(slug?: string) {
  return posts.find((post) => post.slug === slug);
}

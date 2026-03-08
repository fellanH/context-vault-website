import React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/components/ui/utils";
import type { LucideIcon } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  category: string;
  items: Array<FAQItem>;
}

interface FAQSectionProps {
  sectionTagIcon?: LucideIcon;
  sectionTag?: string;
  heading?: string;
  /** Word inside heading to render in primary color */
  accentWord?: string;
  subtitle?: string;
  categories: Array<FAQCategory>;
}

function AccordionItem({ question, answer }: FAQItem) {
  const [open, setOpen] = React.useState(false);
  const panelId = React.useId();
  return (
    <div className="border-b border-border last:border-b-0">
      <button
        className="flex w-full items-center justify-between py-4 text-left text-sm gap-4"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={panelId}
      >
        <span className="font-medium text-foreground">{question}</span>
        <ChevronDown
          className={cn(
            "size-4 flex-shrink-0 text-muted-foreground transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>
      <p
        id={panelId}
        hidden={!open}
        className="pb-4 text-sm text-muted-foreground leading-relaxed"
      >
        {answer}
      </p>
    </div>
  );
}

export function FAQSection({
  sectionTagIcon: TagIcon,
  sectionTag,
  heading = "Frequently asked questions",
  accentWord,
  subtitle,
  categories,
}: FAQSectionProps) {
  const renderHeading = () => {
    if (!accentWord || !heading.includes(accentWord)) {
      return (
        <h2 className="text-3xl font-semibold tracking-tight text-center">
          {heading}
        </h2>
      );
    }
    const [before, after] = heading.split(accentWord);
    return (
      <h2 className="text-3xl font-semibold tracking-tight text-center">
        {before}
        <span className="text-primary">{accentWord}</span>
        {after}
      </h2>
    );
  };

  return (
    <div className="py-16">
      <div className="mx-auto w-full max-w-3xl px-6">
        {/* Section header */}
        <div className="py-14 text-center">
          {sectionTag && (
            <div className="mb-4 inline-flex items-center gap-1.5">
              {TagIcon && <TagIcon className="size-3.5 text-primary" />}
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {sectionTag}
              </span>
            </div>
          )}
          {renderHeading()}
          {subtitle && (
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {/* Category groups */}
        <div>
          {categories.map((cat) => (
            <div key={cat.category}>
              <h3
                className={`text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3 ${categories.indexOf(cat) === 0 ? "mt-0" : "mt-8"}`}
              >
                {cat.category}
              </h3>
              <div className="rounded-2xl border border-border/60 bg-card shadow-[var(--shadow-card)] overflow-hidden">
                <div className="px-6">
                  {cat.items.map((item) => (
                    <AccordionItem
                      key={item.question}
                      question={item.question}
                      answer={item.answer}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

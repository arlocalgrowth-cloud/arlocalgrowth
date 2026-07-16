"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

type FaqItem = { q: string; a: string };
type FaqCategory = { id: string; label: string; items: FaqItem[] };

function FaqItem({ q, a }: FaqItem) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-google-border last:border-b-0">
      <button
        className="flex w-full items-center justify-between gap-4 py-4 text-left text-[15px] font-medium text-google-text hover:text-brand-blue transition-colors"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span>{q}</span>
        <ChevronDown
          size={18}
          className={`shrink-0 text-google-secondary transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <p className="speakable pb-4 text-[15px] leading-relaxed text-google-secondary pr-6">{a}</p>
      )}
    </div>
  );
}

export function FaqAccordion({ categories }: { categories: FaqCategory[] }) {
  return (
    <div className="space-y-10">
      {categories.map((cat) => (
        <section key={cat.id} id={cat.id} aria-label={cat.label}>
          <h2 className="text-lg font-semibold text-google-text mb-4 pb-2 border-b border-google-border">
            {cat.label}
          </h2>
          <div>
            {cat.items.map((item) => (
              <FaqItem key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

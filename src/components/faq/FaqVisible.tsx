type FaqItem = { q: string; a: string };
type FaqCategory = { id: string; label: string; items: FaqItem[] };

export function FaqVisible({ categories }: { categories: FaqCategory[] }) {
  return (
    <div className="space-y-12">
      {categories.map((cat) => (
        <section key={cat.id} id={cat.id} aria-label={cat.label}>
          <h2 className="text-lg font-semibold text-google-text mb-6 pb-2 border-b border-google-border">
            {cat.label}
          </h2>
          <dl className="space-y-6">
            {cat.items.map((item) => (
              <div
                key={item.q}
                className="border border-google-border rounded-card p-5 bg-white"
              >
                <dt className="font-semibold text-google-text mb-2 speakable">
                  {item.q}
                </dt>
                <dd className="text-body-sm text-google-secondary leading-relaxed speakable">
                  {item.a}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
    </div>
  );
}

export function FaqVisibleSimple({ items }: { items: FaqItem[] }) {
  return (
    <dl className="space-y-5">
      {items.map((item) => (
        <div
          key={item.q}
          className="border border-google-border rounded-card p-5 bg-white"
        >
          <dt className="font-semibold text-google-text mb-2 speakable">
            {item.q}
          </dt>
          <dd className="text-body-sm text-google-secondary leading-relaxed speakable">
            {item.a}
          </dd>
        </div>
      ))}
    </dl>
  );
}

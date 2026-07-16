import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CheckCircle, ArrowRight, Search, TrendingUp, BarChart3, Globe, MapPin } from "lucide-react";
import { FaqVisibleSimple } from "@/components/faq/FaqVisible";

const BASE_URL = "https://arlocalgrowth.de";

const pageMeta: Record<string, { title: string; description: string }> = {
  de: {
    title: "Local SEO — Lokale Suchmaschinenoptimierung für mehr Kunden",
    description:
      "Professionelles Local SEO für lokale Unternehmen in Deutschland. Bessere Rankings bei Google Maps und lokaler Suche. Mehr Anfragen, mehr Kunden, messbarer Erfolg.",
  },
  en: {
    title: "Local SEO — Local Search Engine Optimization for More Customers",
    description:
      "Professional Local SEO for local businesses in Germany. Better rankings on Google Maps and local search. More enquiries, more customers, measurable results.",
  },
  ru: {
    title: "Local SEO — локальная оптимизация для привлечения клиентов",
    description:
      "Профессиональный Local SEO для локального бизнеса в Германии. Лучшие позиции в Google Maps и локальном поиске. Больше обращений, больше клиентов.",
  },
};

export async function generateStaticParams() {
  return ["de", "en", "ru"].map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const m = pageMeta[locale] ?? pageMeta.de;
  const canonicalPath =
    locale === "de" ? "/leistungen/local-seo" : `/${locale}/leistungen/local-seo`;

  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: `${BASE_URL}${canonicalPath}`,
      languages: {
        de: `${BASE_URL}/leistungen/local-seo`,
        en: `${BASE_URL}/en/leistungen/local-seo`,
        ru: `${BASE_URL}/ru/leistungen/local-seo`,
      },
    },
    openGraph: { title: m.title, description: m.description, url: `${BASE_URL}${canonicalPath}` },
  };
}

export default async function LocalSeoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const homeBase = locale === "de" ? "" : `/${locale}`;
  const canonicalPath =
    locale === "de" ? "/leistungen/local-seo" : `/${locale}/leistungen/local-seo`;

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: locale === "de" ? BASE_URL : `${BASE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: locale === "ru" ? "Услуги" : locale === "en" ? "Services" : "Leistungen", item: `${BASE_URL}${homeBase}/#leistungen` },
      { "@type": "ListItem", position: 3, name: "Local SEO", item: `${BASE_URL}${canonicalPath}` },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: locale === "ru" ? "Local SEO — локальная оптимизация" : locale === "en" ? "Local SEO" : "Local SEO — Lokale Suchmaschinenoptimierung",
    description:
      locale === "ru"
        ? "Комплексный Local SEO: оптимизация Google Business Profile, NAP-консистентность, создание местных ссылок, управление отзывами и локальная стратегия ключевых слов."
        : locale === "en"
        ? "Comprehensive Local SEO: Google Business Profile optimization, NAP consistency, local link building, review management, and local keyword strategy."
        : "Umfassendes Local SEO: Google Business Profile Optimierung, NAP-Konsistenz, lokaler Linkaufbau, Bewertungsmanagement und lokale Keyword-Strategie.",
    provider: { "@type": "LocalBusiness", "@id": `${BASE_URL}/#business` },
    areaServed: [
      { "@type": "Country", name: "Germany" },
      { "@type": "Country", name: "Austria" },
      { "@type": "Country", name: "Switzerland" },
    ],
  };

  const faqItems =
    locale === "ru"
      ? [
          { q: "Что такое Local SEO?", a: "Local SEO (локальная поисковая оптимизация) — это комплекс мер по улучшению видимости вашего бизнеса в локальных результатах поиска Google. Включает оптимизацию Google Business Profile, NAP-консистентность, работу с отзывами и локальную стратегию ключевых слов." },
          { q: "Чем Local SEO отличается от обычного SEO?", a: "Local SEO фокусируется на локальных запросах типа «парикмахер рядом» или «стоматолог Берлин». Вместо обычных результатов поиска вы попадаете в Local Pack — карту Google с тремя ближайшими бизнесами. Это самое видимое место в поиске для локальных запросов." },
          { q: "Сколько времени занимает Local SEO?", a: "Первые улучшения видимости обычно заметны через 4–8 недель. Устойчивые позиции в Local Pack достигаются через 3–6 месяцев систематической работы. Local SEO — долгосрочная инвестиция с накопительным эффектом." },
          { q: "Нужен ли Local SEO малому бизнесу?", a: "Особенно для малого бизнеса. Крупные сети тратят миллионы на рекламу. Local SEO позволяет малому бизнесу конкурировать в своём городе или районе по конкретным локальным запросам." },
          { q: "Можно ли делать Local SEO самостоятельно?", a: "Базовые шаги — можно. Но систематическая работа с ключевыми словами, анализ конкурентов, NAP-консистентность и стратегия ссылок требуют опыта и постоянного внимания. Профессиональный Local SEO окупается значительно быстрее." },
        ]
      : locale === "en"
      ? [
          { q: "What is Local SEO?", a: "Local SEO is the process of optimizing your online presence to attract more business from relevant local searches. It includes Google Business Profile optimization, NAP consistency, review management, and local keyword strategy." },
          { q: "What is the difference between Local SEO and regular SEO?", a: "Local SEO targets searches with local intent — like 'hairdresser near me' or 'dentist Berlin'. Instead of regular blue-link results, you appear in the Google Local Pack — the map with three businesses shown above organic results. This is the most visible position for local searches." },
          { q: "How long does Local SEO take?", a: "Initial improvements in visibility are usually noticeable within 4–8 weeks. Stable positions in the Local Pack are typically achieved after 3–6 months of consistent work. Local SEO is a long-term investment with compounding returns." },
          { q: "Do small businesses need Local SEO?", a: "Local SEO is especially valuable for small businesses. Large chains spend millions on advertising. Local SEO allows a small business to compete in its city or neighbourhood for specific local searches — without a large budget." },
          { q: "What is NAP consistency?", a: "NAP stands for Name, Address, Phone number. NAP consistency means your business information is identical across all online directories, your website, and Google. Inconsistent NAP data confuses Google and hurts local rankings." },
        ]
      : [
          { q: "Was ist Local SEO?", a: "Local SEO (lokale Suchmaschinenoptimierung) umfasst alle Maßnahmen, mit denen Ihr Unternehmen bei lokalen Google-Suchanfragen besser gefunden wird. Dazu gehören Google Business Profile Optimierung, NAP-Konsistenz, Bewertungsmanagement und eine lokale Keyword-Strategie." },
          { q: "Was ist der Unterschied zwischen Local SEO und normaler SEO?", a: "Local SEO zielt auf Suchanfragen mit lokalem Bezug — wie 'Friseur in meiner Nähe' oder 'Zahnarzt Berlin'. Statt normaler Suchergebnisse erscheinen Sie im Local Pack — der Karte mit drei Unternehmen über den organischen Ergebnissen. Das ist die sichtbarste Position für lokale Suchen." },
          { q: "Wie lange dauert Local SEO?", a: "Erste Verbesserungen der Sichtbarkeit sind in der Regel innerhalb von 4–8 Wochen spürbar. Stabile Positionen im Local Pack werden nach 3–6 Monaten kontinuierlicher Arbeit erreicht. Local SEO ist eine langfristige Investition mit kumulierendem Effekt." },
          { q: "Was ist NAP-Konsistenz bei Local SEO?", a: "NAP steht für Name, Address, Phone — also Firmenname, Adresse und Telefonnummer. NAP-Konsistenz bedeutet, dass diese Daten in allen Online-Verzeichnissen, auf Ihrer Website und bei Google identisch sind. Inkonsistente Daten verwirren Google und schaden Ihrem lokalen Ranking." },
          { q: "Brauche ich Local SEO als kleines Unternehmen?", a: "Gerade für kleine Unternehmen ist Local SEO besonders wertvoll. Große Ketten geben Millionen für Werbung aus. Local SEO ermöglicht es kleinen Unternehmen, in ihrer Stadt oder ihrem Stadtteil bei spezifischen lokalen Anfragen zu konkurrieren — ohne großes Budget." },
        ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  const content =
    locale === "ru" ? (
      <RuContent homeBase={homeBase} />
    ) : locale === "en" ? (
      <EnContent homeBase={homeBase} />
    ) : (
      <DeContent homeBase={homeBase} />
    );

  const faqHeading = locale === "ru" ? "Часто задаваемые вопросы" : locale === "en" ? "Frequently Asked Questions" : "Häufige Fragen";
  const ctaHeading = locale === "ru" ? "Готовы улучшить позиции в Google?" : locale === "en" ? "Ready to improve your Google rankings?" : "Bereit für bessere Google Rankings?";
  const ctaText = locale === "ru"
    ? "Получите бесплатный аудит и узнайте, какие ключевые слова принесут вам больше клиентов."
    : locale === "en"
    ? "Get a free audit and find out which keywords will bring you more customers."
    : "Holen Sie sich ein kostenloses Audit und erfahren Sie, welche Keywords Ihnen mehr Kunden bringen.";
  const ctaBtn = locale === "ru" ? "Бесплатный аудит запросить" : locale === "en" ? "Request free audit" : "Kostenloses Audit anfragen";

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <main className="min-h-screen">
        {content}

        {/* FAQ */}
        <section className="section-padding bg-google-light">
          <div className="container-content mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold text-google-text mb-8 text-center">{faqHeading}</h2>
            <FaqVisibleSimple items={faqItems} />
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding">
          <div className="container-content mx-auto max-w-3xl text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-google-text mb-4">{ctaHeading}</h2>
            <p className="text-body-lg text-google-secondary mb-8 max-w-xl mx-auto">{ctaText}</p>
            <Link
              href={`${homeBase}/#audit`}
              className="inline-flex items-center gap-2 bg-brand-blue text-white font-semibold px-6 py-3 rounded-lg hover:bg-brand-blue/90 transition-colors"
            >
              {ctaBtn} <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function DeContent({ homeBase }: { homeBase: string }) {
  return (
    <>
      <section className="pt-32 pb-16 px-6 bg-white">
        <div className="container-content mx-auto max-w-4xl">
          <nav className="flex items-center gap-2 text-sm text-google-secondary mb-6">
            <Link href={`${homeBase}/`} className="hover:text-brand-blue transition-colors">Home</Link>
            <span>/</span>
            <Link href={`${homeBase}/#leistungen`} className="hover:text-brand-blue transition-colors">Leistungen</Link>
            <span>/</span>
            <span className="text-google-text">Local SEO</span>
          </nav>
          <p className="text-label-sm uppercase text-brand-blue tracking-widest mb-3">Leistung</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-google-text mb-6 leading-tight">
            Local SEO — Lokale Suchmaschinenoptimierung<br />
            <span className="text-brand-blue">für mehr Anfragen und Kunden</span>
          </h1>
          <p className="text-body-lg text-google-secondary mb-8 max-w-2xl">
            Local SEO bringt Ihr Unternehmen an die erste Stelle, wenn Kunden in Ihrer Stadt oder Region nach Ihren Leistungen suchen. Nachhaltig. Messbar. Ohne monatliches Werbebudget.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href={`${homeBase}/#audit`} className="inline-flex items-center gap-2 bg-brand-blue text-white font-semibold px-6 py-3 rounded-lg hover:bg-brand-blue/90 transition-colors">
              Kostenloses Audit anfragen <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 px-6 bg-google-light border-y border-google-border">
        <div className="container-content mx-auto max-w-4xl">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { value: "97 %", label: "der Nutzer suchen online nach lokalen Unternehmen" },
              { value: "76 %", label: "besuchen das Unternehmen nach lokaler Suche am selben Tag" },
              { value: "28 %", label: "der lokalen Suchen enden in einem Kauf" },
              { value: "50 %", label: "der lokalen Suchanfragen kommen von Mobilgeräten" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl font-bold text-brand-blue mb-1">{stat.value}</div>
                <div className="text-xs text-google-secondary leading-snug">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding px-6">
        <div className="container-content mx-auto max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-google-text mb-4">Was Local SEO umfasst</h2>
          <p className="text-body-lg text-google-secondary mb-10">
            Local SEO ist mehr als nur Google Business Profile. Es ist ein System aus mehreren aufeinander abgestimmten Maßnahmen, die gemeinsam Ihre lokale Sichtbarkeit steigern.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mb-12">
            {[
              {
                icon: <MapPin size={20} className="text-brand-blue" />,
                title: "Google Business Profile Optimierung",
                text: "Das Fundament jeder Local SEO Strategie. Vollständige Optimierung aller Profilfelder, Kategorien, Fotos und Beiträge für maximale Sichtbarkeit im Local Pack.",
              },
              {
                icon: <Search size={20} className="text-brand-blue" />,
                title: "Lokale Keyword-Recherche",
                text: "Wir identifizieren die genauen Suchbegriffe, die Ihre Zielkunden verwenden — inklusive Stadt, Stadtteil und Dienstleistung. Diese Keywords fließen in alle Optimierungsmaßnahmen ein.",
              },
              {
                icon: <Globe size={20} className="text-brand-blue" />,
                title: "NAP-Konsistenz & Verzeichnisse",
                text: "Name, Adresse und Telefonnummer müssen in allen Online-Verzeichnissen identisch sein. Wir bereinigen inkonsistente Einträge und bauen relevante lokale Zitate auf.",
              },
              {
                icon: <TrendingUp size={20} className="text-brand-blue" />,
                title: "On-Page Local SEO",
                text: "Optimierung Ihrer Website für lokale Suchanfragen: lokale Schema-Markierungen, standortbezogene Meta-Tags, strukturierte Adressdaten und interne Verlinkung.",
              },
              {
                icon: <CheckCircle size={20} className="text-brand-blue" />,
                title: "Bewertungsstrategie",
                text: "Google-Bewertungen sind ein direkter Ranking-Faktor. Wir entwickeln eine Strategie für systematischen Aufbau echter Bewertungen und professionelles Antwortmanagement.",
              },
              {
                icon: <BarChart3 size={20} className="text-brand-blue" />,
                title: "Monitoring & Reporting",
                text: "Monatliche Berichte zu Rankings, Sichtbarkeit, Klicks und Conversions. Klare Zahlen statt Buzzwords — Sie sehen genau, was funktioniert.",
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-5 border border-google-border rounded-card bg-white">
                <div className="shrink-0 w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">{item.icon}</div>
                <div>
                  <h3 className="font-semibold text-google-text mb-1">{item.title}</h3>
                  <p className="text-body-sm text-google-secondary">{item.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Local Pack explanation */}
          <div className="p-6 bg-blue-50 border border-blue-100 rounded-card mb-12">
            <h3 className="font-semibold text-google-text mb-2">Was ist der Local Pack?</h3>
            <p className="text-body-sm text-google-secondary mb-3">
              Der Local Pack ist der Bereich in den Google-Suchergebnissen, der eine Karte mit drei lokalen Unternehmen anzeigt. Er erscheint oberhalb der organischen Ergebnisse — und damit an der sichtbarsten Stelle der Suchergebnisseite.
            </p>
            <p className="text-body-sm text-google-secondary">
              Studien zeigen, dass der Local Pack über 35 % aller Klicks bei lokalen Suchanfragen erhält. Wer hier erscheint, gewinnt. Wer es nicht schafft, bleibt unsichtbar — trotz guter Website.
            </p>
          </div>

          {/* Ranking factors */}
          <h2 className="text-2xl font-bold text-google-text mb-6">Die wichtigsten Local SEO Ranking-Faktoren</h2>
          <div className="overflow-x-auto mb-12">
            <table className="w-full border border-google-border rounded-card overflow-hidden text-sm">
              <thead>
                <tr className="bg-google-light">
                  <th className="text-left p-4 font-semibold text-google-text">Faktor</th>
                  <th className="text-left p-4 font-semibold text-google-text">Gewicht</th>
                  <th className="text-left p-4 font-semibold text-google-text">Unsere Maßnahme</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-google-border">
                {[
                  ["Google Business Profile", "Sehr hoch", "Vollständige Optimierung aller Felder"],
                  ["Bewertungen (Anzahl + Aktualität)", "Hoch", "Systematische Bewertungsstrategie"],
                  ["NAP-Konsistenz", "Hoch", "Bereinigung aller Online-Verzeichnisse"],
                  ["Website-Relevanz (On-Page)", "Mittel", "Lokale Schema-Markierung + Meta-Tags"],
                  ["Lokale Backlinks", "Mittel", "Aufbau relevanter lokaler Zitate"],
                  ["Nutzerverhalten (Klicks, Anrufe)", "Mittel", "Profil-Optimierung für höhere CTR"],
                  ["Beitragsaktivität", "Niedrig–Mittel", "Wöchentliche Beiträge im Profil"],
                ].map(([factor, weight, action]) => (
                  <tr key={factor} className="bg-white">
                    <td className="p-4 font-medium text-google-text">{factor}</td>
                    <td className="p-4 text-google-secondary">{weight}</td>
                    <td className="p-4 text-brand-blue text-xs">{action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Internal links */}
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div className="p-5 bg-google-light rounded-card border border-google-border">
              <p className="text-xs text-google-secondary mb-1 uppercase tracking-wide">Verwandte Leistung</p>
              <Link href="/leistungen/google-business-profile" className="text-brand-blue font-medium hover:underline text-sm">
                Google Business Profile Optimierung →
              </Link>
            </div>
            <div className="p-5 bg-google-light rounded-card border border-google-border">
              <p className="text-xs text-google-secondary mb-1 uppercase tracking-wide">Verwandte Leistung</p>
              <Link href="/leistungen/bewertungsmanagement" className="text-brand-blue font-medium hover:underline text-sm">
                Bewertungsmanagement →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function EnContent({ homeBase }: { homeBase: string }) {
  return (
    <>
      <section className="pt-32 pb-16 px-6 bg-white">
        <div className="container-content mx-auto max-w-4xl">
          <nav className="flex items-center gap-2 text-sm text-google-secondary mb-6">
            <Link href={`${homeBase}/`} className="hover:text-brand-blue transition-colors">Home</Link>
            <span>/</span>
            <Link href={`${homeBase}/#leistungen`} className="hover:text-brand-blue transition-colors">Services</Link>
            <span>/</span>
            <span className="text-google-text">Local SEO</span>
          </nav>
          <p className="text-label-sm uppercase text-brand-blue tracking-widest mb-3">Service</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-google-text mb-6 leading-tight">
            Local SEO — Local Search Engine Optimization<br />
            <span className="text-brand-blue">for more enquiries and customers</span>
          </h1>
          <p className="text-body-lg text-google-secondary mb-8 max-w-2xl">
            Local SEO puts your business at the top when customers in your city or region search for your services. Sustainable. Measurable. Without a monthly advertising budget.
          </p>
          <Link href={`${homeBase}/#audit`} className="inline-flex items-center gap-2 bg-brand-blue text-white font-semibold px-6 py-3 rounded-lg hover:bg-brand-blue/90 transition-colors">
            Request free audit <ArrowRight size={16} />
          </Link>
        </div>
      </section>
      <section className="section-padding px-6">
        <div className="container-content mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-google-text mb-6">What Local SEO includes</h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            {[
              { title: "Google Business Profile Optimization", text: "The foundation of every Local SEO strategy. Full optimization of all profile fields, categories, photos and posts for maximum visibility in the Local Pack." },
              { title: "Local Keyword Research", text: "We identify the exact search terms your target customers use — including city, neighbourhood, and service. These keywords inform all optimization work." },
              { title: "NAP Consistency & Directories", text: "Name, address, and phone number must be identical across all online directories. We clean up inconsistent listings and build relevant local citations." },
              { title: "On-Page Local SEO", text: "Optimization of your website for local search: local schema markup, location-based meta tags, structured address data, and internal linking." },
              { title: "Review Strategy", text: "Google reviews are a direct ranking factor. We develop a strategy for building genuine reviews systematically and managing responses professionally." },
              { title: "Monitoring & Reporting", text: "Monthly reports on rankings, visibility, clicks, and conversions. Clear numbers — you see exactly what's working." },
            ].map((item, i) => (
              <div key={i} className="p-5 border border-google-border rounded-card bg-white">
                <h3 className="font-semibold text-google-text mb-2">{item.title}</h3>
                <p className="text-body-sm text-google-secondary">{item.text}</p>
              </div>
            ))}
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-5 bg-google-light rounded-card border border-google-border">
              <p className="text-xs text-google-secondary mb-1 uppercase tracking-wide">Related service</p>
              <Link href="/en/leistungen/google-business-profile" className="text-brand-blue font-medium hover:underline text-sm">Google Business Profile Optimization →</Link>
            </div>
            <div className="p-5 bg-google-light rounded-card border border-google-border">
              <p className="text-xs text-google-secondary mb-1 uppercase tracking-wide">Related service</p>
              <Link href="/en/leistungen/bewertungsmanagement" className="text-brand-blue font-medium hover:underline text-sm">Review Management →</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function RuContent({ homeBase }: { homeBase: string }) {
  return (
    <>
      <section className="pt-32 pb-16 px-6 bg-white">
        <div className="container-content mx-auto max-w-4xl">
          <nav className="flex items-center gap-2 text-sm text-google-secondary mb-6">
            <Link href={`${homeBase}/`} className="hover:text-brand-blue transition-colors">Главная</Link>
            <span>/</span>
            <Link href={`${homeBase}/#leistungen`} className="hover:text-brand-blue transition-colors">Услуги</Link>
            <span>/</span>
            <span className="text-google-text">Local SEO</span>
          </nav>
          <p className="text-label-sm uppercase text-brand-blue tracking-widest mb-3">Услуга</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-google-text mb-6 leading-tight">
            Local SEO — локальная оптимизация<br />
            <span className="text-brand-blue">для большего количества клиентов</span>
          </h1>
          <p className="text-body-lg text-google-secondary mb-8 max-w-2xl">
            Local SEO выводит ваш бизнес на первое место, когда клиенты в вашем городе или регионе ищут ваши услуги. Долгосрочно. Измеримо. Без ежемесячного рекламного бюджета.
          </p>
          <Link href={`${homeBase}/#audit`} className="inline-flex items-center gap-2 bg-brand-blue text-white font-semibold px-6 py-3 rounded-lg hover:bg-brand-blue/90 transition-colors">
            Запросить бесплатный аудит <ArrowRight size={16} />
          </Link>
        </div>
      </section>
      <section className="section-padding px-6">
        <div className="container-content mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-google-text mb-6">Что включает Local SEO</h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            {[
              { title: "Оптимизация Google Business Profile", text: "Основа каждой стратегии Local SEO. Полная оптимизация всех полей профиля, категорий, фото и постов для максимальной видимости в Local Pack." },
              { title: "Локальный анализ ключевых слов", text: "Мы определяем точные поисковые запросы ваших клиентов — включая город, район и услугу. Эти ключевые слова используются во всех оптимизационных работах." },
              { title: "NAP-консистентность и каталоги", text: "Название, адрес и телефон должны быть одинаковыми во всех онлайн-каталогах. Мы исправляем несоответствия и создаём релевантные локальные ссылки." },
              { title: "On-Page Local SEO", text: "Оптимизация сайта для локального поиска: локальная разметка Schema, мета-теги с геолокацией, структурированные данные адреса." },
              { title: "Стратегия отзывов", text: "Отзывы Google — прямой фактор ранжирования. Разрабатываем стратегию систематического получения настоящих отзывов и профессиональных ответов." },
              { title: "Мониторинг и отчёты", text: "Ежемесячные отчёты по позициям, видимости, кликам и конверсиям. Чёткие цифры — вы видите именно то, что работает." },
            ].map((item, i) => (
              <div key={i} className="p-5 border border-google-border rounded-card bg-white">
                <h3 className="font-semibold text-google-text mb-2">{item.title}</h3>
                <p className="text-body-sm text-google-secondary">{item.text}</p>
              </div>
            ))}
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-5 bg-google-light rounded-card border border-google-border">
              <p className="text-xs text-google-secondary mb-1 uppercase tracking-wide">Связанная услуга</p>
              <Link href="/ru/leistungen/google-business-profile" className="text-brand-blue font-medium hover:underline text-sm">Оптимизация Google Business Profile →</Link>
            </div>
            <div className="p-5 bg-google-light rounded-card border border-google-border">
              <p className="text-xs text-google-secondary mb-1 uppercase tracking-wide">Связанная услуга</p>
              <Link href="/ru/leistungen/bewertungsmanagement" className="text-brand-blue font-medium hover:underline text-sm">Управление отзывами →</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}


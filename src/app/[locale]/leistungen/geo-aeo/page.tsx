import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  ArrowRight,
  Globe,
  FileQuestion,
  Database,
  MessageSquare,
  TrendingUp,
  Search,
  ChevronDown,
} from "lucide-react";

const BASE_URL = "https://arlocalgrowth.de";

const pageMeta: Record<string, { title: string; description: string }> = {
  de: {
    title: "GEO & AEO — Sichtbarkeit in modernen Suchsystemen und digitalen Assistenten",
    description:
      "GEO und AEO für lokale Unternehmen: Ihr Unternehmen als Antwort auf lokale Fragen in Google AI Overviews, ChatGPT und Co. A.R. Local Growth in Berlin — jetzt kostenloses Audit anfragen.",
  },
  en: {
    title: "GEO & AEO — Visibility in Modern Search Systems and Digital Assistants",
    description:
      "GEO and AEO for local businesses: get your business cited as the answer to local questions in Google AI Overviews, ChatGPT and more. A.R. Local Growth in Berlin — request a free audit.",
  },
  ru: {
    title: "GEO и AEO — видимость в современных поисковых системах и цифровых ассистентах",
    description:
      "GEO и AEO для локального бизнеса: ваш бизнес как ответ на локальные запросы в Google AI Overviews, ChatGPT и других системах. A.R. Local Growth в Берлине.",
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
    locale === "de" ? "/leistungen/geo-aeo" : `/${locale}/leistungen/geo-aeo`;
  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: `${BASE_URL}${canonicalPath}`,
      languages: {
        de: `${BASE_URL}/leistungen/geo-aeo`,
        en: `${BASE_URL}/en/leistungen/geo-aeo`,
        ru: `${BASE_URL}/ru/leistungen/geo-aeo`,
      },
    },
    openGraph: {
      title: m.title,
      description: m.description,
      url: `${BASE_URL}${canonicalPath}`,
    },
  };
}

export default async function GeoAeoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const homeBase = locale === "de" ? "" : `/${locale}`;
  const canonicalPath =
    locale === "de" ? "/leistungen/geo-aeo" : `/${locale}/leistungen/geo-aeo`;

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: locale === "de" ? BASE_URL : `${BASE_URL}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: locale === "ru" ? "Услуги" : locale === "en" ? "Services" : "Leistungen",
        item: `${BASE_URL}${homeBase}/leistungen`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "GEO & AEO",
        item: `${BASE_URL}${canonicalPath}`,
      },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name:
      locale === "ru"
        ? "GEO и AEO — оптимизация для генеративных поисковых систем"
        : locale === "en"
        ? "GEO & AEO — Generative Engine and Answer Engine Optimization"
        : "GEO & AEO — Optimierung für generative Suchsysteme",
    description:
      locale === "ru"
        ? "Структурированные данные Schema.org, FAQ-контент, entity-построение и NAP-консистентность — чтобы ваш бизнес появлялся как ответ на локальные запросы в современных поисковых системах."
        : locale === "en"
        ? "Schema.org structured data, FAQ content, entity building and NAP consistency — so your business appears as the answer to local questions in modern search systems."
        : "Schema.org Strukturdaten, FAQ-Content, Entity-Aufbau und NAP-Konsistenz — damit Ihr Unternehmen als Antwort auf lokale Fragen in modernen Suchsystemen erscheint.",
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
          {
            q: "Что такое GEO — Generative Engine Optimization?",
            a: "GEO — это оптимизация вашего онлайн-присутствия для того, чтобы современные поисковые системы, генерирующие ответы (Google AI Overviews, ChatGPT, Perplexity), рекомендовали ваш бизнес в ответ на локальные вопросы. Классическое SEO нацелено на позиции в списке ссылок. GEO нацелено на то, чтобы вас называли как ответ в сгенерированном тексте.",
          },
          {
            q: "Что такое AEO — Answer Engine Optimization?",
            a: "AEO — это структурирование контента таким образом, чтобы поисковые системы могли извлекать и использовать его как прямой ответ. Это включает FAQ с чёткими ответами, разметку Schema.org, speakable-контент и правильную структуру заголовков. AEO является частью GEO-стратегии.",
          },
          {
            q: "Почему GEO/AEO важны прямо сейчас?",
            a: "Поисковое поведение меняется: всё больше людей получают ответы напрямую от поисковых систем, не кликая на ссылки. Google AI Overviews, ChatGPT Search, Perplexity — все они выбирают источники для своих ответов на основе авторитетности, структуры контента и чёткости данных. Бизнесы, которые оптимизированы для GEO/AEO сейчас, получат преимущество на годы вперёд.",
          },
          {
            q: "В чём разница между Local SEO, GEO и AEO?",
            a: "Local SEO оптимизирует вашу видимость в классическом Google поиске и Google Maps (позиции, Local Pack). GEO оптимизирует для генеративных систем — чтобы вас называли в AI-ответах. AEO структурирует контент для прямых ответов. На практике все три стратегии усиливают друг друга.",
          },
          {
            q: "Как долго нужно ждать результатов GEO/AEO?",
            a: "Структурированные данные и FAQ-контент индексируются Google в течение нескольких недель. Появление в AI Overviews и других генеративных системах — это постепенный процесс, который обычно заметен через 2–4 месяца. GEO/AEO — долгосрочная инвестиция в авторитетность.",
          },
        ]
      : locale === "en"
      ? [
          {
            q: "What is GEO — Generative Engine Optimization?",
            a: "GEO is the optimization of your online presence so that modern answer-generating search systems (Google AI Overviews, ChatGPT, Perplexity) recommend your business in response to local questions. Classic SEO targets positions in the link list. GEO targets being named as the answer in a generated text.",
          },
          {
            q: "What is AEO — Answer Engine Optimization?",
            a: "AEO is structuring your content so that search engines can extract and use it as a direct answer. This includes FAQs with clear answers, Schema.org markup, speakable content, and proper heading structure. AEO is an integral part of the GEO strategy.",
          },
          {
            q: "Why do GEO and AEO matter right now?",
            a: "Search behavior is shifting: more and more people get answers directly from search systems without clicking links. Google AI Overviews, ChatGPT Search, Perplexity — all of them select sources based on authority, content structure, and data clarity. Businesses optimized for GEO/AEO now will have a competitive edge for years.",
          },
          {
            q: "What is the difference between Local SEO, GEO, and AEO?",
            a: "Local SEO optimizes your visibility in classic Google Search and Google Maps (rankings, Local Pack). GEO optimizes for generative systems — so you're cited in AI answers. AEO structures content for direct answers. In practice all three strategies reinforce each other.",
          },
          {
            q: "How long does it take to see GEO/AEO results?",
            a: "Structured data and FAQ content are indexed by Google within a few weeks. Appearing in AI Overviews and other generative systems is a gradual process, typically noticeable after 2–4 months. GEO/AEO is a long-term investment in authority.",
          },
        ]
      : [
          {
            q: "Was ist GEO — Generative Engine Optimization?",
            a: "GEO ist die Optimierung Ihrer Online-Präsenz dafür, dass moderne antwortgenerierende Suchsysteme (Google AI Overviews, ChatGPT, Perplexity) Ihr Unternehmen als Antwort auf lokale Fragen empfehlen. Klassisches SEO zielt auf Positionen in der Linkliste. GEO zielt darauf, im generierten Antworttext genannt zu werden.",
          },
          {
            q: "Was ist AEO — Answer Engine Optimization?",
            a: "AEO ist die Strukturierung Ihrer Inhalte so, dass Suchmaschinen sie direkt als Antwort extrahieren und verwenden können. Das umfasst FAQs mit klaren Antworten, Schema.org-Auszeichnung, Speakable-Content und saubere Überschriftenstruktur. AEO ist integraler Bestandteil der GEO-Strategie.",
          },
          {
            q: "Warum sind GEO und AEO gerade jetzt wichtig?",
            a: "Das Suchverhalten verändert sich: Immer mehr Menschen erhalten Antworten direkt vom Suchsystem — ohne auf Links zu klicken. Google AI Overviews, ChatGPT Search, Perplexity — sie alle wählen ihre Quellen nach Autorität, Inhaltsstruktur und Datenklarheit aus. Unternehmen, die jetzt für GEO/AEO optimiert sind, haben einen Vorsprung für Jahre.",
          },
          {
            q: "Was ist der Unterschied zwischen Local SEO, GEO und AEO?",
            a: "Local SEO optimiert Ihre Sichtbarkeit in der klassischen Google-Suche und Google Maps (Rankings, Local Pack). GEO optimiert für generative Systeme — damit Sie in KI-Antworten genannt werden. AEO strukturiert Inhalte für direkte Antworten. In der Praxis verstärken sich alle drei Strategien gegenseitig.",
          },
          {
            q: "Wie lange dauert es, bis GEO/AEO Ergebnisse zeigt?",
            a: "Strukturierte Daten und FAQ-Content werden von Google innerhalb weniger Wochen indexiert. Das Erscheinen in AI Overviews und anderen generativen Systemen ist ein gradueller Prozess, der typischerweise nach 2–4 Monaten merklich wird. GEO/AEO ist eine langfristige Investition in Autorität.",
          },
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
      <RuContent homeBase={homeBase} faqItems={faqItems} />
    ) : locale === "en" ? (
      <EnContent homeBase={homeBase} faqItems={faqItems} />
    ) : (
      <DeContent homeBase={homeBase} faqItems={faqItems} />
    );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navbar />
      <main className="min-h-screen">{content}</main>
      <Footer />
    </>
  );
}

// ─── Shared sub-components ────────────────────────────────────────────────────

type FaqItem = { q: string; a: string };

function FaqSection({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-google-border border border-google-border rounded-card-lg overflow-hidden bg-white">
      {items.map((item, i) => (
        <details key={i} className="group px-5 py-4">
          <summary className="flex items-center justify-between cursor-pointer list-none text-body-sm font-semibold text-google-text">
            {item.q}
            <ChevronDown
              size={16}
              className="text-google-secondary shrink-0 ml-3 transition-transform group-open:rotate-180"
            />
          </summary>
          <p className="mt-3 text-body-sm text-google-secondary leading-relaxed speakable">
            {item.a}
          </p>
        </details>
      ))}
    </div>
  );
}

// ─── DE ──────────────────────────────────────────────────────────────────────
function DeContent({
  homeBase,
  faqItems,
}: {
  homeBase: string;
  faqItems: FaqItem[];
}) {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 px-6 bg-white">
        <div className="container-content mx-auto max-w-4xl">
          <nav className="flex items-center gap-2 text-sm text-google-secondary mb-6">
            <Link href={`${homeBase}/`} className="hover:text-brand-blue transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href={`${homeBase}/leistungen`} className="hover:text-brand-blue transition-colors">
              Leistungen
            </Link>
            <span>/</span>
            <span className="text-google-text">GEO & AEO</span>
          </nav>
          <p className="text-label-sm uppercase text-brand-blue tracking-widest mb-3">Leistung</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-google-text mb-6 leading-tight speakable">
            GEO & AEO — Ihr Unternehmen<br />
            <span className="text-brand-blue">als Antwort auf lokale Fragen</span>
          </h1>
          <p className="text-body-lg text-google-secondary mb-8 max-w-2xl speakable">
            Google beantwortet Suchanfragen inzwischen direkt — ohne dass Nutzer auf Links klicken.
            ChatGPT, Perplexity und andere Systeme empfehlen Unternehmen als Antwort.
            GEO und AEO sorgen dafür, dass Ihr Unternehmen dabei genannt wird.
          </p>
          <Link
            href={`${homeBase}/#audit`}
            className="inline-flex items-center gap-2 bg-brand-blue text-white font-semibold px-6 py-3 rounded-lg hover:bg-brand-blue/90 transition-colors"
          >
            Kostenloses Audit anfragen <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Why it matters now */}
      <section className="py-12 px-6 bg-google-light border-y border-google-border">
        <div className="container-content mx-auto max-w-4xl">
          <h2 className="text-xl font-bold text-google-text mb-2">Warum das jetzt wichtig ist</h2>
          <p className="text-google-secondary mb-6 max-w-2xl">
            Das Suchverhalten verändert sich grundlegend. Für lokale Unternehmen bedeutet das: Wer jetzt die Grundlagen legt, ist in 2–3 Jahren weit vorne.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                stat: "60 %+",
                text: "der Google-Suchanfragen enden ohne Klick auf eine Website (Zero-Click Search)",
              },
              {
                stat: "AI Overviews",
                text: "erscheinen bei immer mehr lokalen Suchanfragen direkt über den organischen Ergebnissen",
              },
              {
                stat: "ChatGPT & Co.",
                text: "werden täglich von Millionen Nutzern gefragt: 'Welcher Friseur in Berlin ist gut?'",
              },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-card border border-google-border p-5">
                <div className="text-xl font-bold text-brand-blue mb-2">{item.stat}</div>
                <p className="text-sm text-google-secondary">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GEO vs AEO explanation */}
      <section className="section-padding px-6">
        <div className="container-content mx-auto max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-google-text mb-4">
            GEO und AEO — der Unterschied
          </h2>
          <p className="text-body-lg text-google-secondary mb-10 max-w-2xl">
            Beide Strategien verfolgen dasselbe Ziel — als verlässliche Quelle in modernen Suchsystemen anerkannt zu werden. Sie setzen an unterschiedlichen Punkten an.
          </p>
          <div className="grid sm:grid-cols-2 gap-6 mb-12">
            <div className="p-6 bg-blue-50 border border-blue-100 rounded-card">
              <div className="flex items-center gap-3 mb-3">
                <Globe size={20} className="text-brand-blue" />
                <h3 className="font-bold text-google-text">GEO — Generative Engine Optimization</h3>
              </div>
              <p className="text-body-sm text-google-secondary mb-4">
                GEO sorgt dafür, dass Ihr Unternehmen als vertrauenswürdige Quelle in den Trainingsdaten und Echtzeit-Indizes generativer Systeme verankert ist.
              </p>
              <ul className="text-sm text-google-secondary space-y-1.5">
                {[
                  "Klare Unternehmens-Entität (wer Sie sind, was Sie tun, wo)",
                  "Konsistente Daten in allen Online-Quellen",
                  "Schema.org LocalBusiness + Person-Auszeichnung",
                  "Speakable-Content für sprachbasierte Systeme",
                  "Erwähnungen in relevanten lokalen Quellen",
                ].map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-brand-blue mt-0.5">→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-6 bg-green-50 border border-green-100 rounded-card">
              <div className="flex items-center gap-3 mb-3">
                <FileQuestion size={20} className="text-green-700" />
                <h3 className="font-bold text-google-text">AEO — Answer Engine Optimization</h3>
              </div>
              <p className="text-body-sm text-google-secondary mb-4">
                AEO strukturiert Ihre Inhalte so, dass Suchmaschinen und Assistenten sie als direkte, vollständige Antwort auf eine Frage verwenden können.
              </p>
              <ul className="text-sm text-google-secondary space-y-1.5">
                {[
                  "FAQs mit präzisen, vollständigen Antworten",
                  "FAQPage Schema.org auf allen relevanten Seiten",
                  "Klare H2/H3-Überschriften als Frageformat",
                  "Direkte Antwort in den ersten 2 Sätzen",
                  "Strukturierte Daten für Dienstleistungen und Preise",
                ].map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-green-700 mt-0.5">→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* What we do */}
          <h2 className="text-2xl font-bold text-google-text mb-6">Was wir konkret umsetzen</h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-12">
            {[
              {
                icon: <Database size={18} className="text-brand-blue" />,
                title: "Schema.org Strukturdaten",
                text: "LocalBusiness, Person, Service, FAQPage, BreadcrumbList, WebSite mit speakableSpecification — vollständig implementiert und validiert.",
              },
              {
                icon: <FileQuestion size={18} className="text-brand-blue" />,
                title: "FAQ-Content-Aufbau",
                text: "Erstellung von 20–40 Q&A-Paaren zu Ihren häufigsten Kundenanfragen — mit direkten, vollständigen Antworten für maximale Extrahierbarkeit.",
              },
              {
                icon: <Globe size={18} className="text-brand-blue" />,
                title: "Entity-Aufbau",
                text: "Klare Beschreibung Ihrer Unternehmens-Entität in der About-Sektion, im Schema, in GBP und in Verzeichnissen. Google muss genau wissen: wer Sie sind.",
              },
              {
                icon: <Search size={18} className="text-brand-blue" />,
                title: "NAP-Konsistenz über alle Quellen",
                text: "Name, Adresse, Telefon, Website, Öffnungszeiten — überall identisch. Inkonsistente Daten reduzieren das Vertrauen aller Suchsysteme in Ihren Eintrag.",
              },
              {
                icon: <MessageSquare size={18} className="text-brand-blue" />,
                title: "Speakable & lokaler Content",
                text: "Inhalte mit dem CSS-Selektor .speakable ausgezeichnet, damit Google Sprachsysteme und AI-Assistenten die relevantesten Passagen extrahieren.",
              },
              {
                icon: <TrendingUp size={18} className="text-brand-blue" />,
                title: "GBP als GEO-Signal",
                text: "Ein vollständig optimiertes Google Business Profile ist das stärkste Einzelsignal für lokale GEO. Beiträge, Q&A im Profil und Bewertungsantworten verstärken es.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex gap-4 p-5 border border-google-border rounded-card bg-white"
              >
                <div className="shrink-0 w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-google-text mb-1">{item.title}</h3>
                  <p className="text-body-sm text-google-secondary">{item.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Comparison table */}
          <h2 className="text-xl font-bold text-google-text mb-4">
            Local SEO vs. GEO/AEO — was ist der Unterschied?
          </h2>
          <div className="overflow-x-auto mb-12">
            <table className="w-full border border-google-border rounded-card overflow-hidden text-sm">
              <thead>
                <tr className="bg-google-light">
                  <th className="text-left p-4 font-semibold text-google-text">Dimension</th>
                  <th className="text-left p-4 font-semibold text-google-text">Local SEO</th>
                  <th className="text-left p-4 font-semibold text-brand-blue">GEO & AEO</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-google-border">
                {[
                  ["Ziel", "Position in Suchergebnissen", "Genannt werden in AI-Antworten"],
                  ["Suchsystem", "Google Maps, klassische Suche", "AI Overviews, ChatGPT, Perplexity"],
                  ["Erfolgsmessung", "Rankings, Klicks, Anrufe", "Erwähnungen in generierten Antworten"],
                  ["Zeithorizont", "3–6 Monate", "2–4 Monate (erste Signale)"],
                  ["Grundlage", "GBP, Keywords, Backlinks", "Schema, Entity, FAQ, Konsistenz"],
                  ["Überschneidung", "—", "Gutes Local SEO stärkt GEO direkt"],
                ].map(([dim, seo, geo]) => (
                  <tr key={dim} className="bg-white">
                    <td className="p-4 font-medium text-google-text">{dim}</td>
                    <td className="p-4 text-google-secondary">{seo}</td>
                    <td className="p-4 text-brand-blue text-xs font-medium">{geo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* FAQ */}
          <h2 className="text-2xl font-bold text-google-text mb-8 text-center">
            Häufige Fragen zu GEO & AEO
          </h2>
          <FaqSection items={faqItems} />

          {/* Internal links */}
          <div className="grid sm:grid-cols-2 gap-4 mt-12 mb-4">
            <div className="p-5 bg-google-light rounded-card border border-google-border">
              <p className="text-xs text-google-secondary mb-1 uppercase tracking-wide">
                Verwandte Leistung
              </p>
              <Link
                href="/leistungen/local-seo"
                className="text-brand-blue font-medium hover:underline text-sm"
              >
                Local SEO →
              </Link>
            </div>
            <div className="p-5 bg-google-light rounded-card border border-google-border">
              <p className="text-xs text-google-secondary mb-1 uppercase tracking-wide">
                Verwandte Leistung
              </p>
              <Link
                href="/leistungen/google-business-profile"
                className="text-brand-blue font-medium hover:underline text-sm"
              >
                Google Business Profile Optimierung →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding px-6 bg-google-light border-t border-google-border">
        <div className="container-content mx-auto max-w-3xl text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-google-text mb-4">
            Bereit, in modernen Suchsystemen sichtbar zu werden?
          </h2>
          <p className="text-body-lg text-google-secondary mb-8 max-w-xl mx-auto">
            Ich analysiere Ihr Unternehmen kostenlos: welche GEO/AEO-Signale fehlen und wie Sie als Antwort auf lokale Fragen erscheinen.
          </p>
          <Link
            href={`${homeBase}/#audit`}
            className="inline-flex items-center gap-2 bg-brand-blue text-white font-semibold px-6 py-3 rounded-lg hover:bg-brand-blue/90 transition-colors"
          >
            Kostenloses GEO-Audit anfragen <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}

// ─── EN ──────────────────────────────────────────────────────────────────────
function EnContent({
  homeBase,
  faqItems,
}: {
  homeBase: string;
  faqItems: FaqItem[];
}) {
  return (
    <>
      <section className="pt-32 pb-16 px-6 bg-white">
        <div className="container-content mx-auto max-w-4xl">
          <nav className="flex items-center gap-2 text-sm text-google-secondary mb-6">
            <Link href={`${homeBase}/`} className="hover:text-brand-blue transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href={`${homeBase}/leistungen`} className="hover:text-brand-blue transition-colors">
              Services
            </Link>
            <span>/</span>
            <span className="text-google-text">GEO & AEO</span>
          </nav>
          <p className="text-label-sm uppercase text-brand-blue tracking-widest mb-3">Service</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-google-text mb-6 leading-tight speakable">
            GEO & AEO — Your business<br />
            <span className="text-brand-blue">as the answer to local questions</span>
          </h1>
          <p className="text-body-lg text-google-secondary mb-8 max-w-2xl speakable">
            Google now answers search queries directly — without users clicking links. ChatGPT,
            Perplexity and other systems recommend businesses as answers. GEO and AEO make sure your
            business is the one they name.
          </p>
          <Link
            href={`${homeBase}/#audit`}
            className="inline-flex items-center gap-2 bg-brand-blue text-white font-semibold px-6 py-3 rounded-lg hover:bg-brand-blue/90 transition-colors"
          >
            Request free audit <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <section className="py-12 px-6 bg-google-light border-y border-google-border">
        <div className="container-content mx-auto max-w-4xl">
          <h2 className="text-xl font-bold text-google-text mb-2">Why this matters now</h2>
          <p className="text-google-secondary mb-6 max-w-2xl">
            Search behavior is changing fundamentally. For local businesses, this means: those who lay the groundwork now will be years ahead of their competitors.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { stat: "60 %+", text: "of Google searches end without a click on a website (Zero-Click Search)" },
              { stat: "AI Overviews", text: "now appear above organic results for a growing number of local searches" },
              { stat: "ChatGPT & Co.", text: "are asked millions of times daily: 'Which hairdresser in Berlin is good?'" },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-card border border-google-border p-5">
                <div className="text-xl font-bold text-brand-blue mb-2">{item.stat}</div>
                <p className="text-sm text-google-secondary">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding px-6">
        <div className="container-content mx-auto max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-google-text mb-4">GEO vs AEO — the difference</h2>
          <div className="grid sm:grid-cols-2 gap-6 mb-12">
            <div className="p-6 bg-blue-50 border border-blue-100 rounded-card">
              <div className="flex items-center gap-3 mb-3">
                <Globe size={20} className="text-brand-blue" />
                <h3 className="font-bold text-google-text">GEO — Generative Engine Optimization</h3>
              </div>
              <p className="text-body-sm text-google-secondary mb-4">
                GEO ensures your business is anchored as a trustworthy source in the training data and real-time indexes of generative systems.
              </p>
              <ul className="text-sm text-google-secondary space-y-1.5">
                {["Clear business entity (who you are, what you do, where)", "Consistent data across all online sources", "Schema.org LocalBusiness + Person markup", "Speakable content for voice-based systems", "Mentions in relevant local sources"].map((item, i) => (
                  <li key={i} className="flex gap-2"><span className="text-brand-blue mt-0.5">→</span>{item}</li>
                ))}
              </ul>
            </div>
            <div className="p-6 bg-green-50 border border-green-100 rounded-card">
              <div className="flex items-center gap-3 mb-3">
                <FileQuestion size={20} className="text-green-700" />
                <h3 className="font-bold text-google-text">AEO — Answer Engine Optimization</h3>
              </div>
              <p className="text-body-sm text-google-secondary mb-4">
                AEO structures your content so search engines and assistants can use it as a direct, complete answer to a question.
              </p>
              <ul className="text-sm text-google-secondary space-y-1.5">
                {["FAQs with precise, complete answers", "FAQPage Schema.org on all relevant pages", "Clear H2/H3 headings in question format", "Direct answer in the first 2 sentences", "Structured data for services and prices"].map((item, i) => (
                  <li key={i} className="flex gap-2"><span className="text-green-700 mt-0.5">→</span>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-google-text mb-6">What we implement</h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-12">
            {[
              { icon: <Database size={18} className="text-brand-blue" />, title: "Schema.org Structured Data", text: "LocalBusiness, Person, Service, FAQPage, BreadcrumbList, WebSite with speakableSpecification — fully implemented and validated." },
              { icon: <FileQuestion size={18} className="text-brand-blue" />, title: "FAQ Content Build-out", text: "Creating 20–40 Q&A pairs for your most common customer questions — with direct, complete answers for maximum extractability." },
              { icon: <Globe size={18} className="text-brand-blue" />, title: "Entity Building", text: "Clear description of your business entity in the About section, schema, GBP, and directories. Google must know exactly: who you are." },
              { icon: <Search size={18} className="text-brand-blue" />, title: "NAP Consistency Across Sources", text: "Name, address, phone, website, opening hours — identical everywhere. Inconsistent data reduces trust across all search systems." },
              { icon: <MessageSquare size={18} className="text-brand-blue" />, title: "Speakable & Local Content", text: "Content marked with the .speakable CSS selector so Google voice systems and AI assistants can extract the most relevant passages." },
              { icon: <TrendingUp size={18} className="text-brand-blue" />, title: "GBP as GEO Signal", text: "A fully optimized Google Business Profile is the single strongest signal for local GEO. Posts, Q&A in the profile, and review responses amplify it." },
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

          <h2 className="text-2xl font-bold text-google-text mb-8 text-center">FAQ — GEO & AEO</h2>
          <FaqSection items={faqItems} />

          <div className="grid sm:grid-cols-2 gap-4 mt-12">
            <div className="p-5 bg-google-light rounded-card border border-google-border">
              <p className="text-xs text-google-secondary mb-1 uppercase tracking-wide">Related service</p>
              <Link href="/en/leistungen/local-seo" className="text-brand-blue font-medium hover:underline text-sm">Local SEO →</Link>
            </div>
            <div className="p-5 bg-google-light rounded-card border border-google-border">
              <p className="text-xs text-google-secondary mb-1 uppercase tracking-wide">Related service</p>
              <Link href="/en/leistungen/google-business-profile" className="text-brand-blue font-medium hover:underline text-sm">Google Business Profile Optimization →</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding px-6 bg-google-light border-t border-google-border">
        <div className="container-content mx-auto max-w-3xl text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-google-text mb-4">
            Ready to become visible in modern search systems?
          </h2>
          <p className="text-body-lg text-google-secondary mb-8 max-w-xl mx-auto">
            I analyze your business for free: which GEO/AEO signals are missing and how you can appear as the answer to local questions.
          </p>
          <Link
            href={`${homeBase}/#audit`}
            className="inline-flex items-center gap-2 bg-brand-blue text-white font-semibold px-6 py-3 rounded-lg hover:bg-brand-blue/90 transition-colors"
          >
            Request free GEO audit <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}

// ─── RU ──────────────────────────────────────────────────────────────────────
function RuContent({
  homeBase,
  faqItems,
}: {
  homeBase: string;
  faqItems: FaqItem[];
}) {
  return (
    <>
      <section className="pt-32 pb-16 px-6 bg-white">
        <div className="container-content mx-auto max-w-4xl">
          <nav className="flex items-center gap-2 text-sm text-google-secondary mb-6">
            <Link href={`${homeBase}/`} className="hover:text-brand-blue transition-colors">Главная</Link>
            <span>/</span>
            <Link href={`${homeBase}/leistungen`} className="hover:text-brand-blue transition-colors">Услуги</Link>
            <span>/</span>
            <span className="text-google-text">GEO & AEO</span>
          </nav>
          <p className="text-label-sm uppercase text-brand-blue tracking-widest mb-3">Услуга</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-google-text mb-6 leading-tight speakable">
            GEO и AEO — ваш бизнес<br />
            <span className="text-brand-blue">как ответ на локальные запросы</span>
          </h1>
          <p className="text-body-lg text-google-secondary mb-8 max-w-2xl speakable">
            Google всё чаще отвечает на запросы напрямую — без перехода на сайты. ChatGPT, Perplexity и другие системы рекомендуют компании как ответ. GEO и AEO обеспечивают, чтобы вашу компанию называли в числе этих ответов.
          </p>
          <Link
            href={`${homeBase}/#audit`}
            className="inline-flex items-center gap-2 bg-brand-blue text-white font-semibold px-6 py-3 rounded-lg hover:bg-brand-blue/90 transition-colors"
          >
            Запросить бесплатный аудит <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <section className="py-12 px-6 bg-google-light border-y border-google-border">
        <div className="container-content mx-auto max-w-4xl">
          <h2 className="text-xl font-bold text-google-text mb-2">Почему это важно прямо сейчас</h2>
          <p className="text-google-secondary mb-6 max-w-2xl">
            Поисковое поведение меняется коренным образом. Для локального бизнеса это означает: те, кто закладывает основу сейчас, будут на годы впереди конкурентов.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { stat: "60 %+", text: "поисковых запросов в Google заканчиваются без перехода на сайт (Zero-Click Search)" },
              { stat: "AI Overviews", text: "появляются всё чаще по локальным запросам прямо над органическими результатами" },
              { stat: "ChatGPT и др.", text: "ежедневно получают миллионы запросов: 'Какой парикмахер хороший в Берлине?'" },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-card border border-google-border p-5">
                <div className="text-xl font-bold text-brand-blue mb-2">{item.stat}</div>
                <p className="text-sm text-google-secondary">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding px-6">
        <div className="container-content mx-auto max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-google-text mb-4">GEO и AEO — в чём разница</h2>
          <div className="grid sm:grid-cols-2 gap-6 mb-12">
            <div className="p-6 bg-blue-50 border border-blue-100 rounded-card">
              <div className="flex items-center gap-3 mb-3">
                <Globe size={20} className="text-brand-blue" />
                <h3 className="font-bold text-google-text">GEO — Generative Engine Optimization</h3>
              </div>
              <p className="text-body-sm text-google-secondary mb-4">
                GEO обеспечивает, чтобы ваш бизнес был закреплён как надёжный источник в обучающих данных и индексах реального времени генеративных систем.
              </p>
              <ul className="text-sm text-google-secondary space-y-1.5">
                {["Чёткая бизнес-сущность (кто вы, что делаете, где)", "Согласованные данные во всех онлайн-источниках", "Разметка Schema.org LocalBusiness + Person", "Speakable-контент для голосовых систем", "Упоминания в релевантных локальных источниках"].map((item, i) => (
                  <li key={i} className="flex gap-2"><span className="text-brand-blue mt-0.5">→</span>{item}</li>
                ))}
              </ul>
            </div>
            <div className="p-6 bg-green-50 border border-green-100 rounded-card">
              <div className="flex items-center gap-3 mb-3">
                <FileQuestion size={20} className="text-green-700" />
                <h3 className="font-bold text-google-text">AEO — Answer Engine Optimization</h3>
              </div>
              <p className="text-body-sm text-google-secondary mb-4">
                AEO структурирует ваш контент так, чтобы поисковые системы и ассистенты могли использовать его как прямой, полный ответ на вопрос.
              </p>
              <ul className="text-sm text-google-secondary space-y-1.5">
                {["FAQ с точными, полными ответами", "FAQPage Schema.org на всех релевантных страницах", "Чёткие заголовки H2/H3 в формате вопросов", "Прямой ответ в первых 2 предложениях", "Структурированные данные для услуг и цен"].map((item, i) => (
                  <li key={i} className="flex gap-2"><span className="text-green-700 mt-0.5">→</span>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-google-text mb-6">Что мы конкретно делаем</h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-12">
            {[
              { icon: <Database size={18} className="text-brand-blue" />, title: "Структурированные данные Schema.org", text: "LocalBusiness, Person, Service, FAQPage, BreadcrumbList, WebSite со speakableSpecification — полная реализация и валидация." },
              { icon: <FileQuestion size={18} className="text-brand-blue" />, title: "Создание FAQ-контента", text: "20–40 пар вопрос-ответ по самым частым запросам ваших клиентов — с прямыми, полными ответами для максимальной извлекаемости." },
              { icon: <Globe size={18} className="text-brand-blue" />, title: "Построение entity", text: "Чёткое описание бизнес-сущности в разделе About, в схеме, в GBP и каталогах. Google должен точно знать: кто вы есть." },
              { icon: <Search size={18} className="text-brand-blue" />, title: "NAP-консистентность во всех источниках", text: "Название, адрес, телефон, сайт, часы работы — везде одинаково. Несогласованные данные снижают доверие всех поисковых систем." },
              { icon: <MessageSquare size={18} className="text-brand-blue" />, title: "Speakable и локальный контент", text: "Контент отмечен CSS-селектором .speakable — чтобы голосовые системы Google и AI-ассистенты могли извлекать наиболее релевантные фрагменты." },
              { icon: <TrendingUp size={18} className="text-brand-blue" />, title: "GBP как GEO-сигнал", text: "Полностью оптимизированный Google Business Profile — сильнейший единичный сигнал для локального GEO. Публикации, Q&A в профиле и ответы на отзывы усиливают его." },
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

          <h2 className="text-2xl font-bold text-google-text mb-8 text-center">FAQ — GEO и AEO</h2>
          <FaqSection items={faqItems} />

          <div className="grid sm:grid-cols-2 gap-4 mt-12">
            <div className="p-5 bg-google-light rounded-card border border-google-border">
              <p className="text-xs text-google-secondary mb-1 uppercase tracking-wide">Связанная услуга</p>
              <Link href="/ru/leistungen/local-seo" className="text-brand-blue font-medium hover:underline text-sm">Local SEO →</Link>
            </div>
            <div className="p-5 bg-google-light rounded-card border border-google-border">
              <p className="text-xs text-google-secondary mb-1 uppercase tracking-wide">Связанная услуга</p>
              <Link href="/ru/leistungen/google-business-profile" className="text-brand-blue font-medium hover:underline text-sm">Оптимизация Google Business Profile →</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding px-6 bg-google-light border-t border-google-border">
        <div className="container-content mx-auto max-w-3xl text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-google-text mb-4">
            Готовы стать видимыми в современных поисковых системах?
          </h2>
          <p className="text-body-lg text-google-secondary mb-8 max-w-xl mx-auto">
            Анализирую ваш бизнес бесплатно: каких GEO/AEO-сигналов не хватает и как начать появляться как ответ на локальные запросы.
          </p>
          <Link
            href={`${homeBase}/#audit`}
            className="inline-flex items-center gap-2 bg-brand-blue text-white font-semibold px-6 py-3 rounded-lg hover:bg-brand-blue/90 transition-colors"
          >
            Запросить бесплатный GEO-аудит <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}

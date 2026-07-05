import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CheckCircle, ArrowRight, MapPin, Star, Camera, Clock, BarChart3, ChevronDown } from "lucide-react";

const BASE_URL = "https://arlocalgrowth.de";

const pageMeta: Record<string, { title: string; description: string }> = {
  de: {
    title: "Google Business Profile Optimierung — mehr Kunden über Google Maps",
    description:
      "Professionelle Google Business Profile Optimierung für lokale Unternehmen in Deutschland. Mehr Sichtbarkeit bei Google Maps, mehr Anrufe, mehr Kunden. Jetzt kostenloses Audit anfragen.",
  },
  en: {
    title: "Google Business Profile Optimization — More Customers via Google Maps",
    description:
      "Professional Google Business Profile optimization for local businesses in Germany. More visibility on Google Maps, more calls, more customers. Request a free audit now.",
  },
  ru: {
    title: "Оптимизация Google Business Profile — больше клиентов через Google Maps",
    description:
      "Профессиональная оптимизация Google Business Profile для локального бизнеса в Германии. Больше видимости в Google Maps, больше звонков, больше клиентов.",
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
    locale === "de"
      ? "/leistungen/google-business-profile"
      : `/${locale}/leistungen/google-business-profile`;

  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: `${BASE_URL}${canonicalPath}`,
      languages: {
        de: `${BASE_URL}/leistungen/google-business-profile`,
        en: `${BASE_URL}/en/leistungen/google-business-profile`,
        ru: `${BASE_URL}/ru/leistungen/google-business-profile`,
      },
    },
    openGraph: {
      title: m.title,
      description: m.description,
      url: `${BASE_URL}${canonicalPath}`,
    },
  };
}

export default async function GbpPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const canonicalPath =
    locale === "de"
      ? "/leistungen/google-business-profile"
      : `/${locale}/leistungen/google-business-profile`;

  const homeBase = locale === "de" ? "" : `/${locale}`;

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
        item: `${BASE_URL}${homeBase}/#leistungen`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Google Business Profile",
        item: `${BASE_URL}${canonicalPath}`,
      },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name:
      locale === "ru"
        ? "Оптимизация Google Business Profile"
        : locale === "en"
        ? "Google Business Profile Optimization"
        : "Google Business Profile Optimierung",
    description:
      locale === "ru"
        ? "Полная оптимизация Google Business Profile: категории, описание, фото, посты, ответы на отзывы и стратегия ключевых слов для лучшего ранжирования в Google Maps."
        : locale === "en"
        ? "Complete Google Business Profile optimization: categories, description, photos, posts, review responses and keyword strategy for better Google Maps rankings."
        : "Vollständige Google Business Profile Optimierung: Kategorien, Beschreibung, Fotos, Beiträge, Bewertungsantworten und Keyword-Strategie für bessere Rankings bei Google Maps.",
    provider: {
      "@type": "LocalBusiness",
      "@id": `${BASE_URL}/#business`,
      name: "A.R. Local Growth & Automation",
    },
    areaServed: [
      { "@type": "Country", name: "Germany" },
      { "@type": "Country", name: "Austria" },
      { "@type": "Country", name: "Switzerland" },
    ],
    offers: {
      "@type": "Offer",
      description:
        locale === "ru"
          ? "Индивидуальные предложения после первичной консультации"
          : locale === "en"
          ? "Individual pricing after initial consultation"
          : "Individuelle Angebote nach Erstgespräch",
    },
  };

  const faqItems =
    locale === "ru"
      ? [
          {
            q: "Что такое Google Business Profile?",
            a: "Google Business Profile (ранее Google My Business) — бесплатный инструмент Google, позволяющий управлять присутствием вашего бизнеса в Google Поиске и Google Maps. Полностью заполненный профиль помогает клиентам найти вас, узнать часы работы, позвонить и проложить маршрут.",
          },
          {
            q: "Сколько времени занимает оптимизация Google Business Profile?",
            a: "Первоначальная настройка и оптимизация занимает 1–2 рабочих дня. Первые улучшения видимости заметны через 2–4 недели. Значительный рост в Google Maps обычно виден через 2–3 месяца регулярной работы.",
          },
          {
            q: "Помогает ли Google Business Profile получить больше клиентов?",
            a: "Да. Оптимизированный профиль появляется в локальных результатах поиска, когда клиенты ищут ваши услуги рядом. Бизнесы с полностью оптимизированными профилями получают значительно больше звонков, запросов маршрута и посещений сайта.",
          },
          {
            q: "Нужен ли мне сайт для Google Business Profile?",
            a: "Сайт не обязателен, но настоятельно рекомендуется. Без сайта вы теряете важные сигналы локального SEO. Если у вас нет сайта, мы можем создать простую целевую страницу в рамках нашего сервиса.",
          },
          {
            q: "Работаете ли вы с русскоязычными предпринимателями?",
            a: "Да, я работаю на русском, немецком, украинском и английском языках. Это особенно ценно для русскоязычных предпринимателей в Германии, которым нужна поддержка на родном языке.",
          },
        ]
      : locale === "en"
      ? [
          {
            q: "What is Google Business Profile optimization?",
            a: "Google Business Profile optimization means improving every aspect of your profile so Google ranks your business higher in local search results and Google Maps. This includes the right categories, keyword-optimized descriptions, professional photos, regular posts, and active review management.",
          },
          {
            q: "How long does Google Business Profile optimization take?",
            a: "Initial setup and optimization takes 1–2 business days. First improvements in visibility are usually noticeable within 2–4 weeks. Significant growth in Google Maps rankings typically shows within 2–3 months of consistent work.",
          },
          {
            q: "Does Google Business Profile help get more customers?",
            a: "Yes. An optimized profile appears in local search results when customers search for your services nearby. Businesses with fully optimized profiles receive significantly more calls, direction requests, and website visits.",
          },
          {
            q: "Do I need a website for Google Business Profile?",
            a: "A website is not required, but strongly recommended. Without a website you miss important local SEO signals. If you don't have one, we can create a simple landing page as part of our service.",
          },
          {
            q: "How much does Google Business Profile optimization cost?",
            a: "Pricing depends on the scope of work and your goals. We offer a free initial audit so you can see exactly what improvements are possible before any commitment. Contact me for a no-obligation conversation.",
          },
        ]
      : [
          {
            q: "Was kostet Google Business Profile Optimierung?",
            a: "Der Preis hängt vom Umfang der Arbeit und Ihren Zielen ab. Wir bieten ein kostenloses Erstaudit an, damit Sie genau sehen können, welche Verbesserungen möglich sind — vor jeder Verpflichtung. Kontaktieren Sie mich für ein unverbindliches Gespräch.",
          },
          {
            q: "Wie lange dauert Google Business Profile Optimierung?",
            a: "Die erste Einrichtung und Optimierung dauert 1–2 Werktage. Erste Verbesserungen der Sichtbarkeit sind meist innerhalb von 2–4 Wochen spürbar. Deutliches Wachstum im Google Maps Ranking zeigt sich typischerweise nach 2–3 Monaten kontinuierlicher Arbeit.",
          },
          {
            q: "Hilft Google Business Profile dabei, mehr Kunden zu gewinnen?",
            a: "Ja. Ein optimiertes Profil erscheint in lokalen Suchergebnissen, wenn Kunden nach Ihren Leistungen in der Nähe suchen. Unternehmen mit vollständig optimierten Profilen erhalten deutlich mehr Anrufe, Wegbeschreibungsanfragen und Website-Besuche.",
          },
          {
            q: "Brauche ich eine Website für Google Business Profile?",
            a: "Eine Website ist nicht erforderlich, aber dringend empfohlen. Ohne Website fehlen wichtige lokale SEO-Signale. Falls Sie keine haben, können wir im Rahmen unseres Services eine einfache Landing Page erstellen.",
          },
          {
            q: "Kann ich Google Business Profile selbst optimieren?",
            a: "Grundmaßnahmen wie das Ausfüllen des Profils, Hochladen von Fotos und Antworten auf Bewertungen können Sie selbst umsetzen. Für eine systematische Keyword-Strategie, Wettbewerbsanalyse und nachhaltige Rankings empfiehlt sich professionelle Unterstützung.",
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

  if (locale === "en") return <PageLayout locale={locale} homeBase={homeBase} faqItems={faqItems} breadcrumb={breadcrumb} serviceSchema={serviceSchema} faqSchema={faqSchema}><EnContent homeBase={homeBase} /></PageLayout>;
  if (locale === "ru") return <PageLayout locale={locale} homeBase={homeBase} faqItems={faqItems} breadcrumb={breadcrumb} serviceSchema={serviceSchema} faqSchema={faqSchema}><RuContent homeBase={homeBase} /></PageLayout>;
  return <PageLayout locale={locale} homeBase={homeBase} faqItems={faqItems} breadcrumb={breadcrumb} serviceSchema={serviceSchema} faqSchema={faqSchema}><DeContent homeBase={homeBase} /></PageLayout>;
}

function PageLayout({
  locale,
  homeBase,
  faqItems,
  breadcrumb,
  serviceSchema,
  faqSchema,
  children,
}: {
  locale: string;
  homeBase: string;
  faqItems: { q: string; a: string }[];
  breadcrumb: object;
  serviceSchema: object;
  faqSchema: object;
  children: React.ReactNode;
}) {
  const faqHeading =
    locale === "ru"
      ? "Часто задаваемые вопросы"
      : locale === "en"
      ? "Frequently Asked Questions"
      : "Häufige Fragen";

  const ctaHeading =
    locale === "ru"
      ? "Готовы к росту в Google Maps?"
      : locale === "en"
      ? "Ready to grow on Google Maps?"
      : "Bereit für mehr Sichtbarkeit bei Google Maps?";

  const ctaText =
    locale === "ru"
      ? "Получите бесплатный аудит вашего Google Business Profile. Я покажу, что именно нужно улучшить и каких результатов можно ожидать."
      : locale === "en"
      ? "Get a free audit of your Google Business Profile. I'll show you exactly what needs to improve and what results to expect."
      : "Holen Sie sich ein kostenloses Google Business Profile Audit. Ich zeige Ihnen genau, was verbessert werden sollte und welche Ergebnisse Sie erwarten können.";

  const ctaBtn =
    locale === "ru"
      ? "Бесплатный аудит запросить"
      : locale === "en"
      ? "Request free audit"
      : "Kostenloses Audit anfragen";

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
      <main className="min-h-screen">
        {children}

        {/* FAQ */}
        <section className="section-padding bg-google-light">
          <div className="container-content mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold text-google-text mb-8 text-center">{faqHeading}</h2>
            <div className="divide-y divide-google-border border border-google-border rounded-card-lg overflow-hidden bg-white">
              {faqItems.map((item, i) => (
                <details key={i} className="group px-5 py-4">
                  <summary className="flex items-center justify-between cursor-pointer list-none text-body-sm font-semibold text-google-text">
                    {item.q}
                    <ChevronDown
                      size={16}
                      className="text-google-secondary shrink-0 ml-3 transition-transform group-open:rotate-180"
                    />
                  </summary>
                  <p className="mt-3 text-body-sm text-google-secondary leading-relaxed">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="audit" className="section-padding">
          <div className="container-content mx-auto max-w-3xl text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-google-text mb-4">{ctaHeading}</h2>
            <p className="text-body-lg text-google-secondary mb-8 max-w-xl mx-auto">{ctaText}</p>
            <Link
              href={`${homeBase}/#audit`}
              className="inline-flex items-center gap-2 bg-brand-blue text-white font-semibold px-6 py-3 rounded-lg hover:bg-brand-blue/90 transition-colors"
            >
              {ctaBtn}
              <ArrowRight size={16} />
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
      {/* Hero */}
      <section className="pt-32 pb-16 px-6 bg-white">
        <div className="container-content mx-auto max-w-4xl">
          <nav className="flex items-center gap-2 text-sm text-google-secondary mb-6">
            <Link href={`${homeBase}/`} className="hover:text-brand-blue transition-colors">Home</Link>
            <span>/</span>
            <Link href={`${homeBase}/#leistungen`} className="hover:text-brand-blue transition-colors">Leistungen</Link>
            <span>/</span>
            <span className="text-google-text">Google Business Profile</span>
          </nav>
          <p className="text-label-sm uppercase text-brand-blue tracking-widest mb-3">Leistung</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-google-text mb-6 leading-tight">
            Google Business Profile Optimierung —<br />
            <span className="text-brand-blue">mehr Kunden über Google Maps</span>
          </h1>
          <p className="text-body-lg text-google-secondary mb-8 max-w-2xl">
            Ihr Google Business Profile ist Ihre wichtigste Präsenz im lokalen Internet. Professionell optimiert bringt es täglich neue Kunden — ohne Werbebudget.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href={`${homeBase}/#audit`}
              className="inline-flex items-center gap-2 bg-brand-blue text-white font-semibold px-6 py-3 rounded-lg hover:bg-brand-blue/90 transition-colors"
            >
              Kostenloses Audit anfragen <ArrowRight size={16} />
            </Link>
            <Link
              href="/blog/google-maps-optimierung-anleitung"
              className="inline-flex items-center gap-2 border border-google-border text-google-text font-medium px-6 py-3 rounded-lg hover:border-brand-blue hover:text-brand-blue transition-colors"
            >
              Anleitung lesen
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-6 bg-google-light border-y border-google-border">
        <div className="container-content mx-auto max-w-4xl">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { value: "86 %", label: "der Menschen nutzen Google Maps für lokale Suchen" },
              { value: "42 %", label: "mehr Wegbeschreibungsanfragen mit Fotos" },
              { value: "2–4 Wo.", label: "bis erste Ergebnisse sichtbar werden" },
              { value: "3×", label: "mehr Anrufe durch vollständiges Profil" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl font-bold text-brand-blue mb-1">{stat.value}</div>
                <div className="text-xs text-google-secondary leading-snug">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What we optimize */}
      <section className="section-padding px-6">
        <div className="container-content mx-auto max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-google-text mb-4">
            Was wir bei Ihrem Google Business Profile optimieren
          </h2>
          <p className="text-body-lg text-google-secondary mb-10">
            Ein Google Business Profile hat über 20 Optimierungspunkte. Die meisten Unternehmen nutzen davon weniger als die Hälfte. Hier setzt unsere Arbeit an.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mb-12">
            {[
              {
                icon: <MapPin size={20} className="text-brand-blue" />,
                title: "Profilstruktur & Kategorien",
                text: "Die Wahl der Hauptkategorie ist der stärkste einzelne Ranking-Faktor. Wir analysieren Ihre Wettbewerber und wählen die optimale Kategorienkombination aus bis zu 10 Kategorien.",
              },
              {
                icon: <Star size={20} className="text-brand-blue" />,
                title: "Keywords & Beschreibung",
                text: "750 Zeichen für Ihre Unternehmensgeschichte und Schlüsselbegriffe. Wir schreiben eine Beschreibung, die Google versteht und Kunden überzeugt.",
              },
              {
                icon: <Camera size={20} className="text-brand-blue" />,
                title: "Fotos & Visuelle Präsenz",
                text: "Profile mit Fotos erhalten 42 % mehr Wegbeschreibungsanfragen. Wir definieren eine Fotostrategie für Außenansicht, Innenraum, Team und Leistungen.",
              },
              {
                icon: <Clock size={20} className="text-brand-blue" />,
                title: "Öffnungszeiten & Attribute",
                text: "Vollständige, aktuelle Öffnungszeiten inklusive Feiertagen und Sonderzeiten. Relevante Attribute wie Rollstuhlgerecht oder Kostenloser WLAN werden ergänzt.",
              },
              {
                icon: <BarChart3 size={20} className="text-brand-blue" />,
                title: "Leistungen & Produkte",
                text: "Alle Ihre Dienstleistungen mit Beschreibung, Kategorie und ggf. Preis im Profil — so können Kunden direkt im Suchergebnis entscheiden.",
              },
              {
                icon: <CheckCircle size={20} className="text-brand-blue" />,
                title: "Beiträge & Aktivität",
                text: "Regelmäßige Beiträge signalisieren Google, dass Ihr Unternehmen aktiv ist. Wir erstellen einen Beitragsplan und liefern wöchentliche Inhalte.",
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-5 border border-google-border rounded-card bg-white">
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
          <h2 className="text-2xl font-bold text-google-text mb-6">
            Nicht optimiert vs. optimiert: Was ist der Unterschied?
          </h2>
          <div className="overflow-x-auto mb-12">
            <table className="w-full border border-google-border rounded-card overflow-hidden text-sm">
              <thead>
                <tr className="bg-google-light">
                  <th className="text-left p-4 font-semibold text-google-text">Bereich</th>
                  <th className="text-left p-4 font-semibold text-google-secondary">Nicht optimiert</th>
                  <th className="text-left p-4 font-semibold text-brand-blue">Professionell optimiert</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-google-border">
                {[
                  ["Kategorien", "1 Hauptkategorie", "1 Haupt + bis zu 9 relevante Zusatzkategorien"],
                  ["Beschreibung", "Leer oder generisch", "750 Zeichen mit Keywords und lokalem Bezug"],
                  ["Fotos", "0–3 schlechte Fotos", "15–30 professionelle Bilder mit regelmäßigen Updates"],
                  ["Öffnungszeiten", "Fehlen oder veraltet", "Vollständig, aktuell, mit Feiertagen"],
                  ["Leistungen", "Nicht eingetragen", "Alle Leistungen mit Beschreibung und Preisen"],
                  ["Beiträge", "Keine", "Wöchentlich mit CTA und Keywords"],
                  ["Bewertungen", "Keine Antworten", "Aktives Management, 100 % Antwortquote"],
                  ["Rankings", "Seite 2–3 oder unsichtbar", "Top 3 im Local Pack der Zielregion"],
                ].map(([area, bad, good]) => (
                  <tr key={area} className="bg-white">
                    <td className="p-4 font-medium text-google-text">{area}</td>
                    <td className="p-4 text-google-secondary">{bad}</td>
                    <td className="p-4 text-brand-blue font-medium">{good}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Process */}
          <h2 className="text-2xl font-bold text-google-text mb-6">Unser Arbeitsprozess</h2>
          <div className="space-y-4 mb-12">
            {[
              {
                step: "01",
                title: "Kostenloses Audit & Analyse",
                text: "Ich analysiere Ihr aktuelles Profil, Ihre Wettbewerber und Ihre lokalen Rankings. Sie erhalten einen detaillierten Bericht mit priorisierten Empfehlungen — kostenlos und unverbindlich.",
              },
              {
                step: "02",
                title: "Strategie & Optimierungsplan",
                text: "Basierend auf dem Audit erstellen wir einen individuellen Optimierungsplan: Kategorien, Keywords, Fotos, Leistungen und Beitragskalender.",
              },
              {
                step: "03",
                title: "Umsetzung & Optimierung",
                text: "Wir setzen alle Verbesserungen um: Profil-Update, Foto-Optimierung, Keyword-Integration, Leistungsangaben und Start des Beitragsplans.",
              },
              {
                step: "04",
                title: "Monitoring & Reporting",
                text: "Monatliche Berichte zu Profilaufrufen, Klicks, Anrufen und Wegbeschreibungsanfragen. Kontinuierliche Anpassung der Strategie basierend auf den Daten.",
              },
            ].map((step) => (
              <div key={step.step} className="flex gap-5 p-5 border border-google-border rounded-card bg-white">
                <div className="text-2xl font-bold text-brand-blue/30 shrink-0 w-10">{step.step}</div>
                <div>
                  <h3 className="font-semibold text-google-text mb-1">{step.title}</h3>
                  <p className="text-body-sm text-google-secondary">{step.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Who needs this */}
          <h2 className="text-2xl font-bold text-google-text mb-4">Für wen ist Google Business Profile Optimierung besonders wichtig?</h2>
          <p className="text-body-lg text-google-secondary mb-6">
            Jedes lokale Unternehmen profitiert von einem optimierten Google Business Profile. Besonders wichtig ist es für:
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
            {[
              "Kosmetikstudios & Nagelstudios",
              "Friseursalons",
              "Ärzte & Therapeuten",
              "Handwerker & Bauunternehmen",
              "Restaurants & Cafés",
              "Anwälte & Steuerberater",
              "Fitnessstudios & Yogaanbieter",
              "Autowerkstätten & Reifenhändler",
              "Einzelhandel & Boutiquen",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-google-text">
                <CheckCircle size={14} className="text-brand-blue shrink-0" />
                {item}
              </div>
            ))}
          </div>

          <div className="p-6 bg-blue-50 rounded-card border border-blue-100">
            <p className="text-body-sm text-google-text mb-3">
              <strong>Weiterführender Artikel:</strong>
            </p>
            <Link
              href="/blog/google-maps-optimierung-anleitung"
              className="text-brand-blue font-medium hover:underline"
            >
              Google Maps Optimierung: Schritt-für-Schritt-Anleitung →
            </Link>
            <p className="text-body-sm text-google-secondary mt-1">
              Lernen Sie die 6 wichtigsten Schritte zur Google Maps Optimierung kennen.
            </p>
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
            <span className="text-google-text">Google Business Profile</span>
          </nav>
          <p className="text-label-sm uppercase text-brand-blue tracking-widest mb-3">Service</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-google-text mb-6 leading-tight">
            Google Business Profile Optimization —<br />
            <span className="text-brand-blue">more customers via Google Maps</span>
          </h1>
          <p className="text-body-lg text-google-secondary mb-8 max-w-2xl">
            Your Google Business Profile is your most important local online presence. Professionally optimized, it brings new customers daily — without advertising budget.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href={`${homeBase}/#audit`}
              className="inline-flex items-center gap-2 bg-brand-blue text-white font-semibold px-6 py-3 rounded-lg hover:bg-brand-blue/90 transition-colors"
            >
              Request free audit <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="section-padding px-6">
        <div className="container-content mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-google-text mb-6">What we optimize in your Google Business Profile</h2>
          <p className="text-body-lg text-google-secondary mb-8">
            A Google Business Profile has over 20 optimization points. Most businesses use fewer than half of them. That&apos;s where our work starts.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            {[
              { title: "Categories", text: "The primary category is the strongest single ranking factor. We analyze competitors and choose the optimal combination of up to 10 categories." },
              { title: "Keywords & Description", text: "750 characters for your business story and key terms. We write a description Google understands and customers trust." },
              { title: "Photos & Visual Presence", text: "Profiles with photos get 42% more direction requests. We define a photo strategy covering exterior, interior, team, and services." },
              { title: "Services & Products", text: "All your services with descriptions, categories, and prices listed in your profile — customers can decide directly in the search result." },
              { title: "Posts & Activity", text: "Regular posts signal Google that your business is active. We create a post calendar and deliver weekly content." },
              { title: "Review Management", text: "We build an active review strategy and ensure professional responses to every review — positive or negative." },
            ].map((item, i) => (
              <div key={i} className="p-5 border border-google-border rounded-card bg-white">
                <h3 className="font-semibold text-google-text mb-2">{item.title}</h3>
                <p className="text-body-sm text-google-secondary">{item.text}</p>
              </div>
            ))}
          </div>
          <div className="p-6 bg-blue-50 rounded-card border border-blue-100">
            <Link
              href="/en/blog/google-maps-optimierung-anleitung"
              className="text-brand-blue font-medium hover:underline"
            >
              Related: Google Maps Optimization Step-by-Step Guide →
            </Link>
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
            <span className="text-google-text">Google Business Profile</span>
          </nav>
          <p className="text-label-sm uppercase text-brand-blue tracking-widest mb-3">Услуга</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-google-text mb-6 leading-tight">
            Оптимизация Google Business Profile —<br />
            <span className="text-brand-blue">больше клиентов через Google Maps</span>
          </h1>
          <p className="text-body-lg text-google-secondary mb-8 max-w-2xl">
            Ваш Google Business Profile — важнейшее присутствие вашего бизнеса в интернете. Профессионально оптимизированный, он приводит новых клиентов каждый день — без рекламного бюджета.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href={`${homeBase}/#audit`}
              className="inline-flex items-center gap-2 bg-brand-blue text-white font-semibold px-6 py-3 rounded-lg hover:bg-brand-blue/90 transition-colors"
            >
              Запросить бесплатный аудит <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="section-padding px-6">
        <div className="container-content mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-google-text mb-6">Что мы оптимизируем в вашем Google Business Profile</h2>
          <p className="text-body-lg text-google-secondary mb-8">
            В Google Business Profile более 20 точек оптимизации. Большинство бизнесов используют менее половины из них. Именно здесь начинается наша работа.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            {[
              { title: "Категории", text: "Основная категория — самый сильный фактор ранжирования. Мы анализируем конкурентов и выбираем оптимальную комбинацию из до 10 категорий." },
              { title: "Ключевые слова и описание", text: "750 символов для вашей истории и ключевых запросов. Мы пишем описание, которое понимает Google и которому доверяют клиенты." },
              { title: "Фото и визуальное присутствие", text: "Профили с фото получают на 42% больше запросов маршрута. Мы разрабатываем стратегию фотографий: фасад, интерьер, команда, услуги." },
              { title: "Услуги и продукты", text: "Все ваши услуги с описаниями, категориями и ценами в профиле — клиенты могут принять решение прямо в результатах поиска." },
              { title: "Посты и активность", text: "Регулярные посты сигнализируют Google об активности вашего бизнеса. Мы создаём план публикаций и еженедельный контент." },
              { title: "Управление отзывами", text: "Мы создаём активную стратегию получения отзывов и обеспечиваем профессиональные ответы на каждый отзыв." },
            ].map((item, i) => (
              <div key={i} className="p-5 border border-google-border rounded-card bg-white">
                <h3 className="font-semibold text-google-text mb-2">{item.title}</h3>
                <p className="text-body-sm text-google-secondary">{item.text}</p>
              </div>
            ))}
          </div>
          <div className="p-6 bg-blue-50 rounded-card border border-blue-100">
            <Link
              href="/ru/fur-russischsprachige"
              className="text-brand-blue font-medium hover:underline"
            >
              Работаете на русском? Узнайте о нашей специальной поддержке →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

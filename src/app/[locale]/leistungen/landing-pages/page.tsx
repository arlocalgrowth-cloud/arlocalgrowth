import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FaqVisibleSimple } from "@/components/faq/FaqVisible";
import { ArrowRight, Smartphone, Search, Zap, Clock, CheckCircle, Target } from "lucide-react";

const BASE_URL = "https://arlocalgrowth.de";

const pageMeta: Record<string, { title: string; description: string }> = {
  de: {
    title: "Landing Pages für lokale Unternehmen — Fertig in 21 Tagen",
    description: "Lokale Landing Page in 21 Tagen: erster Entwurf am 5. Tag. Mobilfreundlich, schnell, auf Ihren wichtigsten lokalen Suchbegriff optimiert. A.R. Local Growth Berlin.",
  },
  en: {
    title: "Landing Pages for Local Businesses — Done in 21 Days",
    description: "Local landing page in 21 days: first draft on day 5. Mobile-friendly, fast, optimized for your most important local keyword. A.R. Local Growth Berlin.",
  },
  ru: {
    title: "Лендинги для локального бизнеса — готово за 21 день",
    description: "Локальный лендинг за 21 день: первый вариант на 5-й день. Мобильный, быстрый, оптимизированный под главный локальный запрос. A.R. Local Growth Берлин.",
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
  const canonicalPath = locale === "de" ? "/leistungen/landing-pages" : `/${locale}/leistungen/landing-pages`;
  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: `${BASE_URL}${canonicalPath}`,
      languages: {
        de: `${BASE_URL}/leistungen/landing-pages`,
        en: `${BASE_URL}/en/leistungen/landing-pages`,
        ru: `${BASE_URL}/ru/leistungen/landing-pages`,
      },
    },
    openGraph: { title: m.title, description: m.description, url: `${BASE_URL}${canonicalPath}` },
  };
}

export default async function LandingPagesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const homeBase = locale === "de" ? "" : `/${locale}`;
  const canonicalPath = locale === "de" ? "/leistungen/landing-pages" : `/${locale}/leistungen/landing-pages`;

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: locale === "de" ? BASE_URL : `${BASE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: locale === "ru" ? "Услуги" : locale === "en" ? "Services" : "Leistungen", item: `${BASE_URL}${homeBase}/leistungen` },
      { "@type": "ListItem", position: 3, name: "Landing Pages", item: `${BASE_URL}${canonicalPath}` },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: locale === "ru" ? "Лендинги для локального бизнеса" : locale === "en" ? "Landing Pages for Local Businesses" : "Landing Pages für lokale Unternehmen",
    provider: { "@type": "LocalBusiness", "@id": `${BASE_URL}/#business` },
    areaServed: [{ "@type": "Country", name: "Germany" }, { "@type": "Country", name: "Austria" }, { "@type": "Country", name: "Switzerland" }],
  };

  const faqItems =
    locale === "ru"
      ? [
          { q: "За сколько дней готов лендинг?", a: "21 рабочий день с момента получения всех материалов. Первый вариант — на 5-й день для согласования. Если нужны правки — вносим их в течение 5 дней. Не уложились в срок? Минус 10% от суммы за каждый день просрочки." },
          { q: "Чем лендинг отличается от полноценного сайта?", a: "Лендинг — это одна страница с одной целью: чтобы потенциальный клиент позвонил или написал. Он загружается за 1-2 секунды, оптимизирован под один ключевой запрос и не отвлекает лишними разделами. Для большинства локальных бизнесов это эффективнее многостраничного сайта." },
          { q: "Могу ли я сам обновлять лендинг после запуска?", a: "Да. Вы получаете доступ к простой CMS (или Google Docs-структуре), где можете изменить тексты, фото и контактные данные без программиста. Для технических правок — я всегда на связи." },
          { q: "Как вы оптимизируете страницу под локальные запросы?", a: "Перед стартом мы проводим анализ ключевых слов для вашего города и ниши. Самый частый и конверсионный запрос ложится в основу заголовка, мета-тегов, URL и структуры контента. Schema.org LocalBusiness и FAQPage разметка идут в комплекте." },
          { q: "Что происходит после запуска лендинга?", a: "Через 4 недели после запуска я делаю первый анализ трафика и конверсий и даю рекомендации. Дальнейшее SEO-сопровождение — по отдельному договору или как часть Local SEO пакета." },
        ]
      : locale === "en"
      ? [
          { q: "How long does it take to build a landing page?", a: "21 working days from receiving all materials. First draft on day 5 for your review. Revisions done within 5 days. Missed deadline? 10% discount per day of delay." },
          { q: "What is the difference between a landing page and a full website?", a: "A landing page is one page with one goal: to get the potential customer to call or message you. It loads in 1-2 seconds, is optimized for one main keyword and has no distracting sub-pages. For most local businesses, it converts better than a multi-page website." },
          { q: "Can I update the landing page myself after launch?", a: "Yes. You get access to a simple CMS (or Google Docs structure) where you can change texts, photos and contact details without a developer. For technical changes, I am always available." },
          { q: "How do you optimize the page for local keywords?", a: "Before starting, we run keyword research for your city and niche. The most frequent and converting query becomes the foundation for the headline, meta tags, URL and content structure. Schema.org LocalBusiness and FAQPage markup are included." },
          { q: "What happens after the landing page launches?", a: "4 weeks after launch I analyze traffic and conversions and provide recommendations. Ongoing SEO support is available as a separate agreement or as part of a Local SEO package." },
        ]
      : [
          { q: "Wie lange dauert die Erstellung einer Landing Page?", a: "21 Arbeitstage ab Eingang aller Materialien. Erster Entwurf am 5. Tag zur Freigabe. Korrekturen innerhalb von 5 Tagen erledigt. Termin verpasst? Minus 10% vom Gesamtbetrag pro Verzugstag." },
          { q: "Was ist der Unterschied zwischen einer Landing Page und einer vollstaendigen Website?", a: "Eine Landing Page ist eine einzelne Seite mit einem Ziel: den potenziellen Kunden zum Anruf oder zur Anfrage zu bewegen. Sie laedt in 1-2 Sekunden, ist auf einen Hauptsuchbegriff optimiert und hat keine ablenkenden Unterbereiche. Fuer die meisten lokalen Unternehmen konvertiert sie besser als eine mehrseitige Website." },
          { q: "Kann ich die Landing Page nach dem Launch selbst aktualisieren?", a: "Ja. Sie erhalten Zugang zu einem einfachen CMS (oder einer Google Docs-Struktur), in dem Sie Texte, Fotos und Kontaktdaten ohne Entwickler aendern koennen. Fuer technische Aenderungen bin ich immer erreichbar." },
          { q: "Wie optimieren Sie die Seite fuer lokale Suchbegriffe?", a: "Vor dem Start fuehren wir eine Keyword-Analyse fuer Ihre Stadt und Nische durch. Die haeufigste und konversionsstaerkste Suchanfrage wird zur Grundlage fuer Ueberschrift, Meta-Tags, URL und Inhaltsstruktur. Schema.org LocalBusiness und FAQPage-Auszeichnung sind im Lieferumfang enthalten." },
          { q: "Was passiert nach dem Launch der Landing Page?", a: "4 Wochen nach dem Launch analysiere ich Traffic und Conversions und gebe Empfehlungen. Fortlaufende SEO-Betreuung ist als separater Vertrag oder als Teil eines Local SEO-Pakets moeglich." },
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

  const content = locale === "ru" ? (
    <RuContent homeBase={homeBase} faqItems={faqItems} />
  ) : locale === "en" ? (
    <EnContent homeBase={homeBase} faqItems={faqItems} />
  ) : (
    <DeContent homeBase={homeBase} faqItems={faqItems} />
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <main className="min-h-screen">{content}</main>
      <Footer />
    </>
  );
}

// ─── DE ──────────────────────────────────────────────────────────────────────
function DeContent({ homeBase, faqItems }: { homeBase: string; faqItems: { q: string; a: string }[] }) {
  return (
    <>
      <section className="pt-32 pb-16 px-6 bg-white">
        <div className="container-content mx-auto max-w-4xl">
          <nav className="flex items-center gap-2 text-sm text-google-secondary mb-6">
            <Link href={`${homeBase}/`} className="hover:text-brand-blue transition-colors">Home</Link>
            <span>/</span>
            <Link href={`${homeBase}/leistungen`} className="hover:text-brand-blue transition-colors">Leistungen</Link>
            <span>/</span>
            <span className="text-google-text">Landing Pages</span>
          </nav>
          <p className="text-label-sm uppercase text-brand-blue tracking-widest mb-3">Leistung</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-google-text mb-6 leading-tight speakable">
            Landing Page in 21 Tagen —<br />
            <span className="text-brand-blue">erster Entwurf am 5. Tag</span>
          </h1>
          <p className="text-body-lg text-google-secondary mb-8 max-w-2xl speakable">
            Mobilfreundlich, schnell ladend und auf Ihren wichtigsten lokalen Suchbegriff optimiert.
            Mit einem klaren Ziel: Interessenten werden zu Kunden.
          </p>
          <div className="flex items-center gap-3 mb-8 p-4 bg-amber-50 border border-amber-200 rounded-card text-sm text-amber-800">
            <Clock size={16} className="shrink-0" />
            Nicht im Zeitplan? Minus 10% vom Gesamtbetrag pro Verzugstag.
          </div>
          <Link href={`${homeBase}/#audit`} className="inline-flex items-center gap-2 bg-brand-blue text-white font-semibold px-6 py-3 rounded-lg hover:bg-brand-blue/90 transition-colors">
            Kostenloses Erstgespraech <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <section className="py-12 px-6 bg-google-light border-y border-google-border">
        <div className="container-content mx-auto max-w-4xl">
          <h2 className="text-xl font-bold text-google-text mb-6">Der Prozess — 21 Tage, 4 Phasen</h2>
          <div className="grid sm:grid-cols-4 gap-4">
            {[
              { day: "Tag 1–2", title: "40-Fragen-Interview", text: "Wir klaeren Ihr Angebot, Ihre Zielgruppe, Ihren Hauptsuchbegriff und Ihre USPs." },
              { day: "Tag 3–5", title: "Erster Entwurf", text: "Vollstaendiger erster Seitenaufbau mit Texten, Struktur und Mobilversion zur Freigabe." },
              { day: "Tag 6–15", title: "Korrekturen & Feinschliff", text: "Bis zu 3 Korrekturschleifen — Texte, Bilder, Farben. SEO-Auszeichnung und Schema-Markup." },
              { day: "Tag 16–21", title: "Launch & Analyse", text: "Live-Schaltung, Google Search Console-Einbindung, erste Traffic-Analyse nach 4 Wochen." },
            ].map((step) => (
              <div key={step.day} className="bg-white rounded-card border border-google-border p-5">
                <div className="text-xs font-bold text-brand-blue mb-1">{step.day}</div>
                <h3 className="font-semibold text-google-text mb-2 text-sm">{step.title}</h3>
                <p className="text-xs text-google-secondary">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding px-6">
        <div className="container-content mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-google-text mb-8">Was im Lieferumfang enthalten ist</h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-12">
            {[
              { icon: <Search size={18} className="text-brand-blue" />, title: "Lokale Keyword-Optimierung", text: "Keyword-Analyse vor dem Start. Die wichtigste Suchanfrage Ihrer Stadt und Branche praegt Headline, URL und Meta-Tags." },
              { icon: <Smartphone size={18} className="text-brand-blue" />, title: "Mobile-First Design", text: "85% Ihrer Besucher kommen vom Smartphone. Die Seite ist zuerst fuer Mobile gebaut — Desktop kommt danach." },
              { icon: <Zap size={18} className="text-brand-blue" />, title: "Ladezeit unter 2 Sekunden", text: "Optimierte Bilder, minimaler Code, modernes Hosting. Lighthouse Performance Score 90+." },
              { icon: <Target size={18} className="text-brand-blue" />, title: "Konversionszentrierte Struktur", text: "Klarer Call-to-Action, Vertrauenssignale (Bewertungen, Zertifikate), Kontaktformular und Click-to-Call." },
              { icon: <CheckCircle size={18} className="text-brand-blue" />, title: "Schema.org Markup", text: "LocalBusiness, FAQPage und WebSite-Auszeichnung — fuer bessere Sichtbarkeit in lokalen Suchergebnissen und AI Overviews." },
              { icon: <Clock size={18} className="text-brand-blue" />, title: "CMS-Zugang & Einweisung", text: "Sie koennen Texte, Preise und Oeffnungszeiten selbst aendern. Einfaches System, keine Programmier-Kenntnisse noetig." },
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

          <h2 className="text-2xl font-bold text-google-text mb-8 text-center">Haeufige Fragen</h2>
          <FaqVisibleSimple items={faqItems} />

          <div className="grid sm:grid-cols-2 gap-4 mt-12">
            <div className="p-5 bg-google-light rounded-card border border-google-border">
              <p className="text-xs text-google-secondary mb-1 uppercase tracking-wide">Verwandte Leistung</p>
              <Link href="/leistungen/local-seo" className="text-brand-blue font-medium hover:underline text-sm">Local SEO →</Link>
            </div>
            <div className="p-5 bg-google-light rounded-card border border-google-border">
              <p className="text-xs text-google-secondary mb-1 uppercase tracking-wide">Verwandte Leistung</p>
              <Link href="/leistungen/geo-aeo" className="text-brand-blue font-medium hover:underline text-sm">GEO & AEO →</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding px-6 bg-google-light border-t border-google-border">
        <div className="container-content mx-auto max-w-3xl text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-google-text mb-4">Ihre Landing Page in 21 Tagen</h2>
          <p className="text-body-lg text-google-secondary mb-8 max-w-xl mx-auto">
            Kostenloses Erstgespraech: Ich erklaere, welche Struktur und welcher Suchbegriff fuer Ihr Unternehmen am meisten bringt.
          </p>
          <Link href={`${homeBase}/#audit`} className="inline-flex items-center gap-2 bg-brand-blue text-white font-semibold px-6 py-3 rounded-lg hover:bg-brand-blue/90 transition-colors">
            Jetzt Erstgespraech anfragen <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}

// ─── EN ──────────────────────────────────────────────────────────────────────
function EnContent({ homeBase, faqItems }: { homeBase: string; faqItems: { q: string; a: string }[] }) {
  return (
    <>
      <section className="pt-32 pb-16 px-6 bg-white">
        <div className="container-content mx-auto max-w-4xl">
          <nav className="flex items-center gap-2 text-sm text-google-secondary mb-6">
            <Link href={`${homeBase}/`} className="hover:text-brand-blue transition-colors">Home</Link>
            <span>/</span>
            <Link href={`${homeBase}/leistungen`} className="hover:text-brand-blue transition-colors">Services</Link>
            <span>/</span>
            <span className="text-google-text">Landing Pages</span>
          </nav>
          <p className="text-label-sm uppercase text-brand-blue tracking-widest mb-3">Service</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-google-text mb-6 leading-tight speakable">
            Landing page in 21 days —<br />
            <span className="text-brand-blue">first draft on day 5</span>
          </h1>
          <p className="text-body-lg text-google-secondary mb-8 max-w-2xl speakable">
            Mobile-friendly, fast-loading and optimized for your most important local keyword. One goal: turn visitors into customers.
          </p>
          <div className="flex items-center gap-3 mb-8 p-4 bg-amber-50 border border-amber-200 rounded-card text-sm text-amber-800">
            <Clock size={16} className="shrink-0" />
            Missed deadline? 10% discount per day of delay — written into the contract.
          </div>
          <Link href={`${homeBase}/#audit`} className="inline-flex items-center gap-2 bg-brand-blue text-white font-semibold px-6 py-3 rounded-lg hover:bg-brand-blue/90 transition-colors">
            Request free consultation <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <section className="py-12 px-6 bg-google-light border-y border-google-border">
        <div className="container-content mx-auto max-w-4xl">
          <h2 className="text-xl font-bold text-google-text mb-6">The process — 21 days, 4 phases</h2>
          <div className="grid sm:grid-cols-4 gap-4">
            {[
              { day: "Day 1–2", title: "40-question interview", text: "We clarify your offer, target audience, main keyword and USPs." },
              { day: "Day 3–5", title: "First draft", text: "Complete first page layout with copy, structure and mobile version for approval." },
              { day: "Day 6–15", title: "Revisions & polish", text: "Up to 3 revision rounds — texts, images, colors. SEO markup and schema implementation." },
              { day: "Day 16–21", title: "Launch & analysis", text: "Go live, Google Search Console setup, first traffic analysis after 4 weeks." },
            ].map((step) => (
              <div key={step.day} className="bg-white rounded-card border border-google-border p-5">
                <div className="text-xs font-bold text-brand-blue mb-1">{step.day}</div>
                <h3 className="font-semibold text-google-text mb-2 text-sm">{step.title}</h3>
                <p className="text-xs text-google-secondary">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding px-6">
        <div className="container-content mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-google-text mb-8">What is included</h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-12">
            {[
              { icon: <Search size={18} className="text-brand-blue" />, title: "Local keyword optimization", text: "Keyword research before start. The most valuable search query for your city and niche shapes headline, URL and meta tags." },
              { icon: <Smartphone size={18} className="text-brand-blue" />, title: "Mobile-first design", text: "85% of your visitors come from smartphones. The page is built for mobile first — desktop comes after." },
              { icon: <Zap size={18} className="text-brand-blue" />, title: "Load time under 2 seconds", text: "Optimized images, minimal code, modern hosting. Lighthouse Performance Score 90+." },
              { icon: <Target size={18} className="text-brand-blue" />, title: "Conversion-centered structure", text: "Clear call-to-action, trust signals (reviews, certifications), contact form and click-to-call." },
              { icon: <CheckCircle size={18} className="text-brand-blue" />, title: "Schema.org markup", text: "LocalBusiness, FAQPage and WebSite markup — for better visibility in local search results and AI Overviews." },
              { icon: <Clock size={18} className="text-brand-blue" />, title: "CMS access & training", text: "You can change texts, prices and opening hours yourself. Simple system, no coding knowledge needed." },
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
          <h2 className="text-2xl font-bold text-google-text mb-8 text-center">Frequently asked questions</h2>
          <FaqVisibleSimple items={faqItems} />
          <div className="grid sm:grid-cols-2 gap-4 mt-12">
            <div className="p-5 bg-google-light rounded-card border border-google-border">
              <p className="text-xs text-google-secondary mb-1 uppercase tracking-wide">Related service</p>
              <Link href="/en/leistungen/local-seo" className="text-brand-blue font-medium hover:underline text-sm">Local SEO →</Link>
            </div>
            <div className="p-5 bg-google-light rounded-card border border-google-border">
              <p className="text-xs text-google-secondary mb-1 uppercase tracking-wide">Related service</p>
              <Link href="/en/leistungen/geo-aeo" className="text-brand-blue font-medium hover:underline text-sm">GEO & AEO →</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding px-6 bg-google-light border-t border-google-border">
        <div className="container-content mx-auto max-w-3xl text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-google-text mb-4">Your landing page in 21 days</h2>
          <p className="text-body-lg text-google-secondary mb-8 max-w-xl mx-auto">Free consultation: I explain which structure and keyword will bring the most for your business.</p>
          <Link href={`${homeBase}/#audit`} className="inline-flex items-center gap-2 bg-brand-blue text-white font-semibold px-6 py-3 rounded-lg hover:bg-brand-blue/90 transition-colors">
            Request free consultation <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}

// ─── RU ──────────────────────────────────────────────────────────────────────
function RuContent({ homeBase, faqItems }: { homeBase: string; faqItems: { q: string; a: string }[] }) {
  return (
    <>
      <section className="pt-32 pb-16 px-6 bg-white">
        <div className="container-content mx-auto max-w-4xl">
          <nav className="flex items-center gap-2 text-sm text-google-secondary mb-6">
            <Link href={`${homeBase}/`} className="hover:text-brand-blue transition-colors">Главная</Link>
            <span>/</span>
            <Link href={`${homeBase}/leistungen`} className="hover:text-brand-blue transition-colors">Услуги</Link>
            <span>/</span>
            <span className="text-google-text">Лендинги</span>
          </nav>
          <p className="text-label-sm uppercase text-brand-blue tracking-widest mb-3">Услуга</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-google-text mb-6 leading-tight speakable">
            Лендинг за 21 день —<br />
            <span className="text-brand-blue">первый вариант на 5-й день</span>
          </h1>
          <p className="text-body-lg text-google-secondary mb-8 max-w-2xl speakable">
            Мобильный, быстрый и оптимизированный под главный локальный запрос. Одна цель: превратить посетителей в клиентов.
          </p>
          <div className="flex items-center gap-3 mb-8 p-4 bg-amber-50 border border-amber-200 rounded-card text-sm text-amber-800">
            <Clock size={16} className="shrink-0" />
            Не уложились в срок? Минус 10% от суммы за каждый день просрочки — прописано в договоре.
          </div>
          <Link href={`${homeBase}/#audit`} className="inline-flex items-center gap-2 bg-brand-blue text-white font-semibold px-6 py-3 rounded-lg hover:bg-brand-blue/90 transition-colors">
            Записаться на бесплатную консультацию <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <section className="py-12 px-6 bg-google-light border-y border-google-border">
        <div className="container-content mx-auto max-w-4xl">
          <h2 className="text-xl font-bold text-google-text mb-6">Процесс — 21 день, 4 этапа</h2>
          <div className="grid sm:grid-cols-4 gap-4">
            {[
              { day: "День 1–2", title: "Интервью 40 вопросов", text: "Уточняем ваше предложение, целевую аудиторию, главный запрос и УТП." },
              { day: "День 3–5", title: "Первый вариант", text: "Полный черновик страницы с текстами, структурой и мобильной версией для согласования." },
              { day: "День 6–15", title: "Правки и доработка", text: "До 3 итераций правок — тексты, изображения, цвета. SEO-разметка и Schema.org." },
              { day: "День 16–21", title: "Запуск и аналитика", text: "Публикация сайта, подключение Google Search Console, первый анализ трафика через 4 недели." },
            ].map((step) => (
              <div key={step.day} className="bg-white rounded-card border border-google-border p-5">
                <div className="text-xs font-bold text-brand-blue mb-1">{step.day}</div>
                <h3 className="font-semibold text-google-text mb-2 text-sm">{step.title}</h3>
                <p className="text-xs text-google-secondary">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding px-6">
        <div className="container-content mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-google-text mb-8">Что входит в услугу</h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-12">
            {[
              { icon: <Search size={18} className="text-brand-blue" />, title: "Оптимизация под локальные запросы", text: "Анализ ключевых слов перед стартом. Самый конверсионный запрос вашего города и ниши определяет заголовок, URL и мета-теги." },
              { icon: <Smartphone size={18} className="text-brand-blue" />, title: "Mobile-first дизайн", text: "85% посетителей заходят со смартфона. Страница строится сначала для мобильных — десктоп идёт следом." },
              { icon: <Zap size={18} className="text-brand-blue" />, title: "Загрузка менее 2 секунд", text: "Оптимизированные изображения, минимальный код, современный хостинг. Lighthouse Performance Score 90+." },
              { icon: <Target size={18} className="text-brand-blue" />, title: "Конверсионная структура", text: "Четкий призыв к действию, знаки доверия (отзывы, сертификаты), контактная форма и кнопка звонка." },
              { icon: <CheckCircle size={18} className="text-brand-blue" />, title: "Разметка Schema.org", text: "LocalBusiness, FAQPage и WebSite — для лучшей видимости в локальных результатах поиска и AI Overviews." },
              { icon: <Clock size={18} className="text-brand-blue" />, title: "Доступ к CMS и обучение", text: "Вы сможете самостоятельно менять тексты, цены и часы работы. Простая система, навыки программирования не нужны." },
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
          <h2 className="text-2xl font-bold text-google-text mb-8 text-center">Частые вопросы</h2>
          <FaqVisibleSimple items={faqItems} />
          <div className="grid sm:grid-cols-2 gap-4 mt-12">
            <div className="p-5 bg-google-light rounded-card border border-google-border">
              <p className="text-xs text-google-secondary mb-1 uppercase tracking-wide">Связанная услуга</p>
              <Link href="/ru/leistungen/local-seo" className="text-brand-blue font-medium hover:underline text-sm">Local SEO →</Link>
            </div>
            <div className="p-5 bg-google-light rounded-card border border-google-border">
              <p className="text-xs text-google-secondary mb-1 uppercase tracking-wide">Связанная услуга</p>
              <Link href="/ru/leistungen/geo-aeo" className="text-brand-blue font-medium hover:underline text-sm">GEO & AEO →</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding px-6 bg-google-light border-t border-google-border">
        <div className="container-content mx-auto max-w-3xl text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-google-text mb-4">Ваш лендинг за 21 день</h2>
          <p className="text-body-lg text-google-secondary mb-8 max-w-xl mx-auto">Бесплатная консультация: объясню, какая структура и какой запрос принесут вашему бизнесу наибольший результат.</p>
          <Link href={`${homeBase}/#audit`} className="inline-flex items-center gap-2 bg-brand-blue text-white font-semibold px-6 py-3 rounded-lg hover:bg-brand-blue/90 transition-colors">
            Записаться на консультацию <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}

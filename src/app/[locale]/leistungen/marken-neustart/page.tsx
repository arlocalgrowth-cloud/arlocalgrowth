import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FaqVisibleSimple } from "@/components/faq/FaqVisible";
import { ArrowRight, Palette, Globe, Image, FileText, Search, Star } from "lucide-react";

const BASE_URL = "https://arlocalgrowth.de";

const pageMeta: Record<string, { title: string; description: string }> = {
  de: {
    title: "Marken-Neustart fuer lokale Unternehmen — Logo, Website, GBP",
    description: "Marken-Neustart fuer lokale Unternehmen: neues Logo, ueberarbeitete Website, aktualisiertes Google Business Profile. Konsistentes Erscheinungsbild in 30 Tagen. A.R. Local Growth.",
  },
  en: {
    title: "Brand Relaunch for Local Businesses — Logo, Website, GBP",
    description: "Brand relaunch for local businesses: new logo, revised website, updated Google Business Profile. Consistent appearance in 30 days. A.R. Local Growth.",
  },
  ru: {
    title: "Перезапуск бренда для локального бизнеса — лого, сайт, GBP",
    description: "Перезапуск бренда: новый логотип, обновлённый сайт, Google Business Profile. Единый образ за 30 дней. A.R. Local Growth.",
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
  const canonicalPath = locale === "de" ? "/leistungen/marken-neustart" : `/${locale}/leistungen/marken-neustart`;
  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: `${BASE_URL}${canonicalPath}`,
      languages: {
        de: `${BASE_URL}/leistungen/marken-neustart`,
        en: `${BASE_URL}/en/leistungen/marken-neustart`,
        ru: `${BASE_URL}/ru/leistungen/marken-neustart`,
      },
    },
    openGraph: { title: m.title, description: m.description, url: `${BASE_URL}${canonicalPath}` },
  };
}

export default async function MarkenNeustartPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const homeBase = locale === "de" ? "" : `/${locale}`;
  const canonicalPath = locale === "de" ? "/leistungen/marken-neustart" : `/${locale}/leistungen/marken-neustart`;

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: locale === "de" ? BASE_URL : `${BASE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: locale === "ru" ? "Услуги" : locale === "en" ? "Services" : "Leistungen", item: `${BASE_URL}${homeBase}/leistungen` },
      { "@type": "ListItem", position: 3, name: locale === "ru" ? "Перезапуск бренда" : locale === "en" ? "Brand Relaunch" : "Marken-Neustart", item: `${BASE_URL}${canonicalPath}` },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: locale === "ru" ? "Перезапуск бренда для локального бизнеса" : locale === "en" ? "Brand Relaunch for Local Businesses" : "Marken-Neustart fuer lokale Unternehmen",
    provider: { "@type": "LocalBusiness", "@id": `${BASE_URL}/#business` },
    areaServed: [{ "@type": "Country", name: "Germany" }, { "@type": "Country", name: "Austria" }, { "@type": "Country", name: "Switzerland" }],
  };

  const faqItems =
    locale === "ru"
      ? [
          { q: "Чем перезапуск бренда отличается от создания логотипа?", a: "Логотип — один элемент. Перезапуск бренда — это обновление всего, что видит потенциальный клиент: логотип, сайт, Google Business Profile, фотографии, тексты. Цель: чтобы везде был один узнаваемый образ, а не три разных версии одного бизнеса." },
          { q: "Сколько времени занимает перезапуск?", a: "30 рабочих дней для полного пакета (логотип + сайт + GBP). Если нужен только один элемент — быстрее. Логотип: 7–10 дней. Обновление GBP: 3–5 дней. Первый вариант логотипа — на 5-й день." },
          { q: "Нужно ли закрывать бизнес на время перезапуска?", a: "Нет. Всё происходит параллельно. Старый сайт и профиль работают до момента запуска нового. Переход занимает несколько часов и обычно происходит в нерабочее время." },
          { q: "Что если мне не понравится первый вариант?", a: "Вы получаете 3 итерации правок для логотипа и 2 — для текстов сайта. Если после 3 итераций мы не пришли к результату — возвращаю 50% стоимости работы по логотипу." },
          { q: "Работаете ли вы с бизнесами без существующего брендинга?", a: "Да. Для нового бизнеса или того, у кого ещё нет единого стиля — это лучший момент начать. Мы вместе определяем позиционирование, целевую аудиторию и визуальное направление до начала работ." },
        ]
      : locale === "en"
      ? [
          { q: "What is the difference between a brand relaunch and just getting a logo?", a: "A logo is one element. A brand relaunch is updating everything a potential customer sees: logo, website, Google Business Profile, photos, texts. The goal: a single recognizable image everywhere, not three different versions of the same business." },
          { q: "How long does a relaunch take?", a: "30 working days for the full package (logo + website + GBP). If only one element is needed — faster. Logo: 7-10 days. GBP update: 3-5 days. First logo draft: on day 5." },
          { q: "Do I need to close the business during the relaunch?", a: "No. Everything happens in parallel. The old website and profile operate until the new one launches. The switchover takes a few hours and usually happens outside business hours." },
          { q: "What if I do not like the first draft?", a: "You get 3 revision rounds for the logo and 2 for the website copy. If after 3 rounds we haven't reached a result — I refund 50% of the logo work fee." },
          { q: "Do you work with businesses that have no existing branding?", a: "Yes. For a new business or one that does not yet have a consistent style — this is the best time to start. We define positioning, target audience and visual direction together before any work begins." },
        ]
      : [
          { q: "Was ist der Unterschied zwischen einem Marken-Neustart und einem neuen Logo?", a: "Ein Logo ist ein Element. Ein Marken-Neustart aktualisiert alles, was ein potenzieller Kunde sieht: Logo, Website, Google Business Profile, Fotos, Texte. Das Ziel: ueberall ein einheitliches, wiedererkennbares Erscheinungsbild — nicht drei verschiedene Versionen desselben Unternehmens." },
          { q: "Wie lange dauert ein Neustart?", a: "30 Werktage fuer das Komplett-Paket (Logo + Website + GBP). Wenn nur ein Element benoetigt wird — schneller. Logo: 7-10 Tage. GBP-Aktualisierung: 3-5 Tage. Erster Logo-Entwurf: am 5. Tag." },
          { q: "Muss ich meinen Betrieb waehrend des Neustarts schliessen?", a: "Nein. Alles laeuft parallel. Die alte Website und das alte Profil sind aktiv, bis die neuen Versionen live gehen. Die Umstellung dauert wenige Stunden und erfolgt ueblicherweise ausserhalb der Geschaeftszeiten." },
          { q: "Was, wenn mir der erste Entwurf nicht gefaellt?", a: "Sie erhalten 3 Korrekturschleifen fuer das Logo und 2 fuer die Website-Texte. Falls wir nach 3 Schleifen kein Ergebnis erzielt haben, erstatte ich 50% der Logo-Verguetung." },
          { q: "Arbeiten Sie auch mit Unternehmen ohne bestehenden Markenauftritt?", a: "Ja. Fuer ein neues Unternehmen oder eines ohne einheitlichen Stil ist das der ideale Zeitpunkt. Wir erarbeiten gemeinsam Positionierung, Zielgruppe und visuelle Richtung, bevor die Arbeit beginnt." },
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
            <span className="text-google-text">Marken-Neustart</span>
          </nav>
          <p className="text-label-sm uppercase text-brand-blue tracking-widest mb-3">Leistung</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-google-text mb-6 leading-tight speakable">
            Marken-Neustart —<br />
            <span className="text-brand-blue">einheitlicher Auftritt in 30 Tagen</span>
          </h1>
          <p className="text-body-lg text-google-secondary mb-8 max-w-2xl speakable">
            Logo, Website und Google Business Profile in einem konsistenten Design. Kunden erkennen Ihr Unternehmen auf den ersten Blick — egal wo sie es finden.
          </p>
          <div className="flex flex-wrap gap-3 mb-8">
            {["Logo: erster Entwurf am 5. Tag", "3 Korrekturschleifen inklusive", "Altes Profil bleibt bis zum Launch aktiv"].map((item) => (
              <span key={item} className="inline-flex items-center gap-1.5 text-sm text-google-text bg-google-light border border-google-border rounded-full px-3 py-1">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-blue shrink-0" />
                {item}
              </span>
            ))}
          </div>
          <Link href={`${homeBase}/#audit`} className="inline-flex items-center gap-2 bg-brand-blue text-white font-semibold px-6 py-3 rounded-lg hover:bg-brand-blue/90 transition-colors">
            Kostenloses Erstgespraech <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <section className="py-12 px-6 bg-google-light border-y border-google-border">
        <div className="container-content mx-auto max-w-4xl">
          <h2 className="text-xl font-bold text-google-text mb-6">Was im Paket enthalten ist</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: <Palette size={18} className="text-brand-blue" />, title: "Neues Logo", text: "Erster Entwurf am 5. Tag. 3 Korrekturschleifen. Lieferung als SVG, PNG und PDF fuer alle Verwendungszwecke." },
              { icon: <Globe size={18} className="text-brand-blue" />, title: "Ueberarbeitete Website", text: "Bestehende Seite erhaelt neues Design und aktualisierte Texte. Oder: neue Landing Page (21 Tage, erster Entwurf am 5. Tag)." },
              { icon: <Image size={18} className="text-brand-blue" />, title: "Google Business Profile Update", text: "Logo, Titelbild, Beschreibung und Kategorie werden auf das neue Erscheinungsbild abgestimmt." },
              { icon: <FileText size={18} className="text-brand-blue" />, title: "Neue Positionierungstexte", text: "Kurzer Elevator Pitch, Website-Hauptueberschrift, GBP-Beschreibung — alle Texte fuer ein klares Auftreten." },
              { icon: <Search size={18} className="text-brand-blue" />, title: "Lokale SEO-Basis", text: "Alle relevanten Texte enthalten den wichtigsten Suchbegriff Ihrer Stadt und Branche." },
              { icon: <Star size={18} className="text-brand-blue" />, title: "Visual Style Guide", text: "Einseitiger Leitfaden: Farben, Schriften, Logo-Verwendung — damit kuenftige Materialien einheitlich bleiben." },
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
        </div>
      </section>

      <section className="section-padding px-6">
        <div className="container-content mx-auto max-w-4xl">
          <h2 className="text-xl font-bold text-google-text mb-6">Der Zeitplan</h2>
          <div className="grid sm:grid-cols-4 gap-4 mb-12">
            {[
              { day: "Tag 1–2", title: "Positioning-Workshop", text: "60-Minuten-Gespraech zu Zielgruppe, Alleinstellungsmerkmalen und visuellem Richtung." },
              { day: "Tag 3–10", title: "Logo & Texte", text: "Erster Logo-Entwurf am 5. Tag. Positionierungstexte parallel." },
              { day: "Tag 11–25", title: "Website & GBP", text: "Design-Umsetzung, Korrekturschleifen, SEO-Optimierung." },
              { day: "Tag 26–30", title: "Launch", text: "Alle Assets live, Visual Guide uebergeben, Google Search Console eingebunden." },
            ].map((step) => (
              <div key={step.day} className="bg-white rounded-card border border-google-border p-5">
                <div className="text-xs font-bold text-brand-blue mb-1">{step.day}</div>
                <h3 className="font-semibold text-google-text mb-2 text-sm">{step.title}</h3>
                <p className="text-xs text-google-secondary">{step.text}</p>
              </div>
            ))}
          </div>
          <h2 className="text-2xl font-bold text-google-text mb-8 text-center">Haeufige Fragen</h2>
          <FaqVisibleSimple items={faqItems} />
          <div className="grid sm:grid-cols-2 gap-4 mt-12">
            <div className="p-5 bg-google-light rounded-card border border-google-border">
              <p className="text-xs text-google-secondary mb-1 uppercase tracking-wide">Verwandte Leistung</p>
              <Link href="/leistungen/landing-pages" className="text-brand-blue font-medium hover:underline text-sm">Landing Pages →</Link>
            </div>
            <div className="p-5 bg-google-light rounded-card border border-google-border">
              <p className="text-xs text-google-secondary mb-1 uppercase tracking-wide">Verwandte Leistung</p>
              <Link href="/leistungen/google-business-profile" className="text-brand-blue font-medium hover:underline text-sm">Google Business Profile →</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding px-6 bg-google-light border-t border-google-border">
        <div className="container-content mx-auto max-w-3xl text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-google-text mb-4">Ihr Unternehmen — einheitlich, erkennbar, professionell</h2>
          <p className="text-body-lg text-google-secondary mb-8 max-w-xl mx-auto">Kostenloses Erstgespraech: Ich zeige, welche Elemente Ihres Auftritts am meisten Aufmerksamkeit erhalten und wo Verbesserungspotenzial liegt.</p>
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
            <span className="text-google-text">Brand Relaunch</span>
          </nav>
          <p className="text-label-sm uppercase text-brand-blue tracking-widest mb-3">Service</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-google-text mb-6 leading-tight speakable">
            Brand relaunch —<br />
            <span className="text-brand-blue">consistent appearance in 30 days</span>
          </h1>
          <p className="text-body-lg text-google-secondary mb-8 max-w-2xl speakable">
            Logo, website and Google Business Profile in one consistent design. Customers recognize your business at first glance — wherever they find you.
          </p>
          <div className="flex flex-wrap gap-3 mb-8">
            {["Logo: first draft on day 5", "3 revision rounds included", "Old profile stays active until launch"].map((item) => (
              <span key={item} className="inline-flex items-center gap-1.5 text-sm text-google-text bg-google-light border border-google-border rounded-full px-3 py-1">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-blue shrink-0" />
                {item}
              </span>
            ))}
          </div>
          <Link href={`${homeBase}/#audit`} className="inline-flex items-center gap-2 bg-brand-blue text-white font-semibold px-6 py-3 rounded-lg hover:bg-brand-blue/90 transition-colors">
            Request free consultation <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <section className="py-12 px-6 bg-google-light border-y border-google-border">
        <div className="container-content mx-auto max-w-4xl">
          <h2 className="text-xl font-bold text-google-text mb-6">What is included in the package</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: <Palette size={18} className="text-brand-blue" />, title: "New logo", text: "First draft on day 5. 3 revision rounds. Delivered as SVG, PNG and PDF for all use cases." },
              { icon: <Globe size={18} className="text-brand-blue" />, title: "Revised website", text: "Existing site gets new design and updated copy. Or: new landing page (21 days, first draft on day 5)." },
              { icon: <Image size={18} className="text-brand-blue" />, title: "Google Business Profile update", text: "Logo, cover photo, description and category aligned with the new visual identity." },
              { icon: <FileText size={18} className="text-brand-blue" />, title: "New positioning texts", text: "Short elevator pitch, website main headline, GBP description — all texts for a clear, consistent presence." },
              { icon: <Search size={18} className="text-brand-blue" />, title: "Local SEO foundation", text: "All key texts include the most important search term for your city and industry." },
              { icon: <Star size={18} className="text-brand-blue" />, title: "Visual style guide", text: "One-page guide: colors, fonts, logo usage — so future materials stay consistent." },
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
        </div>
      </section>

      <section className="section-padding px-6">
        <div className="container-content mx-auto max-w-4xl">
          <h2 className="text-xl font-bold text-google-text mb-6">The timeline</h2>
          <div className="grid sm:grid-cols-4 gap-4 mb-12">
            {[
              { day: "Day 1–2", title: "Positioning workshop", text: "60-minute conversation on target audience, USPs and visual direction." },
              { day: "Day 3–10", title: "Logo & copy", text: "First logo draft on day 5. Positioning texts in parallel." },
              { day: "Day 11–25", title: "Website & GBP", text: "Design implementation, revision rounds, SEO optimization." },
              { day: "Day 26–30", title: "Launch", text: "All assets live, visual guide delivered, Google Search Console connected." },
            ].map((step) => (
              <div key={step.day} className="bg-white rounded-card border border-google-border p-5">
                <div className="text-xs font-bold text-brand-blue mb-1">{step.day}</div>
                <h3 className="font-semibold text-google-text mb-2 text-sm">{step.title}</h3>
                <p className="text-xs text-google-secondary">{step.text}</p>
              </div>
            ))}
          </div>
          <h2 className="text-2xl font-bold text-google-text mb-8 text-center">Frequently asked questions</h2>
          <FaqVisibleSimple items={faqItems} />
          <div className="grid sm:grid-cols-2 gap-4 mt-12">
            <div className="p-5 bg-google-light rounded-card border border-google-border">
              <p className="text-xs text-google-secondary mb-1 uppercase tracking-wide">Related service</p>
              <Link href="/en/leistungen/landing-pages" className="text-brand-blue font-medium hover:underline text-sm">Landing Pages →</Link>
            </div>
            <div className="p-5 bg-google-light rounded-card border border-google-border">
              <p className="text-xs text-google-secondary mb-1 uppercase tracking-wide">Related service</p>
              <Link href="/en/leistungen/google-business-profile" className="text-brand-blue font-medium hover:underline text-sm">Google Business Profile →</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding px-6 bg-google-light border-t border-google-border">
        <div className="container-content mx-auto max-w-3xl text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-google-text mb-4">Your business — consistent, recognizable, professional</h2>
          <p className="text-body-lg text-google-secondary mb-8 max-w-xl mx-auto">Free consultation: I show which elements of your current presence need the most attention and where the greatest improvements are possible.</p>
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
            <span className="text-google-text">Перезапуск бренда</span>
          </nav>
          <p className="text-label-sm uppercase text-brand-blue tracking-widest mb-3">Услуга</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-google-text mb-6 leading-tight speakable">
            Перезапуск бренда —<br />
            <span className="text-brand-blue">единый образ за 30 дней</span>
          </h1>
          <p className="text-body-lg text-google-secondary mb-8 max-w-2xl speakable">
            Логотип, сайт и Google Business Profile в едином дизайне. Клиенты узнают ваш бизнес с первого взгляда — где бы они его ни нашли.
          </p>
          <div className="flex flex-wrap gap-3 mb-8">
            {["Логотип: первый вариант на 5-й день", "3 итерации правок включены", "Старый профиль работает до запуска нового"].map((item) => (
              <span key={item} className="inline-flex items-center gap-1.5 text-sm text-google-text bg-google-light border border-google-border rounded-full px-3 py-1">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-blue shrink-0" />
                {item}
              </span>
            ))}
          </div>
          <Link href={`${homeBase}/#audit`} className="inline-flex items-center gap-2 bg-brand-blue text-white font-semibold px-6 py-3 rounded-lg hover:bg-brand-blue/90 transition-colors">
            Записаться на бесплатную консультацию <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <section className="py-12 px-6 bg-google-light border-y border-google-border">
        <div className="container-content mx-auto max-w-4xl">
          <h2 className="text-xl font-bold text-google-text mb-6">Что входит в пакет</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: <Palette size={18} className="text-brand-blue" />, title: "Новый логотип", text: "Первый вариант на 5-й день. 3 итерации правок. Файлы SVG, PNG и PDF для всех случаев использования." },
              { icon: <Globe size={18} className="text-brand-blue" />, title: "Обновлённый сайт", text: "Существующий сайт получает новый дизайн и обновлённые тексты. Или: новый лендинг (21 день, первый вариант на 5-й день)." },
              { icon: <Image size={18} className="text-brand-blue" />, title: "Обновление Google Business Profile", text: "Логотип, обложка, описание и категория — всё приведено к новому фирменному стилю." },
              { icon: <FileText size={18} className="text-brand-blue" />, title: "Новые тексты позиционирования", text: "Краткое описание бизнеса, главный заголовок сайта, описание GBP — все тексты для чёткого и единого образа." },
              { icon: <Search size={18} className="text-brand-blue" />, title: "Локальная SEO-основа", text: "Все ключевые тексты содержат главный поисковый запрос вашего города и ниши." },
              { icon: <Star size={18} className="text-brand-blue" />, title: "Визуальный стайл-гайд", text: "Одностраничный документ: цвета, шрифты, правила использования логотипа — чтобы все будущие материалы оставались согласованными." },
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
        </div>
      </section>

      <section className="section-padding px-6">
        <div className="container-content mx-auto max-w-4xl">
          <h2 className="text-xl font-bold text-google-text mb-6">Временной план</h2>
          <div className="grid sm:grid-cols-4 gap-4 mb-12">
            {[
              { day: "День 1–2", title: "Позиционирование", text: "60-минутная встреча: целевая аудитория, УТП и визуальное направление." },
              { day: "День 3–10", title: "Логотип и тексты", text: "Первый вариант логотипа на 5-й день. Тексты позиционирования параллельно." },
              { day: "День 11–25", title: "Сайт и GBP", text: "Дизайн, итерации правок, SEO-оптимизация." },
              { day: "День 26–30", title: "Запуск", text: "Все материалы опубликованы, стайл-гайд передан, Google Search Console подключена." },
            ].map((step) => (
              <div key={step.day} className="bg-white rounded-card border border-google-border p-5">
                <div className="text-xs font-bold text-brand-blue mb-1">{step.day}</div>
                <h3 className="font-semibold text-google-text mb-2 text-sm">{step.title}</h3>
                <p className="text-xs text-google-secondary">{step.text}</p>
              </div>
            ))}
          </div>
          <h2 className="text-2xl font-bold text-google-text mb-8 text-center">Частые вопросы</h2>
          <FaqVisibleSimple items={faqItems} />
          <div className="grid sm:grid-cols-2 gap-4 mt-12">
            <div className="p-5 bg-google-light rounded-card border border-google-border">
              <p className="text-xs text-google-secondary mb-1 uppercase tracking-wide">Связанная услуга</p>
              <Link href="/ru/leistungen/landing-pages" className="text-brand-blue font-medium hover:underline text-sm">Лендинги →</Link>
            </div>
            <div className="p-5 bg-google-light rounded-card border border-google-border">
              <p className="text-xs text-google-secondary mb-1 uppercase tracking-wide">Связанная услуга</p>
              <Link href="/ru/leistungen/google-business-profile" className="text-brand-blue font-medium hover:underline text-sm">Google Business Profile →</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding px-6 bg-google-light border-t border-google-border">
        <div className="container-content mx-auto max-w-3xl text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-google-text mb-4">Ваш бизнес — единый, узнаваемый, профессиональный</h2>
          <p className="text-body-lg text-google-secondary mb-8 max-w-xl mx-auto">Бесплатная консультация: покажу, какие элементы вашего текущего образа требуют наибольшего внимания.</p>
          <Link href={`${homeBase}/#audit`} className="inline-flex items-center gap-2 bg-brand-blue text-white font-semibold px-6 py-3 rounded-lg hover:bg-brand-blue/90 transition-colors">
            Записаться на консультацию <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}

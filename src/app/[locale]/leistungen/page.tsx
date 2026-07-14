import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  MapPin,
  BarChart2,
  Megaphone,
  Star,
  FileText,
  Zap,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Clock,
  ChevronRight,
} from "lucide-react";

const BASE_URL = "https://arlocalgrowth.de";

// ─── Metadata ────────────────────────────────────────────────────────────────

const pageMeta: Record<
  string,
  { title: string; description: string; headline: string; sub: string }
> = {
  de: {
    title: "Leistungen — Google Maps, Local SEO & mehr für lokale Unternehmen",
    description:
      "Alle Leistungen von A.R. Local Growth: Google Business Profile, Local SEO, Bewertungsmanagement, Google Ads und mehr. Kostenloses Audit anfragen.",
    headline: "Leistungen für Ihren lokalen Erfolg",
    sub: "Von Google Maps Optimierung bis zur vollständigen lokalen Online-Präsenz — maßgeschneiderte Dienstleistungen für lokale Unternehmen in Deutschland, Österreich und der Schweiz.",
  },
  en: {
    title: "Services — Google Maps, Local SEO & more for local businesses",
    description:
      "All services from A.R. Local Growth: Google Business Profile, Local SEO, review management, Google Ads and more. Request a free audit.",
    headline: "Services for your local success",
    sub: "From Google Maps optimization to a complete local online presence — tailored services for local businesses in Germany, Austria, and Switzerland.",
  },
  ru: {
    title: "Услуги — Google Maps, Local SEO и другие для локального бизнеса",
    description:
      "Все услуги A.R. Local Growth: Google Business Profile, Local SEO, управление отзывами, Google Ads и другие. Запросите бесплатный аудит.",
    headline: "Услуги для вашего местного успеха",
    sub: "От оптимизации Google Maps до полного локального онлайн-присутствия — индивидуальные услуги для локального бизнеса в Германии, Австрии и Швейцарии.",
  },
};

// ─── Service data ─────────────────────────────────────────────────────────────

const services = [
  {
    icon: MapPin,
    slug: "google-business-profile",
    live: true,
    title: {
      de: "Google Business Profile",
      en: "Google Business Profile",
      ru: "Google Business Profile",
    },
    desc: {
      de: "Vollständige Optimierung Ihres GBP-Eintrags: Kategorien, Fotos, Beiträge, Leistungen und Bewertungsstrategie für messbar mehr Sichtbarkeit bei Google Maps.",
      en: "Complete optimization of your GBP listing: categories, photos, posts, services and review strategy for measurably better visibility on Google Maps.",
      ru: "Полная оптимизация вашего GBP-профиля: категории, фото, публикации, услуги и стратегия отзывов для значительно лучшей видимости в Google Maps.",
    },
    highlights: {
      de: [
        "Vollständiges Profil-Audit",
        "Kategorienoptimierung",
        "Beiträge & Fotos",
        "Bewertungsstrategie",
      ],
      en: [
        "Complete profile audit",
        "Category optimization",
        "Posts & photos",
        "Review strategy",
      ],
      ru: [
        "Полный аудит профиля",
        "Оптимизация категорий",
        "Посты и фото",
        "Стратегия отзывов",
      ],
    },
  },
  {
    icon: BarChart2,
    slug: "local-seo",
    live: true,
    title: { de: "Local SEO", en: "Local SEO", ru: "Local SEO" },
    desc: {
      de: "Lokale Suchmaschinenoptimierung für Top-Rankings bei Google. NAP-Konsistenz, Citation Building, On-Page SEO und lokale Backlinks für Ihre Stadt und Region.",
      en: "Local search engine optimization for top Google rankings. NAP consistency, citation building, on-page SEO and local backlinks for your city and region.",
      ru: "Локальная оптимизация для поисковых систем и топ-позиций в Google. Согласованность NAP, создание цитирований, on-page SEO и локальные ссылки для вашего города.",
    },
    highlights: {
      de: [
        "Lokale Keywords & Analyse",
        "NAP-Konsistenz",
        "Citation Building",
        "On-Page SEO",
      ],
      en: [
        "Local keywords & analysis",
        "NAP consistency",
        "Citation building",
        "On-page SEO",
      ],
      ru: [
        "Локальные ключевые слова",
        "Согласованность NAP",
        "Создание цитирований",
        "On-page SEO",
      ],
    },
  },
  {
    icon: Star,
    slug: "bewertungsmanagement",
    live: true,
    title: {
      de: "Bewertungsmanagement",
      en: "Review Management",
      ru: "Управление отзывами",
    },
    desc: {
      de: "Systematischer Aufbau positiver Google-Bewertungen, professionelle Antwortvorlagen und Reputationsschutz — für mehr Vertrauen und mehr Klicks.",
      en: "Systematic build-up of positive Google reviews, professional response templates and reputation protection — for more trust and more clicks.",
      ru: "Систематическое получение положительных отзывов Google, профессиональные шаблоны ответов и защита репутации — для большего доверия и кликов.",
    },
    highlights: {
      de: [
        "Bewertungsstrategie",
        "Anfrage-Vorlagen",
        "Professionelle Antworten",
        "Reputationsschutz",
      ],
      en: [
        "Review strategy",
        "Request templates",
        "Professional responses",
        "Reputation protection",
      ],
      ru: [
        "Стратегия отзывов",
        "Шаблоны запросов",
        "Профессиональные ответы",
        "Защита репутации",
      ],
    },
  },
  {
    icon: Megaphone,
    slug: null,
    live: false,
    title: { de: "Google Ads", en: "Google Ads", ru: "Google Ads" },
    desc: {
      de: "Lokal gezielte Google Ads Kampagnen mit maximaler Effizienz — nur für Suchanfragen aus Ihrer Region.",
      en: "Locally targeted Google Ads campaigns with maximum efficiency — only for search queries from your region.",
      ru: "Локально нацеленные Google Ads кампании с максимальной эффективностью — только для поисковых запросов из вашего региона.",
    },
  },
  {
    icon: FileText,
    slug: null,
    live: false,
    title: {
      de: "Landing Pages",
      en: "Landing Pages",
      ru: "Лендинговые страницы",
    },
    desc: {
      de: "Konversionsoptimierte Landingpages für lokale Unternehmen — schnell, mobilfreundlich und SEO-optimiert.",
      en: "Conversion-optimized landing pages for local businesses — fast, mobile-friendly and SEO-optimized.",
      ru: "Конверсионные посадочные страницы для локального бизнеса — быстрые, мобильные и SEO-оптимизированные.",
    },
  },
  {
    icon: Zap,
    slug: null,
    live: false,
    title: {
      de: "Digitale Prozesse",
      en: "Digital Processes",
      ru: "Цифровые процессы",
    },
    desc: {
      de: "Automatisierung von Bewertungsanfragen, Kundenkommunikation und Marketingabläufen für mehr Effizienz.",
      en: "Automation of review requests, customer communication and marketing workflows for greater efficiency.",
      ru: "Автоматизация запросов отзывов, общения с клиентами и маркетинговых процессов для повышения эффективности.",
    },
  },
  {
    icon: Sparkles,
    slug: null,
    live: false,
    title: {
      de: "Marken-Neustart",
      en: "Brand Relaunch",
      ru: "Перезапуск бренда",
    },
    desc: {
      de: "Vollständige Neupositionierung Ihrer lokalen Online-Präsenz — von der Google-Strategie bis zum ersten Kundenkontakt.",
      en: "Complete repositioning of your local online presence — from Google strategy to first customer contact.",
      ru: "Полное репозиционирование вашего локального онлайн-присутствия — от стратегии Google до первого контакта с клиентом.",
    },
  },
];

// ─── i18n labels ─────────────────────────────────────────────────────────────

const ui: Record<
  string,
  {
    breadcrumbHome: string;
    breadcrumbServices: string;
    learnMore: string;
    request: string;
    soon: string;
    ctaHeadline: string;
    ctaSub: string;
    ctaBtn: string;
    includes: string;
    popularServices: string;
    popularSub: string;
  }
> = {
  de: {
    breadcrumbHome: "Startseite",
    breadcrumbServices: "Leistungen",
    learnMore: "Mehr erfahren",
    request: "Jetzt anfragen",
    soon: "Demnächst",
    ctaHeadline: "Kostenloser Google Maps Audit",
    ctaSub:
      "Ich analysiere Ihr Google Business Profile und Ihre lokale Sichtbarkeit — kostenlos und unverbindlich. In Deutsch, Russisch oder Englisch.",
    ctaBtn: "Kostenloses Audit anfragen",
    includes: "Enthält:",
    popularServices: "Die beliebtesten Leistungen",
    popularSub:
      "Schnellstart mit den Leistungen, die lokale Unternehmen am meisten voranbringen.",
  },
  en: {
    breadcrumbHome: "Home",
    breadcrumbServices: "Services",
    learnMore: "Learn more",
    request: "Get in touch",
    soon: "Coming soon",
    ctaHeadline: "Free Google Maps Audit",
    ctaSub:
      "I analyze your Google Business Profile and local visibility — free and non-binding. In German, Russian or English.",
    ctaBtn: "Request free audit",
    includes: "Includes:",
    popularServices: "Most popular services",
    popularSub:
      "Quick start with the services that move local businesses forward the most.",
  },
  ru: {
    breadcrumbHome: "Главная",
    breadcrumbServices: "Услуги",
    learnMore: "Подробнее",
    request: "Оставить заявку",
    soon: "Скоро",
    ctaHeadline: "Бесплатный аудит Google Maps",
    ctaSub:
      "Я анализирую ваш Google Business Profile и локальную видимость — бесплатно и без обязательств. На немецком, русском или английском.",
    ctaBtn: "Запросить бесплатный аудит",
    includes: "Включает:",
    popularServices: "Популярные услуги",
    popularSub:
      "Быстрый старт с услугами, которые больше всего помогают локальному бизнесу.",
  },
};

// ─── Static params & Metadata ────────────────────────────────────────────────

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
    locale === "de" ? "/leistungen" : `/${locale}/leistungen`;

  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: `${BASE_URL}${canonicalPath}`,
      languages: {
        de: `${BASE_URL}/leistungen`,
        en: `${BASE_URL}/en/leistungen`,
        ru: `${BASE_URL}/ru/leistungen`,
      },
    },
    openGraph: {
      type: "website",
      title: m.title,
      description: m.description,
      url: `${BASE_URL}${canonicalPath}`,
      siteName: "A.R. Local Growth",
    },
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function LeistungenPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const m = pageMeta[locale] ?? pageMeta.de;
  const l = ui[locale] ?? ui.de;
  const homeBase = locale === "de" ? "" : `/${locale}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: l.breadcrumbHome,
        item: locale === "de" ? BASE_URL : `${BASE_URL}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: l.breadcrumbServices,
        item: `${BASE_URL}${homeBase}/leistungen`,
      },
    ],
  };

  const liveServices = services.filter((s) => s.live);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Navbar />
      <main className="min-h-screen pt-24 pb-20">
        {/* ── Hero ── */}
        <div className="bg-gradient-to-b from-blue-50/40 to-white border-b border-google-border">
          <div className="container-content mx-auto px-6 py-14 sm:py-20">
            {/* Breadcrumb */}
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-1.5 text-xs text-google-secondary mb-8"
            >
              <Link
                href={`${homeBase}/`}
                className="hover:text-brand-blue transition-colors"
              >
                {l.breadcrumbHome}
              </Link>
              <ChevronRight size={12} className="opacity-40" />
              <span className="text-google-text font-medium">
                {l.breadcrumbServices}
              </span>
            </nav>

            <p className="text-label-sm uppercase text-google-secondary tracking-widest mb-4">
              A.R. Local Growth
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-google-text mb-5 text-balance max-w-2xl">
              {m.headline}
            </h1>
            <p className="text-body-lg text-google-secondary max-w-2xl leading-relaxed">
              {m.sub}
            </p>
          </div>
        </div>

        <div className="container-content mx-auto px-6">
          {/* ── All Services Grid ── */}
          <div className="py-14 sm:py-16">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {services.map((service) => {
                const Icon = service.icon;
                const title =
                  service.title[locale as keyof typeof service.title] ??
                  service.title.de;
                const desc =
                  service.desc[locale as keyof typeof service.desc] ??
                  service.desc.de;
                const highlights = service.highlights
                  ? (service.highlights[
                      locale as keyof typeof service.highlights
                    ] ?? service.highlights.de)
                  : null;
                const href = service.slug
                  ? `${homeBase}/leistungen/${service.slug}`
                  : undefined;

                const card = (
                  <div
                    className={`
                      group bg-white rounded-card border border-google-border p-6 shadow-card
                      hover:shadow-card-blue hover:border-brand-blue/30 hover:-translate-y-0.5
                      transition-all duration-200 relative flex flex-col h-full
                      ${service.live ? "cursor-pointer" : ""}
                    `}
                  >
                    {!service.live && (
                      <span className="absolute top-4 right-4 text-xs font-medium text-google-secondary bg-google-light border border-google-border rounded-full px-2 py-0.5">
                        {l.soon}
                      </span>
                    )}

                    <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center mb-4 group-hover:bg-brand-blue/15 transition-colors shrink-0">
                      <Icon size={20} className="text-brand-blue" />
                    </div>

                    <h2 className="text-heading-md font-semibold text-google-text mb-2">
                      {title}
                    </h2>
                    <p className="text-body-sm text-google-secondary leading-relaxed mb-4 flex-1">
                      {desc}
                    </p>

                    {highlights && (
                      <ul className="space-y-1.5 mb-5">
                        {highlights.map((item) => (
                          <li
                            key={item}
                            className="flex items-center gap-2 text-xs text-google-secondary"
                          >
                            <CheckCircle
                              size={13}
                              className="text-brand-blue shrink-0"
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}

                    {service.live && (
                      <div className="flex items-center gap-3 mt-auto pt-2 border-t border-google-border">
                        <span className="inline-flex items-center gap-1 text-sm font-medium text-brand-blue group-hover:gap-2 transition-all duration-200">
                          {l.learnMore}
                          <ArrowRight size={14} />
                        </span>
                      </div>
                    )}
                  </div>
                );

                return href ? (
                  <Link key={service.title.de} href={href} className="block">
                    {card}
                  </Link>
                ) : (
                  <div key={service.title.de}>{card}</div>
                );
              })}
            </div>
          </div>

          {/* ── Task 3: CTA section with 3 live service cards + "Jetzt anfragen" ── */}
          <div className="py-14 sm:py-16 border-t border-google-border">
            <div className="text-center mb-10">
              <p className="text-label-sm uppercase text-google-secondary tracking-widest mb-3">
                Quick Start
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-google-text mb-3">
                {l.popularServices}
              </h2>
              <p className="text-body-lg text-google-secondary max-w-xl mx-auto">
                {l.popularSub}
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-5 mb-10">
              {liveServices.map((service) => {
                const Icon = service.icon;
                const title =
                  service.title[locale as keyof typeof service.title] ??
                  service.title.de;
                const highlights = service.highlights
                  ? (service.highlights[
                      locale as keyof typeof service.highlights
                    ] ?? service.highlights.de)
                  : [];
                const href = `${homeBase}/leistungen/${service.slug}`;

                return (
                  <div
                    key={service.title.de}
                    className="bg-white rounded-card border border-google-border p-6 shadow-card flex flex-col"
                  >
                    <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center mb-4 shrink-0">
                      <Icon size={20} className="text-brand-blue" />
                    </div>
                    <h3 className="text-heading-md font-semibold text-google-text mb-3">
                      {title}
                    </h3>
                    {highlights.length > 0 && (
                      <ul className="space-y-1.5 mb-5 flex-1">
                        {highlights.slice(0, 3).map((item) => (
                          <li
                            key={item}
                            className="flex items-center gap-2 text-xs text-google-secondary"
                          >
                            <CheckCircle
                              size={12}
                              className="text-brand-blue shrink-0"
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className="mt-auto space-y-2 pt-4 border-t border-google-border">
                      <Link
                        href={`${homeBase}/#audit`}
                        className="flex items-center justify-center gap-2 w-full bg-brand-blue text-white text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-brand-blue/90 transition-colors"
                      >
                        {l.request}
                        <ArrowRight size={14} />
                      </Link>
                      <Link
                        href={href}
                        className="flex items-center justify-center gap-1 w-full text-sm text-google-secondary hover:text-brand-blue transition-colors py-1.5"
                      >
                        {l.learnMore}
                        <ArrowRight size={13} />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Main CTA banner ── */}
          <div className="py-10 mb-10">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100/60 border border-brand-blue/20 rounded-card-lg p-8 sm:p-12 text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Clock size={18} className="text-brand-blue" />
                <span className="text-sm font-medium text-brand-blue">
                  {locale === "ru"
                    ? "Бесплатно · Без обязательств"
                    : locale === "en"
                      ? "Free · No commitment"
                      : "Kostenlos · Unverbindlich"}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-google-text mb-3">
                {l.ctaHeadline}
              </h2>
              <p className="text-body-lg text-google-secondary max-w-xl mx-auto mb-8">
                {l.ctaSub}
              </p>
              <Link
                href={`${homeBase}/#audit`}
                className="inline-flex items-center gap-2 bg-brand-blue text-white text-sm font-semibold px-6 py-3 rounded-lg hover:bg-brand-blue/90 transition-colors shadow-sm"
              >
                {l.ctaBtn}
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { blogPosts, getBlogPost, getLocalizedPost, formatDate } from "@/lib/blog";
import { ArrowLeft, Clock, Tag, ChevronDown } from "lucide-react";

const BASE_URL = "https://arlocalgrowth.de";

const HOW_TO_SLUGS = ["google-maps-optimierung-anleitung"];

export async function generateStaticParams() {
  return blogPosts.flatMap((post) =>
    ["de", "en", "ru"].map((locale) => ({ locale, slug: post.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  const localized = getLocalizedPost(post, locale);
  const canonicalPath = locale === "de" ? `/blog/${slug}` : `/${locale}/blog/${slug}`;

  return {
    title: localized.title,
    description: localized.description,
    authors: [{ name: "Roman Andreiev" }],
    alternates: {
      canonical: `${BASE_URL}${canonicalPath}`,
      languages: {
        de: `${BASE_URL}/blog/${slug}`,
        en: `${BASE_URL}/en/blog/${slug}`,
        ru: `${BASE_URL}/ru/blog/${slug}`,
      },
    },
    openGraph: {
      type: "article",
      title: localized.title,
      description: localized.description,
      url: `${BASE_URL}${canonicalPath}`,
      publishedTime: post.date,
      authors: ["Roman Andreiev"],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = getBlogPost(slug);

  if (!post) notFound();

  const localized = getLocalizedPost(post, locale);
  const blogListPath = locale === "de" ? "/blog" : `/${locale}/blog`;
  const canonicalPath = locale === "de" ? `/blog/${slug}` : `/${locale}/blog/${slug}`;

  const backLabel: Record<string, string> = {
    de: "← Zurück zum Blog",
    en: "← Back to Blog",
    ru: "← Назад к блогу",
  };

  const minLabel: Record<string, string> = {
    de: "Min.",
    en: "min",
    ru: "мин.",
  };

  const faqHeading: Record<string, string> = {
    de: "Häufige Fragen",
    en: "Frequently Asked Questions",
    ru: "Часто задаваемые вопросы",
  };

  // --- Structured Data ---

  const breadcrumbSchema = {
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
        name: "Blog",
        item: `${BASE_URL}${blogListPath}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: localized.title,
        item: `${BASE_URL}${canonicalPath}`,
      },
    ],
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: localized.title,
    description: localized.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      "@id": `${BASE_URL}/#roman`,
      name: "Roman Andreiev",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      "@id": `${BASE_URL}/#business`,
      name: "A.R. Local Growth",
      url: BASE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}${canonicalPath}`,
    },
    keywords: localized.tags.join(", "),
    inLanguage: locale,
    wordCount: Math.round(localized.content.replace(/<[^>]*>/g, "").split(/\s+/).length),
  };

  // HowTo schema only for step-based articles
  const howToSchema = HOW_TO_SLUGS.includes(slug)
    ? {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: localized.title,
        description: localized.description,
        inLanguage: locale,
        author: { "@id": `${BASE_URL}/#roman` },
        step: locale === "de"
          ? [
              { "@type": "HowToStep", position: 1, name: "Google Business Profile vollständig ausfüllen", text: "Füllen Sie jedes Feld im Profil aus: Name, Kategorie, Beschreibung (750 Zeichen), Öffnungszeiten, Telefon, Website und alle Leistungen." },
              { "@type": "HowToStep", position: 2, name: "Die richtigen Kategorien wählen", text: "Wählen Sie eine Hauptkategorie und bis zu 9 Zusatzkategorien, die Ihr Angebot präzise beschreiben." },
              { "@type": "HowToStep", position: 3, name: "Professionelle Fotos hinzufügen", text: "Laden Sie mindestens 10 Fotos hoch: Außenansicht, Innenbereich, Team und Leistungen." },
              { "@type": "HowToStep", position: 4, name: "Google Bewertungen aktiv aufbauen", text: "Schicken Sie zufriedenen Kunden den direkten Bewertungslink per WhatsApp direkt nach der Dienstleistung." },
              { "@type": "HowToStep", position: 5, name: "Regelmäßige Beiträge veröffentlichen", text: "Veröffentlichen Sie mindestens einmal pro Woche einen Beitrag im Google Business Profile." },
              { "@type": "HowToStep", position: 6, name: "Lokale Keywords strategisch einsetzen", text: "Nutzen Sie in Beschreibung und Beiträgen die Keywords Ihrer Zielkunden inklusive Stadtname und Region." },
            ]
          : locale === "en"
          ? [
              { "@type": "HowToStep", position: 1, name: "Complete Your Google Business Profile Fully", text: "Fill in every field: name, category, description (750 characters), opening hours, phone, website and all services." },
              { "@type": "HowToStep", position: 2, name: "Choose the Right Categories", text: "Select one primary category and up to 9 additional categories that accurately describe your offering." },
              { "@type": "HowToStep", position: 3, name: "Add Professional Photos", text: "Upload at least 10 photos: exterior, interior, team and services." },
              { "@type": "HowToStep", position: 4, name: "Actively Build Google Reviews", text: "Send satisfied customers the direct review link via WhatsApp immediately after the service." },
              { "@type": "HowToStep", position: 5, name: "Publish Regular Posts", text: "Publish at least one post per week on your Google Business Profile." },
              { "@type": "HowToStep", position: 6, name: "Use Local Keywords Strategically", text: "Include your target customers' search terms in your description and posts, including city name and region." },
            ]
          : [
              { "@type": "HowToStep", position: 1, name: "Полностью заполните Google Business Profile", text: "Заполните каждое поле: название, категория, описание (750 символов), часы работы, телефон, сайт и все услуги." },
              { "@type": "HowToStep", position: 2, name: "Выберите правильные категории", text: "Выберите основную категорию и до 9 дополнительных, точно описывающих ваше предложение." },
              { "@type": "HowToStep", position: 3, name: "Добавьте профессиональные фотографии", text: "Загрузите минимум 10 фото: фасад, интерьер, команда и услуги." },
              { "@type": "HowToStep", position: 4, name: "Активно собирайте отзывы Google", text: "Отправляйте довольным клиентам прямую ссылку на отзыв через WhatsApp сразу после услуги." },
              { "@type": "HowToStep", position: 5, name: "Регулярно публикуйте посты", text: "Публикуйте минимум один пост в неделю в Google Business Profile." },
              { "@type": "HowToStep", position: 6, name: "Используйте локальные ключевые слова", text: "Включайте поисковые запросы ваших клиентов в описание и посты, включая название города и района." },
            ],
      }
    : null;

  // FAQPage schema from article FAQ data
  const faqPageSchema =
    localized.faq && localized.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: localized.faq.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.a,
            },
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {howToSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
        />
      )}
      {faqPageSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
        />
      )}
      <Navbar />
      <main className="min-h-screen pt-24 pb-20">
        <div className="max-w-2xl mx-auto px-6">
          {/* Back link */}
          <Link
            href={blogListPath}
            className="inline-flex items-center gap-1.5 text-sm text-google-secondary hover:text-brand-blue transition-colors mb-8"
          >
            <ArrowLeft size={14} />
            {backLabel[locale] ?? backLabel.de}
          </Link>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {localized.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 text-xs text-brand-blue bg-blue-50 px-2 py-1 rounded-full"
              >
                <Tag size={10} />
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-bold text-google-text mb-4 leading-tight">
            {localized.title}
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-4 text-sm text-google-secondary mb-10 pb-8 border-b border-google-border">
            <span>Roman Andreiev</span>
            <span>·</span>
            <span>{formatDate(post.date, locale)}</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock size={13} />
              {localized.readingTime} {minLabel[locale] ?? minLabel.de}
            </span>
          </div>

          {/* Content */}
          <div
            className="prose prose-google max-w-none"
            dangerouslySetInnerHTML={{ __html: localized.content }}
          />

          {/* FAQ section */}
          {localized.faq && localized.faq.length > 0 && (
            <div className="mt-12">
              <h2 className="text-xl font-bold text-google-text mb-5">
                {faqHeading[locale] ?? faqHeading.de}
              </h2>
              <div className="divide-y divide-google-border border border-google-border rounded-card-lg overflow-hidden bg-white">
                {localized.faq.map((item, i) => (
                  <details key={i} className="group px-5 py-4">
                    <summary className="flex items-center justify-between cursor-pointer list-none text-body-sm font-semibold text-google-text">
                      {item.q}
                      <ChevronDown
                        size={16}
                        className="text-google-secondary shrink-0 ml-3 transition-transform group-open:rotate-180"
                      />
                    </summary>
                    <p className="mt-3 text-body-sm text-google-secondary leading-relaxed">
                      {item.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="mt-12 pt-10 border-t border-google-border">
            <div className="bg-google-light rounded-card p-6 sm:p-8">
              <h3 className="text-lg font-semibold text-google-text mb-2">
                {locale === "ru"
                  ? "Нужна помощь с Google Maps?"
                  : locale === "en"
                  ? "Need help with Google Maps?"
                  : "Brauchen Sie Hilfe bei Google Maps?"}
              </h3>
              <p className="text-body-sm text-google-secondary mb-5">
                {locale === "ru"
                  ? "Я анализирую ваш профиль и показываю конкретные шаги для улучшения. Работаю на немецком, русском и украинском."
                  : locale === "en"
                  ? "I analyze your profile and show concrete steps for improvement. I work in German, Russian, Ukrainian and English."
                  : "Ich analysiere Ihr Profil und zeige konkrete Schritte zur Verbesserung. Ich arbeite auf Deutsch, Russisch, Ukrainisch und Englisch."}
              </p>
              <Link
                href={locale === "de" ? "/#audit" : `/${locale}/#audit`}
                className="inline-flex items-center gap-2 bg-brand-blue text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-brand-blue/90 transition-colors"
              >
                {locale === "ru"
                  ? "Написать мне"
                  : locale === "en"
                  ? "Get in touch"
                  : "Schreiben Sie mir"}
                <ArrowLeft size={14} className="rotate-180" />
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

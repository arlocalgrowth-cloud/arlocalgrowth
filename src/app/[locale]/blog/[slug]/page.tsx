import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { blogPosts, getBlogPost, getLocalizedPost, formatDate } from "@/lib/blog";
import { ArrowLeft, Clock, Tag } from "lucide-react";

const BASE_URL = "https://arlocalgrowth.de";

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

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: localized.title,
    description: localized.description,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: "Roman Andreiev",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "A.R. Local Growth",
      url: BASE_URL,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
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

import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { blogPosts, formatDate } from "@/lib/blog";
import { ArrowRight, Clock, Tag } from "lucide-react";

const meta: Record<string, { title: string; description: string; headline: string; sub: string }> = {
  de: {
    title: "Blog — Google Maps & Local SEO Tipps",
    description: "Praktische Tipps und Anleitungen zu Google Maps Optimierung, Local SEO und Google Business Profile für lokale Unternehmen in Deutschland.",
    headline: "Blog",
    sub: "Praktische Tipps zu Google Maps, Local SEO und Google Business Profile.",
  },
  en: {
    title: "Blog — Google Maps & Local SEO Tips",
    description: "Practical tips and guides on Google Maps optimization, Local SEO and Google Business Profile for local businesses in Germany.",
    headline: "Blog",
    sub: "Practical tips on Google Maps, Local SEO and Google Business Profile.",
  },
  ru: {
    title: "Блог — советы по Google Maps и Local SEO",
    description: "Практические советы по оптимизации Google Maps, Local SEO и Google Business Profile для локального бизнеса в Германии.",
    headline: "Блог",
    sub: "Практические советы по Google Maps, Local SEO и Google Business Profile.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const m = meta[locale] ?? meta.de;
  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: locale === "de" ? "https://arlocalgrowth.de/blog" : `https://arlocalgrowth.de/${locale}/blog`,
      languages: {
        de: "https://arlocalgrowth.de/blog",
        en: "https://arlocalgrowth.de/en/blog",
        ru: "https://arlocalgrowth.de/ru/blog",
      },
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const m = meta[locale] ?? meta.de;

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-6">
          {/* Header */}
          <div className="mb-12">
            <p className="text-label-sm uppercase text-google-secondary tracking-widest mb-3">
              A.R. Local Growth
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-google-text mb-4">
              {m.headline}
            </h1>
            <p className="text-body-lg text-google-secondary">{m.sub}</p>
          </div>

          {/* Posts */}
          <div className="space-y-6">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/${locale === "de" ? "" : locale + "/"}blog/${post.slug}`}
                className="group block bg-white border border-google-border rounded-card p-6 hover:shadow-card-blue hover:border-brand-blue/30 transition-all duration-200"
              >
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 text-xs text-brand-blue bg-blue-50 px-2 py-1 rounded-full"
                    >
                      <Tag size={10} />
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-lg font-semibold text-google-text group-hover:text-brand-blue transition-colors mb-2">
                  {post.title}
                </h2>
                <p className="text-body-sm text-google-secondary mb-4 line-clamp-2">
                  {post.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-google-secondary">
                    <span>{formatDate(post.date, locale)}</span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {post.readingTime} Min.
                    </span>
                  </div>
                  <span className="text-brand-blue text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                    Lesen <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

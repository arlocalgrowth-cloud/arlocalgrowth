import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { SchemaMarkup } from "@/components/seo/SchemaMarkup";
import "../globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const BASE_URL = "https://arlocalgrowth.de";

const localeUrls: Record<string, string> = {
  de: BASE_URL,
  en: `${BASE_URL}/en`,
  ru: `${BASE_URL}/ru`,
};

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  const canonicalUrl = localeUrls[locale] ?? BASE_URL;

  return {
    metadataBase: new URL(BASE_URL),
    title: {
      default: t("homeTitle"),
      template: `%s | A.R. Local Growth`,
    },
    description: t("homeDescription"),
    keywords: t("homeKeywords"),
    authors: [{ name: "Roman Andreiev" }],
    creator: "Roman Andreiev",
    alternates: {
      canonical: canonicalUrl,
      languages: {
        de: BASE_URL,
        en: `${BASE_URL}/en`,
        ru: `${BASE_URL}/ru`,
        "x-default": BASE_URL,
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "de" ? "de_DE" : locale === "ru" ? "ru_RU" : "en_US",
      siteName: "A.R. Local Growth",
      url: canonicalUrl,
      title: t("homeTitle"),
      description: t("homeDescription"),
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: "A.R. Local Growth – Google Maps & Local SEO",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("homeTitle"),
      description: t("homeDescription"),
      images: ["/opengraph-image"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "de" | "en" | "ru")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={inter.variable}>
      <body className="min-h-screen bg-background antialiased">
        <NextIntlClientProvider messages={messages}>
          <SchemaMarkup locale={locale} />
          {children}
          <CookieBanner />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

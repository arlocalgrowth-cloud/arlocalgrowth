import { getTranslations } from "next-intl/server";

const BASE_URL = "https://arlocalgrowth.de";

export async function SchemaMarkup({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "faq" });
  const faqItems = t.raw("items") as Array<{ q: string; a: string }>;

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${BASE_URL}/#business`,
    name: "A.R. Local Growth & Automation",
    description:
      "Google Maps Optimierung, Local SEO und Google Ads für lokale Unternehmen in Deutschland, Österreich und der Schweiz.",
    url: BASE_URL,
    telephone: "+4917623481952",
    email: "a.r.localgrowth@gmail.com",
    founder: {
      "@type": "Person",
      name: "Roman Andreiev",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Berlin",
      addressCountry: "DE",
    },
    areaServed: [
      { "@type": "Country", name: "Germany" },
      { "@type": "Country", name: "Austria" },
      { "@type": "Country", name: "Switzerland" },
    ],
    knowsLanguage: ["de", "en", "ru", "uk"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Local Marketing Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Google Business Profile Optimierung" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Local SEO" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Google Ads" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Bewertungsmanagement" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Landing Pages" } },
      ],
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Kostenloses Google Maps Audit",
    description:
      "Kostenlose Analyse Ihres Google Business Profiles, lokaler Rankings, Website, Bewertungen und Wettbewerber.",
    provider: { "@id": `${BASE_URL}/#business` },
    areaServed: [
      { "@type": "Country", name: "Germany" },
      { "@type": "Country", name: "Austria" },
      { "@type": "Country", name: "Switzerland" },
    ],
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
      description: "Kostenlos und unverbindlich",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
    </>
  );
}

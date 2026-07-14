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
    image: `${BASE_URL}/roman-andreiev.jpg`,
    logo: {
      "@type": "ImageObject",
      url: `${BASE_URL}/logo.png`,
      width: 400,
      height: 100,
    },
    priceRange: "€€",
    founder: {
      "@type": "Person",
      "@id": `${BASE_URL}/#roman`,
      name: "Roman Andreiev",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Berlin",
      addressRegion: "Berlin",
      addressCountry: "DE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 52.52,
      longitude: 13.405,
    },
    areaServed: [
      { "@type": "Country", name: "Germany" },
      { "@type": "Country", name: "Austria" },
      { "@type": "Country", name: "Switzerland" },
    ],
    knowsLanguage: ["de", "en", "ru", "uk"],
    sameAs: [
      "https://www.linkedin.com/in/roman-andreiev",
      "https://g.co/kgs/arlocalgrowth",
    ],
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

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${BASE_URL}/#roman`,
    name: "Roman Andreiev",
    url: BASE_URL,
    image: `${BASE_URL}/roman-andreiev.jpg`,
    jobTitle: "Google Business Profile & Local SEO Spezialist",
    worksFor: {
      "@id": `${BASE_URL}/#business`,
    },
    knowsAbout: [
      "Google Business Profile",
      "Google Maps Optimierung",
      "Local SEO",
      "Google Ads",
      "Bewertungsmanagement",
      "Lokales Marketing",
    ],
    knowsLanguage: ["de", "en", "ru", "uk"],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Berlin",
      addressCountry: "DE",
    },
    sameAs: [
      "https://www.linkedin.com/in/roman-andreiev",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    url: BASE_URL,
    name: "A.R. Local Growth",
    description:
      "Google Maps Optimierung und Local SEO für lokale Unternehmen in Deutschland.",
    publisher: { "@id": `${BASE_URL}/#business` },
    inLanguage: ["de", "en", "ru"],
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
    name: "Google Business Profile Optimierung Berlin",
    description:
      "Analyse und Optimierung von Google Business Profile, lokalen Rankings, Website, Bewertungen und Wettbewerbern für lokale Unternehmen in Berlin und Deutschland.",
    provider: { "@id": `${BASE_URL}/#business` },
    areaServed: [
      { "@type": "Country", name: "Germany" },
      { "@type": "Country", name: "Austria" },
      { "@type": "Country", name: "Switzerland" },
    ],
    offers: {
      "@type": "Offer",
      description: "Individuelle Angebote nach Erstgespräch",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
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

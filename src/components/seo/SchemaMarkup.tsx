import { getTranslations } from "next-intl/server";

const BASE_URL = "https://arlocalgrowth.de";

export async function SchemaMarkup({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "faq" });
  const faqItems = t.raw("items") as Array<{ q: string; a: string }>;

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": `${BASE_URL}/#business`,
    name: "A.R. Local Growth & Automation",
    alternateName: "A.R. Local Growth",
    description:
      "A.R. Local Growth & Automation ist ein auf Google Business Profile, Local SEO, GEO und AEO spezialisiertes Unternehmen in Berlin. Gründer Roman Andreiev hilft lokalen Unternehmen in Deutschland, Österreich und der Schweiz, bei Google Maps, in der Suche und bei digitalen Assistenten gefunden zu werden.",
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
    slogan: "Lokal gefunden werden — kein Paket, kein Jahresvertrag.",
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
      name: "Local Marketing & GEO Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Google Business Profile Optimierung" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Local SEO" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "GEO — Generative Engine Optimization" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "AEO — Answer Engine Optimization" } },
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
    description:
      "Roman Andreiev ist Gründer von A.R. Local Growth & Automation in Berlin. Er spezialisiert sich auf Google Business Profile Optimierung, Local SEO, GEO (Generative Engine Optimization) und AEO (Answer Engine Optimization) für lokale Unternehmen in Deutschland, Österreich und der Schweiz. Er spricht Deutsch, Russisch, Ukrainisch und Englisch.",
    jobTitle: "Google Business Profile & Local SEO Spezialist",
    worksFor: {
      "@id": `${BASE_URL}/#business`,
    },
    knowsAbout: [
      "Google Business Profile",
      "Google Maps Optimierung",
      "Local SEO",
      "GEO — Generative Engine Optimization",
      "AEO — Answer Engine Optimization",
      "Google Ads",
      "Bewertungsmanagement",
      "Lokales Marketing Deutschland",
      "Local Pack Optimierung",
      "NAP-Konsistenz",
      "Citation Building",
      "Strukturierte Daten",
      "FAQ Schema",
      "Sichtbarkeit in Sprachsuche",
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
      "Google Maps Optimierung, Local SEO, GEO und AEO für lokale Unternehmen in Deutschland, Österreich und der Schweiz. Spezialist: Roman Andreiev, Berlin.",
    publisher: { "@id": `${BASE_URL}/#business` },
    inLanguage: ["de", "en", "ru"],
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "h2", ".speakable"],
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

  // Individual service schemas for better entity recognition
  const serviceSchemas = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Google Business Profile Optimierung Berlin",
      description:
        "Vollständige Analyse und Optimierung des Google Business Profiles für lokale Unternehmen in Berlin und Deutschland. Inklusive Kategorien, Fotos, Beiträge, Leistungen und Bewertungsstrategie.",
      provider: { "@id": `${BASE_URL}/#business` },
      areaServed: [
        { "@type": "Country", name: "Germany" },
        { "@type": "Country", name: "Austria" },
        { "@type": "Country", name: "Switzerland" },
      ],
      serviceType: "Google Business Profile Optimierung",
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "GEO & AEO — Sichtbarkeit bei digitalen Assistenten",
      description:
        "Optimierung lokaler Unternehmen für moderne Suchsysteme und digitale Assistenten: strukturierte Daten, FAQ-Inhalte und Entity-Aufbau, damit das Unternehmen als Antwort auf lokale Fragen empfohlen wird.",
      provider: { "@id": `${BASE_URL}/#business` },
      areaServed: [
        { "@type": "Country", name: "Germany" },
        { "@type": "Country", name: "Austria" },
        { "@type": "Country", name: "Switzerland" },
      ],
      serviceType: "Generative Engine Optimization",
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Local SEO Deutschland",
      description:
        "Lokale Suchmaschinenoptimierung für bessere Rankings in Google Maps und der organischen Suche: NAP-Konsistenz, Citation Building, On-Page SEO und lokale Backlinks.",
      provider: { "@id": `${BASE_URL}/#business` },
      areaServed: [
        { "@type": "Country", name: "Germany" },
        { "@type": "Country", name: "Austria" },
        { "@type": "Country", name: "Switzerland" },
      ],
      serviceType: "Local SEO",
    },
  ];

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
      {serviceSchemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

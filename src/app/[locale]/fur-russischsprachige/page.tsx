import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CheckCircle, ArrowRight, Languages, MapPin, Star, ChevronDown } from "lucide-react";

const BASE_URL = "https://arlocalgrowth.de";

export async function generateStaticParams() {
  return ["de", "en", "ru"].map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (locale === "ru") {
    return {
      title: "Google Maps для русскоязычного бизнеса в Германии",
      description:
        "Помогаю русскоязычным предпринимателям в Германии выйти в топ Google Maps. Консультации на русском, украинском и немецком. Оптимизация Google Business Profile, Local SEO, управление отзывами.",
      alternates: {
        canonical: `${BASE_URL}/ru/fur-russischsprachige`,
        languages: {
          de: `${BASE_URL}/fur-russischsprachige`,
          ru: `${BASE_URL}/ru/fur-russischsprachige`,
        },
      },
    };
  }

  return {
    title: "Google Maps für russischsprachige Unternehmer in Deutschland",
    description:
      "Professionelle Google Maps Optimierung für russischsprachige Unternehmer in Deutschland. Beratung auf Russisch, Ukrainisch und Deutsch. Google Business Profile, Local SEO, Bewertungsmanagement.",
    alternates: {
      canonical: locale === "de" ? `${BASE_URL}/fur-russischsprachige` : `${BASE_URL}/${locale}/fur-russischsprachige`,
      languages: {
        de: `${BASE_URL}/fur-russischsprachige`,
        ru: `${BASE_URL}/ru/fur-russischsprachige`,
      },
    },
  };
}

export default async function FurRussischsprachigePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const homeBase = locale === "de" ? "" : `/${locale}`;
  const canonicalPath =
    locale === "de" ? "/fur-russischsprachige" : `/${locale}/fur-russischsprachige`;

  const breadcrumb = {
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
        name:
          locale === "ru"
            ? "Для русскоязычных"
            : "Für Russischsprachige",
        item: `${BASE_URL}${canonicalPath}`,
      },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name:
      locale === "ru"
        ? "Google Maps Оптимизация для русскоязычного бизнеса в Германии"
        : "Google Maps Optimierung für russischsprachige Unternehmer in Deutschland",
    description:
      locale === "ru"
        ? "Помощь русскоязычным предпринимателям в Германии с оптимизацией Google Business Profile, Local SEO и управлением отзывами. Консультации на русском и украинском языке."
        : "Unterstützung russischsprachiger Unternehmer in Deutschland bei der Optimierung von Google Business Profile, Local SEO und Bewertungsmanagement. Beratung auf Russisch und Ukrainisch.",
    provider: {
      "@type": "Person",
      "@id": `${BASE_URL}/#roman`,
      name: "Roman Andreiev",
      knowsLanguage: ["de", "ru", "uk", "en"],
    },
    areaServed: { "@type": "Country", name: "Germany" },
  };

  const faqItemsDe = [
    {
      q: "Arbeiten Sie mit russischsprachigen Unternehmern auf Russisch?",
      a: "Ja, ich biete alle Dienstleistungen vollständig auf Russisch, Ukrainisch und Deutsch an. Für russischsprachige Unternehmer in Deutschland ist das oft ein entscheidender Vorteil: keine Missverständnisse, keine Sprachbarrieren, keine Übersetzungskosten.",
    },
    {
      q: "Welche Branchen betreue ich besonders für russischsprachige Unternehmer?",
      a: "Ich betreue besonders: russisch-ukrainische Restaurants und Delikatessengeschäfte, Schönheitssalons und Nagelstudios, Übersetzungsdienste, Immobilienmakler, Reinigungsunternehmen und handwerkliche Betriebe. Aber auch jedes andere lokale Unternehmen.",
    },
    {
      q: "Helfen Sie auch bei der deutschen Unternehmenskommunikation?",
      a: "Ja. Ich helfe nicht nur mit Google Maps und Local SEO, sondern auch mit der deutschsprachigen Außendarstellung: Unternehmensbezeichnung, Profilbeschreibung und Antworten auf Bewertungen auf professionellem Deutsch.",
    },
    {
      q: "Wie starten wir zusammen?",
      a: "Sie schreiben mir auf Russisch, Ukrainisch oder Deutsch — ganz wie Sie möchten. Wir analysieren kostenlos Ihr Google Business Profile und besprechen, wo die größten Wachstumspotenziale liegen.",
    },
  ];

  const faqItemsRu = [
    {
      q: "Вы работаете с русскоязычными предпринимателями на русском языке?",
      a: "Да, я предоставляю все услуги на русском, украинском и немецком языках. Для русскоязычных предпринимателей в Германии это часто решающее преимущество: никаких недоразумений, языковых барьеров и затрат на перевод.",
    },
    {
      q: "С какими нишами для русскоязычного бизнеса вы работаете?",
      a: "Особенно часто работаю с: русско-украинскими ресторанами и продуктовыми магазинами, салонами красоты и ногтевыми студиями, переводческими агентствами, агентствами недвижимости, клининговыми компаниями и ремесленными мастерскими. Но и с любым другим локальным бизнесом.",
    },
    {
      q: "Помогаете ли вы с немецкой коммуникацией для бизнеса?",
      a: "Да. Помогаю не только с Google Maps и Local SEO, но и с немецкоязычным представлением бизнеса: название компании, описание профиля и ответы на отзывы на профессиональном немецком языке.",
    },
    {
      q: "Как начать работу с вами?",
      a: "Напишите мне на русском, украинском или немецком — как вам удобно. Мы бесплатно проанализируем ваш Google Business Profile и обсудим, где находятся наибольшие потенциалы роста.",
    },
  ];

  if (locale === "ru") {
    return (
      <RuPage
        homeBase={homeBase}
        breadcrumb={breadcrumb}
        serviceSchema={serviceSchema}
        faqItems={faqItemsRu}
      />
    );
  }

  return (
    <DePage
      homeBase={homeBase}
      breadcrumb={breadcrumb}
      serviceSchema={serviceSchema}
      faqItems={faqItemsDe}
    />
  );
}

function DePage({
  homeBase,
  breadcrumb,
  serviceSchema,
  faqItems,
}: {
  homeBase: string;
  breadcrumb: object;
  serviceSchema: object;
  faqItems: { q: string; a: string }[];
}) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <main className="min-h-screen">
        {/* Hero */}
        <section className="pt-32 pb-16 px-6 bg-white">
          <div className="container-content mx-auto max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-brand-blue text-sm font-medium px-4 py-2 rounded-full mb-6">
              <Languages size={14} />
              Sprachkenntnisse: Russisch · Ukrainisch · Deutsch · Englisch
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-google-text mb-6 leading-tight">
              Google Maps für russischsprachige<br />
              <span className="text-brand-blue">Unternehmer in Deutschland</span>
            </h1>
            <p className="text-body-lg text-google-secondary mb-4 max-w-2xl">
              Als russischsprachiger Unternehmer in Deutschland haben Sie zwei Herausforderungen: ein hochwertiges Angebot — und die Sichtbarkeit dafür. Google Maps ist Ihr stärkster Kanal für lokale Kunden. Ich helfe Ihnen, ihn auf Russisch, Ukrainisch und Deutsch zu meistern.
            </p>
            <p className="text-body-md text-google-secondary mb-8 max-w-2xl font-medium">
              Кратко по-русски: я помогаю русскоязычным предпринимателям в Германии выйти в топ Google Maps — на вашем языке, без посредников.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href={`${homeBase}/#audit`}
                className="inline-flex items-center gap-2 bg-brand-blue text-white font-semibold px-6 py-3 rounded-lg hover:bg-brand-blue/90 transition-colors"
              >
                Kostenloses Audit anfragen <ArrowRight size={16} />
              </Link>
              <Link
                href={`${homeBase}/ru/fur-russischsprachige`}
                className="inline-flex items-center gap-2 border border-google-border text-google-text font-medium px-6 py-3 rounded-lg hover:border-brand-blue hover:text-brand-blue transition-colors"
              >
                Страница на русском
              </Link>
            </div>
          </div>
        </section>

        {/* Why this page */}
        <section className="py-12 px-6 bg-google-light border-y border-google-border">
          <div className="container-content mx-auto max-w-4xl">
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { label: "Russischsprachige in Deutschland", value: "~3,5 Mio.", sub: "bilden eine starke Unternehmergemeinschaft" },
                { label: "Deutsche mit Migrationshintergrund", value: "26 %", sub: "der Bevölkerung — davon viele Unternehmer" },
                { label: "Nischen mit wenig Konkurrenz", value: "Viele", sub: "bei lokaler Google-Sichtbarkeit auf Russisch" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl font-bold text-brand-blue mb-1">{stat.value}</div>
                  <div className="text-sm font-medium text-google-text mb-1">{stat.label}</div>
                  <div className="text-xs text-google-secondary">{stat.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="section-padding px-6">
          <div className="container-content mx-auto max-w-4xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-google-text mb-4">
              Was ich für russischsprachige Unternehmer tue
            </h2>
            <p className="text-body-lg text-google-secondary mb-10">
              Sie erhalten denselben professionellen Service wie alle Kunden — mit dem Unterschied, dass alles auf Russisch oder Ukrainisch erklärt, besprochen und dokumentiert wird. Ohne Sprachbarriere. Ohne Missverständnisse.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-12">
              {[
                {
                  icon: <MapPin size={20} className="text-brand-blue" />,
                  title: "Google Business Profile auf Deutsch",
                  text: "Ich erstelle oder optimiere Ihr Profil mit professionellen deutschen Texten. Keine Übersetzungsfehler, keine ungenauen Begriffe — Google-optimiert von Anfang an.",
                },
                {
                  icon: <Star size={20} className="text-brand-blue" />,
                  title: "Bewertungsmanagement auf Russisch",
                  text: "Sie bekommen alle Vorlagen und Strategien auf Russisch erklärt. Wenn Sie russischsprachige Kunden haben, erstellen wir auch zweisprachige Antwortvorlagen.",
                },
                {
                  icon: <CheckCircle size={20} className="text-brand-blue" />,
                  title: "Lokale Keyword-Strategie",
                  text: "Wir identifizieren, wonach Ihre Kunden in Berlin, Hamburg, München oder Ihrer Stadt suchen — und optimieren Ihr Profil gezielt dafür.",
                },
                {
                  icon: <Languages size={20} className="text-brand-blue" />,
                  title: "Beratung auf Russisch & Ukrainisch",
                  text: "Alle Gespräche, Berichte und Empfehlungen auf Ihrem Sprachniveau. Kein Fachjargon ohne Erklärung. Kein Übersetzer notwendig.",
                },
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

            {/* Industries */}
            <h2 className="text-2xl font-bold text-google-text mb-4">Branchen, die ich besonders gut kenne</h2>
            <p className="text-body-lg text-google-secondary mb-6">
              Viele meiner Kunden sind russisch- oder ukrainischsprachige Unternehmer in Deutschland. Ich kenne die spezifischen Herausforderungen jeder dieser Branchen.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
              {[
                "Russisch-ukrainische Restaurants",
                "Delikatessenläden & Importe",
                "Schönheitssalons & Nagelstudios",
                "Übersetzungs- & Dolmetscherdienste",
                "Reinigungsunternehmen",
                "Handwerkliche Betriebe",
                "Immobilienmakler",
                "Ärzte & Therapeuten",
                "Kinderbetreuung & Nachhilfe",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-google-text">
                  <CheckCircle size={14} className="text-brand-blue shrink-0" />
                  {item}
                </div>
              ))}
            </div>

            {/* Russian-language content block */}
            <div className="p-6 border border-blue-200 bg-blue-50 rounded-card-lg mb-10">
              <h3 className="font-semibold text-google-text mb-3">Почему это важно (по-русски)</h3>
              <p className="text-body-sm text-google-secondary mb-3">
                Большинство маркетинговых агентств в Германии работают только на немецком. Это создаёт языковой барьер для русскоязычных предпринимателей. Я заполняю этот пробел: полный сервис на вашем языке.
              </p>
              <p className="text-body-sm text-google-secondary mb-4">
                Google Maps — это не просто визитка. Это главный канал привлечения местных клиентов. Оптимизированный профиль приносит звонки, запросы и клиентов без рекламного бюджета.
              </p>
              <Link
                href="/ru/fur-russischsprachige"
                className="text-brand-blue font-medium hover:underline text-sm inline-flex items-center gap-1"
              >
                Читать полностью на русском <ArrowRight size={14} />
              </Link>
            </div>

            {/* FAQ */}
            <h2 className="text-2xl font-bold text-google-text mb-6">Häufige Fragen</h2>
            <div className="divide-y divide-google-border border border-google-border rounded-card-lg overflow-hidden bg-white mb-10">
              {faqItems.map((item, i) => (
                <details key={i} className="group px-5 py-4">
                  <summary className="flex items-center justify-between cursor-pointer list-none text-body-sm font-semibold text-google-text">
                    {item.q}
                    <ChevronDown size={16} className="text-google-secondary shrink-0 ml-3 transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="mt-3 text-body-sm text-google-secondary leading-relaxed">{item.a}</p>
                </details>
              ))}
            </div>

            {/* Internal links */}
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { label: "Leistung", href: "/leistungen/google-business-profile", text: "Google Business Profile Optimierung →" },
                { label: "Leistung", href: "/leistungen/local-seo", text: "Local SEO →" },
                { label: "Leistung", href: "/leistungen/bewertungsmanagement", text: "Bewertungsmanagement →" },
              ].map((link, i) => (
                <div key={i} className="p-4 bg-google-light rounded-card border border-google-border">
                  <p className="text-xs text-google-secondary mb-1 uppercase tracking-wide">{link.label}</p>
                  <Link href={link.href} className="text-brand-blue font-medium hover:underline text-sm">{link.text}</Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-google-light border-t border-google-border">
          <div className="container-content mx-auto max-w-3xl text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-google-text mb-4">
              Kostenloses Erstgespräch auf Russisch oder Deutsch
            </h2>
            <p className="text-body-lg text-google-secondary mb-8 max-w-xl mx-auto">
              Schreiben Sie mir auf Russisch, Ukrainisch oder Deutsch. Wir analysieren Ihr Google Business Profile und besprechen, welche Schritte den größten Effekt haben.
            </p>
            <p className="text-body-sm text-google-secondary mb-6 italic">
              Напишите мне по-русски или по-украински — отвечу на вашем языке.
            </p>
            <Link
              href={`${homeBase}/#audit`}
              className="inline-flex items-center gap-2 bg-brand-blue text-white font-semibold px-6 py-3 rounded-lg hover:bg-brand-blue/90 transition-colors"
            >
              Jetzt anfragen / Написать мне <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function RuPage({
  homeBase,
  breadcrumb,
  serviceSchema,
  faqItems,
}: {
  homeBase: string;
  breadcrumb: object;
  serviceSchema: object;
  faqItems: { q: string; a: string }[];
}) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <main className="min-h-screen">
        {/* Hero */}
        <section className="pt-32 pb-16 px-6 bg-white">
          <div className="container-content mx-auto max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-brand-blue text-sm font-medium px-4 py-2 rounded-full mb-6">
              <Languages size={14} />
              Работаю на: русском · украинском · немецком · английском
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-google-text mb-6 leading-tight">
              Google Maps для русскоязычного<br />
              <span className="text-brand-blue">бизнеса в Германии</span>
            </h1>
            <p className="text-body-lg text-google-secondary mb-4 max-w-2xl">
              Меня зовут Роман Андреев. Я помогаю русскоязычным предпринимателям в Германии стать заметными в Google Maps — без языкового барьера, без посредников, на вашем языке.
            </p>
            <p className="text-body-md text-google-secondary mb-8 max-w-2xl">
              Ваш бизнес хорош. Просто о нём пока никто не знает. Google Maps — это самый прямой путь к местным клиентам. Давайте это изменим.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href={`${homeBase}/#audit`}
                className="inline-flex items-center gap-2 bg-brand-blue text-white font-semibold px-6 py-3 rounded-lg hover:bg-brand-blue/90 transition-colors"
              >
                Бесплатный аудит запросить <ArrowRight size={16} />
              </Link>
              <Link
                href="/fur-russischsprachige"
                className="inline-flex items-center gap-2 border border-google-border text-google-text font-medium px-6 py-3 rounded-lg hover:border-brand-blue hover:text-brand-blue transition-colors"
              >
                Страница на немецком
              </Link>
            </div>
          </div>
        </section>

        {/* Why */}
        <section className="py-12 px-6 bg-google-light border-y border-google-border">
          <div className="container-content mx-auto max-w-4xl">
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { value: "~3,5 млн", label: "русскоязычных", sub: "живут в Германии и ведут бизнес" },
                { value: "86%", label: "клиентов", sub: "используют Google Maps для поиска местного бизнеса" },
                { value: "0", label: "конкурентов", sub: "которые делают это на русском в вашем городе" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl font-bold text-brand-blue mb-1">{stat.value}</div>
                  <div className="text-sm font-medium text-google-text mb-1">{stat.label}</div>
                  <div className="text-xs text-google-secondary">{stat.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="section-padding px-6">
          <div className="container-content mx-auto max-w-4xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-google-text mb-4">
              Что я делаю для русскоязычных предпринимателей
            </h2>
            <p className="text-body-lg text-google-secondary mb-10">
              Всё то же самое, что и для немецких клиентов — только без языкового барьера. Вы получаете полный профессиональный сервис на своём языке.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-12">
              {[
                {
                  icon: <MapPin size={20} className="text-brand-blue" />,
                  title: "Google Business Profile на немецком",
                  text: "Создаю или оптимизирую ваш профиль с профессиональными немецкими текстами. Никаких ошибок перевода, никаких неточных формулировок — оптимизировано для Google с первого дня.",
                },
                {
                  icon: <Star size={20} className="text-brand-blue" />,
                  title: "Стратегия отзывов",
                  text: "Все шаблоны и стратегии объясняю на русском. Для тех, у кого есть русскоязычные клиенты — создаём двуязычные шаблоны ответов.",
                },
                {
                  icon: <CheckCircle size={20} className="text-brand-blue" />,
                  title: "Локальные ключевые слова",
                  text: "Определяем, что именно ищут ваши клиенты в Берлине, Гамбурге, Мюнхене или вашем городе — и оптимизируем профиль под эти запросы.",
                },
                {
                  icon: <Languages size={20} className="text-brand-blue" />,
                  title: "Консультации на русском и украинском",
                  text: "Все разговоры, отчёты и рекомендации — на вашем языке. Без технического жаргона без объяснений. Без переводчика.",
                },
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

            {/* Niches */}
            <h2 className="text-2xl font-bold text-google-text mb-4">Ниши, с которыми я работаю чаще всего</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-12">
              {[
                "Русско-украинские рестораны",
                "Продуктовые магазины и деликатесы",
                "Салоны красоты и ногтевые студии",
                "Переводческие агентства",
                "Клининговые компании",
                "Ремесленные мастерские",
                "Агентства недвижимости",
                "Врачи и терапевты",
                "Репетиторы и няни",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-google-text">
                  <CheckCircle size={14} className="text-brand-blue shrink-0" />
                  {item}
                </div>
              ))}
            </div>

            {/* Personal story */}
            <div className="p-6 border border-google-border rounded-card bg-white mb-10">
              <h3 className="font-semibold text-google-text mb-3">Почему я это понимаю</h3>
              <p className="text-body-sm text-google-secondary mb-3">
                Я сам являюсь частью русскоязычного сообщества в Германии. Я понимаю, каково это — строить бизнес в другой стране, на другом языке, с другими правилами. И я знаю, что Google Maps — это один из самых равных по возможностям каналов: маленький бизнес с хорошим профилем может обогнать крупные сети.
              </p>
              <p className="text-body-sm text-google-secondary">
                Моя специализация: Google Business Profile, Local SEO и управление отзывами. Работаю с локальными бизнесами по всей Германии — лично, без шаблонных решений.
              </p>
            </div>

            {/* FAQ */}
            <h2 className="text-2xl font-bold text-google-text mb-6">Часто задаваемые вопросы</h2>
            <div className="divide-y divide-google-border border border-google-border rounded-card-lg overflow-hidden bg-white mb-10">
              {faqItems.map((item, i) => (
                <details key={i} className="group px-5 py-4">
                  <summary className="flex items-center justify-between cursor-pointer list-none text-body-sm font-semibold text-google-text">
                    {item.q}
                    <ChevronDown size={16} className="text-google-secondary shrink-0 ml-3 transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="mt-3 text-body-sm text-google-secondary leading-relaxed">{item.a}</p>
                </details>
              ))}
            </div>

            {/* Internal links */}
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { label: "Услуга", href: "/ru/leistungen/google-business-profile", text: "Оптимизация Google Business Profile →" },
                { label: "Услуга", href: "/ru/leistungen/local-seo", text: "Local SEO →" },
                { label: "Статья", href: "/ru/blog/google-maps-optimierung-anleitung", text: "Руководство по Google Maps →" },
              ].map((link, i) => (
                <div key={i} className="p-4 bg-google-light rounded-card border border-google-border">
                  <p className="text-xs text-google-secondary mb-1 uppercase tracking-wide">{link.label}</p>
                  <Link href={link.href} className="text-brand-blue font-medium hover:underline text-sm">{link.text}</Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-google-light border-t border-google-border">
          <div className="container-content mx-auto max-w-3xl text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-google-text mb-4">
              Бесплатная консультация на русском языке
            </h2>
            <p className="text-body-lg text-google-secondary mb-8 max-w-xl mx-auto">
              Напишите мне по-русски или по-украински. Мы бесплатно проанализируем ваш Google Business Profile и обсудим, что нужно улучшить.
            </p>
            <Link
              href={`${homeBase}/#audit`}
              className="inline-flex items-center gap-2 bg-brand-blue text-white font-semibold px-6 py-3 rounded-lg hover:bg-brand-blue/90 transition-colors"
            >
              Написать мне <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

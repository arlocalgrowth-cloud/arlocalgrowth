import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Star, ArrowRight, MessageSquare, TrendingUp, Shield, ChevronDown, CheckCircle } from "lucide-react";

const BASE_URL = "https://arlocalgrowth.de";

const pageMeta: Record<string, { title: string; description: string }> = {
  de: {
    title: "Bewertungsmanagement — mehr Google Bewertungen & bessere Online-Reputation",
    description:
      "Professionelles Bewertungsmanagement für lokale Unternehmen. Mehr echte Google Bewertungen aufbauen, Reputation pflegen und Rankings verbessern. Jetzt kostenloses Audit anfragen.",
  },
  en: {
    title: "Review Management — More Google Reviews & Better Online Reputation",
    description:
      "Professional review management for local businesses. Build more genuine Google reviews, protect your reputation and improve rankings. Request a free audit now.",
  },
  ru: {
    title: "Управление отзывами — больше отзывов Google и лучшая репутация",
    description:
      "Профессиональное управление отзывами для локального бизнеса. Больше настоящих отзывов Google, защита репутации и улучшение позиций.",
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
  const canonicalPath =
    locale === "de"
      ? "/leistungen/bewertungsmanagement"
      : `/${locale}/leistungen/bewertungsmanagement`;

  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: `${BASE_URL}${canonicalPath}`,
      languages: {
        de: `${BASE_URL}/leistungen/bewertungsmanagement`,
        en: `${BASE_URL}/en/leistungen/bewertungsmanagement`,
        ru: `${BASE_URL}/ru/leistungen/bewertungsmanagement`,
      },
    },
    openGraph: { title: m.title, description: m.description, url: `${BASE_URL}${canonicalPath}` },
  };
}

export default async function BewertungsmanagementPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const homeBase = locale === "de" ? "" : `/${locale}`;
  const canonicalPath =
    locale === "de"
      ? "/leistungen/bewertungsmanagement"
      : `/${locale}/leistungen/bewertungsmanagement`;

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: locale === "de" ? BASE_URL : `${BASE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: locale === "ru" ? "Услуги" : locale === "en" ? "Services" : "Leistungen", item: `${BASE_URL}${homeBase}/#leistungen` },
      { "@type": "ListItem", position: 3, name: locale === "ru" ? "Управление отзывами" : locale === "en" ? "Review Management" : "Bewertungsmanagement", item: `${BASE_URL}${canonicalPath}` },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name:
      locale === "ru" ? "Управление отзывами Google" : locale === "en" ? "Google Review Management" : "Google Bewertungsmanagement",
    description:
      locale === "ru"
        ? "Систематическое получение настоящих отзывов Google, профессиональные ответы, мониторинг репутации и стратегия управления негативными отзывами."
        : locale === "en"
        ? "Systematic building of genuine Google reviews, professional responses, reputation monitoring and strategy for handling negative reviews."
        : "Systematischer Aufbau echter Google Bewertungen, professionelle Antworten, Reputationsmonitoring und Strategie für den Umgang mit negativen Bewertungen.",
    provider: { "@type": "LocalBusiness", "@id": `${BASE_URL}/#business` },
    areaServed: [
      { "@type": "Country", name: "Germany" },
      { "@type": "Country", name: "Austria" },
      { "@type": "Country", name: "Switzerland" },
    ],
  };

  const faqItems =
    locale === "ru"
      ? [
          { q: "Как законно получить больше отзывов Google?", a: "Самый эффективный способ: создайте прямую ссылку на страницу отзывов Google и отправляйте её довольным клиентам через WhatsApp сразу после оказания услуги. Прямо перед отправкой спросите лично — это значительно повышает конверсию. Покупка отзывов или вознаграждение за них запрещены." },
          { q: "Могут ли негативные отзывы навредить бизнесу?", a: "Несколько негативных отзывов при большом количестве позитивных нормальны и даже повышают доверие. Проблема возникает, когда негативных отзывов много или они остаются без ответа. Профессиональный ответ на негативный отзыв часто превращает потенциальных клиентов в реальных." },
          { q: "Сколько отзывов Google мне нужно?", a: "В большинстве локальных рынков Германии топовые бизнесы имеют 50–200 отзывов. Важнее количества — актуальность: Google ценит свежие отзывы. Реалистичная цель на первые 3 месяца: 15–25 настоящих отзывов." },
          { q: "Что делать с поддельными или несправедливыми отзывами?", a: "Поддельные или злонамеренные отзывы можно оспорить в Google. Мы помогаем подготовить правильные жалобы и аргументацию для их удаления. При несправедливых отзывах от реальных клиентов помогает профессиональный публичный ответ." },
          { q: "Помогают ли отзывы Google ранжированию?", a: "Да. Количество отзывов, средний рейтинг, актуальность отзывов и наличие ответов владельца — всё это прямые факторы ранжирования в Google Maps. Систематическая работа с отзывами улучшает позиции в Local Pack." },
        ]
      : locale === "en"
      ? [
          { q: "How do I get more Google reviews legally?", a: "The most effective method: create a direct link to your Google review page and send it to satisfied customers via WhatsApp immediately after the service. A personal ask just before sending significantly increases conversion rates. Buying reviews or offering incentives is prohibited by Google." },
          { q: "Can negative reviews hurt my business?", a: "A few negative reviews among many positive ones are normal and can actually increase trust. Problems arise when negative reviews are numerous or go unanswered. A professional response to a negative review often turns potential customers into real ones." },
          { q: "How many Google reviews do I need?", a: "In most local markets in Germany, top businesses have 50–200 reviews. More important than the number is recency: Google values fresh reviews. A realistic target for the first 3 months: 15–25 genuine reviews." },
          { q: "What should I do about fake or unfair reviews?", a: "Fake or malicious reviews can be disputed with Google. We help prepare the right complaints and arguments for their removal. For unfair reviews from real customers, a professional public response is often the best strategy." },
          { q: "Do Google reviews help with rankings?", a: "Yes. Review count, average rating, recency, and owner responses are all direct ranking factors in Google Maps. Systematic review management improves positions in the Local Pack." },
        ]
      : [
          { q: "Wie bekomme ich legal mehr Google Bewertungen?", a: "Die effektivste Methode: Erstellen Sie einen direkten Link zu Ihrer Google-Bewertungsseite und senden Sie ihn zufriedenen Kunden direkt nach der Dienstleistung per WhatsApp. Eine persönliche Anfrage direkt davor erhöht die Conversion-Rate erheblich. Der Kauf von Bewertungen oder das Anbieten von Anreizen ist von Google verboten." },
          { q: "Können negative Bewertungen meinem Unternehmen schaden?", a: "Einige negative Bewertungen unter vielen positiven sind normal und können das Vertrauen sogar erhöhen. Probleme entstehen, wenn negative Bewertungen häufig sind oder unbeantwortet bleiben. Eine professionelle Antwort auf eine negative Bewertung verwandelt oft potenzielle Kunden in echte." },
          { q: "Wie viele Google Bewertungen brauche ich?", a: "In den meisten lokalen Märkten in Deutschland haben Top-Unternehmen 50–200 Bewertungen. Wichtiger als die Anzahl ist die Aktualität: Google schätzt aktuelle Bewertungen. Ein realistisches Ziel für die ersten 3 Monate: 15–25 echte Bewertungen." },
          { q: "Was tun bei gefälschten oder ungerechten Bewertungen?", a: "Gefälschte oder böswillige Bewertungen können bei Google angefochten werden. Wir helfen, die richtigen Beschwerden und Argumente für deren Entfernung vorzubereiten. Bei ungerechten Bewertungen echter Kunden hilft eine professionelle öffentliche Antwort am besten." },
          { q: "Helfen Google Bewertungen beim Ranking?", a: "Ja. Anzahl der Bewertungen, Durchschnittsbewertung, Aktualität und Antworten des Inhabers sind direkte Ranking-Faktoren bei Google Maps. Systematisches Bewertungsmanagement verbessert die Positionen im Local Pack." },
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

  const content =
    locale === "ru" ? <RuContent homeBase={homeBase} /> : locale === "en" ? <EnContent homeBase={homeBase} /> : <DeContent homeBase={homeBase} />;

  const faqHeading = locale === "ru" ? "Часто задаваемые вопросы" : locale === "en" ? "Frequently Asked Questions" : "Häufige Fragen";
  const ctaHeading = locale === "ru" ? "Хотите больше отзывов?" : locale === "en" ? "Want more Google reviews?" : "Mehr Google Bewertungen für Ihr Unternehmen?";
  const ctaText =
    locale === "ru"
      ? "Получите бесплатный аудит. Я покажу ваш текущий рейтинг, сравню с конкурентами и дам конкретную стратегию."
      : locale === "en"
      ? "Get a free audit. I'll show your current rating, compare it with competitors and give you a concrete strategy."
      : "Holen Sie sich ein kostenloses Audit. Ich zeige Ihnen Ihren aktuellen Bewertungsstand, vergleiche ihn mit Mitbewerbern und gebe Ihnen eine konkrete Strategie.";
  const ctaBtn = locale === "ru" ? "Бесплатный аудит запросить" : locale === "en" ? "Request free audit" : "Kostenloses Audit anfragen";

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <main className="min-h-screen">
        {content}

        {/* FAQ */}
        <section className="section-padding bg-google-light">
          <div className="container-content mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold text-google-text mb-8 text-center">{faqHeading}</h2>
            <div className="divide-y divide-google-border border border-google-border rounded-card-lg overflow-hidden bg-white">
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
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding">
          <div className="container-content mx-auto max-w-3xl text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-google-text mb-4">{ctaHeading}</h2>
            <p className="text-body-lg text-google-secondary mb-8 max-w-xl mx-auto">{ctaText}</p>
            <Link href={`${homeBase}/#audit`} className="inline-flex items-center gap-2 bg-brand-blue text-white font-semibold px-6 py-3 rounded-lg hover:bg-brand-blue/90 transition-colors">
              {ctaBtn} <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function DeContent({ homeBase }: { homeBase: string }) {
  return (
    <>
      <section className="pt-32 pb-16 px-6 bg-white">
        <div className="container-content mx-auto max-w-4xl">
          <nav className="flex items-center gap-2 text-sm text-google-secondary mb-6">
            <Link href={`${homeBase}/`} className="hover:text-brand-blue transition-colors">Home</Link>
            <span>/</span>
            <Link href={`${homeBase}/#leistungen`} className="hover:text-brand-blue transition-colors">Leistungen</Link>
            <span>/</span>
            <span className="text-google-text">Bewertungsmanagement</span>
          </nav>
          <p className="text-label-sm uppercase text-brand-blue tracking-widest mb-3">Leistung</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-google-text mb-6 leading-tight">
            Bewertungsmanagement —<br />
            <span className="text-brand-blue">mehr Google Bewertungen aufbauen</span>
          </h1>
          <p className="text-body-lg text-google-secondary mb-8 max-w-2xl">
            Google Bewertungen sind der stärkste Vertrauensbeweis für Ihr Unternehmen — und ein direkter Ranking-Faktor bei Google Maps. Wir helfen Ihnen, systematisch mehr echte Bewertungen aufzubauen.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href={`${homeBase}/#audit`} className="inline-flex items-center gap-2 bg-brand-blue text-white font-semibold px-6 py-3 rounded-lg hover:bg-brand-blue/90 transition-colors">
              Kostenloses Audit anfragen <ArrowRight size={16} />
            </Link>
            <Link href="/blog/google-bewertungen-bekommen" className="inline-flex items-center gap-2 border border-google-border text-google-text font-medium px-6 py-3 rounded-lg hover:border-brand-blue hover:text-brand-blue transition-colors">
              Artikel lesen
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 px-6 bg-google-light border-y border-google-border">
        <div className="container-content mx-auto max-w-4xl">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { value: "93 %", label: "der Konsumenten lesen Bewertungen, bevor sie kaufen" },
              { value: "88 %", label: "vertrauen Online-Bewertungen wie persönlichen Empfehlungen" },
              { value: "3,3★", label: "mindestens für 92 % der Nutzer zum Interagieren" },
              { value: "50+", label: "echte Bewertungen als realistisches Ziel in 3 Monaten" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl font-bold text-brand-blue mb-1">{stat.value}</div>
                <div className="text-xs text-google-secondary leading-snug">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding px-6">
        <div className="container-content mx-auto max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-google-text mb-4">Was unser Bewertungsmanagement umfasst</h2>
          <p className="text-body-lg text-google-secondary mb-10">
            Bewertungsmanagement ist mehr als „mehr Bewertungen sammeln". Es ist ein System, das echtes Vertrauen aufbaut und Ihr lokales Ranking systematisch verbessert.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mb-12">
            {[
              {
                icon: <Star size={20} className="text-brand-blue" />,
                title: "Bewertungslink & Strategie",
                text: "Wir erstellen Ihren direkten Google Bewertungslink und entwickeln eine individuelle Strategie, wann und wie Sie Kunden um eine Bewertung bitten.",
              },
              {
                icon: <MessageSquare size={20} className="text-brand-blue" />,
                title: "WhatsApp & E-Mail-Vorlagen",
                text: "Professionell formulierte Vorlagen für WhatsApp und E-Mail, die Sie nach der Dienstleistung sofort einsatzbereit haben.",
              },
              {
                icon: <TrendingUp size={20} className="text-brand-blue" />,
                title: "Antwortmanagement",
                text: "Wir beantworten jede Bewertung — positiv und negativ — professionell und zeitnah. Eine hohe Antwortquote ist selbst ein Ranking-Signal.",
              },
              {
                icon: <Shield size={20} className="text-brand-blue" />,
                title: "Schutz vor Fake-Bewertungen",
                text: "Bei gefälschten oder böswilligen Bewertungen helfen wir, diese bei Google zu melden und Argumente für die Entfernung zu formulieren.",
              },
              {
                icon: <CheckCircle size={20} className="text-brand-blue" />,
                title: "QR-Code & Offline-Integration",
                text: "QR-Code für Ihr Geschäft, auf Rechnungen oder Visitenkarten — damit Kunden auch ohne WhatsApp Nachrichten einfach eine Bewertung hinterlassen können.",
              },
              {
                icon: <TrendingUp size={20} className="text-brand-blue" />,
                title: "Monitoring & Benachrichtigungen",
                text: "Wir überwachen neue Bewertungen und benachrichtigen Sie sofort — damit keine Bewertung unbeantwortet bleibt.",
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

          {/* The 7 methods table */}
          <h2 className="text-2xl font-bold text-google-text mb-6">7 Methoden für mehr Google Bewertungen: Vergleich</h2>
          <div className="overflow-x-auto mb-12">
            <table className="w-full border border-google-border rounded-card overflow-hidden text-sm">
              <thead>
                <tr className="bg-google-light">
                  <th className="text-left p-4 font-semibold text-google-text">Methode</th>
                  <th className="text-left p-4 font-semibold text-google-text">Effektivität</th>
                  <th className="text-left p-4 font-semibold text-google-text">Aufwand</th>
                  <th className="text-left p-4 font-semibold text-google-text">Empfehlung</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-google-border">
                {[
                  ["WhatsApp direkt nach Service", "Sehr hoch", "Niedrig", "★★★★★"],
                  ["Persönliche Anfrage + Link", "Hoch", "Niedrig", "★★★★★"],
                  ["QR-Code im Geschäft", "Mittel", "Einmalig", "★★★★☆"],
                  ["E-Mail-Follow-up", "Mittel", "Automatisierbar", "★★★★☆"],
                  ["Auf alle Bewertungen antworten", "Mittel (indirekt)", "Mittel", "★★★★☆"],
                  ["Bewertungslink auf Website", "Niedrig–Mittel", "Einmalig", "★★★☆☆"],
                  ["Bewertungen kaufen", "Verboten", "—", "❌ Nie"],
                ].map(([method, effectiveness, effort, rating]) => (
                  <tr key={method} className="bg-white">
                    <td className="p-4 font-medium text-google-text">{method}</td>
                    <td className="p-4 text-google-secondary">{effectiveness}</td>
                    <td className="p-4 text-google-secondary">{effort}</td>
                    <td className="p-4 text-brand-blue">{rating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Negative review response template */}
          <div className="p-6 border border-google-border rounded-card bg-white mb-10">
            <h3 className="font-semibold text-google-text mb-3">Beispiel: Professionelle Antwort auf eine negative Bewertung</h3>
            <div className="bg-google-light rounded-lg p-4 text-sm text-google-secondary">
              <p className="italic mb-2">„Vielen Dank für Ihr Feedback. Es tut uns leid, dass Ihr Erlebnis nicht Ihren Erwartungen entsprach. Wir nehmen jedes Feedback ernst und würden gerne mehr erfahren, um es zu verbessern. Bitte kontaktieren Sie uns direkt unter a.r.localgrowth@gmail.com oder +49 176 23481952 — wir lösen das gemeinsam."</p>
            </div>
            <p className="text-xs text-google-secondary mt-3">Wichtig: Professionell, lösungsorientiert, Einladung zur Direktkommunikation — kein emotionaler Gegenangriff.</p>
          </div>

          {/* Internal links */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-5 bg-google-light rounded-card border border-google-border">
              <p className="text-xs text-google-secondary mb-1 uppercase tracking-wide">Weiterführender Artikel</p>
              <Link href="/blog/google-bewertungen-bekommen" className="text-brand-blue font-medium hover:underline text-sm">
                7 Methoden für mehr Google Bewertungen →
              </Link>
            </div>
            <div className="p-5 bg-google-light rounded-card border border-google-border">
              <p className="text-xs text-google-secondary mb-1 uppercase tracking-wide">Verwandte Leistung</p>
              <Link href="/leistungen/google-business-profile" className="text-brand-blue font-medium hover:underline text-sm">
                Google Business Profile Optimierung →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function EnContent({ homeBase }: { homeBase: string }) {
  return (
    <>
      <section className="pt-32 pb-16 px-6 bg-white">
        <div className="container-content mx-auto max-w-4xl">
          <nav className="flex items-center gap-2 text-sm text-google-secondary mb-6">
            <Link href={`${homeBase}/`} className="hover:text-brand-blue transition-colors">Home</Link>
            <span>/</span>
            <Link href={`${homeBase}/#leistungen`} className="hover:text-brand-blue transition-colors">Services</Link>
            <span>/</span>
            <span className="text-google-text">Review Management</span>
          </nav>
          <p className="text-label-sm uppercase text-brand-blue tracking-widest mb-3">Service</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-google-text mb-6 leading-tight">
            Review Management —<br />
            <span className="text-brand-blue">build more genuine Google reviews</span>
          </h1>
          <p className="text-body-lg text-google-secondary mb-8 max-w-2xl">
            Google reviews are the strongest trust signal for your business — and a direct ranking factor in Google Maps. We help you systematically build more genuine reviews.
          </p>
          <Link href={`${homeBase}/#audit`} className="inline-flex items-center gap-2 bg-brand-blue text-white font-semibold px-6 py-3 rounded-lg hover:bg-brand-blue/90 transition-colors">
            Request free audit <ArrowRight size={16} />
          </Link>
        </div>
      </section>
      <section className="section-padding px-6">
        <div className="container-content mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-google-text mb-6">What our review management includes</h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            {[
              { title: "Review link & strategy", text: "We create your direct Google review link and develop an individual strategy for when and how to ask customers for a review." },
              { title: "WhatsApp & email templates", text: "Professionally worded templates for WhatsApp and email, ready to use immediately after service." },
              { title: "Response management", text: "We respond to every review — positive and negative — professionally and promptly. A high response rate is itself a ranking signal." },
              { title: "Protection from fake reviews", text: "For fake or malicious reviews, we help you report them to Google and build the right arguments for removal." },
              { title: "QR code & offline integration", text: "QR code for your premises, invoices or business cards — so customers can leave a review easily even without WhatsApp." },
              { title: "Monitoring & alerts", text: "We monitor new reviews and alert you immediately — so no review goes unanswered." },
            ].map((item, i) => (
              <div key={i} className="p-5 border border-google-border rounded-card bg-white">
                <h3 className="font-semibold text-google-text mb-2">{item.title}</h3>
                <p className="text-body-sm text-google-secondary">{item.text}</p>
              </div>
            ))}
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-5 bg-google-light rounded-card border border-google-border">
              <p className="text-xs text-google-secondary mb-1 uppercase tracking-wide">Related article</p>
              <Link href="/en/blog/google-bewertungen-bekommen" className="text-brand-blue font-medium hover:underline text-sm">7 methods for more Google reviews →</Link>
            </div>
            <div className="p-5 bg-google-light rounded-card border border-google-border">
              <p className="text-xs text-google-secondary mb-1 uppercase tracking-wide">Related service</p>
              <Link href="/en/leistungen/google-business-profile" className="text-brand-blue font-medium hover:underline text-sm">Google Business Profile Optimization →</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function RuContent({ homeBase }: { homeBase: string }) {
  return (
    <>
      <section className="pt-32 pb-16 px-6 bg-white">
        <div className="container-content mx-auto max-w-4xl">
          <nav className="flex items-center gap-2 text-sm text-google-secondary mb-6">
            <Link href={`${homeBase}/`} className="hover:text-brand-blue transition-colors">Главная</Link>
            <span>/</span>
            <Link href={`${homeBase}/#leistungen`} className="hover:text-brand-blue transition-colors">Услуги</Link>
            <span>/</span>
            <span className="text-google-text">Управление отзывами</span>
          </nav>
          <p className="text-label-sm uppercase text-brand-blue tracking-widest mb-3">Услуга</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-google-text mb-6 leading-tight">
            Управление отзывами Google —<br />
            <span className="text-brand-blue">систематически больше настоящих отзывов</span>
          </h1>
          <p className="text-body-lg text-google-secondary mb-8 max-w-2xl">
            Отзывы Google — главный сигнал доверия для вашего бизнеса и прямой фактор ранжирования в Google Maps. Мы помогаем систематически получать больше настоящих отзывов.
          </p>
          <Link href={`${homeBase}/#audit`} className="inline-flex items-center gap-2 bg-brand-blue text-white font-semibold px-6 py-3 rounded-lg hover:bg-brand-blue/90 transition-colors">
            Запросить бесплатный аудит <ArrowRight size={16} />
          </Link>
        </div>
      </section>
      <section className="section-padding px-6">
        <div className="container-content mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-google-text mb-6">Что включает управление отзывами</h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            {[
              { title: "Ссылка для отзывов и стратегия", text: "Создаём прямую ссылку на страницу отзывов Google и разрабатываем индивидуальную стратегию — когда и как просить клиентов об отзыве." },
              { title: "Шаблоны для WhatsApp и email", text: "Профессионально составленные шаблоны для WhatsApp и email, готовые к использованию сразу после оказания услуги." },
              { title: "Управление ответами", text: "Отвечаем на каждый отзыв — положительный и отрицательный — профессионально и своевременно. Высокий процент ответов сам по себе является сигналом ранжирования." },
              { title: "Защита от поддельных отзывов", text: "При поддельных или злонамеренных отзывах помогаем подать жалобу в Google и подготовить аргументы для их удаления." },
              { title: "QR-код и офлайн-интеграция", text: "QR-код для вашего заведения, счетов или визиток — чтобы клиенты могли легко оставить отзыв без мессенджеров." },
              { title: "Мониторинг и уведомления", text: "Отслеживаем новые отзывы и сразу уведомляем вас — ни один отзыв не остаётся без ответа." },
            ].map((item, i) => (
              <div key={i} className="p-5 border border-google-border rounded-card bg-white">
                <h3 className="font-semibold text-google-text mb-2">{item.title}</h3>
                <p className="text-body-sm text-google-secondary">{item.text}</p>
              </div>
            ))}
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-5 bg-google-light rounded-card border border-google-border">
              <p className="text-xs text-google-secondary mb-1 uppercase tracking-wide">Статья по теме</p>
              <Link href="/ru/blog/google-bewertungen-bekommen" className="text-brand-blue font-medium hover:underline text-sm">7 методов для большего количества отзывов →</Link>
            </div>
            <div className="p-5 bg-google-light rounded-card border border-google-border">
              <p className="text-xs text-google-secondary mb-1 uppercase tracking-wide">Связанная услуга</p>
              <Link href="/ru/leistungen/google-business-profile" className="text-brand-blue font-medium hover:underline text-sm">Оптимизация Google Business Profile →</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

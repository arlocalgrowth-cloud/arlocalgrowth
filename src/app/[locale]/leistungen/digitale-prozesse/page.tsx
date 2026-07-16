import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FaqVisibleSimple } from "@/components/faq/FaqVisible";
import { ArrowRight, Clock, CheckCircle, RefreshCw, Settings, FileText, BarChart2 } from "lucide-react";

const BASE_URL = "https://arlocalgrowth.de";

const pageMeta: Record<string, { title: string; description: string }> = {
  de: {
    title: "Digitale Prozesse automatisieren — Formulare, Buchungen, Auswertungen",
    description: "Digitale Prozesse fuer lokale Unternehmen: Online-Buchungssysteme, automatisierte Formulare und monatliche Auswertungen. Weniger Verwaltung, mehr Zeit fuer Kunden. A.R. Local Growth.",
  },
  en: {
    title: "Digital Process Automation — Bookings, Forms, Reporting",
    description: "Digital processes for local businesses: online booking systems, automated forms and monthly reports. Less admin, more time for customers. A.R. Local Growth.",
  },
  ru: {
    title: "Цифровизация процессов — брони, формы, отчёты",
    description: "Цифровые процессы для локального бизнеса: онлайн-бронирование, автоматические формы и ежемесячная аналитика. Меньше рутины, больше времени для клиентов.",
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
  const canonicalPath = locale === "de" ? "/leistungen/digitale-prozesse" : `/${locale}/leistungen/digitale-prozesse`;
  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: `${BASE_URL}${canonicalPath}`,
      languages: {
        de: `${BASE_URL}/leistungen/digitale-prozesse`,
        en: `${BASE_URL}/en/leistungen/digitale-prozesse`,
        ru: `${BASE_URL}/ru/leistungen/digitale-prozesse`,
      },
    },
    openGraph: { title: m.title, description: m.description, url: `${BASE_URL}${canonicalPath}` },
  };
}

export default async function DigitaleProzessePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const homeBase = locale === "de" ? "" : `/${locale}`;
  const canonicalPath = locale === "de" ? "/leistungen/digitale-prozesse" : `/${locale}/leistungen/digitale-prozesse`;

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: locale === "de" ? BASE_URL : `${BASE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: locale === "ru" ? "Услуги" : locale === "en" ? "Services" : "Leistungen", item: `${BASE_URL}${homeBase}/leistungen` },
      { "@type": "ListItem", position: 3, name: locale === "ru" ? "Цифровые процессы" : locale === "en" ? "Digital Processes" : "Digitale Prozesse", item: `${BASE_URL}${canonicalPath}` },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: locale === "ru" ? "Цифровизация процессов для локального бизнеса" : locale === "en" ? "Digital Process Automation for Local Businesses" : "Digitale Prozesse fuer lokale Unternehmen",
    provider: { "@type": "LocalBusiness", "@id": `${BASE_URL}/#business` },
    areaServed: [{ "@type": "Country", name: "Germany" }, { "@type": "Country", name: "Austria" }, { "@type": "Country", name: "Switzerland" }],
  };

  const faqItems =
    locale === "ru"
      ? [
          { q: "Что именно вы автоматизируете?", a: "Конкретные процессы зависят от вашего бизнеса. Чаще всего: онлайн-запись клиентов (вместо звонков), форма заявки с автоматическим письмом-подтверждением, ежемесячный отчёт по Google Business Profile, уведомления о новых отзывах. После часового интервью я составляю список из 3–5 приоритетных улучшений с оценкой времени экономии." },
          { q: "Нужны ли мне технические знания для работы с автоматизацией?", a: "Нет. Всё настраивается один раз — и работает само. Вы получаете простые инструкции на русском языке. Если что-то перестаёт работать — пишите, починю в течение рабочего дня." },
          { q: "Сколько времени это освобождает?", a: "Зависит от текущей ситуации. Типичный результат для кофейни или небольшой клиники: 3–5 часов в неделю меньше рутины. Это время возвращается на работу с клиентами или на себя." },
          { q: "Какие инструменты вы используете?", a: "Я работаю с инструментами, которые уже распространены в малом бизнесе: Google Forms, Calendly, Notion, Make (ex-Integromat), Zapier. Не создаю зависимость от дорогостоящих платформ — вы остаётесь владельцем всех данных." },
          { q: "Можно ли добавить автоматизацию к уже существующему сайту?", a: "Да. Я могу добавить виджет бронирования, форму или скрипт отчётности к любому сайту — без полной переделки. Обычно это занимает 3–7 рабочих дней." },
        ]
      : locale === "en"
      ? [
          { q: "What exactly do you automate?", a: "The specific processes depend on your business. Most common: online client booking (replacing phone calls), inquiry forms with automatic confirmation emails, monthly Google Business Profile reports, and new review notifications. After a one-hour interview, I compile a list of 3-5 priority improvements with estimated time savings." },
          { q: "Do I need technical knowledge to work with the automation?", a: "No. Everything is set up once and runs on its own. You receive simple instructions in plain language. If something stops working — contact me and I will fix it within one working day." },
          { q: "How much time does this free up?", a: "It depends on your current setup. Typical result for a cafe or small clinic: 3-5 fewer hours of admin work per week. That time goes back to client-facing work or to you personally." },
          { q: "What tools do you use?", a: "I work with tools already common in small business: Google Forms, Calendly, Notion, Make (ex-Integromat), Zapier. I do not create dependency on expensive platforms — you remain the owner of all your data." },
          { q: "Can automation be added to an existing website?", a: "Yes. I can add a booking widget, form or reporting script to any existing website — without a full rebuild. Usually this takes 3-7 working days." },
        ]
      : [
          { q: "Was genau automatisieren Sie?", a: "Die konkreten Prozesse haengen von Ihrem Unternehmen ab. Am haeufigsten: Online-Terminbuchung fuer Kunden (statt Telefonaten), Anfrage-Formulare mit automatischer Bestaetigungsmail, monatliche Google Business Profile-Auswertungen und Benachrichtigungen bei neuen Bewertungen. Nach einem einstuendigen Interview erstelle ich eine Liste von 3-5 Prioritaeten mit Zeitersparnis-Schaetzung." },
          { q: "Benoetige ich technisches Wissen fuer die Nutzung der Automatisierung?", a: "Nein. Alles wird einmal eingerichtet und laeuft dann selbstaendig. Sie erhalten einfache Anleitungen in verstaendlicher Sprache. Falls etwas nicht mehr funktioniert — schreiben Sie mir und ich behebe es innerhalb eines Werktages." },
          { q: "Wie viel Zeit wird dadurch freigesetzt?", a: "Das haengt von Ihrer aktuellen Situation ab. Typisches Ergebnis fuer ein Cafe oder eine kleine Praxis: 3-5 Stunden weniger Verwaltungsaufwand pro Woche. Diese Zeit fliesst zurueck in die Arbeit mit Kunden oder in Ihre Freizeit." },
          { q: "Welche Tools verwenden Sie?", a: "Ich arbeite mit Tools, die im kleinen Unternehmen bereits verbreitet sind: Google Forms, Calendly, Notion, Make (ex-Integromat), Zapier. Ich schaffe keine Abhaengigkeit von teuren Plattformen — Sie bleiben Eigentuemer aller Ihrer Daten." },
          { q: "Kann Automatisierung zu einer bestehenden Website hinzugefuegt werden?", a: "Ja. Ich kann ein Buchungswidget, ein Formular oder ein Auswertungs-Skript zu jeder bestehenden Website hinzufuegen — ohne vollstaendigen Neuaufbau. In der Regel dauert das 3-7 Werktage." },
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

  const content = locale === "ru" ? (
    <RuContent homeBase={homeBase} faqItems={faqItems} />
  ) : locale === "en" ? (
    <EnContent homeBase={homeBase} faqItems={faqItems} />
  ) : (
    <DeContent homeBase={homeBase} faqItems={faqItems} />
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <main className="min-h-screen">{content}</main>
      <Footer />
    </>
  );
}

const features = {
  de: [
    { icon: <RefreshCw size={18} className="text-brand-blue" />, title: "Online-Terminbuchung", text: "Kunden buchen ihren Termin selbst — 24/7, auch ausserhalb Ihrer Geschaeftszeiten. Keine Telefonate, keine Doppelbuchungen." },
    { icon: <FileText size={18} className="text-brand-blue" />, title: "Automatische Anfrage-Formulare", text: "Interessenten fuellen ein kurzes Formular aus und bekommen sofort eine Bestaetigungsmail. Sie erhalten eine strukturierte Zusammenfassung statt mehrerer E-Mails." },
    { icon: <BarChart2 size={18} className="text-brand-blue" />, title: "Monatliche GBP-Auswertungen", text: "Jede Monat erhalten Sie automatisch einen Bericht: Profilaufrufe, Anrufklicks, Bewertungs-Entwicklung — klar zusammengefasst." },
    { icon: <CheckCircle size={18} className="text-brand-blue" />, title: "Bewertungs-Benachrichtigungen", text: "Neue Google-Bewertungen landen sofort in Ihrem Posteingang oder per Messenger. Nie wieder eine Bewertung verspaetet beantworten." },
    { icon: <Settings size={18} className="text-brand-blue" />, title: "Einrichtung in 3-7 Tagen", text: "Kein Projekt-Marathon. Ich richte die Automatisierungen innerhalb einer Woche ein — Sie sehen sofort, was sich aendert." },
    { icon: <Clock size={18} className="text-brand-blue" />, title: "Sie bleiben Eigentuemer Ihrer Daten", text: "Ich arbeite mit Tools wie Google, Calendly und Make. Keine proprietaere Plattform, keine Abhaengigkeit. Sie koennen alles jederzeit selbst verwalten." },
  ],
  en: [
    { icon: <RefreshCw size={18} className="text-brand-blue" />, title: "Online booking system", text: "Clients book their own appointments — 24/7, even outside your business hours. No phone calls, no double bookings." },
    { icon: <FileText size={18} className="text-brand-blue" />, title: "Automated inquiry forms", text: "Prospects fill in a short form and instantly receive a confirmation email. You get a structured summary instead of scattered emails." },
    { icon: <BarChart2 size={18} className="text-brand-blue" />, title: "Monthly GBP reports", text: "Every month you automatically receive a report: profile views, call clicks, review trends — clearly summarized." },
    { icon: <CheckCircle size={18} className="text-brand-blue" />, title: "Review notifications", text: "New Google reviews land in your inbox or messenger immediately. Never respond to a review late again." },
    { icon: <Settings size={18} className="text-brand-blue" />, title: "Setup in 3-7 days", text: "No project marathon. I configure the automations within a week — you immediately see what changes." },
    { icon: <Clock size={18} className="text-brand-blue" />, title: "You own your data", text: "I work with tools like Google, Calendly and Make. No proprietary platform, no dependency. You can manage everything yourself at any time." },
  ],
  ru: [
    { icon: <RefreshCw size={18} className="text-brand-blue" />, title: "Онлайн-запись клиентов", text: "Клиенты записываются сами — 24/7, даже вне рабочих часов. Без звонков, без путаницы с временем." },
    { icon: <FileText size={18} className="text-brand-blue" />, title: "Автоматические формы заявок", text: "Потенциальный клиент заполняет короткую форму и сразу получает письмо-подтверждение. Вы получаете структурированный запрос, а не цепочку сообщений." },
    { icon: <BarChart2 size={18} className="text-brand-blue" />, title: "Ежемесячные отчёты GBP", text: "Каждый месяц вы получаете автоматический отчёт: просмотры профиля, клики на звонок, динамика отзывов — коротко и понятно." },
    { icon: <CheckCircle size={18} className="text-brand-blue" />, title: "Уведомления о новых отзывах", text: "Новые отзывы Google моментально приходят на почту или в мессенджер. Никогда больше не пропустите отзыв и не ответите с опозданием." },
    { icon: <Settings size={18} className="text-brand-blue" />, title: "Настройка за 3–7 дней", text: "Никакого долгого проекта. Я настраиваю автоматизации за неделю — вы сразу видите результат." },
    { icon: <Clock size={18} className="text-brand-blue" />, title: "Данные остаются у вас", text: "Работаю с инструментами Google, Calendly и Make. Никакой проприетарной платформы. Вы владеете всеми данными и можете управлять ими самостоятельно." },
  ],
};

function DeContent({ homeBase, faqItems }: { homeBase: string; faqItems: { q: string; a: string }[] }) {
  return (
    <>
      <section className="pt-32 pb-16 px-6 bg-white">
        <div className="container-content mx-auto max-w-4xl">
          <nav className="flex items-center gap-2 text-sm text-google-secondary mb-6">
            <Link href={`${homeBase}/`} className="hover:text-brand-blue transition-colors">Home</Link>
            <span>/</span>
            <Link href={`${homeBase}/leistungen`} className="hover:text-brand-blue transition-colors">Leistungen</Link>
            <span>/</span>
            <span className="text-google-text">Digitale Prozesse</span>
          </nav>
          <p className="text-label-sm uppercase text-brand-blue tracking-widest mb-3">Leistung</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-google-text mb-6 leading-tight speakable">
            Digitale Prozesse fuer Ihr<br />
            <span className="text-brand-blue">lokales Unternehmen</span>
          </h1>
          <p className="text-body-lg text-google-secondary mb-8 max-w-2xl speakable">
            Online-Buchung, automatische Formulare, monatliche Auswertungen — konkrete Zeitersparnisse, kein technisches Vorwissen erforderlich.
          </p>
          <Link href={`${homeBase}/#audit`} className="inline-flex items-center gap-2 bg-brand-blue text-white font-semibold px-6 py-3 rounded-lg hover:bg-brand-blue/90 transition-colors">
            Kostenloses Erstgespraech <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <section className="py-12 px-6 bg-google-light border-y border-google-border">
        <div className="container-content mx-auto max-w-4xl">
          <h2 className="text-xl font-bold text-google-text mb-2">Wie ein typisches Projekt aussieht</h2>
          <p className="text-body-sm text-google-secondary mb-6">Vor dem Start: 60-Minuten-Interview zu Ihren Ablaeufen. Danach 3 Prioritaeten mit konkreter Zeitersparnis-Schaetzung.</p>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { step: "Schritt 1", title: "Analyse Ihrer Ablaeufe", text: "Wir sprechen eine Stunde. Ich frage 20-30 konkrete Fragen zu Ihren Aufgaben pro Woche." },
              { step: "Schritt 2", title: "Priorisierung", text: "Sie erhalten eine Liste von 3-5 Automatisierungen mit Zeitersparnis je Aufgabe und Einrichtungsaufwand." },
              { step: "Schritt 3", title: "Einrichtung & Uebergabe", text: "Ich richte alles ein. Sie bekommen eine kurze Videoanleitung. Garantie: Ich bin erreichbar, falls etwas nicht funktioniert." },
            ].map((step) => (
              <div key={step.step} className="bg-white rounded-card border border-google-border p-5">
                <div className="text-xs font-bold text-brand-blue mb-1">{step.step}</div>
                <h3 className="font-semibold text-google-text mb-2 text-sm">{step.title}</h3>
                <p className="text-xs text-google-secondary">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding px-6">
        <div className="container-content mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-google-text mb-8">Was typischerweise automatisiert wird</h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-12">
            {features.de.map((item, i) => (
              <div key={i} className="flex gap-4 p-5 border border-google-border rounded-card bg-white">
                <div className="shrink-0 w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">{item.icon}</div>
                <div>
                  <h3 className="font-semibold text-google-text mb-1">{item.title}</h3>
                  <p className="text-body-sm text-google-secondary">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
          <h2 className="text-2xl font-bold text-google-text mb-8 text-center">Haeufige Fragen</h2>
          <FaqVisibleSimple items={faqItems} />
          <div className="grid sm:grid-cols-2 gap-4 mt-12">
            <div className="p-5 bg-google-light rounded-card border border-google-border">
              <p className="text-xs text-google-secondary mb-1 uppercase tracking-wide">Verwandte Leistung</p>
              <Link href="/leistungen/google-business-profile" className="text-brand-blue font-medium hover:underline text-sm">Google Business Profile →</Link>
            </div>
            <div className="p-5 bg-google-light rounded-card border border-google-border">
              <p className="text-xs text-google-secondary mb-1 uppercase tracking-wide">Verwandte Leistung</p>
              <Link href="/leistungen/landing-pages" className="text-brand-blue font-medium hover:underline text-sm">Landing Pages →</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding px-6 bg-google-light border-t border-google-border">
        <div className="container-content mx-auto max-w-3xl text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-google-text mb-4">Weniger Verwaltung, mehr Zeit fuer Kunden</h2>
          <p className="text-body-lg text-google-secondary mb-8 max-w-xl mx-auto">Kostenloses Erstgespraech: Ich zeige Ihnen, wo in Ihrem Betrieb die groessten Zeitersparnisse moeglich sind.</p>
          <Link href={`${homeBase}/#audit`} className="inline-flex items-center gap-2 bg-brand-blue text-white font-semibold px-6 py-3 rounded-lg hover:bg-brand-blue/90 transition-colors">
            Jetzt Erstgespraech anfragen <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}

function EnContent({ homeBase, faqItems }: { homeBase: string; faqItems: { q: string; a: string }[] }) {
  return (
    <>
      <section className="pt-32 pb-16 px-6 bg-white">
        <div className="container-content mx-auto max-w-4xl">
          <nav className="flex items-center gap-2 text-sm text-google-secondary mb-6">
            <Link href={`${homeBase}/`} className="hover:text-brand-blue transition-colors">Home</Link>
            <span>/</span>
            <Link href={`${homeBase}/leistungen`} className="hover:text-brand-blue transition-colors">Services</Link>
            <span>/</span>
            <span className="text-google-text">Digital Processes</span>
          </nav>
          <p className="text-label-sm uppercase text-brand-blue tracking-widest mb-3">Service</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-google-text mb-6 leading-tight speakable">
            Digital processes for your<br />
            <span className="text-brand-blue">local business</span>
          </h1>
          <p className="text-body-lg text-google-secondary mb-8 max-w-2xl speakable">
            Online booking, automated forms, monthly reports — concrete time savings, no technical knowledge required.
          </p>
          <Link href={`${homeBase}/#audit`} className="inline-flex items-center gap-2 bg-brand-blue text-white font-semibold px-6 py-3 rounded-lg hover:bg-brand-blue/90 transition-colors">
            Request free consultation <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <section className="py-12 px-6 bg-google-light border-y border-google-border">
        <div className="container-content mx-auto max-w-4xl">
          <h2 className="text-xl font-bold text-google-text mb-2">What a typical project looks like</h2>
          <p className="text-body-sm text-google-secondary mb-6">Before we start: a 60-minute interview about your workflows. Then 3 priorities with concrete time-saving estimates.</p>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { step: "Step 1", title: "Workflow analysis", text: "We talk for one hour. I ask 20-30 concrete questions about your weekly tasks." },
              { step: "Step 2", title: "Prioritization", text: "You receive a list of 3-5 automations with time saved per task and setup effort." },
              { step: "Step 3", title: "Setup & handover", text: "I set everything up. You get a short video guide. Guarantee: I am available if something does not work." },
            ].map((step) => (
              <div key={step.step} className="bg-white rounded-card border border-google-border p-5">
                <div className="text-xs font-bold text-brand-blue mb-1">{step.step}</div>
                <h3 className="font-semibold text-google-text mb-2 text-sm">{step.title}</h3>
                <p className="text-xs text-google-secondary">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding px-6">
        <div className="container-content mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-google-text mb-8">What is typically automated</h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-12">
            {features.en.map((item, i) => (
              <div key={i} className="flex gap-4 p-5 border border-google-border rounded-card bg-white">
                <div className="shrink-0 w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">{item.icon}</div>
                <div>
                  <h3 className="font-semibold text-google-text mb-1">{item.title}</h3>
                  <p className="text-body-sm text-google-secondary">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
          <h2 className="text-2xl font-bold text-google-text mb-8 text-center">Frequently asked questions</h2>
          <FaqVisibleSimple items={faqItems} />
          <div className="grid sm:grid-cols-2 gap-4 mt-12">
            <div className="p-5 bg-google-light rounded-card border border-google-border">
              <p className="text-xs text-google-secondary mb-1 uppercase tracking-wide">Related service</p>
              <Link href="/en/leistungen/google-business-profile" className="text-brand-blue font-medium hover:underline text-sm">Google Business Profile →</Link>
            </div>
            <div className="p-5 bg-google-light rounded-card border border-google-border">
              <p className="text-xs text-google-secondary mb-1 uppercase tracking-wide">Related service</p>
              <Link href="/en/leistungen/landing-pages" className="text-brand-blue font-medium hover:underline text-sm">Landing Pages →</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding px-6 bg-google-light border-t border-google-border">
        <div className="container-content mx-auto max-w-3xl text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-google-text mb-4">Less admin, more time for customers</h2>
          <p className="text-body-lg text-google-secondary mb-8 max-w-xl mx-auto">Free consultation: I show you where the biggest time savings are possible in your business.</p>
          <Link href={`${homeBase}/#audit`} className="inline-flex items-center gap-2 bg-brand-blue text-white font-semibold px-6 py-3 rounded-lg hover:bg-brand-blue/90 transition-colors">
            Request free consultation <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}

function RuContent({ homeBase, faqItems }: { homeBase: string; faqItems: { q: string; a: string }[] }) {
  return (
    <>
      <section className="pt-32 pb-16 px-6 bg-white">
        <div className="container-content mx-auto max-w-4xl">
          <nav className="flex items-center gap-2 text-sm text-google-secondary mb-6">
            <Link href={`${homeBase}/`} className="hover:text-brand-blue transition-colors">Главная</Link>
            <span>/</span>
            <Link href={`${homeBase}/leistungen`} className="hover:text-brand-blue transition-colors">Услуги</Link>
            <span>/</span>
            <span className="text-google-text">Цифровые процессы</span>
          </nav>
          <p className="text-label-sm uppercase text-brand-blue tracking-widest mb-3">Услуга</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-google-text mb-6 leading-tight speakable">
            Цифровые процессы для вашего<br />
            <span className="text-brand-blue">локального бизнеса</span>
          </h1>
          <p className="text-body-lg text-google-secondary mb-8 max-w-2xl speakable">
            Онлайн-запись, автоматические формы, ежемесячные отчёты — конкретная экономия времени без технических знаний.
          </p>
          <Link href={`${homeBase}/#audit`} className="inline-flex items-center gap-2 bg-brand-blue text-white font-semibold px-6 py-3 rounded-lg hover:bg-brand-blue/90 transition-colors">
            Записаться на бесплатную консультацию <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <section className="py-12 px-6 bg-google-light border-y border-google-border">
        <div className="container-content mx-auto max-w-4xl">
          <h2 className="text-xl font-bold text-google-text mb-2">Как выглядит типичный проект</h2>
          <p className="text-body-sm text-google-secondary mb-6">Перед стартом: 60-минутное интервью о ваших процессах. Затем — 3 приоритета с конкретной оценкой экономии времени.</p>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { step: "Шаг 1", title: "Анализ процессов", text: "Мы говорим один час. Я задаю 20–30 конкретных вопросов о ваших еженедельных задачах." },
              { step: "Шаг 2", title: "Приоритизация", text: "Вы получаете список из 3–5 автоматизаций: сколько времени экономит каждая и сколько времени займёт настройка." },
              { step: "Шаг 3", title: "Настройка и передача", text: "Я настраиваю всё сам. Вы получаете короткую видеоинструкцию. Гарантия: я на связи, если что-то не работает." },
            ].map((step) => (
              <div key={step.step} className="bg-white rounded-card border border-google-border p-5">
                <div className="text-xs font-bold text-brand-blue mb-1">{step.step}</div>
                <h3 className="font-semibold text-google-text mb-2 text-sm">{step.title}</h3>
                <p className="text-xs text-google-secondary">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding px-6">
        <div className="container-content mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-google-text mb-8">Что обычно автоматизируется</h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-12">
            {features.ru.map((item, i) => (
              <div key={i} className="flex gap-4 p-5 border border-google-border rounded-card bg-white">
                <div className="shrink-0 w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">{item.icon}</div>
                <div>
                  <h3 className="font-semibold text-google-text mb-1">{item.title}</h3>
                  <p className="text-body-sm text-google-secondary">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
          <h2 className="text-2xl font-bold text-google-text mb-8 text-center">Частые вопросы</h2>
          <FaqVisibleSimple items={faqItems} />
          <div className="grid sm:grid-cols-2 gap-4 mt-12">
            <div className="p-5 bg-google-light rounded-card border border-google-border">
              <p className="text-xs text-google-secondary mb-1 uppercase tracking-wide">Связанная услуга</p>
              <Link href="/ru/leistungen/google-business-profile" className="text-brand-blue font-medium hover:underline text-sm">Google Business Profile →</Link>
            </div>
            <div className="p-5 bg-google-light rounded-card border border-google-border">
              <p className="text-xs text-google-secondary mb-1 uppercase tracking-wide">Связанная услуга</p>
              <Link href="/ru/leistungen/landing-pages" className="text-brand-blue font-medium hover:underline text-sm">Лендинги →</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding px-6 bg-google-light border-t border-google-border">
        <div className="container-content mx-auto max-w-3xl text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-google-text mb-4">Меньше рутины, больше времени для клиентов</h2>
          <p className="text-body-lg text-google-secondary mb-8 max-w-xl mx-auto">Бесплатная консультация: покажу, где в вашем бизнесе скрыта наибольшая экономия времени.</p>
          <Link href={`${homeBase}/#audit`} className="inline-flex items-center gap-2 bg-brand-blue text-white font-semibold px-6 py-3 rounded-lg hover:bg-brand-blue/90 transition-colors">
            Записаться на консультацию <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}

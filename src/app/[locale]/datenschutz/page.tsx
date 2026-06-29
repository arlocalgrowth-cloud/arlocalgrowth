import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const titles: Record<string, string> = {
    de: "Datenschutzerklärung | A.R. Local Growth",
    en: "Privacy Policy | A.R. Local Growth",
    ru: "Политика конфиденциальности | A.R. Local Growth",
  };
  return { title: titles[locale] ?? titles.de, robots: { index: false, follow: false } };
}

export default async function DatenschutzPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-20">
        <div className="max-w-2xl mx-auto px-6">
          {locale === "ru" ? <RuContent /> : locale === "en" ? <EnContent /> : <DeContent />}
        </div>
      </main>
      <Footer />
    </>
  );
}

const CONTROLLER = {
  name: "Roman Andreiev",
  company: "A.R. Local Growth & Automation",
  address: "Heckerdamm 283I, 13627 Berlin",
  email: "a.r.localgrowth@gmail.com",
  phone: "+49 176 23481952",
};

function DeContent() {
  return (
    <article className="prose prose-sm max-w-none space-y-8">
      <h1 className="text-2xl font-bold text-google-text">Datenschutzerklärung</h1>
      <p className="text-xs text-google-secondary">Stand: Juni 2026</p>

      <section>
        <h2 className="text-base font-semibold text-google-text mb-3">1. Verantwortlicher</h2>
        <p className="text-google-secondary text-sm leading-relaxed">
          {CONTROLLER.name}<br />
          {CONTROLLER.company}<br />
          {CONTROLLER.address}<br />
          E-Mail: <a href={`mailto:${CONTROLLER.email}`} className="text-brand-blue hover:underline">{CONTROLLER.email}</a><br />
          Telefon: <a href={`tel:${CONTROLLER.phone.replace(/\s/g, "")}`} className="text-brand-blue hover:underline">{CONTROLLER.phone}</a>
        </p>
      </section>

      <section>
        <h2 className="text-base font-semibold text-google-text mb-3">2. Erhebung und Verarbeitung personenbezogener Daten</h2>
        <h3 className="text-sm font-semibold text-google-text mb-2">a) Kontakt- und Auditformular</h3>
        <p className="text-google-secondary text-sm leading-relaxed mb-3">
          Wenn Sie unser Kontakt- oder Auditformular nutzen, erheben wir folgende Daten:
        </p>
        <ul className="text-google-secondary text-sm space-y-1 list-disc pl-5 mb-3">
          <li>Name und ggf. Firmenname</li>
          <li>E-Mail-Adresse</li>
          <li>Telefonnummer (optional)</li>
          <li>Stadt / Website (beim Audit-Formular)</li>
          <li>Ihre Nachricht</li>
        </ul>
        <p className="text-google-secondary text-sm leading-relaxed">
          Diese Daten werden ausschließlich zur Bearbeitung Ihrer Anfrage verwendet und nicht an Dritte weitergegeben, außer an den E-Mail-Versanddienstleister (Resend Inc.) zum Zweck der Zustellung.
        </p>

        <h3 className="text-sm font-semibold text-google-text mb-2 mt-4">b) Server-Logfiles</h3>
        <p className="text-google-secondary text-sm leading-relaxed">
          Beim Besuch dieser Website erfasst der Hosting-Anbieter (Vercel Inc.) automatisch technische Informationen wie IP-Adresse, Browsertyp, Betriebssystem und Zugriffszeit. Diese Daten dienen ausschließlich der technischen Bereitstellung und Sicherheit der Website.
        </p>
      </section>

      <section>
        <h2 className="text-base font-semibold text-google-text mb-3">3. Rechtsgrundlage</h2>
        <p className="text-google-secondary text-sm leading-relaxed">
          Die Verarbeitung Ihrer Daten erfolgt auf Grundlage von:
        </p>
        <ul className="text-google-secondary text-sm space-y-1 list-disc pl-5">
          <li>Art. 6 Abs. 1 lit. b) DSGVO — zur Anbahnung oder Erfüllung eines Vertragsverhältnisses</li>
          <li>Art. 6 Abs. 1 lit. f) DSGVO — aufgrund berechtigter Interessen (Beantwortung von Anfragen)</li>
        </ul>
      </section>

      <section>
        <h2 className="text-base font-semibold text-google-text mb-3">4. Weitergabe an Dritte</h2>
        <p className="text-google-secondary text-sm leading-relaxed">
          Ihre Daten werden ausschließlich an folgende Dienstleister weitergegeben:
        </p>
        <ul className="text-google-secondary text-sm space-y-2 list-disc pl-5 mt-2">
          <li>
            <strong className="text-google-text">Resend Inc.</strong> (E-Mail-Versand) — 548 Market St PMB 72287, San Francisco, CA 94104, USA.
            Datenverarbeitung gemäß Standard-Vertragsklauseln der EU.
          </li>
          <li>
            <strong className="text-google-text">Vercel Inc.</strong> (Hosting) — 340 S Lemon Ave #4133, Walnut, CA 91789, USA.
            Datenverarbeitung gemäß EU-US Data Privacy Framework.
          </li>
          <li>
            <strong className="text-google-text">Cloudflare Inc.</strong> (Bot-Schutz via Turnstile) — 101 Townsend St, San Francisco, CA 94107, USA.
            Datenverarbeitung gemäß EU-US Data Privacy Framework. Nur bei Nutzung der Kontaktformulare aktiv.
          </li>
          <li>
            <strong className="text-google-text">Google LLC</strong> (Google Analytics) — 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA.
            Nur bei ausdrücklicher Einwilligung. IP-Anonymisierung ist aktiviert. Datenverarbeitung gemäß EU-US Data Privacy Framework.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-base font-semibold text-google-text mb-3">5. Speicherdauer</h2>
        <p className="text-google-secondary text-sm leading-relaxed">
          Kontaktanfragen werden gelöscht, sobald sie nicht mehr für die Bearbeitung erforderlich sind und keine gesetzlichen Aufbewahrungsfristen entgegenstehen (in der Regel nach 6 Jahren gemäß § 147 AO).
        </p>
      </section>

      <section>
        <h2 className="text-base font-semibold text-google-text mb-3">6. Cookies und Tracking</h2>
        <p className="text-google-secondary text-sm leading-relaxed mb-3">
          Diese Website verwendet folgende Cookies und ähnliche Technologien:
        </p>
        <ul className="text-google-secondary text-sm space-y-3 list-disc pl-5">
          <li>
            <strong className="text-google-text">Cloudflare Turnstile</strong> (technisch notwendig) — schützt Kontaktformulare vor automatisierten Anfragen (Spam-Schutz). Keine Einwilligung nach § 25 Abs. 2 TTDSG erforderlich, da ausschließlich zur Bereitstellung des Dienstes notwendig.
          </li>
          <li>
            <strong className="text-google-text">Google Analytics 4</strong> (nur mit Einwilligung) — erfasst anonymisierte Nutzungsstatistiken (aufgerufene Seiten, Verweildauer, Herkunft). Die IP-Adresse wird vor der Verarbeitung anonymisiert. Google Analytics wird erst nach Ihrer ausdrücklichen Zustimmung über den Cookie-Banner geladen. Rechtsgrundlage: Art. 6 Abs. 1 lit. a) DSGVO. Tracking-ID: G-JTS9F28JER. Sie können Ihre Einwilligung jederzeit widerrufen, indem Sie den Speicher Ihres Browsers leeren oder auf dieser Seite keine Analyse-Cookies akzeptieren.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-base font-semibold text-google-text mb-3">7. Ihre Rechte</h2>
        <p className="text-google-secondary text-sm leading-relaxed mb-2">
          Sie haben gemäß DSGVO folgende Rechte:
        </p>
        <ul className="text-google-secondary text-sm space-y-1 list-disc pl-5">
          <li><strong className="text-google-text">Auskunft</strong> (Art. 15 DSGVO) — Welche Daten wir über Sie speichern</li>
          <li><strong className="text-google-text">Berichtigung</strong> (Art. 16 DSGVO) — Korrektur unrichtiger Daten</li>
          <li><strong className="text-google-text">Löschung</strong> (Art. 17 DSGVO) — Löschung Ihrer Daten</li>
          <li><strong className="text-google-text">Einschränkung</strong> (Art. 18 DSGVO) — Eingeschränkte Verarbeitung</li>
          <li><strong className="text-google-text">Widerspruch</strong> (Art. 21 DSGVO) — Widerspruch gegen die Verarbeitung</li>
          <li><strong className="text-google-text">Datenübertragbarkeit</strong> (Art. 20 DSGVO)</li>
        </ul>
        <p className="text-google-secondary text-sm leading-relaxed mt-3">
          Zur Ausübung Ihrer Rechte wenden Sie sich an: <a href="mailto:a.r.localgrowth@gmail.com" className="text-brand-blue hover:underline">a.r.localgrowth@gmail.com</a>
        </p>
      </section>

      <section>
        <h2 className="text-base font-semibold text-google-text mb-3">8. Beschwerderecht</h2>
        <p className="text-google-secondary text-sm leading-relaxed">
          Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren. Die zuständige Aufsichtsbehörde für Berlin ist:
        </p>
        <p className="text-google-secondary text-sm leading-relaxed mt-2">
          Berliner Beauftragte für Datenschutz und Informationsfreiheit<br />
          Friedrichstr. 219, 10969 Berlin<br />
          <a href="https://www.datenschutz-berlin.de" target="_blank" rel="noopener noreferrer" className="text-brand-blue hover:underline">www.datenschutz-berlin.de</a>
        </p>
      </section>
    </article>
  );
}

function EnContent() {
  return (
    <article className="prose prose-sm max-w-none space-y-8">
      <h1 className="text-2xl font-bold text-google-text">Privacy Policy</h1>
      <p className="text-xs text-google-secondary">Last updated: June 2026</p>

      <section>
        <h2 className="text-base font-semibold text-google-text mb-3">1. Data Controller</h2>
        <p className="text-google-secondary text-sm leading-relaxed">
          {CONTROLLER.name}<br />
          {CONTROLLER.company}<br />
          {CONTROLLER.address}<br />
          Email: <a href={`mailto:${CONTROLLER.email}`} className="text-brand-blue hover:underline">{CONTROLLER.email}</a>
        </p>
      </section>

      <section>
        <h2 className="text-base font-semibold text-google-text mb-3">2. Data We Collect</h2>
        <p className="text-google-secondary text-sm leading-relaxed mb-3">
          When you use our contact or audit request form, we collect:
        </p>
        <ul className="text-google-secondary text-sm space-y-1 list-disc pl-5">
          <li>Name and company name</li>
          <li>Email address</li>
          <li>Phone number (optional)</li>
          <li>City / Website (audit form)</li>
          <li>Your message</li>
        </ul>
        <p className="text-google-secondary text-sm leading-relaxed mt-3">
          This data is used solely to respond to your inquiry. We do not sell or share your data with third parties except for our email delivery provider (Resend Inc.).
        </p>
      </section>

      <section>
        <h2 className="text-base font-semibold text-google-text mb-3">3. Legal Basis</h2>
        <p className="text-google-secondary text-sm leading-relaxed">
          Processing is based on Art. 6(1)(b) GDPR (contract initiation) and Art. 6(1)(f) GDPR (legitimate interests — responding to inquiries).
        </p>
      </section>

      <section>
        <h2 className="text-base font-semibold text-google-text mb-3">4. Service Providers</h2>
        <ul className="text-google-secondary text-sm space-y-2 list-disc pl-5">
          <li><strong className="text-google-text">Resend Inc.</strong> — email delivery (USA, EU Standard Contractual Clauses)</li>
          <li><strong className="text-google-text">Vercel Inc.</strong> — website hosting (USA, EU-US Data Privacy Framework)</li>
          <li><strong className="text-google-text">Cloudflare Inc.</strong> — bot protection via Turnstile (USA, EU-US Data Privacy Framework). Active only when contact forms are used.</li>
          <li><strong className="text-google-text">Google LLC</strong> — Google Analytics (USA, EU-US Data Privacy Framework). Only loaded with your explicit consent. IP anonymisation is active. Tracking ID: G-JTS9F28JER.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-base font-semibold text-google-text mb-3">5. Cookies &amp; Tracking</h2>
        <ul className="text-google-secondary text-sm space-y-3 list-disc pl-5">
          <li>
            <strong className="text-google-text">Cloudflare Turnstile</strong> (technically necessary) — protects contact forms against automated requests. No consent required as it is strictly necessary for service delivery.
          </li>
          <li>
            <strong className="text-google-text">Google Analytics 4</strong> (consent required) — collects anonymised usage statistics (pages visited, session duration, traffic source). IP anonymisation is active. Only loaded after your explicit consent via the cookie banner. Legal basis: Art. 6(1)(a) GDPR. You can withdraw consent at any time by clearing your browser storage.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-base font-semibold text-google-text mb-3">6. Your Rights</h2>
        <p className="text-google-secondary text-sm leading-relaxed">
          Under GDPR you have the right to access, rectify, erase, restrict, or port your data, and to object to processing. Contact us at <a href="mailto:a.r.localgrowth@gmail.com" className="text-brand-blue hover:underline">a.r.localgrowth@gmail.com</a> to exercise your rights.
        </p>
      </section>
    </article>
  );
}

function RuContent() {
  return (
    <article className="prose prose-sm max-w-none space-y-8">
      <h1 className="text-2xl font-bold text-google-text">Политика конфиденциальности</h1>
      <p className="text-xs text-google-secondary">Дата: июнь 2026</p>

      <section>
        <h2 className="text-base font-semibold text-google-text mb-3">1. Ответственный за обработку данных</h2>
        <p className="text-google-secondary text-sm leading-relaxed">
          {CONTROLLER.name}<br />
          {CONTROLLER.company}<br />
          {CONTROLLER.address}<br />
          E-Mail: <a href={`mailto:${CONTROLLER.email}`} className="text-brand-blue hover:underline">{CONTROLLER.email}</a>
        </p>
      </section>

      <section>
        <h2 className="text-base font-semibold text-google-text mb-3">2. Какие данные мы собираем</h2>
        <p className="text-google-secondary text-sm leading-relaxed mb-3">
          При использовании контактной формы или формы аудита мы получаем:
        </p>
        <ul className="text-google-secondary text-sm space-y-1 list-disc pl-5">
          <li>Имя и название компании</li>
          <li>Адрес электронной почты</li>
          <li>Номер телефона (необязательно)</li>
          <li>Город / сайт (для аудита)</li>
          <li>Ваше сообщение</li>
        </ul>
        <p className="text-google-secondary text-sm leading-relaxed mt-3">
          Данные используются исключительно для ответа на ваш запрос и не передаются третьим лицам, кроме провайдера электронной почты (Resend Inc.).
        </p>
      </section>

      <section>
        <h2 className="text-base font-semibold text-google-text mb-3">3. Правовая основа</h2>
        <p className="text-google-secondary text-sm leading-relaxed">
          Обработка данных осуществляется на основании ст. 6 (1)(b) DSGVO (подготовка договора) и ст. 6 (1)(f) DSGVO (законные интересы — ответ на запросы).
        </p>
      </section>

      <section>
        <h2 className="text-base font-semibold text-google-text mb-3">4. Cookie и отслеживание</h2>
        <ul className="text-google-secondary text-sm space-y-3 list-disc pl-5">
          <li>
            <strong className="text-google-text">Cloudflare Turnstile</strong> (технически необходимый) — защищает контактные формы от автоматических запросов. Согласие не требуется, так как используется исключительно для обеспечения работы сервиса.
          </li>
          <li>
            <strong className="text-google-text">Google Analytics 4</strong> (только с согласия) — собирает анонимную статистику использования (посещённые страницы, продолжительность сессий, источники трафика). IP-адрес анонимизируется до передачи данных. Загружается только после вашего явного согласия через баннер cookie. Правовая основа: ст. 6 (1)(a) DSGVO. Tracking-ID: G-JTS9F28JER. Вы можете отозвать согласие в любой момент, очистив хранилище браузера.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-base font-semibold text-google-text mb-3">5. Поставщики услуг</h2>
        <ul className="text-google-secondary text-sm space-y-2 list-disc pl-5">
          <li><strong className="text-google-text">Resend Inc.</strong> — отправка электронной почты (США, стандартные договорные положения ЕС)</li>
          <li><strong className="text-google-text">Vercel Inc.</strong> — хостинг сайта (США, EU-US Data Privacy Framework)</li>
          <li><strong className="text-google-text">Cloudflare Inc.</strong> — защита от ботов (США, EU-US Data Privacy Framework)</li>
          <li><strong className="text-google-text">Google LLC</strong> — Google Analytics (США, EU-US Data Privacy Framework). Только с вашего согласия.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-base font-semibold text-google-text mb-3">5. Ваши права</h2>
        <p className="text-google-secondary text-sm leading-relaxed">
          В соответствии с DSGVO вы имеете право на доступ, исправление, удаление данных и возражение против их обработки. Обратитесь по адресу <a href="mailto:a.r.localgrowth@gmail.com" className="text-brand-blue hover:underline">a.r.localgrowth@gmail.com</a>.
        </p>
      </section>
    </article>
  );
}

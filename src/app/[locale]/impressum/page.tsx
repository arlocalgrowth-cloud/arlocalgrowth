import { getTranslations } from "next-intl/server";
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
    de: "Impressum | A.R. Local Growth",
    en: "Legal Notice | A.R. Local Growth",
    ru: "Импрессум | A.R. Local Growth",
  };
  return { title: titles[locale] ?? titles.de, robots: { index: false, follow: false } };
}

export default async function ImpressumPage({
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
          {locale === "ru" ? (
            <RuContent />
          ) : locale === "en" ? (
            <EnContent />
          ) : (
            <DeContent />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

function DeContent() {
  return (
    <article className="prose prose-sm max-w-none">
      <h1 className="text-2xl font-bold text-google-text mb-8">Impressum</h1>

      <section className="mb-8">
        <h2 className="text-base font-semibold text-google-text mb-3">Angaben gemäß § 5 TMG</h2>
        <p className="text-google-secondary text-sm leading-relaxed">
          <strong className="text-google-text">Roman Andreiev</strong><br />
          A.R. Local Growth &amp; Automation<br />
          Heckerdamm 283I<br />
          13627 Berlin<br />
          Deutschland
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-base font-semibold text-google-text mb-3">Kontakt</h2>
        <p className="text-google-secondary text-sm leading-relaxed">
          Telefon: <a href="tel:+4917623481952" className="text-brand-blue hover:underline">+49 176 23481952</a><br />
          E-Mail: <a href="mailto:a.r.localgrowth@gmail.com" className="text-brand-blue hover:underline">a.r.localgrowth@gmail.com</a>
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-base font-semibold text-google-text mb-3">Umsatzsteuer</h2>
        <p className="text-google-secondary text-sm leading-relaxed">
          Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:<br />
          <strong className="text-google-text">DE462900813</strong>
        </p>
        <p className="text-google-secondary text-sm leading-relaxed mt-2">
          Steuernummer: <strong className="text-google-text">13/208/02173</strong><br />
          Zuständiges Finanzamt: Finanzamt Charlottenburg, Bismarckstraße 48, 10627 Berlin
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-base font-semibold text-google-text mb-3">Berufsbezeichnung</h2>
        <p className="text-google-secondary text-sm leading-relaxed">
          Online-Marketing-Berater (Deutschland)<br />
          Gewerbeanmeldung: Berlin Charlottenburg-Wilmersdorf
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-base font-semibold text-google-text mb-3">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
        <p className="text-google-secondary text-sm leading-relaxed">
          Roman Andreiev<br />
          Heckerdamm 283I<br />
          13627 Berlin
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-base font-semibold text-google-text mb-3">Haftungsausschluss</h2>
        <h3 className="text-sm font-semibold text-google-text mb-2">Haftung für Inhalte</h3>
        <p className="text-google-secondary text-sm leading-relaxed mb-4">
          Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.
        </p>
        <h3 className="text-sm font-semibold text-google-text mb-2">Haftung für Links</h3>
        <p className="text-google-secondary text-sm leading-relaxed">
          Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-base font-semibold text-google-text mb-3">Urheberrecht</h2>
        <p className="text-google-secondary text-sm leading-relaxed">
          Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
        </p>
      </section>
    </article>
  );
}

function EnContent() {
  return (
    <article className="prose prose-sm max-w-none">
      <h1 className="text-2xl font-bold text-google-text mb-2">Legal Notice</h1>
      <p className="text-xs text-google-secondary mb-8">
        As required by German law (§ 5 TMG), this legal notice is provided in German. An English summary is included below.
      </p>

      <div className="bg-google-light rounded-xl border border-google-border p-5 mb-8">
        <h2 className="text-base font-semibold text-google-text mb-3">Contact Information</h2>
        <p className="text-google-secondary text-sm leading-relaxed">
          <strong className="text-google-text">Roman Andreiev</strong><br />
          A.R. Local Growth &amp; Automation<br />
          Heckerdamm 283I, 13627 Berlin, Germany<br />
          Phone: <a href="tel:+4917623481952" className="text-brand-blue hover:underline">+49 176 23481952</a><br />
          Email: <a href="mailto:a.r.localgrowth@gmail.com" className="text-brand-blue hover:underline">a.r.localgrowth@gmail.com</a><br />
          VAT ID: DE462900813
        </p>
      </div>

      <DeContent />
    </article>
  );
}

function RuContent() {
  return (
    <article className="prose prose-sm max-w-none">
      <h1 className="text-2xl font-bold text-google-text mb-2">Импрессум</h1>
      <p className="text-xs text-google-secondary mb-8">
        По требованию немецкого законодательства (§ 5 TMG) обязательные сведения об издателе приведены ниже.
      </p>

      <div className="bg-google-light rounded-xl border border-google-border p-5 mb-8">
        <h2 className="text-base font-semibold text-google-text mb-3">Контактные данные</h2>
        <p className="text-google-secondary text-sm leading-relaxed">
          <strong className="text-google-text">Roman Andreiev</strong><br />
          A.R. Local Growth &amp; Automation<br />
          Heckerdamm 283I, 13627 Berlin, Германия<br />
          Телефон: <a href="tel:+4917623481952" className="text-brand-blue hover:underline">+49 176 23481952</a><br />
          E-Mail: <a href="mailto:a.r.localgrowth@gmail.com" className="text-brand-blue hover:underline">a.r.localgrowth@gmail.com</a><br />
          USt-IdNr.: DE462900813
        </p>
      </div>

      <DeContent />
    </article>
  );
}

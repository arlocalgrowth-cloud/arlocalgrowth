"use client";

import { useTranslations, useLocale } from "next-intl";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, Mail } from "lucide-react";

const EMAIL = "a.r.localgrowth@gmail.com";

function localeHome(code: string) {
  return code === "de" ? "/" : `/${code}`;
}

function switchLocale(pathname: string, currentLocale: string, targetLocale: string) {
  let stripped = pathname;
  if (currentLocale !== "de" && pathname.startsWith(`/${currentLocale}`)) {
    stripped = pathname.slice(`/${currentLocale}`.length) || "/";
  }
  if (targetLocale === "de") return stripped;
  return `/${targetLocale}${stripped === "/" ? "" : stripped}`;
}

export function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();
  const pathname = usePathname();

  const homeBase = locale === "de" ? "" : `/${locale}`;

  const services = [
    { label: "Google Business Profile", href: `${homeBase}/leistungen/google-business-profile` },
    { label: "Local SEO", href: `${homeBase}/leistungen/local-seo` },
    { label: "Google Ads", href: `${homeBase}/#leistungen` },
    { label: "Bewertungsmanagement", href: `${homeBase}/leistungen/bewertungsmanagement` },
    { label: "Landing Pages", href: `${homeBase}/#leistungen` },
    { label: "Digitale Prozesse", href: `${homeBase}/#leistungen` },
    { label: "Marken-Neustart", href: `${homeBase}/#leistungen` },
  ];

  // Impressum/Datenschutz links — locale-prefixed
  const legalHref = (slug: string) =>
    locale === "de" ? `/${slug}` : `/${locale}/${slug}`;

  return (
    <footer className="bg-google-light border-t border-google-border">
      <div className="container-content mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-1">
              <span className="text-brand-blue font-bold text-xl">A.R.</span>
              <span className="text-google-text font-semibold text-xl">Local Growth</span>
            </div>
            <p className="text-sm text-google-secondary leading-relaxed max-w-xs">
              {t("tagline")}
            </p>
            <div className="flex items-center gap-2 text-sm text-google-secondary">
              <MapPin size={14} className="text-brand-blue shrink-0" />
              <span>Berlin, Deutschland</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-google-secondary">
              <Mail size={14} className="text-brand-blue shrink-0" />
              <a href={`mailto:${EMAIL}`} className="hover:text-brand-blue transition-colors">
                {EMAIL}
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-google-text uppercase tracking-wider">
              {t("services")}
            </h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.label}>
                  <NextLink
                    href={service.href}
                    className="text-sm text-google-secondary hover:text-brand-blue transition-colors"
                  >
                    {service.label}
                  </NextLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal + Language */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-google-text uppercase tracking-wider">
              {t("legal")}
            </h3>
            <ul className="space-y-2">
              <li>
                <NextLink
                  href={legalHref("impressum")}
                  className="text-sm text-google-secondary hover:text-brand-blue transition-colors"
                >
                  {t("impressum")}
                </NextLink>
              </li>
              <li>
                <NextLink
                  href={legalHref("datenschutz")}
                  className="text-sm text-google-secondary hover:text-brand-blue transition-colors"
                >
                  {t("datenschutz")}
                </NextLink>
              </li>
            </ul>

            <div className="pt-4">
              <h3 className="text-sm font-semibold text-google-text uppercase tracking-wider mb-3">
                Sprache / Language
              </h3>
              <div className="flex gap-3">
                {[
                  { code: "de", label: "Deutsch" },
                  { code: "en", label: "English" },
                  { code: "ru", label: "Русский" },
                ].map(({ code, label }) => (
                  <button
                    key={code}
                    onClick={() => {
                      window.location.href = switchLocale(pathname, locale, code);
                    }}
                    className={`text-sm transition-colors cursor-pointer ${
                      locale === code
                        ? "text-brand-blue font-medium"
                        : "text-google-secondary hover:text-brand-blue"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-google-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-google-secondary">{t("copyright")}</p>
          <p className="text-xs text-google-secondary">{t("madeBy")}</p>
        </div>
      </div>
    </footer>
  );
}

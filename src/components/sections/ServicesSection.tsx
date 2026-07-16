"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import {
  MapPin,
  BarChart2,
  Megaphone,
  Star,
  FileText,
  Zap,
  Sparkles,
  Globe,
  ArrowRight,
} from "lucide-react";

const serviceIcons = [MapPin, BarChart2, Megaphone, Star, FileText, Zap, Sparkles, Globe];

// Services with dedicated pages — index → locale-relative path
const SERVICE_LINKS: Record<number, string> = {
  0: "/leistungen/google-business-profile",
  1: "/leistungen/local-seo",
  3: "/leistungen/bewertungsmanagement",
};

const CTA_LABELS: Record<string, string> = {
  de: "Mehr erfahren",
  en: "Learn more",
  ru: "Подробнее",
};

export function ServicesSection() {
  const t = useTranslations("services");
  const locale = useLocale();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const homeBase = locale === "de" ? "" : `/${locale}`;
  const ctaLabel = CTA_LABELS[locale] ?? CTA_LABELS.de;

  const serviceKeys = [
    { titleKey: "service1Title", textKey: "service1Text" },
    { titleKey: "service2Title", textKey: "service2Text" },
    { titleKey: "service3Title", textKey: "service3Text" },
    { titleKey: "service4Title", textKey: "service4Text" },
    { titleKey: "service5Title", textKey: "service5Text" },
    { titleKey: "service6Title", textKey: "service6Text" },
    { titleKey: "service7Title", textKey: "service7Text" },
    { titleKey: "service8Title", textKey: "service8Text" },
  ] as const;

  return (
    <section id="leistungen" className="section-padding" ref={ref}>
      <div className="container-content mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-12 lg:mb-14"
        >
          <p className="text-label-sm uppercase text-google-secondary tracking-widest mb-3">
            {t("eyebrow")}
          </p>
          <h2 className="text-2xl sm:text-display-sm font-bold text-google-text">{t("headline")}</h2>
          <p className="mt-4 text-body-lg text-google-secondary max-w-2xl mx-auto">
            {t("subheadline")}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {serviceKeys.map(({ titleKey, textKey }, i) => {
            const Icon = serviceIcons[i];
            const isNew = i === 6;
            const pageSlug = SERVICE_LINKS[i];
            const href = pageSlug ? `${homeBase}${pageSlug}` : undefined;

            const cardContent = (
              <>
                {isNew && (
                  <span className="absolute top-4 right-4 text-xs font-medium text-brand-blue bg-blue-50 border border-blue-100 rounded-full px-2 py-0.5">
                    Neu
                  </span>
                )}
                <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center mb-4 group-hover:bg-brand-blue/15 transition-colors">
                  <Icon size={20} className="text-brand-blue" />
                </div>
                <h3 className="text-heading-md font-semibold text-google-text mb-2">
                  {t(titleKey)}
                </h3>
                <p className="text-body-sm text-google-secondary leading-relaxed">
                  {t(textKey)}
                </p>
                {href && (
                  <span className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-brand-blue group-hover:gap-2 transition-all duration-200">
                    {ctaLabel}
                    <ArrowRight size={14} />
                  </span>
                )}
              </>
            );

            const baseClass =
              "group bg-white rounded-card border border-google-border p-6 shadow-card hover:shadow-card-blue hover:border-brand-blue/30 hover:-translate-y-0.5 transition-all duration-200 relative";

            return (
              <motion.div
                key={titleKey}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.07 }}
              >
                {href ? (
                  <Link
                    href={href}
                    className={`${baseClass} block cursor-pointer`}
                  >
                    {cardContent}
                  </Link>
                ) : (
                  <div className={baseClass}>
                    {cardContent}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

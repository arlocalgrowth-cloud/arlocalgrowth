"use client";

import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  MapPin,
  BarChart2,
  Megaphone,
  Star,
  FileText,
  Zap,
  Sparkles,
} from "lucide-react";

const serviceIcons = [MapPin, BarChart2, Megaphone, Star, FileText, Zap, Sparkles];

export function ServicesSection() {
  const t = useTranslations("services");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const serviceKeys = [
    { titleKey: "service1Title", textKey: "service1Text" },
    { titleKey: "service2Title", textKey: "service2Text" },
    { titleKey: "service3Title", textKey: "service3Text" },
    { titleKey: "service4Title", textKey: "service4Text" },
    { titleKey: "service5Title", textKey: "service5Text" },
    { titleKey: "service6Title", textKey: "service6Text" },
    { titleKey: "service7Title", textKey: "service7Text" },
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
            return (
              <motion.div
                key={titleKey}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="group bg-white rounded-card border border-google-border p-6 shadow-card hover:shadow-card-blue hover:border-brand-blue/30 hover:-translate-y-0.5 transition-all duration-200 relative"
              >
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
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

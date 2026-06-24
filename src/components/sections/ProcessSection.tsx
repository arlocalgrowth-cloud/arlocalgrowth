"use client";

import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Search, Lightbulb, Rocket, TrendingUp } from "lucide-react";

const stepIcons = [Search, Lightbulb, Rocket, TrendingUp];
const stepColors = ["text-brand-blue", "text-brand-yellow", "text-brand-green", "text-brand-blue"];
const stepBg = ["bg-blue-50", "bg-yellow-50", "bg-green-50", "bg-blue-50"];

export function ProcessSection() {
  const t = useTranslations("process");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const steps = [
    { titleKey: "step1Title", textKey: "step1Text" },
    { titleKey: "step2Title", textKey: "step2Text" },
    { titleKey: "step3Title", textKey: "step3Text" },
    { titleKey: "step4Title", textKey: "step4Text" },
  ] as const;

  return (
    <section id="ablauf" className="section-padding bg-google-light" ref={ref}>
      <div className="container-content mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-label-sm uppercase text-google-secondary tracking-widest mb-3">
            {t("eyebrow")}
          </p>
          <h2 className="text-display-sm font-bold text-google-text">{t("headline")}</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-google-border z-0" />

          {steps.map(({ titleKey, textKey }, i) => {
            const Icon = stepIcons[i];
            return (
              <motion.div
                key={titleKey}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.12 }}
                className="relative z-10 bg-white rounded-card border border-google-border p-6 shadow-card text-center"
              >
                <div className={`w-12 h-12 rounded-2xl ${stepBg[i]} flex items-center justify-center mx-auto mb-4`}>
                  <Icon size={22} className={stepColors[i]} />
                </div>
                <div className="text-xs font-semibold text-google-secondary/60 mb-2 uppercase tracking-widest">
                  {t("stepLabel")} {i + 1}
                </div>
                <h3 className="text-heading-md font-semibold text-google-text mb-2">
                  {t(titleKey)}
                </h3>
                <p className="text-body-sm text-google-secondary leading-relaxed">{t(textKey)}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Search, Star, Target } from "lucide-react";

const icons = [Search, Star, Target];
const colors = ["text-brand-red", "text-brand-yellow", "text-google-secondary"];
const bgColors = ["bg-red-50", "bg-yellow-50", "bg-google-light"];

export function ProblemSection() {
  const t = useTranslations("problem");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const cards = [
    { titleKey: "card1Title", textKey: "card1Text" },
    { titleKey: "card2Title", textKey: "card2Text" },
    { titleKey: "card3Title", textKey: "card3Text" },
  ] as const;

  return (
    <section id="problem" className="section-padding bg-google-light" ref={ref}>
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
          <h2 className="text-display-sm font-bold text-google-text text-balance mx-auto max-w-2xl">
            {t("headline")}
          </h2>
          <p className="mt-4 text-body-lg text-google-secondary max-w-2xl mx-auto">
            {t("subheadline")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {cards.map(({ titleKey, textKey }, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={titleKey}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-card border border-google-border p-6 shadow-card hover:shadow-card-md hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className={`w-10 h-10 rounded-xl ${bgColors[i]} flex items-center justify-center mb-4`}>
                  <Icon size={20} className={colors[i]} />
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

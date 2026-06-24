"use client";

import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Scissors, Hand, Activity, Stethoscope, Wrench, SprayCan, Home, Coffee, Briefcase, Sparkles } from "lucide-react";

const industryIcons = [Sparkles, Hand, Activity, Scissors, Stethoscope, Wrench, SprayCan, Home, Coffee, Briefcase];

export function IndustriesSection() {
  const t = useTranslations("industries");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const items = t.raw("items") as string[];

  return (
    <section id="fur-wen" className="section-padding bg-google-light" ref={ref}>
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
          <h2 className="text-display-sm font-bold text-google-text text-balance max-w-2xl mx-auto">
            {t("headline")}
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {items.map((item, i) => {
            const Icon = industryIcons[i] || Briefcase;
            return (
              <motion.div
                key={item}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="bg-white rounded-xl border border-google-border p-4 flex flex-col items-center gap-2 text-center hover:border-brand-blue/40 hover:shadow-card hover:bg-blue-50/30 transition-all duration-200 cursor-default"
              >
                <div className="w-9 h-9 rounded-lg bg-google-light flex items-center justify-center">
                  <Icon size={18} className="text-brand-blue" />
                </div>
                <span className="text-sm font-medium text-google-text leading-tight">{item}</span>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center text-body-sm text-google-secondary mt-8"
        >
          {t("notInList")}{" "}
          <a href="#kontakt" className="text-brand-blue hover:underline">
            {t("contactMe")}
          </a>
        </motion.p>
      </div>
    </section>
  );
}

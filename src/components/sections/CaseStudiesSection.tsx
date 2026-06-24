"use client";

import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, ExternalLink } from "lucide-react";

function StatPill({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="text-center">
      <div className="text-2xl font-bold text-google-text metric">{value}</div>
      <div className="text-xs font-medium text-google-secondary mt-0.5">{label}</div>
      <div className="text-xs text-google-secondary/70">{sub}</div>
    </div>
  );
}

export function CaseStudiesSection() {
  const t = useTranslations("caseStudies");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const case1Services = t.raw("case1Services") as string[];
  const case2Services = t.raw("case2Services") as string[];

  return (
    <section id="fallstudien" className="section-padding" ref={ref}>
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
          <p className="mt-3 text-body-lg text-google-secondary">{t("subheadline")}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Case 1 — Beautyroom Berlin (with stats) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-card-lg border border-google-border shadow-card overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-br from-blue-50 to-white p-6 border-b border-google-border">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-8 h-8 rounded-lg bg-brand-blue/10 flex items-center justify-center">
                      <span className="text-xs font-bold text-brand-blue">BB</span>
                    </div>
                    <h3 className="text-heading-lg font-semibold text-google-text">
                      {t("case1Name")}
                    </h3>
                  </div>
                  <p className="text-body-sm text-google-secondary">{t("case1Industry")}</p>
                </div>
                <a
                  href="https://www.beautyroomberlin.de"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-google-secondary hover:text-brand-blue transition-colors p-1"
                >
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 divide-x divide-google-border border-b border-google-border">
              <div className="p-4">
                <StatPill
                  label={t("case1Stat1Label")}
                  value={t("case1Stat1Value")}
                  sub={t("case1Stat1Sub")}
                />
              </div>
              <div className="p-4">
                <StatPill
                  label={t("case1Stat2Label")}
                  value={t("case1Stat2Value")}
                  sub={t("case1Stat2Sub")}
                />
              </div>
              <div className="p-4">
                <StatPill
                  label={t("case1Stat3Label")}
                  value={t("case1Stat3Value")}
                  sub={t("case1Stat3Sub")}
                />
              </div>
            </div>

            {/* Focus */}
            <div className="p-6 space-y-4">
              <div className="flex items-start gap-2">
                <TrendingUp size={16} className="text-brand-green shrink-0 mt-0.5" />
                <p className="text-body-sm text-google-secondary leading-relaxed">
                  {t("case1Focus")}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {case1Services.map((s) => (
                  <Badge key={s} variant="blue">
                    {s}
                  </Badge>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Case 2 — PartyMoments (descriptive) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-card-lg border border-google-border shadow-card overflow-hidden"
          >
            <div className="bg-gradient-to-br from-green-50 to-white p-6 border-b border-google-border">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-8 h-8 rounded-lg bg-brand-green/10 flex items-center justify-center">
                      <span className="text-xs font-bold text-brand-green">PM</span>
                    </div>
                    <h3 className="text-heading-lg font-semibold text-google-text">
                      {t("case2Name")}
                    </h3>
                  </div>
                  <p className="text-body-sm text-google-secondary">{t("case2Industry")}</p>
                </div>
                <a
                  href="https://party-moments-animatoren.de"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-google-secondary hover:text-brand-blue transition-colors p-1"
                >
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>

            <div className="p-6 space-y-4 flex flex-col justify-between h-full">
              <div className="flex items-start gap-2 mt-2">
                <TrendingUp size={16} className="text-brand-green shrink-0 mt-0.5" />
                <p className="text-body-sm text-google-secondary leading-relaxed">
                  {t("case2Focus")}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {case2Services.map((s) => (
                  <Badge key={s} variant="green">
                    {s}
                  </Badge>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

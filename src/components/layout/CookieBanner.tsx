"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import NextLink from "next/link";
import { useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, BarChart2 } from "lucide-react";
import { CONSENT_KEY } from "@/components/analytics/GoogleAnalytics";

export function CookieBanner() {
  const t = useTranslations("cookie");
  const locale = useLocale();
  const datenschutzHref = locale === "de" ? "/datenschutz" : `/${locale}/datenschutz`;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(CONSENT_KEY)) {
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const saveConsent = (value: "all" | "necessary") => {
    localStorage.setItem(CONSENT_KEY, value);
    window.dispatchEvent(new Event("cookie-consent-changed"));
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 28 }}
          className="fixed bottom-4 left-4 right-4 z-50 max-w-lg mx-auto"
        >
          <div className="bg-white border border-google-border rounded-card shadow-card-md p-5">
            <p className="text-sm font-semibold text-google-text mb-1">{t("title")}</p>
            <p className="text-xs text-google-secondary leading-relaxed mb-4">
              {t("text")}{" "}
              <NextLink href={datenschutzHref} className="text-brand-blue hover:underline">
                {t("link")}
              </NextLink>
              .
            </p>

            {/* Cookie categories */}
            <div className="space-y-2 mb-4">
              <div className="flex items-start gap-2.5 text-xs text-google-secondary">
                <Shield size={13} className="text-brand-green mt-0.5 shrink-0" />
                <div>
                  <span className="font-medium text-google-text">{t("necessaryTitle")}</span>
                  {" — "}
                  {t("necessaryText")}
                </div>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-google-secondary">
                <BarChart2 size={13} className="text-brand-blue mt-0.5 shrink-0" />
                <div>
                  <span className="font-medium text-google-text">{t("analyticsTitle")}</span>
                  {" — "}
                  {t("analyticsText")}
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => saveConsent("necessary")}
                className="flex-1 text-xs font-medium px-3 py-2 rounded-lg border border-google-border text-google-secondary hover:bg-google-light hover:text-google-text transition-colors"
              >
                {t("necessary")}
              </button>
              <button
                onClick={() => saveConsent("all")}
                className="flex-1 text-xs font-semibold px-3 py-2 rounded-lg bg-brand-blue text-white hover:bg-brand-blue/90 transition-colors"
              >
                {t("acceptAll")}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

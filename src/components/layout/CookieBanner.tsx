"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import NextLink from "next/link";
import { useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const STORAGE_KEY = "cookie-notice-dismissed";

export function CookieBanner() {
  const t = useTranslations("cookie");
  const locale = useLocale();
  const datenschutzHref = locale === "de" ? "/datenschutz" : `/${locale}/datenschutz`;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      // Small delay so the page renders first
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, "1");
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
          className="fixed bottom-4 left-4 right-4 z-50 max-w-xl mx-auto"
        >
          <div className="bg-white border border-google-border rounded-card shadow-card-md px-5 py-4 flex items-start gap-4">
            <div className="flex-1 min-w-0">
              <p className="text-sm text-google-secondary leading-relaxed">
                {t("text")}{" "}
                <NextLink
                  href={datenschutzHref}
                  className="text-brand-blue hover:underline whitespace-nowrap"
                >
                  {t("link")}
                </NextLink>
                .
              </p>
            </div>
            <button
              onClick={dismiss}
              aria-label={t("dismiss")}
              className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-google-secondary hover:bg-google-light hover:text-google-text transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

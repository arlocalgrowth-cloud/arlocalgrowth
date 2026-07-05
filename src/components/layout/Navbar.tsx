"use client";

import { useState, useEffect } from "react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const locales = [
  { code: "de", label: "DE" },
  { code: "en", label: "EN" },
  { code: "ru", label: "RU" },
];

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

export function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const blogHref = locale === "de" ? "/blog" : `/${locale}/blog`;
  const homeBase = locale === "de" ? "" : `/${locale}`;

  const navLinks = [
    { key: "services", href: `${homeBase}/#leistungen` },
    { key: "caseStudies", href: `${homeBase}/#fallstudien` },
    { key: "forWho", href: `${homeBase}/#fur-wen` },
    { key: "about", href: `${homeBase}/#uber-uns` },
    { key: "faq", href: `${homeBase}/#faq` },
    { key: "contact", href: `${homeBase}/#kontakt` },
  ] as const;

  const LangSwitcher = () => (
    <div className="flex items-center gap-1 border border-google-border rounded-lg p-1">
      {locales.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => {
            const href = switchLocale(pathname, locale, code);
            window.location.href = href;
          }}
          className={cn(
            "px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer",
            locale === code
              ? "bg-brand-blue text-white"
              : "text-google-secondary hover:text-google-text hover:bg-google-light"
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled || mobileOpen
            ? "bg-white border-b border-google-border shadow-sm"
            : "bg-transparent"
        )}
      >
        <nav className="container-content mx-auto flex items-center justify-between h-16 px-5">
          {/* Logo */}
          <NextLink href={localeHome(locale)} className="flex items-center gap-2 group">
            <div className="flex items-center gap-1">
              <span className="text-brand-blue font-bold text-xl tracking-tight">A.R.</span>
              <span className="text-google-text font-semibold text-xl tracking-tight">Local Growth</span>
            </div>
          </NextLink>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-1">
            {navLinks.map(({ key, href }) => (
              <li key={key}>
                <a
                  href={href}
                  className="px-3 py-2 text-sm text-google-secondary hover:text-google-text rounded-lg hover:bg-google-light transition-colors"
                >
                  {t(key)}
                </a>
              </li>
            ))}
            <li>
              <NextLink
                href={blogHref}
                className="px-3 py-2 text-sm text-google-secondary hover:text-google-text rounded-lg hover:bg-google-light transition-colors"
              >
                {t("blog")}
              </NextLink>
            </li>
          </ul>

          {/* Desktop right */}
          <div className="hidden lg:flex items-center gap-3">
            <LangSwitcher />
            <Button size="sm" asChild>
              <a href={`${homeBase}/#audit`}>{t("cta")}</a>
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 rounded-lg text-google-secondary hover:bg-google-light transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Menü schließen" : "Menü öffnen"}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </header>

      {/* Mobile Menu — fixed full-screen overlay, no height animation */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="fixed inset-0 top-16 z-40 bg-white lg:hidden"
            style={{ touchAction: "pan-y" }}
          >
            <div className="flex flex-col h-full overflow-y-auto">
              <div className="px-5 py-6 space-y-1 flex-1">
                {navLinks.map(({ key, href }, i) => (
                  <motion.a
                    key={key}
                    href={href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.15, delay: i * 0.04 }}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center px-4 py-3.5 text-base font-medium text-google-text hover:bg-google-light active:bg-google-light rounded-xl transition-colors"
                  >
                    {t(key)}
                  </motion.a>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.15, delay: navLinks.length * 0.04 }}
                >
                  <NextLink
                    href={blogHref}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center px-4 py-3.5 text-base font-medium text-google-text hover:bg-google-light active:bg-google-light rounded-xl transition-colors"
                  >
                    {t("blog")}
                  </NextLink>
                </motion.div>
              </div>

              <div className="px-5 py-6 border-t border-google-border space-y-3">
                <LangSwitcher />
                <Button size="lg" className="w-full" asChild>
                  <a href={`${homeBase}/#audit`} onClick={() => setMobileOpen(false)}>
                    {t("cta")}
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

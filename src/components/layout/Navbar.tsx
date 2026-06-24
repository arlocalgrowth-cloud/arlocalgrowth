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

// Build the home URL for each locale
// de → /   en → /en   ru → /ru
function localeHome(code: string) {
  return code === "de" ? "/" : `/${code}`;
}

// Convert current pathname to a different locale
// e.g. /en/impressum → /ru/impressum  |  /impressum → /en/impressum
function switchLocale(pathname: string, currentLocale: string, targetLocale: string) {
  // Strip current locale prefix from pathname
  let stripped = pathname;
  if (currentLocale !== "de" && pathname.startsWith(`/${currentLocale}`)) {
    stripped = pathname.slice(`/${currentLocale}`.length) || "/";
  }

  // Add target locale prefix
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

  const navLinks = [
    { key: "services", href: "#leistungen" },
    { key: "caseStudies", href: "#fallstudien" },
    { key: "forWho", href: "#fur-wen" },
    { key: "about", href: "#uber-uns" },
    { key: "faq", href: "#faq" },
    { key: "contact", href: "#kontakt" },
  ] as const;

  const LangSwitcher = ({ mobile = false }: { mobile?: boolean }) => (
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
              : mobile
              ? "text-google-secondary hover:bg-google-light"
              : "text-google-secondary hover:text-google-text hover:bg-google-light"
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-google-border shadow-sm"
          : "bg-transparent"
      )}
    >
      <nav className="container-content mx-auto flex items-center justify-between h-16 px-6">
        {/* Logo */}
        <NextLink href={localeHome(locale)} className="flex items-center gap-2 group">
          <div className="flex items-center gap-1">
            <span className="text-brand-blue font-bold text-xl tracking-tight">A.R.</span>
            <span className="text-google-text font-semibold text-xl tracking-tight">
              Local Growth
            </span>
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
        </ul>

        {/* Right side */}
        <div className="hidden lg:flex items-center gap-3">
          <LangSwitcher />
          <Button size="sm" asChild>
            <a href="#audit">{t("cta")}</a>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 rounded-lg text-google-secondary hover:bg-google-light transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menü öffnen"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-google-border overflow-hidden"
          >
            <div className="px-6 py-4 space-y-1">
              {navLinks.map(({ key, href }) => (
                <a
                  key={key}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 text-sm text-google-text hover:bg-google-light rounded-lg transition-colors"
                >
                  {t(key)}
                </a>
              ))}
              <div className="pt-3 border-t border-google-border flex items-center gap-3">
                <LangSwitcher mobile />
                <Button size="sm" className="flex-1" asChild>
                  <a href="#audit" onClick={() => setMobileOpen(false)}>
                    {t("cta")}
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

"use client";

import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Star,
  Phone,
  Globe,
  Navigation,
  ArrowRight,
  TrendingUp,
  Eye,
  MousePointerClick,
} from "lucide-react";
import { cn } from "@/lib/utils";

function CountUp({ end, duration = 1500 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, end, duration]);

  return (
    <span ref={ref} className="metric">
      {count.toLocaleString("de-DE")}
    </span>
  );
}

function MetricCard({
  icon: Icon,
  label,
  value,
  sub,
  delay = 0,
  className,
  compact = false,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
  sub: string;
  delay?: number;
  className?: string;
  compact?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        "bg-white rounded-2xl border border-google-border shadow-card",
        compact ? "p-3" : "p-4 w-52",
        className
      )}
      style={
        !compact
          ? {
              animation: `float ${3 + delay}s ease-in-out infinite`,
              animationDelay: `${delay * 0.5}s`,
            }
          : undefined
      }
    >
      <div className="flex items-center gap-2 mb-2">
        <div className={cn("rounded-lg bg-brand-blue/10 flex items-center justify-center shrink-0", compact ? "w-6 h-6" : "w-7 h-7")}>
          <Icon size={compact ? 12 : 14} className="text-brand-blue" />
        </div>
        <span className={cn("text-google-secondary font-medium leading-tight", compact ? "text-[10px]" : "text-xs")}>{label}</span>
      </div>
      <div className={cn("font-bold text-google-text metric", compact ? "text-xl" : "text-2xl")}>
        <CountUp end={value} />
      </div>
      <p className={cn("text-google-secondary mt-1 leading-tight", compact ? "text-[10px]" : "text-xs")}>{sub}</p>
      <div className="flex items-center gap-1 mt-2">
        <TrendingUp size={10} className="text-brand-green" />
        <span className={cn("text-brand-green font-medium", compact ? "text-[10px]" : "text-xs")}>↑ von 0</span>
      </div>
    </motion.div>
  );
}

function GbpCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-white rounded-2xl border border-google-border shadow-card-md overflow-hidden w-72"
    >
      {/* GBP Header */}
      <div className="bg-google-light px-4 pt-4 pb-3 border-b border-google-border">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center shrink-0">
            <span className="text-brand-blue font-bold text-sm">BB</span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-google-text text-sm leading-tight">
              Beautyroom Berlin
            </h3>
            <p className="text-xs text-google-secondary mt-0.5">Kosmetikstudio</p>
            <div className="flex items-center gap-1 mt-1">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    size={10}
                    className="fill-brand-yellow text-brand-yellow"
                  />
                ))}
              </div>
              <span className="text-xs text-google-secondary">4,9</span>
              <span className="text-xs text-google-secondary">· Geöffnet</span>
            </div>
          </div>
        </div>
      </div>

      {/* GBP Actions */}
      <div className="grid grid-cols-3 gap-0 border-b border-google-border">
        {[
          { icon: Globe, label: "Website" },
          { icon: Phone, label: "Anrufen" },
          { icon: Navigation, label: "Route" },
        ].map(({ icon: Icon, label }) => (
          <button
            key={label}
            className="flex flex-col items-center gap-1 py-3 text-brand-blue hover:bg-blue-50 transition-colors"
          >
            <Icon size={16} />
            <span className="text-xs font-medium">{label}</span>
          </button>
        ))}
      </div>

      {/* GBP Info */}
      <div className="px-4 py-3 space-y-2">
        <div className="flex items-center gap-2 text-xs text-google-secondary">
          <MapPin size={12} className="text-brand-blue shrink-0" />
          <span>Bayerische Str. 33, 10707 Berlin</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-google-secondary">
          <div className="w-3 h-3 rounded-full bg-brand-green shrink-0" />
          <span>Geöffnet · Schließt um 19:00 Uhr</span>
        </div>
      </div>

      {/* Powered by label */}
      <div className="px-4 py-2 bg-green-50 border-t border-green-100 flex items-center gap-2">
        <TrendingUp size={12} className="text-brand-green" />
        <span className="text-xs text-brand-green font-medium">
          Optimiert mit A.R. Local Growth
        </span>
      </div>
    </motion.div>
  );
}

export function HeroSection() {
  const t = useTranslations("hero");

  const headline = t("headline").split("\n");

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/40 via-white to-white pointer-events-none" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-50/30 to-transparent pointer-events-none" />

      <div className="container-content mx-auto px-5 py-14 sm:py-20 lg:py-28 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Text */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="blue" className="gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-blue inline-block" />
                {t("eyebrow")}
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[2rem] sm:text-display-md lg:text-display-lg font-bold text-google-text text-balance"
            >
              {headline.map((line, i) => (
                <span key={i} className={i > 0 ? "block text-brand-blue" : "block"}>
                  {line}
                </span>
              ))}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-body-lg text-google-secondary max-w-lg leading-relaxed"
            >
              {t("subheadline")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Button size="xl" asChild className="group">
                <a href="#audit">
                  {t("cta")}
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </a>
              </Button>
              <Button size="xl" variant="outline" asChild>
                <a href="#leistungen">{t("ctaSecondary")}</a>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex items-center gap-2 text-sm text-google-secondary"
            >
              <span>{t("trustLine")}</span>
            </motion.div>
          </div>

          {/* Right — GBP Visual */}
          <div className="relative hidden lg:flex items-center justify-center min-h-96">
            {/* GBP Card — center */}
            <div className="relative z-10">
              <GbpCard />
            </div>

            {/* Floating metric cards */}
            <div className="absolute -top-8 -right-4 z-20">
              <MetricCard
                icon={Eye}
                label={t("card1Label")}
                value={3505}
                sub={t("card1Sub")}
                delay={0.4}
              />
            </div>

            <div className="absolute bottom-8 -right-8 z-20">
              <MetricCard
                icon={Navigation}
                label={t("card2Label")}
                value={396}
                sub={t("card2Sub")}
                delay={0.6}
              />
            </div>

            <div className="absolute -bottom-4 left-0 z-20">
              <MetricCard
                icon={MousePointerClick}
                label={t("card3Label")}
                value={260}
                sub={t("card3Sub")}
                delay={0.8}
              />
            </div>
          </div>
        </div>

        {/* Mobile metric cards — compact 3-column grid */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="lg:hidden mt-8 grid grid-cols-3 gap-3"
        >
          {[
            { icon: Eye, label: t("card1Label"), value: 3505, sub: t("card1Sub") },
            { icon: Navigation, label: t("card2Label"), value: 396, sub: t("card2Sub") },
            { icon: MousePointerClick, label: t("card3Label"), value: 260, sub: t("card3Sub") },
          ].map((card, i) => (
            <MetricCard key={i} {...card} delay={i * 0.1} compact />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Languages, ArrowRight } from "lucide-react";

export function AboutSection() {
  const t = useTranslations("about");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="uber-uns" className="section-padding" ref={ref}>
      <div className="container-content mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative w-full max-w-sm mx-auto lg:mx-0">
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-50 rounded-card-lg transform rotate-2" />
              <div className="relative rounded-card-lg overflow-hidden border-2 border-white shadow-card-md">
                <Image
                  src="/roman-andreiev.jpg"
                  alt="Roman Andreiev — Gründer von A.R. Local Growth"
                  width={400}
                  height={500}
                  className="object-cover object-top w-full"
                  priority
                />
              </div>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="absolute -bottom-4 -right-4 bg-white rounded-xl border border-google-border shadow-card-md p-3 flex items-center gap-2"
              >
                <div className="w-8 h-8 rounded-lg bg-brand-blue/10 flex items-center justify-center">
                  <Languages size={16} className="text-brand-blue" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-google-text">DE · RU · UA</div>
                  <div className="text-xs text-google-secondary">Mehrsprachig</div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            <div>
              <p className="text-label-sm uppercase text-google-secondary tracking-widest mb-3">
                {t("eyebrow")}
              </p>
              <h2 className="text-2xl sm:text-display-sm font-bold text-google-text">{t("name")}</h2>
              <p className="text-body-lg text-brand-blue font-medium mt-1">{t("title")}</p>
            </div>

            <div className="space-y-4">
              <p className="text-body-md text-google-secondary leading-relaxed">{t("text1")}</p>
              <p className="text-body-md text-google-secondary leading-relaxed">{t("text2")}</p>
              <p className="text-body-md text-google-secondary leading-relaxed">{t("text3")}</p>
              <p className="text-body-sm text-brand-blue font-medium border-l-2 border-brand-blue pl-3 leading-relaxed">
                {t("geoAnchor")}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge variant="default" className="gap-1.5">
                <MapPin size={12} />
                {t("badge1")}
              </Badge>
              <Badge variant="blue" className="gap-1.5">
                <Languages size={12} />
                {t("badge2")}
              </Badge>
            </div>

            <Button size="lg" asChild className="group">
              <a href="#audit">
                {t("cta")}
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

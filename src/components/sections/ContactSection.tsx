"use client";

import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, Phone, Mail, ArrowRight } from "lucide-react";

const PHONE = "+4917623481952";
const EMAIL = "a.r.localgrowth@gmail.com";

export function ContactSection() {
  const t = useTranslations("contact");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const contacts = [
    {
      href: `https://wa.me/${PHONE.replace(/\D/g, "")}`,
      icon: MessageCircle,
      iconBg: "bg-green-50",
      iconColor: "text-brand-green",
      label: t("whatsapp"),
      value: PHONE,
      external: true,
    },
    {
      href: `tel:${PHONE}`,
      icon: Phone,
      iconBg: "bg-blue-50",
      iconColor: "text-brand-blue",
      label: t("phone"),
      value: PHONE,
      external: false,
    },
    {
      href: `mailto:${EMAIL}`,
      icon: Mail,
      iconBg: "bg-blue-50",
      iconColor: "text-brand-blue",
      label: t("email"),
      value: EMAIL,
      external: false,
    },
  ];

  return (
    <section id="kontakt" className="section-padding bg-google-light" ref={ref}>
      <div className="container-content mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-10 lg:mb-12"
        >
          <p className="text-label-sm uppercase text-google-secondary tracking-widest mb-3">
            {t("eyebrow")}
          </p>
          <h2 className="text-2xl sm:text-display-sm font-bold text-google-text">
            {t("headline")}
          </h2>
          <p className="mt-3 text-body-lg text-google-secondary">{t("subheadline")}</p>
        </motion.div>

        {/* Contact cards */}
        <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {contacts.map(({ href, icon: Icon, iconBg, iconColor, label, value, external }, i) => (
            <motion.a
              key={label}
              href={href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              className="flex flex-col items-center text-center gap-3 bg-white rounded-card border border-google-border p-6 shadow-card hover:shadow-card-blue hover:border-brand-blue/30 hover:-translate-y-1 transition-all duration-200 group"
            >
              <div className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center`}>
                <Icon size={22} className={iconColor} />
              </div>
              <div>
                <div className="text-body-sm font-semibold text-google-text group-hover:text-brand-blue transition-colors">
                  {label}
                </div>
                <div className="text-xs text-google-secondary mt-0.5 break-all">{value}</div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Soft CTA back to audit */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 text-center"
        >
          <p className="text-body-sm text-google-secondary mb-4">{t("auditPrompt")}</p>
          <Button variant="outline" size="lg" asChild className="group">
            <a href="#audit">
              {t("auditCta")}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

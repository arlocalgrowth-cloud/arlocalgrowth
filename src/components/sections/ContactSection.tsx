"use client";

import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Turnstile } from "@marsidev/react-turnstile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle2, Loader2, MessageCircle, Phone, Mail } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2),
  company: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email(),
  message: z.string().min(10),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const PHONE = "+4917623481952";
const EMAIL = "a.r.localgrowth@gmail.com";

export function ContactSection() {
  const t = useTranslations("contact");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    if (!turnstileToken) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, turnstileToken }),
      });
      if (!res.ok) throw new Error("Server error");
      setStatus("success");
      reset();
      setTurnstileToken(null);
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="kontakt" className="section-padding bg-google-light" ref={ref}>
      <div className="container-content mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-label-sm uppercase text-google-secondary tracking-widest mb-3">
            {t("eyebrow")}
          </p>
          <h2 className="text-display-sm font-bold text-google-text">{t("headline")}</h2>
          <p className="mt-3 text-body-lg text-google-secondary">{t("subheadline")}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 max-w-4xl mx-auto">
          {/* Quick contacts */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            <a
              href={`https://wa.me/${PHONE.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-white rounded-card border border-google-border p-5 shadow-card hover:shadow-card-blue hover:border-brand-blue/30 hover:-translate-y-0.5 transition-all duration-200 group"
            >
              <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                <MessageCircle size={20} className="text-brand-green" />
              </div>
              <div>
                <div className="text-body-sm font-semibold text-google-text group-hover:text-brand-blue transition-colors">
                  {t("whatsapp")}
                </div>
                <div className="text-xs text-google-secondary">{PHONE}</div>
              </div>
            </a>

            <a
              href={`tel:${PHONE}`}
              className="flex items-center gap-4 bg-white rounded-card border border-google-border p-5 shadow-card hover:shadow-card-blue hover:border-brand-blue/30 hover:-translate-y-0.5 transition-all duration-200 group"
            >
              <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                <Phone size={20} className="text-brand-blue" />
              </div>
              <div>
                <div className="text-body-sm font-semibold text-google-text group-hover:text-brand-blue transition-colors">
                  {t("phone")}
                </div>
                <div className="text-xs text-google-secondary">{PHONE}</div>
              </div>
            </a>

            <a
              href={`mailto:${EMAIL}`}
              className="flex items-center gap-4 bg-white rounded-card border border-google-border p-5 shadow-card hover:shadow-card-blue hover:border-brand-blue/30 hover:-translate-y-0.5 transition-all duration-200 group"
            >
              <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                <Mail size={20} className="text-brand-blue" />
              </div>
              <div>
                <div className="text-body-sm font-semibold text-google-text group-hover:text-brand-blue transition-colors">
                  {t("email")}
                </div>
                <div className="text-xs text-google-secondary">{EMAIL}</div>
              </div>
            </a>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div className="bg-white rounded-card-lg border border-google-border shadow-card p-7">
              {status === "success" ? (
                <div className="flex flex-col items-center text-center py-8 gap-4">
                  <CheckCircle2 size={44} className="text-brand-green" />
                  <h3 className="text-heading-lg font-semibold text-google-text">{t("successTitle")}</h3>
                  <p className="text-body-sm text-google-secondary">{t("successText")}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                  <div className="space-y-1.5">
                    <Label htmlFor="contact-name">{t("fieldName")} *</Label>
                    <Input
                      id="contact-name"
                      placeholder={t("phName")}
                      {...register("name")}
                      aria-invalid={!!errors.name}
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="contact-company">{t("fieldCompany")}</Label>
                      <Input
                        id="contact-company"
                        placeholder={t("phCompany")}
                        {...register("company")}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="contact-phone">{t("fieldPhone")}</Label>
                      <Input
                        id="contact-phone"
                        type="tel"
                        placeholder={t("phPhone")}
                        {...register("phone")}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="contact-email">{t("fieldEmail")} *</Label>
                    <Input
                      id="contact-email"
                      type="email"
                      placeholder={t("phEmail")}
                      {...register("email")}
                      aria-invalid={!!errors.email}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="contact-message">{t("fieldMessage")} *</Label>
                    <Textarea
                      id="contact-message"
                      placeholder={t("phMessage")}
                      rows={4}
                      {...register("message")}
                      aria-invalid={!!errors.message}
                    />
                  </div>

                  <Turnstile
                    siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                    onSuccess={setTurnstileToken}
                    onError={() => setTurnstileToken(null)}
                    onExpire={() => setTurnstileToken(null)}
                    options={{ theme: "light", language: "auto" }}
                  />

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={status === "loading" || !turnstileToken}
                  >
                    {status === "loading" ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      t("cta")
                    )}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

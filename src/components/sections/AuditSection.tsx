"use client";

import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle2, AlertCircle, Loader2, CheckSquare } from "lucide-react";

const auditSchema = z.object({
  name: z.string().min(2, "Name erforderlich"),
  company: z.string().min(2, "Firma erforderlich"),
  phone: z.string().min(6, "Telefon erforderlich"),
  email: z.string().email("Gültige E-Mail erforderlich"),
  website: z.string().optional(),
  city: z.string().min(2, "Stadt erforderlich"),
  message: z.string().optional(),
});

type AuditFormValues = z.infer<typeof auditSchema>;

export function AuditSection() {
  const t = useTranslations("audit");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const checks = t.raw("checks") as string[];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AuditFormValues>({
    resolver: zodResolver(auditSchema),
  });

  const onSubmit = async (data: AuditFormValues) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Server error");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="audit" className="section-padding bg-google-light" ref={ref}>
      <div className="container-content mx-auto">
        <div className="grid lg:grid-cols-2 gap-14 items-start">
          {/* Left — info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-24 space-y-6"
          >
            <div>
              <p className="text-label-sm uppercase text-google-secondary tracking-widest mb-3">
                {t("eyebrow")}
              </p>
              <h2 className="text-display-sm font-bold text-google-text">{t("headline")}</h2>
              <p className="mt-4 text-body-lg text-google-secondary leading-relaxed">
                {t("subheadline")}
              </p>
            </div>

            <div className="bg-white rounded-card border border-google-border p-6 space-y-3">
              <p className="text-body-sm font-semibold text-google-text">{t("whatWeCheck")}</p>
              <ul className="space-y-2">
                {checks.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-body-sm text-google-secondary">
                    <CheckSquare size={15} className="text-brand-blue shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-google-secondary/70 pt-1 border-t border-google-border">
                {t("note")}
              </p>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="bg-white rounded-card-lg border border-google-border shadow-card p-8">
              {status === "success" ? (
                <div className="flex flex-col items-center text-center py-10 gap-4">
                  <CheckCircle2 size={48} className="text-brand-green" />
                  <h3 className="text-heading-lg font-semibold text-google-text">{t("successTitle")}</h3>
                  <p className="text-body-md text-google-secondary">{t("successText")}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="audit-name">{t("fieldName")} *</Label>
                      <Input
                        id="audit-name"
                        placeholder={t("phName")}
                        {...register("name")}
                        aria-invalid={!!errors.name}
                      />
                      {errors.name && (
                        <p className="text-xs text-brand-red">{errors.name.message}</p>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="audit-company">{t("fieldCompany")} *</Label>
                      <Input
                        id="audit-company"
                        placeholder={t("phCompany")}
                        {...register("company")}
                        aria-invalid={!!errors.company}
                      />
                      {errors.company && (
                        <p className="text-xs text-brand-red">{errors.company.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="audit-phone">{t("fieldPhone")} *</Label>
                      <Input
                        id="audit-phone"
                        type="tel"
                        placeholder={t("phPhone")}
                        {...register("phone")}
                        aria-invalid={!!errors.phone}
                      />
                      {errors.phone && (
                        <p className="text-xs text-brand-red">{errors.phone.message}</p>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="audit-email">{t("fieldEmail")} *</Label>
                      <Input
                        id="audit-email"
                        type="email"
                        placeholder={t("phEmail")}
                        {...register("email")}
                        aria-invalid={!!errors.email}
                      />
                      {errors.email && (
                        <p className="text-xs text-brand-red">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="audit-website">{t("fieldWebsite")}</Label>
                      <Input
                        id="audit-website"
                        type="url"
                        placeholder={t("phWebsite")}
                        {...register("website")}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="audit-city">{t("fieldCity")} *</Label>
                      <Input
                        id="audit-city"
                        placeholder={t("phCity")}
                        {...register("city")}
                        aria-invalid={!!errors.city}
                      />
                      {errors.city && (
                        <p className="text-xs text-brand-red">{errors.city.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="audit-message">{t("fieldMessage")}</Label>
                    <Textarea
                      id="audit-message"
                      placeholder={t("phMessage")}
                      rows={3}
                      {...register("message")}
                    />
                  </div>

                  {status === "error" && (
                    <div className="flex items-start gap-2 p-3 rounded-xl bg-red-50 border border-red-100">
                      <AlertCircle size={15} className="text-brand-red shrink-0 mt-0.5" />
                      <p className="text-xs text-brand-red">{t("errorText")}</p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    size="xl"
                    className="w-full"
                    disabled={status === "loading"}
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Wird gesendet...
                      </>
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

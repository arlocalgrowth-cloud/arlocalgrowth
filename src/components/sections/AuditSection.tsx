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
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

const auditSchema = z.object({
  name: z.string().min(2, "Name erforderlich"),
  company: z.string().min(2, "Unternehmen erforderlich"),
  email: z.string().email("Gültige E-Mail erforderlich"),
  city: z.string().min(2, "Stadt erforderlich"),
  phone: z.string().optional(),
  gbpUrl: z.string().optional(),
  problem: z.string().min(10, "Bitte beschreiben Sie kurz Ihre Situation"),
});

type AuditFormValues = z.infer<typeof auditSchema>;

export function AuditSection() {
  const t = useTranslations("audit");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const steps = t.raw("steps") as string[];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AuditFormValues>({
    resolver: zodResolver(auditSchema),
  });

  const onSubmit = async (data: AuditFormValues) => {
    if (!turnstileToken) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/audit", {
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
    <section id="audit" className="section-padding bg-google-light" ref={ref}>
      <div className="container-content mx-auto">
        <div className="grid lg:grid-cols-2 gap-14 items-start">
          {/* Left — info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div>
              <p className="text-label-sm uppercase text-google-secondary tracking-widest mb-3">
                {t("eyebrow")}
              </p>
              <h2 className="text-2xl sm:text-display-sm font-bold text-google-text">
                {t("headline")}
              </h2>
              <p className="mt-4 text-body-lg text-google-secondary leading-relaxed">
                {t("subheadline")}
              </p>
            </div>

            <div className="bg-white rounded-card border border-google-border p-6 space-y-4">
              <p className="text-body-sm font-semibold text-google-text">{t("howItWorks")}</p>
              <ol className="space-y-4">
                {steps.map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-body-sm text-google-secondary">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-bold flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="bg-white rounded-card-lg border border-google-border shadow-card p-5 sm:p-8">
              {status === "success" ? (
                <div className="flex flex-col items-center text-center py-10 gap-4">
                  <CheckCircle2 size={48} className="text-brand-green" />
                  <h3 className="text-heading-lg font-semibold text-google-text">{t("successTitle")}</h3>
                  <p className="text-body-md text-google-secondary">{t("successText")}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                  {/* Row 1: name + company */}
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

                  {/* Row 2: email + city */}
                  <div className="grid sm:grid-cols-2 gap-4">
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

                  {/* Row 3: phone + GBP URL (both optional) */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="audit-phone">{t("fieldPhone")}</Label>
                      <Input
                        id="audit-phone"
                        type="tel"
                        placeholder={t("phPhone")}
                        {...register("phone")}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="audit-gbp">{t("fieldGbp")}</Label>
                      <Input
                        id="audit-gbp"
                        type="url"
                        placeholder={t("phGbp")}
                        {...register("gbpUrl")}
                      />
                    </div>
                  </div>

                  {/* Problem / question */}
                  <div className="space-y-1.5">
                    <Label htmlFor="audit-problem">{t("fieldProblem")} *</Label>
                    <Textarea
                      id="audit-problem"
                      placeholder={t("phProblem")}
                      rows={4}
                      {...register("problem")}
                      aria-invalid={!!errors.problem}
                    />
                    {errors.problem && (
                      <p className="text-xs text-brand-red">{errors.problem.message}</p>
                    )}
                  </div>

                  <Turnstile
                    siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                    onSuccess={setTurnstileToken}
                    onError={() => setTurnstileToken(null)}
                    onExpire={() => setTurnstileToken(null)}
                    options={{ theme: "light", language: "auto" }}
                  />

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
                    disabled={status === "loading" || !turnstileToken}
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

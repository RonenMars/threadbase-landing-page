"use client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { Link } from "@/i18n/routing";

type Status = "idle" | "sending" | "done" | "error";

export function NewsletterForm(): React.JSX.Element {
  const [status, setStatus] = useState<Status>("idle");
  const t = useTranslations("home.roadmap.newsletter");

  const schema = z.object({
    name: z.string().max(100).optional().or(z.literal("")),
    email: z.string().min(1, t("emailRequired")).email(t("emailInvalid")),
    company: z.string().optional().or(z.literal("")),
    consent: z.boolean().refine((value) => value, { message: t("consentRequired") }),
  });
  type FormValues = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", company: "", consent: false },
  });

  async function onSubmit(values: FormValues): Promise<void> {
    setStatus("sending");
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      setStatus(response.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="mt-16 rounded-4xl border border-[rgba(240,138,36,0.18)] bg-[linear-gradient(135deg,rgba(240,138,36,0.06),rgba(99,179,255,0.03))] p-8 text-center">
      <h3 className="text-xl font-semibold tracking-[-0.03em] text-primary">
        {t("heading")}
      </h3>
      <p className="mt-2 text-sm text-secondary">
        {t("body")}
      </p>
      {status === "done" ? (
        <p className="mt-6 font-medium text-accent-strong">{t("submitted")}</p>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="mx-auto mt-6 flex w-full max-w-md flex-col gap-4">
          <input
            type="text"
            autoComplete="off"
            tabIndex={-1}
            aria-hidden="true"
            className="absolute h-0 w-0 opacity-0"
            {...register("company")}
          />
          <input
            type="text"
            placeholder={t("namePlaceholder")}
            className="w-full rounded-xl border border-border bg-black/30 px-4 py-2.5 text-sm text-primary placeholder:text-muted focus:border-accent/50 focus:outline-none"
            {...register("name")}
          />
          <div className="flex flex-col gap-1.5">
            <input
              type="text"
              inputMode="email"
              placeholder={t("placeholder")}
              aria-describedby={errors.email ? "newsletter-email-error" : undefined}
              aria-invalid={Boolean(errors.email)}
              className="w-full rounded-xl border border-border bg-black/30 px-4 py-2.5 text-sm text-primary placeholder:text-muted focus:border-accent/50 focus:outline-none aria-invalid:border-red-400"
              {...register("email")}
            />
            {errors.email && (
              <p id="newsletter-email-error" role="alert" className="text-left text-xs text-red-400">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="flex flex-col items-start gap-1.5">
            <label className="flex items-start gap-2 text-left text-xs text-muted">
              <input
                type="checkbox"
                aria-describedby={errors.consent ? "newsletter-consent-error" : undefined}
                aria-invalid={Boolean(errors.consent)}
                className="mt-0.5 size-3.5 shrink-0 accent-accent-secondary"
                {...register("consent")}
              />
              <span>
                {t("consentBeforeLink")}{" "}
                <Link
                  className="font-medium text-accent transition-colors hover:text-accent-hover"
                  href="/privacy-policy"
                >
                  {t("consentLink")}
                </Link>
                {t("consentAfterLink")}
              </span>
            </label>
            {errors.consent && (
              <p id="newsletter-consent-error" role="alert" className="text-left text-xs text-red-400">
                {errors.consent.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full rounded-xl bg-accent-secondary px-5 py-2.5 text-sm font-semibold text-[#070b11] transition-colors hover:bg-[#ffab52] disabled:opacity-60"
          >
            {status === "sending" ? t("sending") : t("button")}
          </button>
        </form>
      )}
      {status === "error" && (
        <p className="mt-3 text-sm text-red-400">{t("error")}</p>
      )}
    </div>
  );
}

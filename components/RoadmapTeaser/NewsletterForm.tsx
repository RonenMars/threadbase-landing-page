"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

type Status = "idle" | "sending" | "done" | "error";

export function NewsletterForm(): React.JSX.Element {
  const [status, setStatus] = useState<Status>("idle");
  const t = useTranslations("home.roadmap.newsletter");

  const [consented, setConsented] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setStatus("sending");
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.get("email"),
          name: formData.get("name"),
          company: formData.get("company"),
        }),
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
        <form onSubmit={handleSubmit} className="mt-6 flex flex-wrap justify-center gap-3">
          <input
            type="text"
            name="company"
            autoComplete="off"
            tabIndex={-1}
            aria-hidden="true"
            className="absolute h-0 w-0 opacity-0"
          />
          <input
            type="text"
            name="name"
            placeholder={t("namePlaceholder")}
            className="w-48 rounded-xl border border-border bg-black/30 px-4 py-2 text-sm text-primary placeholder:text-muted focus:border-accent/50 focus:outline-none"
          />
          <input
            type="email"
            name="email"
            required
            placeholder={t("placeholder")}
            className="w-64 rounded-xl border border-border bg-black/30 px-4 py-2 text-sm text-primary placeholder:text-muted focus:border-accent/50 focus:outline-none"
          />
          <button
            type="submit"
            disabled={status === "sending" || !consented}
            className="rounded-xl bg-accent-secondary px-5 py-2 text-sm font-semibold text-[#070b11] transition-colors hover:bg-[#ffab52] disabled:opacity-60"
          >
            {status === "sending" ? t("sending") : t("button")}
          </button>
          <label className="flex w-full items-start justify-center gap-2 text-xs text-muted">
            <input
              type="checkbox"
              checked={consented}
              onChange={(event) => setConsented(event.target.checked)}
              required
              className="mt-0.5 size-3.5 shrink-0 accent-accent-secondary"
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
        </form>
      )}
      {status === "error" && (
        <p className="mt-3 text-sm text-red-400">{t("error")}</p>
      )}
    </div>
  );
}

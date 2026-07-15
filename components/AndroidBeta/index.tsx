"use client";

import { GooglePlayLogo, UsersThree, Clock, DownloadSimple, ArrowSquareOut } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { PageShell } from "@/components/PageShell";
import { SectionHeading } from "@/components/SectionHeading";
import { getAndroidBetaContent } from "@/lib/translated-content";

const STEP_ICONS = [UsersThree, Clock, DownloadSimple, GooglePlayLogo] as const;

export function AndroidBeta(): React.JSX.Element {
  const content = getAndroidBetaContent(useTranslations("pages.androidBeta"));

  return (
    <PageShell
      kicker={content.eyebrow}
      heading={content.headline}
      description={content.intro}
    >
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href={content.groupUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-[transform,box-shadow] duration-300 ease-out hover:shadow-[0_12px_32px_-12px_rgba(99,179,255,0.7)] motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary"
        >
          <UsersThree size={18} weight="bold" />
          <span>{content.groupCta}</span>
          <ArrowSquareOut size={16} weight="bold" className="opacity-70 transition-transform duration-200 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
        </Link>
        <Link
          href={content.playUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center justify-center gap-2 rounded-full border border-border bg-bg-secondary px-6 py-3 text-sm font-semibold text-primary transition-[transform,border-color,box-shadow] duration-300 ease-out hover:border-accent-secondary hover:shadow-[0_12px_32px_-12px_rgba(240,138,36,0.6)] motion-safe:hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary"
        >
          <GooglePlayLogo size={18} weight="bold" />
          <span>{content.playCta}</span>
          <ArrowSquareOut size={16} weight="bold" className="opacity-70 transition-transform duration-200 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
        </Link>
      </div>

      <SectionHeading>{content.howToJoinHeading}</SectionHeading>
      <ol className="mt-6 flex flex-col gap-4">
        {content.steps.map((step, idx) => {
          const Icon = STEP_ICONS[idx] ?? UsersThree;
          return (
            <li
              key={step.title}
              className="flex gap-4 rounded-2xl border border-border bg-bg-secondary/60 p-5 transition-colors duration-200 hover:border-accent/60"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border bg-bg-primary text-accent">
                <Icon size={22} weight="duotone" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                  {content.stepLabel.replace("{number}", String(idx + 1))}
                </span>
                <h3 className="text-base font-semibold text-primary">{step.title}</h3>
                <p className="text-sm leading-relaxed text-secondary">{step.body}</p>
              </div>
            </li>
          );
        })}
      </ol>

      <aside className="mt-14 rounded-2xl border border-accent-secondary/30 bg-accent-secondary/5 p-5">
        <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-accent-secondary">
          {content.fallback.title}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-secondary">{content.fallback.body}</p>
      </aside>

      <p className="mt-8 text-sm leading-7 text-muted">{content.closing}</p>
    </PageShell>
  );
}

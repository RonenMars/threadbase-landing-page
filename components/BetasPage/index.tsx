"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { DeviceMobileCamera, AppleLogo, ArrowSquareOut } from "@phosphor-icons/react";
import { BETAS_PAGE, type BetaPlatform } from "@/lib/content";
import { fadeUp, staggerContainer, staggerItem } from "@/components/motion";

const PLATFORM_ICONS: Record<string, React.ElementType> = {
  ios: AppleLogo,
  android: DeviceMobileCamera,
};

export function BetasPage(): React.JSX.Element {
  return (
    <main className="min-h-screen bg-bg-primary pb-24 pt-28 sm:pt-32">
      <div className="mx-auto flex max-w-5xl flex-col gap-16 px-6">
        {/* Header */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="flex flex-col gap-5 text-center"
        >
          <motion.p variants={staggerItem} className="text-xs uppercase tracking-[0.18em] text-muted">
            {BETAS_PAGE.eyebrow}
          </motion.p>
          <motion.h1
            variants={staggerItem}
            className="text-balance text-3xl font-semibold text-primary sm:text-5xl"
          >
            {BETAS_PAGE.headline}
          </motion.h1>
          <motion.p
            variants={staggerItem}
            className="mx-auto max-w-prose text-pretty text-base text-secondary sm:text-lg"
          >
            {BETAS_PAGE.intro}
          </motion.p>
        </motion.header>

        {/* Platform cards */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {BETAS_PAGE.platforms.map((platform, idx) => (
            <PlatformCard key={platform.id} platform={platform} index={idx} />
          ))}
        </div>

        {/* Back link */}
        <div className="flex justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2 text-sm text-secondary transition-colors duration-200 hover:border-accent hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary"
          >
            ← Back to Threadbase
          </Link>
        </div>
      </div>
    </main>
  );
}

function PlatformCard({ platform, index }: { platform: BetaPlatform; index: number }): React.JSX.Element {
  const Icon = PLATFORM_ICONS[platform.id] ?? DeviceMobileCamera;
  const isExternal = platform.primaryCta.href.startsWith("http");

  return (
    <motion.article
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={fadeUp}
      style={{ transitionDelay: `${index * 80}ms` } as React.CSSProperties}
      className="flex flex-col gap-6 rounded-2xl border border-border bg-bg-secondary/60 p-7"
    >
      {/* Card header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-bg-primary text-accent">
            <Icon size={20} weight="duotone" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
            {platform.eyebrow}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold text-primary">{platform.name}</h2>
          <p className="text-sm font-medium text-accent">{platform.tagline}</p>
        </div>
        <p className="text-sm leading-relaxed text-secondary">{platform.description}</p>
      </div>

      {/* CTA */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          href={platform.primaryCta.href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-[transform,box-shadow] duration-300 ease-out hover:shadow-[0_12px_32px_-12px_rgba(99,179,255,0.7)] motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary"
        >
          <span>{platform.primaryCta.label}</span>
          <ArrowSquareOut size={15} weight="bold" className="opacity-70 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
        {platform.secondaryCta ? (
          <Link
            href={platform.secondaryCta.href}
            className="group inline-flex items-center justify-center gap-2 rounded-full border border-border bg-bg-primary px-6 py-3 text-sm font-semibold text-primary transition-[transform,border-color] duration-300 ease-out hover:border-accent motion-safe:hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary"
          >
            <span>{platform.secondaryCta.label}</span>
          </Link>
        ) : null}
      </div>

      {/* Steps */}
      <motion.ol
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer}
        className="flex flex-col gap-3"
      >
        {platform.steps.map((step, idx) => (
          <motion.li
            key={step.title}
            variants={staggerItem}
            className="flex gap-4"
          >
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border bg-bg-primary text-[11px] font-bold text-muted">
              {idx + 1}
            </span>
            <div className="flex flex-col gap-0.5">
              <p className="text-sm font-semibold text-primary">{step.title}</p>
              <p className="text-sm leading-relaxed text-secondary">{step.body}</p>
            </div>
          </motion.li>
        ))}
      </motion.ol>

      {/* Note */}
      {platform.note ? (
        <motion.aside
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          className="rounded-xl border border-accent-secondary/30 bg-accent-secondary/5 px-4 py-3 text-sm leading-relaxed text-secondary"
        >
          <span className="font-semibold text-accent-secondary">Note: </span>
          {platform.note}
        </motion.aside>
      ) : null}
    </motion.article>
  );
}

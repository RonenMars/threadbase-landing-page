"use client";

import { CheckCircle, ShieldCheck } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { fadeUp } from "@/components/motion";
import type { SecurityContent } from "@/lib/content";
import { getSecurityContent } from "@/lib/translated-content";

interface SecuritySectionProps {
  content?: SecurityContent;
}

export function SecuritySection({
  content: contentProp,
}: SecuritySectionProps): React.JSX.Element {
  const fallback = getSecurityContent(useTranslations("home.security"));
  const content = contentProp ?? fallback;

  return (
    <motion.section
      animate="visible"
      className="px-6 py-16 sm:px-8 lg:px-10"
      initial={false}
      variants={fadeUp}
    >
      <div className="container-shell overflow-hidden rounded-7xl border border-border-strong bg-[linear-gradient(135deg,rgba(99,179,255,0.12),rgba(11,19,32,0.94)_46%,rgba(240,138,36,0.08))] p-7 shadow-[0_24px_70px_rgba(3,8,16,0.42)] sm:p-10 lg:p-12">
        <div className="grid gap-8 lg:grid-cols-[auto_1fr] lg:items-start lg:gap-10">
          <span className="flex size-14 items-center justify-center rounded-2xl border border-border-strong bg-accent/12 text-accent-strong">
            <ShieldCheck size={28} weight="regular" aria-hidden="true" />
          </span>

          <div>
            <h2 className="max-w-4xl text-balance text-3xl font-semibold tracking-[-0.04em] text-primary sm:text-4xl lg:text-5xl">
              {content.heading}
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-7 text-secondary sm:text-lg sm:leading-8">
              {content.description}
            </p>
            <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm text-primary">
              {content.highlights.map((highlight) => (
                <li className="flex items-center gap-2" key={highlight}>
                  <CheckCircle
                    className="shrink-0 text-accent-secondary"
                    size={18}
                    weight="fill"
                    aria-hidden="true"
                  />
                  {highlight}
                </li>
              ))}
            </ul>
            <p className="mt-7 max-w-3xl border-t border-white/8 pt-5 text-xs leading-5 text-muted">
              {content.scopeNote}
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

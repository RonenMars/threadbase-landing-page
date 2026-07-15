"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { fadeUp } from "@/components/motion";
import { Card } from "@/components/ui/card";
import type { HowItWorksContent, QuickStartContent } from "@/lib/content";
import {
  getHowItWorksContent,
  getQuickStartContent,
} from "@/lib/translated-content";

interface QuickStartProps {
  content?: QuickStartContent;
  howItWorks?: HowItWorksContent;
}

export function QuickStart({
  content: contentProp,
  howItWorks: howItWorksProp,
}: QuickStartProps): React.JSX.Element {
  const tQuickStart = useTranslations("home.quickStart");
  const tHowItWorks = useTranslations("home.howItWorks");
  const content = contentProp ?? getQuickStartContent(tQuickStart);
  const howItWorks =
    howItWorksProp ?? getHowItWorksContent(tHowItWorks).content;
  return (
    <section
      id="quick-start"
      className="px-6 py-16 sm:px-8 lg:px-10"
      aria-labelledby="quick-start-heading"
    >
      <div className="container-shell">
        <motion.div
          initial={false}
          animate="visible"
          variants={fadeUp}
          className="mx-auto max-w-3xl"
        >
          <div
            id="how-it-works"
            aria-labelledby="how-it-works-heading"
            className="mb-12"
          >
            <p className="mb-3 text-xs uppercase tracking-[0.26em] text-muted">
              {howItWorks.eyebrow}
            </p>
            <h2
              id="how-it-works-heading"
              className="text-balance text-2xl font-semibold tracking-[-0.04em] text-primary sm:text-3xl"
            >
              {howItWorks.heading}
            </h2>
            <ol className="mt-5 grid gap-3 sm:grid-cols-3">
              {howItWorks.steps.map((step, i) => (
                <li
                  key={step.title}
                  className="flex items-start gap-3 rounded-2xl border border-white/6 bg-bg-secondary/40 p-3"
                >
                  <span
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border bg-bg-secondary text-[12px]"
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  <span className="text-sm leading-snug text-secondary">
                    {step.title}
                  </span>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-xs italic text-muted">
              {howItWorks.trustNote}
            </p>
          </div>

          {content.eyebrow ? (
            <p className="mb-3 text-xs uppercase tracking-[0.26em] text-muted">
              {content.eyebrow}
            </p>
          ) : null}
          <h2
            id="quick-start-heading"
            className="text-balance text-3xl font-semibold tracking-tighter text-primary sm:text-4xl lg:text-5xl"
          >
            {content.heading}
          </h2>

          <Card className="tech-card mt-10 p-6">
            <pre className="terminal-block overflow-x-auto rounded-3xl border border-white/6 p-5 leading-7 text-primary">
              <code className="font-mono">
                {content.steps.map((line, index) => {
                  if (line.length === 0) {
                    return (
                      <span className="block h-4" key={`qs-${index}`} />
                    );
                  }
                  const lineClassName = line.startsWith("#")
                    ? "text-emerald-300/80"
                    : "text-primary";
                  return (
                    <span
                      className={`block whitespace-pre-wrap ${lineClassName}`}
                      key={`qs-${index}`}
                    >
                      {line}
                    </span>
                  );
                })}
              </code>
            </pre>
          </Card>

          <ul className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-secondary">
            {content.links.map((link) => (
              <li key={link.href + link.label}>
                <Link
                  href={link.href}
                  className="transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { fadeUp, staggerContainer, staggerItem } from "@/components/motion";
import type { FaqContent } from "@/lib/content";
import { getFaqContent } from "@/lib/translated-content";

interface FaqProps {
  content?: FaqContent;
}

export function Faq({ content: contentProp }: FaqProps): React.JSX.Element {
  const fallback = getFaqContent(useTranslations("home.faq"));
  const content = contentProp ?? fallback;

  return (
    <motion.section
      animate="visible"
      className="px-6 py-16 sm:px-8 lg:px-10"
      initial={false}
      variants={fadeUp}
    >
      <div className="container-shell mx-auto max-w-3xl">
        <h2 className="text-balance text-3xl font-semibold tracking-tighter text-primary sm:text-4xl">
          {content.heading}
        </h2>

        <motion.dl className="mt-10 space-y-8" variants={staggerContainer}>
          {content.items.map((item) => (
            <motion.div
              className="border-t border-white/8 pt-6"
              key={item.question}
              variants={staggerItem}
            >
              <dt className="text-lg font-medium text-primary">
                {item.question}
              </dt>
              <dd className="mt-2 leading-7 text-secondary">{item.answer}</dd>
            </motion.div>
          ))}
        </motion.dl>

        <p className="mt-8 text-sm text-muted">
          {content.intro}{" "}
          <Link className="text-accent-strong underline" href="/support">
            {content.supportLinkLabel}
          </Link>
        </p>
      </div>
    </motion.section>
  );
}

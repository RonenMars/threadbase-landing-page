"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { fadeUp } from "@/components/motion";
import type { FinalCtaContent } from "@/lib/content";
import { getFinalCtaContent } from "@/lib/translated-content";
import { NewsletterForm } from "@/components/NewsletterForm";

interface FinalCtaProps {
  content?: FinalCtaContent;
}

export function FinalCta({ content: contentProp }: FinalCtaProps): React.JSX.Element {
  const fallback = getFinalCtaContent(useTranslations("home.finalCta"));
  const content = contentProp ?? fallback;

  return (
    <motion.section
      animate="visible"
      className="px-6 py-20 sm:px-8 lg:px-10"
      initial={false}
      variants={fadeUp}
    >
      <div className="container-shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
        <div className="max-w-xl">
          <h2 className="text-balance text-3xl font-semibold tracking-[-0.04em] text-primary sm:text-4xl lg:text-5xl">
            {content.heading}
          </h2>
          <p className="mt-5 text-base leading-7 text-secondary sm:text-lg">
            {content.description}
          </p>
          <Button
            className="mt-8 min-w-50"
            nativeButton={false}
            render={<Link href="/betas" />}
            size="lg"
            variant="primary"
          >
            {content.ctaLabel}
          </Button>
        </div>

        <NewsletterForm />
      </div>
    </motion.section>
  );
}

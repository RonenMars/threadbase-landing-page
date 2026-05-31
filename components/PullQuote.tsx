"use client";

import { motion } from "framer-motion";
import type { PullQuoteContent } from "@/lib/content";
import { fadeUp } from "@/components/motion";

interface PullQuoteProps {
  content: PullQuoteContent;
}

export function PullQuote({ content }: PullQuoteProps): React.JSX.Element {
  return (
    <section className="px-6 py-20 sm:px-8 lg:px-10" aria-label="Testimonial">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUp}
        className="container-shell max-w-2xl text-center"
      >
        <blockquote className="text-lg leading-8 text-secondary sm:text-xl">
          {content.body}
        </blockquote>
        <p className="mt-4 text-sm text-muted">{content.attribution}</p>
      </motion.div>
    </section>
  );
}

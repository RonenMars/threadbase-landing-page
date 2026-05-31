"use client";

import { motion } from "framer-motion";
import type { PullQuoteContent } from "@/lib/content";
import { fadeUp } from "@/components/motion";

interface PullQuoteProps {
  content: PullQuoteContent;
}

export function PullQuote({ content }: PullQuoteProps): React.JSX.Element {
  return (
    <section className="bg-bg-primary py-20" aria-label="Testimonial">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUp}
        className="mx-auto max-w-2xl px-6 text-center"
      >
        <hr className="mx-auto w-80 border-border" />
        <blockquote className="mt-6 text-2xl italic leading-relaxed text-secondary sm:text-[1.75rem]">
          {content.body}
        </blockquote>
        <p className="mt-4 text-sm text-muted">{content.attribution}</p>
        <hr className="mx-auto mt-6 w-80 border-border" />
      </motion.div>
    </section>
  );
}

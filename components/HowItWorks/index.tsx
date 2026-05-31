"use client";

import { motion } from "framer-motion";
import type { HowItWorksContent } from "@/lib/content";
import { fadeUp, staggerContainer, staggerItem } from "@/components/motion";
import { NumberBadge } from "./NumberBadge";
import { ConnectingThread } from "./ConnectingThread";

interface HowItWorksProps {
  content: HowItWorksContent;
}

export function HowItWorks({ content }: HowItWorksProps): React.JSX.Element {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="bg-bg-primary py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="mb-3 text-xs uppercase tracking-[0.18em] text-muted">
            {content.eyebrow}
          </p>
          <h2
            id="how-it-works-heading"
            className="text-3xl font-semibold text-primary sm:text-4xl"
          >
            {content.heading}
          </h2>
        </motion.div>

        <div className="relative mt-16">
          <ConnectingThread count={content.steps.length} />

          <motion.ol
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-6"
          >
            {content.steps.map((step, i) => (
              <motion.li
                key={step.title}
                variants={staggerItem}
                className="relative flex flex-col items-center text-center md:items-start md:text-left"
              >
                <NumberBadge n={i + 1} />
                <h3 className="mt-6 text-lg font-semibold text-primary">
                  {step.title}
                </h3>
                <p className="mt-2 text-secondary">{step.description}</p>
                {step.postscript ? (
                  <p className="mt-3 text-sm italic text-muted">
                    {step.postscript}
                  </p>
                ) : null}
              </motion.li>
            ))}
          </motion.ol>
        </div>

        <p className="mx-auto mt-16 max-w-xl text-center text-sm italic text-muted">
          {content.trustNote}
        </p>
      </div>
    </section>
  );
}

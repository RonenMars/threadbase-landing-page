"use client";

import { motion } from "framer-motion";
import type { HowItWorksContent } from "@/lib/content";
import { fadeUp, staggerContainer, staggerItem } from "@/components/motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NumberBadge } from "./NumberBadge";

interface HowItWorksProps {
  content: HowItWorksContent;
}

export function HowItWorks({ content }: HowItWorksProps): React.JSX.Element {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="px-6 py-24 sm:px-8 lg:px-10"
    >
      <div className="container-shell">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="mb-12 max-w-3xl space-y-4"
        >
          <p className="text-xs uppercase tracking-[0.26em] text-muted">
            {content.eyebrow}
          </p>
          <h2
            id="how-it-works-heading"
            className="text-balance text-3xl font-semibold tracking-tighter text-primary sm:text-4xl lg:text-5xl"
          >
            {content.heading}
          </h2>
        </motion.div>

        <motion.ol
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="grid gap-5 md:grid-cols-3"
        >
          {content.steps.map((step, i) => (
            <motion.li key={step.title} variants={staggerItem}>
              <Card className="tech-card h-full transition-colors">
                <CardHeader className="gap-4">
                  <NumberBadge n={i + 1} />
                  <CardTitle>{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="leading-7 text-secondary">{step.description}</p>
                  {step.postscript ? (
                    <p className="mt-3 text-sm italic text-muted">
                      {step.postscript}
                    </p>
                  ) : null}
                </CardContent>
              </Card>
            </motion.li>
          ))}
        </motion.ol>

        <p className="mx-auto mt-16 max-w-xl text-center text-sm italic text-muted">
          {content.trustNote}
        </p>
      </div>
    </section>
  );
}

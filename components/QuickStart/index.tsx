"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { QuickStartContent } from "@/lib/content";
import { fadeUp } from "@/components/motion";

interface QuickStartProps {
  content: QuickStartContent;
}

export function QuickStart({ content }: QuickStartProps): React.JSX.Element {
  const codeBody = content.steps.join("\n");

  return (
    <section
      id="quick-start"
      className="bg-bg-secondary py-24 sm:py-32"
      aria-labelledby="quick-start-heading"
    >
      <div className="mx-auto max-w-3xl px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
        >
          {content.eyebrow ? (
            <p className="mb-3 text-xs uppercase tracking-[0.18em] text-muted">
              {content.eyebrow}
            </p>
          ) : null}
          <h2
            id="quick-start-heading"
            className="text-3xl font-semibold text-primary sm:text-4xl"
          >
            {content.heading}
          </h2>

          <pre className="mt-10 overflow-x-auto rounded-2xl border border-border bg-bg-tertiary p-6 font-mono text-sm leading-relaxed text-primary">
            <code>{codeBody}</code>
          </pre>

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

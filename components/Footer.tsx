"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeUp } from "@/components/motion";
import type { FooterContent } from "@/lib/content";

interface FooterProps {
  footer: FooterContent;
}

export function Footer({ footer }: FooterProps): React.JSX.Element {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.footer
      animate={inView ? "visible" : "hidden"}
      className="border-t border-white/6 bg-bg-secondary px-6 py-12 sm:px-8 lg:px-10"
      initial="hidden"
      ref={ref}
      variants={fadeUp}
    >
      <div className="container-shell space-y-8">
        <div className="flex flex-col gap-3 text-left sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-3 text-secondary">
            <span className="text-base font-semibold tracking-tight text-primary">
              {footer.productName}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-accent-secondary" />
            <span>{footer.licenseText}</span>
          </div>
          <nav className="flex flex-wrap gap-4 text-secondary">
            {footer.links.map((link) => (
              <a
                className="transition-colors hover:text-primary"
                href={link.href}
                key={link.label}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="space-y-2 leading-7 text-muted">
          <p className="text-secondary">{footer.tagline}</p>
          <p>{footer.disclaimer}</p>
        </div>
      </div>
    </motion.footer>
  );
}

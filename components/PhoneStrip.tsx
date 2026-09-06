"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { fadeUp, staggerContainer, staggerItem } from "@/components/motion";
import type { PhoneStripContent } from "@/lib/content";
import { getPhoneStripContent } from "@/lib/translated-content";

interface PhoneStripProps {
  content?: PhoneStripContent;
}

export function PhoneStrip({
  content: contentProp,
}: PhoneStripProps): React.JSX.Element {
  const fallback = getPhoneStripContent(useTranslations("home.phoneStrip"));
  const content = contentProp ?? fallback;

  return (
    <motion.section
      animate="visible"
      className="px-6 py-14 sm:px-8 lg:px-10"
      initial={false}
      variants={fadeUp}
    >
      <div className="container-shell border-y border-white/8 py-10">
        <h2 className="text-2xl font-semibold tracking-[-0.04em] text-primary sm:text-3xl">
          {content.heading}
        </h2>

        <motion.ul
          className="mt-7 grid gap-x-8 gap-y-4 md:grid-cols-2"
          variants={staggerContainer}
        >
          {content.items.map((item) => (
            <motion.li
              className="flex gap-3 text-sm leading-6 text-secondary"
              key={item}
              variants={staggerItem}
            >
              <span
                aria-hidden="true"
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-secondary"
              />
              <span>{item}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </motion.section>
  );
}

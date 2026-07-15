"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { fadeUp, staggerContainer, staggerItem } from "@/components/motion";
import type { HonestCon, SectionContent } from "@/lib/content";
import { getHonestConsContent } from "@/lib/translated-content";

interface HonestConsProps {
  section?: SectionContent;
  items?: HonestCon[];
}

export function HonestCons({
  section: sectionProp,
  items: itemsProp,
}: HonestConsProps): React.JSX.Element {
  const fallback = getHonestConsContent(useTranslations("home.honestCons"));
  const section = sectionProp ?? fallback.section;
  const items = itemsProp ?? fallback.items;

  return (
    <motion.section
      animate="visible"
      className="px-6 py-16 sm:px-8 lg:px-10"
      initial={false}
      variants={fadeUp}
    >
      <div className="mx-auto max-w-3xl rounded-4xl border border-border bg-[linear-gradient(180deg,rgba(14,19,29,0.92),rgba(10,15,23,0.9))] p-8 shadow-[0_18px_45px_rgba(3,7,14,0.34)]">
        <h2 className="text-2xl font-semibold tracking-[-0.04em] text-secondary sm:text-3xl">
          {section.heading}
        </h2>
        {section.description ? (
          <p className="mt-4 text-base leading-7 text-muted">
            {section.description}
          </p>
        ) : null}

        <motion.ul
          className="mt-8 space-y-5"
          variants={staggerContainer}
        >
          {items.map((item, i) => {
            return (
              <motion.li
                className="flex gap-4 rounded-4-5xl border border-white/6 bg-white/2 px-5 py-4"
                key={item.title}
                variants={staggerItem}
              >
                <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border-strong bg-accent/10">
                  {i + 1}
                </span>
                <div>
                  <p className="font-medium text-primary">
                    {item.title}
                  </p>
                  <p className="mt-2 leading-7 text-secondary">
                    {item.description}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </motion.section>
  );
}

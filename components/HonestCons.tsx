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
      className="px-6 py-14 sm:px-8 lg:px-10"
      initial={false}
      variants={fadeUp}
    >
      <div className="container-shell border-y border-white/8 py-10">
        <h2 className="text-2xl font-semibold tracking-[-0.04em] text-primary sm:text-3xl">
          {section.heading}
        </h2>
        {section.description ? (
          <p className="mt-4 text-base leading-7 text-muted">
            {section.description}
          </p>
        ) : null}

        <motion.ul
          className="mt-7 grid gap-x-8 gap-y-6 md:grid-cols-3"
          variants={staggerContainer}
        >
          {items.map((item) => {
            return (
              <motion.li
                className="border-t border-white/8 pt-4"
                key={item.title}
                variants={staggerItem}
              >
                <p className="font-medium text-primary">{item.title}</p>
                <p className="mt-2 text-sm leading-6 text-secondary">
                  {item.description}
                </p>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </motion.section>
  );
}

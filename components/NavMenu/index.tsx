"use client";

import React, { useCallback, useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Home, Beaker, Shield, GitBranch, LifeBuoy, Bug, ArrowUpRight } from "lucide-react";
import { AppleLogo, AndroidLogo } from "@phosphor-icons/react";
import { Divide as Hamburger } from "hamburger-react";
import { NAV, type NavLink } from "@/lib/content";

const EASE = [0.22, 1, 0.36, 1] as const;

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25, ease: EASE } },
  exit: { opacity: 0, transition: { duration: 0.2, ease: EASE } },
} as const;

const panelVariants = {
  hidden: { x: "-100%" },
  visible: {
    x: 0,
    transition: {
      duration: 0.4,
      ease: EASE,
      when: "beforeChildren",
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
  exit: {
    x: "-100%",
    transition: { duration: 0.28, ease: EASE },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: EASE } },
  exit: { opacity: 0, x: -12, transition: { duration: 0.15, ease: EASE } },
} as const;

const LINK_ICONS: Record<string, React.ElementType> = {
  Home,
  "Beta Programs": Beaker,
  GitHub: GitBranch,
  "Privacy Policy": Shield,
  Support: LifeBuoy,
  "Report a bug": Bug,
};

const BETA_PLATFORMS = [
  {
    id: "ios",
    label: "iOS TestFlight",
    href: "https://testflight.apple.com/join/FqdM3mFK",
    Icon: AppleLogo,
  },
  {
    id: "android",
    label: "Android beta",
    href: "/android-beta",
    Icon: AndroidLogo,
  },
] as const;

function detectPlatform(): "ios" | "android" | "desktop" {
  if (typeof navigator === "undefined") return "desktop";
  const ua = navigator.userAgent;
  if (/android/i.test(ua)) return "android";
  if (/iphone|ipad|ipod/i.test(ua)) return "ios";
  return "desktop";
}

function useMobilePlatform(): "ios" | "android" | "desktop" {
  const [platform] = useState<"ios" | "android" | "desktop">(detectPlatform);

  return platform;
}

export function NavMenu(): React.JSX.Element {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const panelId = useId();
  const mobilePlatform = useMobilePlatform();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      firstLinkRef.current?.focus();
    }
  }, [open]);

  const close = useCallback(() => setOpen(false), []);

  // On mobile, replace "Beta Programs" with two platform-specific items in priority order
  const navLinks = React.useMemo(() => {
    if (mobilePlatform === "desktop") return NAV.links;

    const [primary, secondary] =
      mobilePlatform === "android"
        ? [BETA_PLATFORMS[1], BETA_PLATFORMS[0]]
        : [BETA_PLATFORMS[0], BETA_PLATFORMS[1]];

    return NAV.links.flatMap((link) => {
      if (!link.betaIcons) return [link];
      return [
        { label: primary.label, href: primary.href, external: primary.href.startsWith("http") },
        { label: secondary.label, href: secondary.href, external: secondary.href.startsWith("http") },
      ] satisfies NavLink[];
    });
  }, [mobilePlatform]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((prev) => !prev)}
        className={`fixed left-5 top-5 z-[60] flex h-12 w-12 items-center justify-center rounded-full border border-border bg-bg-secondary/85 text-secondary shadow-lg backdrop-blur transition-[border-color,color,box-shadow,transform,opacity] duration-300 ease-out hover:border-accent hover:text-primary hover:shadow-[0_8px_24px_-8px_rgba(99,179,255,0.55)] motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0 motion-safe:active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary ${open ? "pointer-events-none opacity-0" : "opacity-100"}`}
      >
        <span aria-hidden="true" className="pointer-events-none">
          <Hamburger toggled={open} toggle={setOpen} size={18} color="currentColor" />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open ? (
          <>
            <motion.button
              type="button"
              tabIndex={-1}
              aria-hidden="true"
              onClick={close}
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 z-40 cursor-default bg-bg-primary/60 backdrop-blur-sm"
            />

            <motion.nav
              id={panelId}
              aria-label="Primary"
              role="dialog"
              aria-modal="true"
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-y-0 left-0 z-50 flex w-[min(20rem,100vw)] flex-col border-r border-border bg-bg-secondary shadow-2xl"
            >
              <div className="flex h-16 shrink-0 items-center justify-between px-5">
                <span className="text-base font-semibold text-primary">Menu</span>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={close}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-bg-primary/60 text-secondary transition-colors hover:border-accent hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>

              <div className="flex flex-col gap-1 px-3">
                <ul role="list" className="flex flex-col gap-0.5">
                  {navLinks.map((link, idx) => (
                    <React.Fragment key={link.href}>
                      {link.separatorBefore ? (
                        <div className="my-3 mx-1 h-px bg-border" />
                      ) : null}
                      <NavPanelItem
                        link={link}
                        onActivate={close}
                        isDesktop={mobilePlatform === "desktop"}
                        forwardedRef={idx === 0 ? firstLinkRef : undefined}
                      />
                    </React.Fragment>
                  ))}
                </ul>
              </div>

              <div className="mt-auto border-t border-border px-4 py-4">
                <p className="text-xs font-semibold text-muted">Threadbase</p>
                <p className="mt-0.5 text-xs text-muted">v1.0</p>
              </div>
            </motion.nav>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}

function NavPanelItem({
  link,
  onActivate,
  isDesktop,
  forwardedRef,
}: {
  link: NavLink;
  onActivate: () => void;
  isDesktop: boolean;
  forwardedRef?: React.Ref<HTMLAnchorElement>;
}): React.JSX.Element {
  const external = link.external ?? /^https?:\/\//.test(link.href);
  const Icon = LINK_ICONS[link.label];

  const showBetaIcons = isDesktop && link.betaIcons;

  return (
    <motion.li variants={itemVariants}>
      <div className="group flex items-center gap-3 rounded-xl px-4 py-3 text-base text-secondary transition-colors duration-200 hover:bg-bg-primary/60 hover:text-primary">
        {Icon ? (
          <Icon
            aria-hidden="true"
            size={18}
            className="shrink-0 text-muted transition-colors duration-200 group-hover:text-primary"
          />
        ) : null}
        <Link
          ref={forwardedRef}
          href={link.href}
          onClick={onActivate}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className="flex-1 focus-visible:outline-none"
        >
          {link.label}
        </Link>
        {showBetaIcons ? (
          <div className="flex items-center gap-1.5">
            {BETA_PLATFORMS.map(({ id, label: platformLabel, href, Icon: PlatformIcon }) => (
              <Link
                key={id}
                href={href}
                onClick={onActivate}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={platformLabel}
                className="flex h-7 w-7 items-center justify-center rounded-full border border-border bg-bg-primary/60 text-muted transition-colors duration-200 hover:border-accent hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <PlatformIcon size={14} weight="duotone" />
              </Link>
            ))}
          </div>
        ) : null}
        {external && !showBetaIcons ? (
          <ArrowUpRight
            aria-hidden="true"
            size={14}
            className="shrink-0 text-muted opacity-0 transition-[opacity,transform] duration-200 group-hover:translate-x-0.5 group-hover:opacity-100"
          />
        ) : null}
      </div>
    </motion.li>
  );
}

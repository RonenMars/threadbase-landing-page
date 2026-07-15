"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { getFooterContent } from "@/lib/translated-content";

export function Footer(): React.JSX.Element {
  const footer = getFooterContent(useTranslations("footer"));

  return (
    <footer className="border-t border-white/6 bg-bg-secondary px-6 py-12 sm:px-8 lg:px-10">
      <div className="container-shell space-y-8">
        <div className="flex flex-col gap-3 text-start sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-3 text-secondary">
            <span className="text-base font-semibold tracking-tight text-primary">
              {footer.productName}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-accent-secondary" />
            <span>{footer.licenseText}</span>
          </div>
          <nav className="flex flex-wrap gap-4 text-secondary">
            {footer.links.map((link) => (
              <Link
                className="transition-colors hover:text-primary"
                href={link.href}
                key={link.label}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-6 leading-7 text-muted sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
          <p className="text-secondary">{footer.tagline}</p>
          <p>{footer.disclaimer}</p>
          </div>
          <LanguageSwitcher />
        </div>
      </div>
    </footer>
  );
}

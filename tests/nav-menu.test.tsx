import { screen, fireEvent } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { NavMenu } from "@/components/NavMenu";
import { NAV_LINK_CONFIG } from "@/lib/content";
import enTranslations from "@/locales/en.json";
import { renderWithIntl } from "@/tests/test-utils";

describe("NavMenu", () => {
  it("renders a hamburger button with an accessible label", () => {
    renderWithIntl(<NavMenu />);
    const trigger = screen.getByRole("button", { name: /open menu/i });
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("renders a compact language selector before the menu opens", () => {
    renderWithIntl(<NavMenu />);
    expect(screen.getByRole("button", { name: /change language/i })).toHaveTextContent("🌐EN▾");
  });

  it("hides the current language inside the compact dropdown", () => {
    renderWithIntl(<NavMenu />);
    fireEvent.click(screen.getByRole("button", { name: /change language/i }));
    expect(screen.queryByRole("link", { name: enTranslations.languageSwitcher.localeLabels.en })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: enTranslations.languageSwitcher.localeLabels.ru })).toBeInTheDocument();
  });

  it("keeps the current language in the menu selector", () => {
    renderWithIntl(<NavMenu />);
    fireEvent.click(screen.getByRole("button", { name: /open menu/i }));
    expect(screen.getByRole("link", { name: enTranslations.languageSwitcher.localeLabels.en })).toBeInTheDocument();
  });

  it("opens the menu when the hamburger is clicked", () => {
    renderWithIntl(<NavMenu />);
    const trigger = screen.getByRole("button", { name: /open menu/i });
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    // hamburger-react also renders an internal button; check the outer trigger directly
    expect(trigger).toHaveAttribute("aria-label", "Close menu");
  });

  it("remembers manual locale selection", () => {
    document.cookie = "NEXT_LOCALE=; path=/; max-age=0";
    renderWithIntl(<NavMenu />);
    fireEvent.click(screen.getByRole("button", { name: /change language/i }));
    fireEvent.click(screen.getByRole("link", { name: enTranslations.languageSwitcher.localeLabels.ru }));
    expect(document.cookie).toContain("NEXT_LOCALE=ru");
  });

  it("renders all nav links from content when open", () => {
    renderWithIntl(<NavMenu />);
    fireEvent.click(screen.getByRole("button", { name: /open menu/i }));
    for (const link of NAV_LINK_CONFIG) {
      const label = enTranslations.nav.links[link.id];
      expect(screen.getByRole("link", { name: label })).toHaveAttribute("href", link.href);
    }
  });

  it("closes when the user presses Escape", () => {
    renderWithIntl(<NavMenu />);
    const trigger = screen.getByRole("button", { name: /open menu/i });
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    fireEvent.keyDown(window, { key: "Escape" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("closes when a nav link is activated", () => {
    renderWithIntl(<NavMenu />);
    const trigger = screen.getByRole("button", { name: /open menu/i });
    fireEvent.click(trigger);
    const firstLink = screen.getByRole("link", { name: enTranslations.nav.links.home });
    fireEvent.click(firstLink);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  // Variant F — Dropbox-style panel specific tests

  it("panel has role=dialog and aria-modal=true when open (Variant F: slide-in panel)", () => {
    renderWithIntl(<NavMenu />);
    fireEvent.click(screen.getByRole("button", { name: /open menu/i }));
    const panel = screen.getByRole("dialog");
    expect(panel).toBeInTheDocument();
    expect(panel).toHaveAttribute("aria-modal", "true");
  });

  it("renders all nav links in a single flat list when open (Variant F: flat layout)", () => {
    renderWithIntl(<NavMenu />);
    fireEvent.click(screen.getByRole("button", { name: /open menu/i }));
    expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /beta programs/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /github/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /report a bug/i })).toBeInTheDocument();
  });

  it("keeps Tab focus inside the panel while it is open", () => {
    renderWithIntl(<NavMenu />);
    fireEvent.click(screen.getByRole("button", { name: /open menu/i }));
    const panel = screen.getByRole("dialog");
    const focusable = panel.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    last.focus();
    fireEvent.keyDown(window, { key: "Tab" });
    expect(document.activeElement).toBe(first);

    fireEvent.keyDown(window, { key: "Tab", shiftKey: true });
    expect(document.activeElement).toBe(last);
  });

  describe("on a mobile platform", () => {
    afterEach(() => {
      vi.unstubAllGlobals();
    });

    it("gives each beta platform row its own icon", async () => {
      vi.stubGlobal("navigator", {
        ...navigator,
        userAgent:
          "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 Chrome/120 Mobile Safari/537.36",
      });
      renderWithIntl(<NavMenu />);
      fireEvent.click(screen.getByRole("button", { name: /open menu/i }));

      const android = await screen.findByRole("link", {
        name: enTranslations.nav.betaPlatforms.android,
      });
      const ios = screen.getByRole("link", {
        name: enTranslations.nav.betaPlatforms.ios,
      });

      // Each row is one <li>; the icon is the row's own svg, not a shared ancestor's.
      const iconOf = (link: HTMLElement): string | undefined =>
        link.closest("li")?.querySelector("svg")?.outerHTML;

      const androidIcon = iconOf(android);
      const iosIcon = iconOf(ios);

      expect(androidIcon).toBeDefined();
      expect(iosIcon).toBeDefined();
      // Both rows resolved to the generic Beaker before the per-platform icon fix.
      expect(androidIcon).not.toBe(iosIcon);
    });
  });
});

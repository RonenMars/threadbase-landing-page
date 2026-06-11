import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { NavMenu } from "@/components/NavMenu";
import { NAV } from "@/lib/content";

describe("NavMenu", () => {
  it("renders a hamburger button with an accessible label", () => {
    render(<NavMenu />);
    const trigger = screen.getByRole("button", { name: /open menu/i });
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("opens the menu when the hamburger is clicked", () => {
    render(<NavMenu />);
    const trigger = screen.getByRole("button", { name: /open menu/i });
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    // hamburger-react also renders an internal button; check the outer trigger directly
    expect(trigger).toHaveAttribute("aria-label", "Close menu");
  });

  it("renders all nav links from content when open", () => {
    render(<NavMenu />);
    fireEvent.click(screen.getByRole("button", { name: /open menu/i }));
    for (const link of NAV.links) {
      expect(screen.getByRole("link", { name: link.label })).toHaveAttribute("href", link.href);
    }
  });

  it("closes when the user presses Escape", () => {
    render(<NavMenu />);
    const trigger = screen.getByRole("button", { name: /open menu/i });
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    fireEvent.keyDown(window, { key: "Escape" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("closes when a nav link is activated", () => {
    render(<NavMenu />);
    const trigger = screen.getByRole("button", { name: /open menu/i });
    fireEvent.click(trigger);
    const firstLink = screen.getByRole("link", { name: NAV.links[0].label });
    fireEvent.click(firstLink);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  // Variant F — Dropbox-style panel specific tests

  it("panel has role=dialog and aria-modal=true when open (Variant F: slide-in panel)", () => {
    render(<NavMenu />);
    fireEvent.click(screen.getByRole("button", { name: /open menu/i }));
    const panel = screen.getByRole("dialog");
    expect(panel).toBeInTheDocument();
    expect(panel).toHaveAttribute("aria-modal", "true");
  });

  it("renders all nav links in a single flat list when open (Variant F: flat layout)", () => {
    render(<NavMenu />);
    fireEvent.click(screen.getByRole("button", { name: /open menu/i }));
    expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /beta programs/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /github/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /report a bug/i })).toBeInTheDocument();
  });
});

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "@/app/page";
import { PLATFORMS, QUICK_START } from "@/lib/content";

describe("Home", () => {
  it("renders the full landing page narrative", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", {
        name: "Your AI session history is a goldmine. Start mining it.",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Claude Code is powerful. Finding what you built last week isn't.",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Everything you need. Nothing you don't.",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Four platforms. One history.",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Beyond Claude Code." }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "See it in action" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Good to know" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Get started in under a minute" }),
    ).toBeInTheDocument();
  });

  it("renders install choices and quick-start commands from content", () => {
    render(<Home />);

    // Platform picker buttons are present
    for (const platform of PLATFORMS) {
      const escapedName = platform.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      expect(screen.getAllByRole("button", { name: new RegExp(escapedName, "i") }).length).toBeGreaterThan(0);
    }

    // QuickStart tab bar renders all tab labels
    for (const block of QUICK_START) {
      expect(screen.getAllByRole("button", { name: block.platformName }).length).toBeGreaterThan(0);
    }

    // Active tab (desktop by default) content is visible
    const desktopBlock = QUICK_START.find((b) => b.platformId === "desktop")!;
    for (const line of desktopBlock.steps) {
      if (line.length === 0) continue;
      expect(screen.getAllByText(line).length).toBeGreaterThan(0);
    }
  });
});

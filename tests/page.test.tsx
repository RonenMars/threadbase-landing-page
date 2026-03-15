import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "@/app/page";
import { PLATFORMS, QUICK_START } from "@/lib/content";

describe("Home", () => {
  it("renders the full landing page narrative", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", {
        name: "Your Claude Code history is a goldmine. Start mining it.",
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
        name: "Three platforms. One history.",
      }),
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

    for (const platform of PLATFORMS) {
      expect(
        screen.getByRole("heading", { name: platform.name }),
      ).toBeInTheDocument();
      expect(
        screen.getAllByRole("button", { name: platform.ctaLabel }).length,
      ).toBeGreaterThan(0);
    }

    for (const block of QUICK_START) {
      expect(screen.getAllByText(block.platformName).length).toBeGreaterThan(0);
      for (const line of block.steps) {
        if (line.length === 0) {
          continue;
        }
        expect(screen.getAllByText(line).length).toBeGreaterThan(0);
      }
    }
  });
});

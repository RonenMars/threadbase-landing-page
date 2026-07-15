import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProblemSection } from "@/components/ProblemSection";
import { renderWithIntl } from "@/tests/test-utils";

describe("ProblemSection", () => {
  it("renders 3 cards", () => {
    renderWithIntl(<ProblemSection />);
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(3);
  });

  it("renders Coffee, Bell, MapPin Phosphor icons (svgs are present)", () => {
    const { container } = renderWithIntl(<ProblemSection />);
    // Phosphor renders <svg> elements. We expect 3 — one per problem card.
    const svgs = container.querySelectorAll("svg");
    expect(svgs.length).toBeGreaterThanOrEqual(3);
  });

  it("does NOT render emoji strings in card titles or icon slots", () => {
    const { container } = renderWithIntl(<ProblemSection />);
    const text = container.textContent ?? "";
    // No emoji unicode characters at all
    expect(text).not.toMatch(/[\u{1F300}-\u{1FAFF}]/u);
  });
});

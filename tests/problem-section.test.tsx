import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProblemSection } from "@/components/ProblemSection";
import { PROBLEM_ITEMS, PROBLEM_SECTION } from "@/lib/content";

describe("ProblemSection", () => {
  it("renders 3 cards", () => {
    render(<ProblemSection items={PROBLEM_ITEMS} section={PROBLEM_SECTION} />);
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(3);
  });

  it("renders Coffee, Bell, MapPin Phosphor icons (svgs are present)", () => {
    const { container } = render(
      <ProblemSection items={PROBLEM_ITEMS} section={PROBLEM_SECTION} />,
    );
    // Phosphor renders <svg> elements. We expect 3 — one per problem card.
    const svgs = container.querySelectorAll("svg");
    expect(svgs.length).toBeGreaterThanOrEqual(3);
  });

  it("does NOT render emoji strings in card titles or icon slots", () => {
    const { container } = render(
      <ProblemSection items={PROBLEM_ITEMS} section={PROBLEM_SECTION} />,
    );
    const text = container.textContent ?? "";
    // No emoji unicode characters at all
    expect(text).not.toMatch(/[\u{1F300}-\u{1FAFF}]/u);
  });
});

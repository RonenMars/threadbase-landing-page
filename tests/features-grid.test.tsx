import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FeaturesGrid } from "@/components/FeaturesGrid";
import { FEATURE_CONFIG } from "@/lib/content";
import { renderWithIntl } from "@/tests/test-utils";

describe("FeaturesGrid", () => {
  it("renders the section heading", () => {
    renderWithIntl(<FeaturesGrid />);
    expect(
      screen.getByRole("heading", { name: /keep every agent moving/i }),
    ).toBeInTheDocument();
  });

  it("renders the six workflow pillars", () => {
    renderWithIntl(<FeaturesGrid />);
    expect(screen.getByText(/we’ll tell you when the agent needs you/i)).toBeInTheDocument();
    expect(screen.getByText(/start at your desk.*continue from your phone/i)).toBeInTheDocument();
    expect(screen.getByText(/without fighting a tiny terminal/i)).toBeInTheDocument();
    expect(screen.getByText(/the line you don’t/i)).toBeInTheDocument();
    expect(screen.getByText(/take over the session you started at your desk/i)).toBeInTheDocument();
    expect(screen.getByText(/actually working from a phone/i)).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(6);
  });

  it("renders main icons as SVGs (Phosphor)", () => {
    const { container } = renderWithIntl(<FeaturesGrid />);
    const svgs = container.querySelectorAll("svg");
    expect(svgs.length).toBeGreaterThanOrEqual(FEATURE_CONFIG.length);
  });

  it("does NOT render emoji strings in feature cards", () => {
    const { container } = renderWithIntl(<FeaturesGrid />);
    const text = container.textContent ?? "";
    expect(text).not.toMatch(/[\u{1F300}-\u{1FAFF}]/u);
  });
});

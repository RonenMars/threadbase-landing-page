import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FeaturesGrid } from "@/components/FeaturesGrid";
import { FEATURES, FEATURES_SECTION } from "@/lib/content";

describe("FeaturesGrid", () => {
  it("renders the section heading", () => {
    render(<FeaturesGrid features={FEATURES} section={FEATURES_SECTION} />);
    expect(
      screen.getByRole("heading", { name: /phone-shaped tools/i }),
    ).toBeInTheDocument();
  });

  it("renders all 6 feature titles", () => {
    render(<FeaturesGrid features={FEATURES} section={FEATURES_SECTION} />);
    expect(screen.getByText(/Live PTY streaming/i)).toBeInTheDocument();
    expect(screen.getByText(/Tool-call approvals/i)).toBeInTheDocument();
    expect(screen.getByText(/Multi-server pairing/i)).toBeInTheDocument();
    expect(screen.getByText(/Push notifications/i)).toBeInTheDocument();
    expect(screen.getByText(/Native interactive prompts/i)).toBeInTheDocument();
    expect(screen.getByText(/Resilient by default/i)).toBeInTheDocument();
  });

  it("renders main icons as SVGs (Phosphor)", () => {
    const { container } = render(
      <FeaturesGrid features={FEATURES} section={FEATURES_SECTION} />,
    );
    const svgs = container.querySelectorAll("svg");
    expect(svgs.length).toBeGreaterThanOrEqual(FEATURES.length);
  });

  it("does NOT render emoji strings in feature cards", () => {
    const { container } = render(
      <FeaturesGrid features={FEATURES} section={FEATURES_SECTION} />,
    );
    const text = container.textContent ?? "";
    expect(text).not.toMatch(/[\u{1F300}-\u{1FAFF}]/u);
  });
});

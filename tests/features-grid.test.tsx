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
    expect(screen.getByText(/Mission Control/i)).toBeInTheDocument();
    expect(screen.getByText(/Voice prompts/i)).toBeInTheDocument();
  });

  it("renders main icons + surface tags as SVGs (Phosphor)", () => {
    const { container } = render(
      <FeaturesGrid features={FEATURES} section={FEATURES_SECTION} />,
    );
    // 6 main icons + at least 1 surface tag per card = at least 12 SVGs.
    const svgs = container.querySelectorAll("svg");
    expect(svgs.length).toBeGreaterThanOrEqual(FEATURES.length * 2);
  });

  it("does NOT render emoji strings in feature cards", () => {
    const { container } = render(
      <FeaturesGrid features={FEATURES} section={FEATURES_SECTION} />,
    );
    const text = container.textContent ?? "";
    // eslint-disable-next-line no-control-regex
    expect(text).not.toMatch(/[\u{1F300}-\u{1FAFF}]/u);
  });
});

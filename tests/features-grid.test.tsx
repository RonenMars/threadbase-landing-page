import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FeaturesGrid } from "@/components/FeaturesGrid";
import { FEATURE_CONFIG } from "@/lib/content";
import { renderWithIntl } from "@/tests/test-utils";

describe("FeaturesGrid", () => {
  it("renders the section heading", () => {
    renderWithIntl(<FeaturesGrid />);
    expect(
      screen.getByRole("heading", { name: /phone-shaped tools/i }),
    ).toBeInTheDocument();
  });

  it("renders all 6 feature titles", () => {
    renderWithIntl(<FeaturesGrid />);
    expect(screen.getByText(/Claude \+ Codex live sessions/i)).toBeInTheDocument();
    expect(screen.getByText(/Remote session control/i)).toBeInTheDocument();
    expect(screen.getByText(/Multi-server pairing/i)).toBeInTheDocument();
    expect(screen.getByText(/Push notifications/i)).toBeInTheDocument();
    expect(screen.getByText(/Native prompt cards/i)).toBeInTheDocument();
    expect(screen.getByText(/Resilient by default/i)).toBeInTheDocument();
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

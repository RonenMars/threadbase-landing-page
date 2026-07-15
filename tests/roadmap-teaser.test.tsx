import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { RoadmapTeaser } from "@/components/RoadmapTeaser";
import { ROADMAP_MILESTONE_CONFIG } from "@/lib/content";
import enMessages from "@/messages/en.json";
import { renderWithIntl } from "@/tests/test-utils";

describe("RoadmapTeaser", () => {
  it("renders all milestone titles", () => {
    renderWithIntl(<RoadmapTeaser />);
    for (const milestone of enMessages.home.roadmap.milestones) {
      expect(screen.getByText(milestone.title)).toBeInTheDocument();
    }
  });

  it("renders the section heading", () => {
    renderWithIntl(<RoadmapTeaser />);
    expect(
      screen.getByRole("heading", {
        name: enMessages.home.roadmap.section.heading,
      }),
    ).toBeInTheDocument();
  });

  it("renders the waitlist form", () => {
    renderWithIntl(<RoadmapTeaser />);
    expect(screen.getByPlaceholderText("you@company.com")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Notify me" })).toBeInTheDocument();
  });

  it("shows success message after waitlist submit", async () => {
    const user = userEvent.setup();
    renderWithIntl(<RoadmapTeaser />);
    await user.click(screen.getByRole("button", { name: "Notify me" }));
    expect(screen.getByText(/you're on the list/i)).toBeInTheDocument();
  });

  it("renders status icons as SVG (Phosphor)", () => {
    const { container } = renderWithIntl(<RoadmapTeaser />);
    // Each milestone gets one status icon SVG on its node.
    const svgs = container.querySelectorAll("svg");
    expect(svgs.length).toBeGreaterThanOrEqual(ROADMAP_MILESTONE_CONFIG.length);
  });

  it("does NOT render emoji status glyphs", () => {
    const { container } = renderWithIntl(<RoadmapTeaser />);
    const text = container.textContent ?? "";
    expect(text).not.toMatch(/[\u{1F300}-\u{1FAFF}]/u);
  });
});

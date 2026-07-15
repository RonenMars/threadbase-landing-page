import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { RoadmapTeaser } from "@/components/RoadmapTeaser";
import { ROADMAP_MILESTONES, ROADMAP_SECTION } from "@/lib/content";

describe("RoadmapTeaser", () => {
  it("renders all milestone titles", () => {
    render(<RoadmapTeaser milestones={ROADMAP_MILESTONES} section={ROADMAP_SECTION} />);
    for (const milestone of ROADMAP_MILESTONES) {
      expect(screen.getByText(milestone.title)).toBeInTheDocument();
    }
  });

  it("renders the section heading", () => {
    render(<RoadmapTeaser milestones={ROADMAP_MILESTONES} section={ROADMAP_SECTION} />);
    expect(screen.getByRole("heading", { name: ROADMAP_SECTION.heading })).toBeInTheDocument();
  });

  it("renders the waitlist form", () => {
    render(<RoadmapTeaser milestones={ROADMAP_MILESTONES} section={ROADMAP_SECTION} />);
    expect(screen.getByPlaceholderText("you@company.com")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Notify me" })).toBeInTheDocument();
  });

  it("shows success message after waitlist submit", async () => {
    const user = userEvent.setup();
    render(<RoadmapTeaser milestones={ROADMAP_MILESTONES} section={ROADMAP_SECTION} />);
    await user.click(screen.getByRole("button", { name: "Notify me" }));
    expect(screen.getByText(/you're on the list/i)).toBeInTheDocument();
  });

  it("renders status icons as SVG (Phosphor)", () => {
    const { container } = render(
      <RoadmapTeaser milestones={ROADMAP_MILESTONES} section={ROADMAP_SECTION} />,
    );
    // Each milestone gets one status icon SVG on its node.
    const svgs = container.querySelectorAll("svg");
    expect(svgs.length).toBeGreaterThanOrEqual(ROADMAP_MILESTONES.length);
  });

  it("does NOT render emoji status glyphs", () => {
    const { container } = render(
      <RoadmapTeaser milestones={ROADMAP_MILESTONES} section={ROADMAP_SECTION} />,
    );
    const text = container.textContent ?? "";
    expect(text).not.toMatch(/[\u{1F300}-\u{1FAFF}]/u);
  });
});

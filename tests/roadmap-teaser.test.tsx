import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { RoadmapTeaser } from "@/components/RoadmapTeaser";
import { ROADMAP_MILESTONES, ROADMAP_SECTION } from "@/lib/content";

describe("RoadmapTeaser", () => {
  it("renders all milestone titles", () => {
    render(<RoadmapTeaser milestones={ROADMAP_MILESTONES} section={ROADMAP_SECTION} />);
    expect(screen.getByText("Claude Code")).toBeInTheDocument();
    expect(screen.getByText("Coming soon")).toBeInTheDocument();
    expect(screen.getByText("Planned")).toBeInTheDocument();
    expect(screen.getByText("Future")).toBeInTheDocument();
  });

  it("renders the section heading", () => {
    render(<RoadmapTeaser milestones={ROADMAP_MILESTONES} section={ROADMAP_SECTION} />);
    expect(screen.getByRole("heading", { name: "Beyond Claude Code." })).toBeInTheDocument();
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
});

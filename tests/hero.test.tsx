import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Hero } from "@/components/Hero";
import { HERO } from "@/lib/content";

describe("Hero", () => {
  it("renders the new headline text", () => {
    render(<Hero hero={HERO} />);
    const root = screen.getByRole("banner") ?? document.body;
    expect(root.textContent).toContain("Your terminal.");
    expect(root.textContent).toContain("In your pocket.");
    expect(root.textContent).toContain("Live.");
  });

  it("renders the eyebrow", () => {
    render(<Hero hero={HERO} />);
    expect(screen.getByText(/claude code, untethered/i)).toBeInTheDocument();
  });

  it("renders the code-comment subheadline", () => {
    render(<Hero hero={HERO} />);
    expect(
      screen.getByText(/\/\/ Your Claude Code sessions/i),
    ).toBeInTheDocument();
  });

  it("renders 3 platform badges", () => {
    render(<Hero hero={HERO} />);
    expect(screen.getByText(/iOS · TestFlight beta/)).toBeInTheDocument();
    expect(screen.getByText(/Android · coming days/)).toBeInTheDocument();
    expect(screen.getByText(/macOS · Linux · Windows streamer/)).toBeInTheDocument();
  });

  it("renders both CTAs", () => {
    render(<Hero hero={HERO} />);
    expect(screen.getByText(/Join TestFlight/i)).toBeInTheDocument();
    expect(screen.getByText(/brew install threadbase-streamer/)).toBeInTheDocument();
  });

  it("does NOT render the old workflow steps or shell stages", () => {
    render(<Hero hero={HERO} />);
    expect(screen.queryByText(/Decode JSONL/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Command Palette/i)).not.toBeInTheDocument();
  });
});

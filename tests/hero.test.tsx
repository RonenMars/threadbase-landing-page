import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
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
    expect(screen.getByText(/claude code \+ codex cli, untethered/i)).toBeInTheDocument();
  });

  it("renders 3 platform badges", () => {
    render(<Hero hero={HERO} />);
    expect(screen.getByText(/iOS · TestFlight beta/)).toBeInTheDocument();
    expect(screen.getByText(/Android · closed testing/)).toBeInTheDocument();
    expect(screen.getByText(/macOS · Linux · Windows streamer/)).toBeInTheDocument();
  });

  it("renders both CTAs", () => {
    render(<Hero hero={HERO} />);
    const betaCta = screen.getByRole("button", { name: /join the beta/i });
    expect(betaCta).toHaveAttribute("href", "https://threadbase.sh/betas");
    expect(screen.getByText(/brew install tb-streamer/)).toBeInTheDocument();
  });

  it("does NOT render the old workflow steps or shell stages", () => {
    render(<Hero hero={HERO} />);
    expect(screen.queryByText(/Decode JSONL/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Command Palette/i)).not.toBeInTheDocument();
  });

  it("copies the brew install command to the clipboard when the outline CTA is clicked", () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      configurable: true,
    });

    render(<Hero hero={HERO} />);
    const copyBtn = screen.getByRole("button", {
      name: /^copy: brew install tb-streamer$/i,
    });
    fireEvent.click(copyBtn);

    expect(writeText).toHaveBeenCalledWith("brew install tb-streamer");
    // After click, the aria-label flips to indicate the copied state.
    expect(
      screen.getByRole("button", { name: /copied to clipboard/i }),
    ).toBeInTheDocument();
  });
});

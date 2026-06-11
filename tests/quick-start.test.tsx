import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { QuickStart } from "@/components/QuickStart";
import { QUICK_START } from "@/lib/content";

describe("QuickStart", () => {
  it("renders the single code block with the new heading", () => {
    render(<QuickStart content={QUICK_START} />);
    expect(
      screen.getByRole("heading", { name: /under a minute/i }),
    ).toBeInTheDocument();
  });

  it("renders the brew install line", () => {
    render(<QuickStart content={QUICK_START} />);
    expect(screen.getByText(/brew install threadbase-streamer/)).toBeInTheDocument();
  });

  it("renders Linux, Windows, and Android inline links below the code block", () => {
    render(<QuickStart content={QUICK_START} />);
    expect(screen.getByRole("link", { name: /^linux$/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /^windows$/i })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /android.*closed beta/i }),
    ).toBeInTheDocument();
  });

  it("does NOT render the platform tab bar", () => {
    render(<QuickStart content={QUICK_START} />);
    expect(screen.queryByRole("tablist")).not.toBeInTheDocument();
  });
});

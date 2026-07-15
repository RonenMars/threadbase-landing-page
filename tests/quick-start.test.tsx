import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { QuickStart } from "@/components/QuickStart";
import { renderWithIntl } from "@/tests/test-utils";

describe("QuickStart", () => {
  it("renders the single code block with the new heading", () => {
    renderWithIntl(<QuickStart />);
    expect(
      screen.getByRole("heading", { name: /under a minute/i }),
    ).toBeInTheDocument();
  });

  it("renders the brew install line", () => {
    renderWithIntl(<QuickStart />);
    expect(screen.getByText(/brew install tb-streamer/)).toBeInTheDocument();
  });

  it("renders Linux, Windows, and Android inline links below the code block", () => {
    renderWithIntl(<QuickStart />);
    expect(screen.getByRole("link", { name: /^linux$/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /^windows$/i })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /android.*closed beta/i }),
    ).toBeInTheDocument();
  });

  it("does NOT render the platform tab bar", () => {
    renderWithIntl(<QuickStart />);
    expect(screen.queryByRole("tablist")).not.toBeInTheDocument();
  });
});

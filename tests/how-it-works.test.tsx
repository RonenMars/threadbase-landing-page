import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HowItWorks } from "@/components/HowItWorks";
import { renderWithIntl } from "@/tests/test-utils";

describe("HowItWorks", () => {
  it("renders the section heading", () => {
    renderWithIntl(<HowItWorks />);
    expect(
      screen.getByRole("heading", { name: /run the streamer.*pair your phone/i }),
    ).toBeInTheDocument();
  });

  it("renders 3 numbered steps with their titles", () => {
    renderWithIntl(<HowItWorks />);
    expect(
      screen.getByText(/Install the streamer on any machine/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Pair your phone with a QR code/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/We’ll push you when the agent needs you/i),
    ).toBeInTheDocument();
  });

  it("renders single-digit number badges (1, 2, 3 — not 01, 02, 03)", () => {
    renderWithIntl(<HowItWorks />);
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.queryByText("01")).not.toBeInTheDocument();
  });

  it("renders the postscript on step 3 as italic", () => {
    renderWithIntl(<HowItWorks />);
    const postscript = screen.getByText(
      "Pair more machines and switch between them from one app.",
    );
    expect(postscript.closest("[class*='italic']")).not.toBeNull();
  });

  it("renders the trust note below the cards", () => {
    renderWithIntl(<HowItWorks />);
    expect(screen.getByText(/Pair more machines whenever you need them/i)).toBeInTheDocument();
    expect(document.body.textContent).not.toMatch(/end-to-end encrypted/i);
  });
});

import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HowItWorks } from "@/components/HowItWorks";
import { renderWithIntl } from "@/tests/test-utils";

describe("HowItWorks", () => {
  it("renders the section heading", () => {
    renderWithIntl(<HowItWorks />);
    expect(
      screen.getByRole("heading", { name: /ten seconds. forever paired/i }),
    ).toBeInTheDocument();
  });

  it("renders 3 numbered steps with their titles", () => {
    renderWithIntl(<HowItWorks />);
    expect(screen.getByText(/Run the streamer on your Mac/i)).toBeInTheDocument();
    expect(screen.getByText(/Pair your phone in 10 seconds/i)).toBeInTheDocument();
    expect(screen.getByText(/Use your agent from anywhere/i)).toBeInTheDocument();
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
    const postscript = screen.getByText(/Pair more machines/i);
    expect(postscript.closest("[class*='italic']")).not.toBeNull();
  });

  it("renders the trust note below the cards", () => {
    renderWithIntl(<HowItWorks />);
    expect(screen.getByText(/End-to-end encrypted pairing via NaCl/i)).toBeInTheDocument();
  });
});

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HowItWorks } from "@/components/HowItWorks";
import { HOW_IT_WORKS } from "@/lib/content";

describe("HowItWorks", () => {
  it("renders the section heading", () => {
    render(<HowItWorks content={HOW_IT_WORKS} />);
    expect(
      screen.getByRole("heading", { name: /ten seconds. forever paired/i }),
    ).toBeInTheDocument();
  });

  it("renders 3 numbered steps with their titles", () => {
    render(<HowItWorks content={HOW_IT_WORKS} />);
    expect(screen.getByText(/Run the streamer on your Mac/i)).toBeInTheDocument();
    expect(screen.getByText(/Pair your phone in 10 seconds/i)).toBeInTheDocument();
    expect(screen.getByText(/Use your agent from anywhere/i)).toBeInTheDocument();
  });

  it("renders single-digit number badges (1, 2, 3 — not 01, 02, 03)", () => {
    render(<HowItWorks content={HOW_IT_WORKS} />);
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.queryByText("01")).not.toBeInTheDocument();
  });

  it("renders the postscript on step 3 as italic", () => {
    render(<HowItWorks content={HOW_IT_WORKS} />);
    const postscript = screen.getByText(/Pair more machines/i);
    expect(postscript.closest("[class*='italic']")).not.toBeNull();
  });

  it("renders the trust note below the cards", () => {
    render(<HowItWorks content={HOW_IT_WORKS} />);
    expect(screen.getByText(/End-to-end encrypted pairing via NaCl/i)).toBeInTheDocument();
  });
});

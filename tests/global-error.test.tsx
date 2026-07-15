import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import GlobalError from "@/app/global-error";

describe("GlobalError", () => {
  it("renders a dedicated global error boundary", () => {
    const reset = vi.fn();

    render(<GlobalError error={new Error("boom")} reset={reset} />);

    expect(
      screen.getByRole("heading", { name: "Something went wrong" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Try again" }),
    ).toBeInTheDocument();
  });
});

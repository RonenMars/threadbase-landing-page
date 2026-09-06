import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PhoneStrip } from "@/components/PhoneStrip";
import { renderWithIntl } from "@/tests/test-utils";

describe("PhoneStrip", () => {
  it("renders the heading and four one-line items", () => {
    renderWithIntl(<PhoneStrip />);
    expect(
      screen.getByRole("heading", { name: /built for the phone, not shrunk to it/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/strips the tui decorations/i)).toBeInTheDocument();
    expect(screen.getByText(/not a wall of ansi/i)).toBeInTheDocument();
    expect(screen.getByText(/face id lock, markdown export, favourites/i)).toBeInTheDocument();
    expect(screen.getByText(/with proper rtl/i)).toBeInTheDocument();
  });
});

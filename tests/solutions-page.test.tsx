import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SolutionsPage from "@/app/solutions/page";

describe("SolutionsPage", () => {
  it("renders a coming-soon stub with a link back to the homepage", () => {
    render(<SolutionsPage />);
    expect(screen.getByRole("heading", { name: /other surfaces/i })).toBeInTheDocument();
    expect(screen.getByText(/coming soon/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /back to threadbase/i })).toHaveAttribute("href", "/");
  });
});

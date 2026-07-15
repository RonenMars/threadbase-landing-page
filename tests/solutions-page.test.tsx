import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SolutionsPage from "@/app/[locale]/solutions/page";
import { renderWithIntl } from "@/tests/test-utils";

describe("SolutionsPage", () => {
  it("renders a coming-soon stub with a link back to the homepage", async () => {
    const page = await SolutionsPage({
      params: Promise.resolve({ locale: "en" }),
    });
    renderWithIntl(page);
    expect(screen.getByRole("heading", { name: /other surfaces/i })).toBeInTheDocument();
    expect(screen.getByText(/coming soon/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /back to threadbase/i })).toHaveAttribute("href", "/");
  });
});

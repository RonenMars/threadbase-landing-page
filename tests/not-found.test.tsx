import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import NotFound from "@/app/[locale]/not-found";
import { renderWithIntl } from "@/tests/test-utils";

describe("NotFound", () => {
  it("renders a dedicated not-found page", () => {
    renderWithIntl(<NotFound />);

    expect(
      screen.getByRole("heading", { name: "Page not found" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Return home" }),
    ).toHaveAttribute("href", "/");
  });
});

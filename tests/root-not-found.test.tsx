import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import RootNotFound from "@/app/not-found";

describe("RootNotFound", () => {
  // Rendered with a bare `render`, not `renderWithIntl`: the root 404 serves
  // requests outside any locale segment, so it must supply its own locale
  // context. If it ever starts depending on an ambient provider, this throws.
  it("renders the designed 404 without an ambient intl provider", () => {
    render(<RootNotFound />);

    expect(
      screen.getByRole("heading", { name: "Page not found" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Return home" })).toHaveAttribute(
      "href",
      "/",
    );
  });
});

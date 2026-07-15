import { act, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { FloatingDock } from "@/components/FloatingDock";
import { renderWithIntl } from "@/tests/test-utils";

function setScrollY(y: number) {
  Object.defineProperty(window, "scrollY", {
    value: y,
    writable: true,
    configurable: true,
  });
  act(() => {
    window.dispatchEvent(new Event("scroll"));
  });
}

describe("FloatingDock", () => {
  beforeEach(() => {
    setScrollY(200);
  });

  afterEach(() => {
    setScrollY(0);
  });

  it("renders a single link to the Threadbase GitHub repo once the user starts scrolling", () => {
    renderWithIntl(<FloatingDock />);
    const link = screen.getByRole("link", {
      name: /threadbase on github/i,
    });
    expect(link).toHaveAttribute(
      "href",
      "https://github.com/RonenMars/threadbase",
    );
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("does not render any other repo links or commands", () => {
    renderWithIntl(<FloatingDock />);
    expect(screen.getAllByRole("link")).toHaveLength(1);
    expect(screen.queryByText(/brew install/i)).not.toBeInTheDocument();
  });

  it("is hidden at the top of the page and appears after a small scroll", () => {
    setScrollY(0);
    renderWithIntl(<FloatingDock />);
    expect(
      screen.queryByRole("link", { name: /threadbase on github/i }),
    ).not.toBeInTheDocument();

    setScrollY(120);
    expect(
      screen.getByRole("link", { name: /threadbase on github/i }),
    ).toBeInTheDocument();
  });
});

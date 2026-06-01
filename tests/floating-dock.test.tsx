import { render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { FloatingDock } from "@/components/FloatingDock";

/**
 * Make the FloatingDock immediately visible in tests by overriding the
 * IntersectionObserver shim from tests/setup.ts so observe() synchronously
 * invokes the callback with isIntersecting: false (the dock shows once the
 * hero is OUT of view).
 */
function installVisibleObserver() {
  const original = globalThis.IntersectionObserver;
  class VisibleObserver implements IntersectionObserver {
    readonly root = null;
    readonly rootMargin = "0px";
    readonly thresholds = [0];
    constructor(
      private cb: (entries: IntersectionObserverEntry[]) => void,
    ) {}
    observe(): void {
      this.cb([{ isIntersecting: false } as IntersectionObserverEntry]);
    }
    disconnect(): void {}
    takeRecords(): IntersectionObserverEntry[] {
      return [];
    }
    unobserve(): void {}
  }
  globalThis.IntersectionObserver =
    VisibleObserver as unknown as typeof IntersectionObserver;
  return () => {
    globalThis.IntersectionObserver = original;
  };
}

describe("FloatingDock", () => {
  let restoreObserver: () => void;
  let banner: HTMLElement;

  beforeEach(() => {
    // The dock looks for a [role="banner"] element to observe.
    banner = document.createElement("section");
    banner.setAttribute("role", "banner");
    document.body.appendChild(banner);
    restoreObserver = installVisibleObserver();
  });

  afterEach(() => {
    restoreObserver();
    banner.remove();
  });

  it("renders a single link to the Threadbase GitHub repo", () => {
    render(<FloatingDock />);
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
    render(<FloatingDock />);
    // Only one link in the dock now.
    expect(screen.getAllByRole("link")).toHaveLength(1);
    // No brew install text in the dock anymore (it lives in the hero CTA).
    expect(screen.queryByText(/brew install/i)).not.toBeInTheDocument();
  });
});

import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
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

  it("renders links to both Threadbase GitHub repos", () => {
    render(<FloatingDock />);
    const mobileLink = screen.getByRole("link", {
      name: /threadbase mobile on github/i,
    });
    const streamerLink = screen.getByRole("link", {
      name: /threadbase streamer on github/i,
    });
    expect(mobileLink).toHaveAttribute(
      "href",
      "https://github.com/RonenMars/threadbase-mobile",
    );
    expect(streamerLink).toHaveAttribute(
      "href",
      "https://github.com/RonenMars/threadbase-streamer",
    );
  });

  it("renders the brew install command", () => {
    render(<FloatingDock />);
    expect(
      screen.getByText("brew install threadbase-streamer"),
    ).toBeInTheDocument();
  });

  it("writes the brew command to the clipboard when copy is clicked", () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      configurable: true,
    });

    render(<FloatingDock />);
    const button = screen.getByRole("button", {
      name: /copy brew install command/i,
    });
    fireEvent.click(button);

    expect(writeText).toHaveBeenCalledWith("brew install threadbase-streamer");
  });
});

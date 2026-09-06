import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SecuritySection } from "@/components/SecuritySection";
import { renderWithIntl } from "@/tests/test-utils";

describe("SecuritySection", () => {
  it("states the session-relay boundary and names the E2EE primitives", () => {
    renderWithIntl(<SecuritySection />);

    expect(
      screen.getByRole("heading", { name: /no threadbase session relay/i }),
    ).toBeInTheDocument();
    expect(document.body.textContent).toContain(
      "Threadbase does not relay your coding-agent session through a Threadbase-hosted session backend.",
    );
    // Was a `not.toMatch` guard: the section over-claimed E2EE before the
    // streamer shipped it. The claim now stands, but only in the form that
    // names its primitives — a bare "end-to-end encrypted" fails this.
    expect(document.body.textContent).toContain(
      "end-to-end encrypted by default — Noise IK, X25519 and ChaCha20-Poly1305",
    );
  });

  it("lists what Threadbase can't see", () => {
    renderWithIntl(<SecuritySection />);
    expect(
      screen.getByText(/there isn't one/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/keys live in the keychain and keystore/i)).toBeInTheDocument();
  });
});

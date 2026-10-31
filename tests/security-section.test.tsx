import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SecuritySection } from "@/components/SecuritySection";
import { renderWithIntl } from "@/tests/test-utils";

describe("SecuritySection", () => {
  it("leads with nothing leaving your machines, states the relay boundary and names the E2EE primitives", () => {
    renderWithIntl(<SecuritySection />);

    expect(
      screen.getByRole("heading", { name: /nothing leaves your machines/i }),
    ).toBeInTheDocument();
    // By default there is no Threadbase server in the path; the optional relay
    // is described as a side service, off by default, that sees metadata only.
    expect(document.body.textContent).toContain(
      "by default your phone talks straight to it — no Threadbase server in between.",
    );
    expect(document.body.textContent).toContain(
      "The optional Threadbase Relay is a side service",
    );
    expect(document.body.textContent).toContain("it is off by default");
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
      screen.getByText(/never readable by threadbase/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/keys live in the keychain and keystore/i),
    ).toBeInTheDocument();
  });
});

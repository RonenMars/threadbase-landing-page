"use client";
import { useState } from "react";

export function WaitlistForm(): React.JSX.Element {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="mt-16 rounded-4xl border border-[rgba(240,138,36,0.18)] bg-[linear-gradient(135deg,rgba(240,138,36,0.06),rgba(99,179,255,0.03))] p-8 text-center">
      <h3 className="text-xl font-semibold tracking-[-0.03em] text-primary">
        Get notified when it ships.
      </h3>
      <p className="mt-2 text-sm text-secondary">
        One email when multi-assistant support lands. No spam.
      </p>
      {submitted ? (
        <p className="mt-6 font-medium text-accent-strong">You're on the list ✓</p>
      ) : (
        <div className="mt-6 flex justify-center gap-3">
          <input
            type="email"
            placeholder="you@company.com"
            className="w-64 rounded-xl border border-border bg-black/30 px-4 py-2 text-sm text-primary placeholder:text-muted focus:border-accent/50 focus:outline-none"
          />
          <button
            onClick={() => setSubmitted(true)}
            className="rounded-xl bg-accent-secondary px-5 py-2 text-sm font-semibold text-[#070b11] transition-colors hover:bg-[#ffab52]"
          >
            Notify me
          </button>
        </div>
      )}
      <p className="mt-3 text-xs text-muted">No spam. One email when it's ready.</p>
    </div>
  );
}

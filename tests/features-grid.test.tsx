import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FeaturesGrid } from "@/components/FeaturesGrid";
import { FEATURES, FEATURES_SECTION } from "@/lib/content";

describe("FeaturesGrid", () => {
  it("renders all 8 features", () => {
    render(<FeaturesGrid features={FEATURES} section={FEATURES_SECTION} />);
    expect(screen.getByText("Terminal-native CLI")).toBeInTheDocument();
    expect(screen.getByText("Cross-assistant ready")).toBeInTheDocument();
  });
});

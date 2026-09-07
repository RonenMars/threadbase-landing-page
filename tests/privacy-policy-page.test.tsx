import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PrivacyPolicyPage, {
  generateMetadata,
} from "@/app/[locale]/privacy-policy/page";
import privacyMeta from "@/content/privacy-meta.json";
import { renderWithIntl } from "@/tests/test-utils";

describe("Privacy policy page", () => {
  it("renders localized policy copy", async () => {
    const page = await PrivacyPolicyPage({
      params: Promise.resolve({ locale: "ru" }),
    });
    renderWithIntl(page);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Политика конфиденциальности",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Какие виды сетевого трафика использует Threadbase"),
    ).toBeInTheDocument();
    expect(
      screen.queryByText("The kinds of network traffic Threadbase uses"),
    ).not.toBeInTheDocument();
  });

  it("renders the dates from content/privacy-meta.json", async () => {
    const page = await PrivacyPolicyPage({
      params: Promise.resolve({ locale: "en" }),
    });
    renderWithIntl(page);

    expect(document.body.textContent).toContain(privacyMeta.effectiveDate);
    expect(document.body.textContent).toContain(privacyMeta.lastUpdated);
  });

  it("generates localized metadata", async () => {
    await expect(
      generateMetadata({
        params: Promise.resolve({ locale: "he" }),
      }),
    ).resolves.toMatchObject({
      title: "מדיניות פרטיות — Threadbase",
    });
  });
});

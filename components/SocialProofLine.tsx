"use client";

import { useTranslations } from "next-intl";

export function SocialProofLine(): React.JSX.Element {
  const t = useTranslations("home.socialProof");

  return (
    <p className="px-6 py-6 text-center text-sm text-muted sm:px-8 lg:px-10">
      {t("line")}
    </p>
  );
}

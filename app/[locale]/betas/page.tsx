import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { BetasPage } from "@/components/BetasPage";
import type { Locale } from "@/i18n/routing";

type PageProps = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "metadata.routes.betas",
  });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function BetasPageRoute(): React.JSX.Element {
  return <BetasPage />;
}

import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { AndroidBeta } from "@/components/AndroidBeta";
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
    namespace: "metadata.routes.androidBeta",
  });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function AndroidBetaPage(): React.JSX.Element {
  return <AndroidBeta />;
}

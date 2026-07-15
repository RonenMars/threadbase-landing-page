import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link, type Locale } from "@/i18n/routing";

type PageProps = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "metadata.routes.solutions",
  });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function SolutionsPage({
  params,
}: PageProps): Promise<React.JSX.Element> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.solutions" });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-bg-primary px-6 text-center">
      <p className="mb-3 text-xs uppercase tracking-[0.18em] text-muted">{t("eyebrow")}</p>
      <h1 className="text-3xl font-semibold text-primary sm:text-4xl">{t("heading")}</h1>
      <p className="mt-4 max-w-md text-base text-secondary">
        {t("body")}
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full border border-border px-5 py-2 text-sm text-secondary transition-colors hover:border-accent-primary hover:text-primary"
      >
        {t("backLink")}
      </Link>
    </main>
  );
}

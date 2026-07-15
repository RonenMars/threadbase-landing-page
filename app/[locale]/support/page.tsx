import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link, type Locale } from "@/i18n/routing";
import { BulletList } from "@/components/BulletList";
import { PageShell } from "@/components/PageShell";
import { SectionHeading } from "@/components/SectionHeading";
import { SUPPORT_EMAIL } from "@/lib/content";

type PageProps = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "metadata.routes.support",
  });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function SupportPage({
  params,
}: PageProps): Promise<React.JSX.Element> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.support" });
  const supportTopics = t.raw("topics") as string[];
  const requestDetails = t.raw("requestDetails") as string[];

  return (
    <PageShell
      kicker={t("kicker")}
      heading={t("heading")}
      description={
        <>
          {t("descriptionBeforeEmail")}{" "}
          <a
            className="font-medium text-accent transition-colors hover:text-accent-hover"
            href={`mailto:${SUPPORT_EMAIL}`}
          >
            {SUPPORT_EMAIL}
          </a>
          {t("descriptionAfterEmail")}
        </>
      }
    >
      <div className="mt-8 rounded-4-5xl border border-white/6 bg-white/2 p-6">
        <h2 className="text-xl font-semibold tracking-[-0.03em] text-primary">
          {t("contactHeading")}
        </h2>
        <p className="mt-3 leading-7 text-secondary">
          {t("contactBeforeEmail")}{" "}
          <a
            className="font-medium text-accent transition-colors hover:text-accent-hover"
            href={`mailto:${SUPPORT_EMAIL}`}
          >
            {SUPPORT_EMAIL}
          </a>
          {t("contactAfterEmail")}
        </p>
      </div>

      <div className="mt-14 grid gap-12 lg:grid-cols-2">
        <section>
          <SectionHeading>{t("topicsHeading")}</SectionHeading>
          <BulletList items={supportTopics} />
        </section>

        <section>
          <SectionHeading>{t("requestHeading")}</SectionHeading>
          <p className="mt-6 leading-8 text-secondary">
            {t("requestIntro")}
          </p>
          <BulletList items={requestDetails} />
        </section>
      </div>

      <SectionHeading>{t("privacyHeading")}</SectionHeading>
      <p className="mt-6 leading-8 text-secondary">
        {t("privacyBeforeLink")}{" "}
        <Link
          className="font-medium text-accent transition-colors hover:text-accent-hover"
          href="/privacy"
        >
          {t("privacyLink")}
        </Link>{" "}
        {t("privacyAfterLink")}
      </p>

      <footer className="mt-16 border-t border-white/6 pt-6 text-sm leading-7 text-muted">
        <p>
          {t("supportEmailLabel")}{" "}
          <a
            className="font-medium text-accent transition-colors hover:text-accent-hover"
            href={`mailto:${SUPPORT_EMAIL}`}
          >
            {SUPPORT_EMAIL}
          </a>
        </p>
      </footer>
    </PageShell>
  );
}

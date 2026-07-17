import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageShell } from "@/components/PageShell";
import { SectionHeading } from "@/components/SectionHeading";
import type { Locale } from "@/i18n/routing";

const EFFECTIVE_DATE = "2026-07-18";

type PageProps = {
  params: Promise<{ locale: Locale }>;
};

type PolicyDetail = {
  label: string;
  body?: string;
  bodyBeforeLink?: string;
  linkText?: string;
  linkHref?: string;
  bodyAfterLink?: string;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "metadata.routes.privacy",
  });

  return {
    title: t("title"),
    description: t("description"),
  };
}

function PolicyList({ items }: { items: React.ReactNode[] }): React.JSX.Element {
  return (
    <ul className="mt-6 space-y-3 leading-7 text-secondary">
      {items.map((item, index) => (
        <li className="flex gap-3" key={index}>
          <span
            aria-hidden="true"
            className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-secondary"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function NumberedList({ items }: { items: string[] }): React.JSX.Element {
  return (
    <ol className="mt-6 list-decimal space-y-3 ps-5 leading-7 text-secondary">
      {items.map((item) => (
        <li className="ps-2" key={item}>
          {item}
        </li>
      ))}
    </ol>
  );
}

function PolicyDetailList({
  items,
}: {
  items: PolicyDetail[];
}): React.JSX.Element {
  return (
    <PolicyList
      items={items.map((item) => (
        <>
          <strong className="text-primary">{item.label}</strong>{" "}
          {item.linkHref ? (
            <>
              {item.bodyBeforeLink}{" "}
              <a
                className="text-accent transition-colors hover:text-accent-hover"
                href={item.linkHref}
              >
                {item.linkText}
              </a>
              {item.bodyAfterLink}
            </>
          ) : (
            item.body
          )}
        </>
      ))}
    />
  );
}

function DataTable({
  caption,
  headers,
  rows,
}: {
  caption: string;
  headers: string[];
  rows: string[][];
}): React.JSX.Element {
  return (
    <div className="mt-6 rounded-4-5xl border border-white/6 bg-white/2">
      <table className="block w-full border-collapse text-start text-sm md:table">
        <caption className="sr-only">{caption}</caption>
        <thead className="sr-only md:not-sr-only md:table-header-group">
          <tr className="border-b border-white/6">
            {headers.map((header) => (
              <th
                className="section-kicker px-5 py-4 text-xs font-semibold uppercase text-muted"
                key={header}
                scope="col"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="block md:table-row-group">
          {rows.map((row, rowIndex) => (
            <tr
              className="block border-b border-white/6 last:border-b-0 md:table-row"
              key={row[0]}
            >
              {row.map((cell, cellIndex) => (
                <td
                  className={
                    cellIndex === 0
                      ? "block px-5 pt-5 pb-1 align-top font-medium text-primary md:table-cell md:py-4"
                      : "block px-5 pt-3 pb-1 align-top leading-7 text-secondary last:pb-5 md:table-cell md:py-4"
                  }
                  key={`${rowIndex}-${cellIndex}`}
                >
                  <span className="section-kicker mb-1 block text-[10px] font-semibold uppercase text-muted md:hidden">
                    {headers[cellIndex]}
                  </span>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default async function PrivacyPolicyPage({
  params,
}: PageProps): Promise<React.JSX.Element> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.privacy" });
  const trafficCategories = t.raw("trafficCategories") as string[];
  const automaticReporting = t.raw("automaticReporting") as string[];
  const crashReportingDetails = t.raw("crashReportingDetails") as PolicyDetail[];
  const feedbackDetails = t.raw("feedbackDetails") as PolicyDetail[];
  const screenshotAndDiagnosticDetails = t.raw(
    "screenshotAndDiagnosticDetails",
  ) as PolicyDetail[];
  const staysOnDevice = t.raw("staysOnDevice") as string[];
  const permissionsHeaders = t.raw("permissionsHeaders") as string[];
  const permissions = t.raw("permissions") as Array<{
    permission: string;
    why: string;
  }>;
  const yourControl = t.raw("yourControl") as string[];

  return (
    <PageShell
      kicker={t("kicker")}
      heading={t("heading")}
      description={t("description")}
      wide
    >
      <p className="mt-8 leading-8 text-secondary">{t("intro")}</p>

      <SectionHeading>{t("trafficHeading")}</SectionHeading>
      <p className="mt-6 leading-8 text-secondary">{t("trafficIntro")}</p>
      <NumberedList items={trafficCategories} />

      <SectionHeading>{t("coreHeading")}</SectionHeading>
      <p className="mt-6 leading-8 text-secondary">{t("coreBody")}</p>

      <SectionHeading>{t("pushHeading")}</SectionHeading>
      <p className="mt-6 leading-8 text-secondary">{t("pushBody")}</p>

      <SectionHeading>{t("crashHeading")}</SectionHeading>
      <p className="mt-6 leading-8 text-secondary">{t("crashIntro")}</p>
      <PolicyList items={automaticReporting} />
      <p className="mt-6 leading-8 text-secondary">{t("crashSameData")}</p>
      <PolicyDetailList items={crashReportingDetails} />

      <SectionHeading>{t("feedbackHeading")}</SectionHeading>
      <p className="mt-6 leading-8 text-secondary">{t("feedbackIntro")}</p>
      <PolicyDetailList items={feedbackDetails} />

      <SectionHeading>{t("screenshotHeading")}</SectionHeading>
      <PolicyDetailList items={screenshotAndDiagnosticDetails} />
      <p className="mt-6 leading-8 text-secondary">{t("screenshotReview")}</p>

      <SectionHeading>{t("newsletterHeading")}</SectionHeading>
      <p className="mt-6 leading-8 text-secondary">{t("newsletterBody")}</p>

      <SectionHeading>{t("staysHeading")}</SectionHeading>
      <PolicyList items={staysOnDevice} />
      <p className="mt-6 leading-8 text-secondary">{t("uninstallBody")}</p>

      <SectionHeading>{t("notCollectHeading")}</SectionHeading>
      <p className="mt-6 leading-8 text-secondary">{t("notCollectBody")}</p>

      <SectionHeading>{t("permissionsHeading")}</SectionHeading>
      <DataTable
        caption={t("permissionsCaption")}
        headers={permissionsHeaders}
        rows={permissions.map((row) => [row.permission, row.why])}
      />

      <SectionHeading>{t("controlHeading")}</SectionHeading>
      <PolicyList items={yourControl} />

      <footer className="mt-16 border-t border-white/6 pt-6 text-sm leading-7 text-muted">
        <p>{t("effectiveDateLabel")} {EFFECTIVE_DATE}</p>
        <p>{t("lastUpdatedLabel")} {EFFECTIVE_DATE}</p>
        <p className="mt-1">
          {t("contactLabel")}{" "}
          <a
            className="text-accent transition-colors hover:text-accent-hover"
            href="mailto:support@threadbase.sh"
          >
            support@threadbase.sh
          </a>
        </p>
      </footer>
    </PageShell>
  );
}

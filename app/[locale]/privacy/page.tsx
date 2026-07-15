import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { BulletList } from "@/components/BulletList";
import { PageShell } from "@/components/PageShell";
import { SectionHeading } from "@/components/SectionHeading";
import {
  PRIVACY_CONTACT_EMAIL,
  PRIVACY_LAST_UPDATED,
} from "@/lib/content";
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
    namespace: "metadata.routes.privacy",
  });

  return {
    title: t("title"),
    description: t("description"),
  };
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

export default async function PrivacyPage({
  params,
}: PageProps): Promise<React.JSX.Element> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.privacy" });
  const staysOnDevice = t.raw("staysOnDevice") as string[];
  const leavesHeaders = t.raw("leavesHeaders") as string[];
  const leavesDevice = t.raw("leavesDevice") as Array<{
    data: string;
    destination: string;
    purpose: string;
  }>;
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
    >
      <SectionHeading>{t("staysHeading")}</SectionHeading>
      <BulletList items={staysOnDevice} />

      <SectionHeading>{t("leavesHeading")}</SectionHeading>
      <DataTable
        caption={t("leavesCaption")}
        headers={leavesHeaders}
        rows={leavesDevice.map((row) => [row.data, row.destination, row.purpose])}
      />

      <SectionHeading>{t("notCollectHeading")}</SectionHeading>
      <p className="mt-6 leading-8 text-secondary">
        {t("notCollectPrefix")}{" "}
        <strong className="text-primary">{t("notCollectStrong")}</strong>{" "}
        {t("notCollectSuffix")}
      </p>

      <SectionHeading>{t("permissionsHeading")}</SectionHeading>
      <DataTable
        caption={t("permissionsCaption")}
        headers={permissionsHeaders}
        rows={permissions.map((row) => [row.permission, row.why])}
      />

      <SectionHeading>{t("controlHeading")}</SectionHeading>
      <BulletList items={yourControl} />

      <footer className="mt-16 border-t border-white/6 pt-6 text-sm leading-7 text-muted">
        <p>{t("lastUpdatedLabel")} {PRIVACY_LAST_UPDATED}</p>
        <p className="mt-1">
          {t("contactLabel")}{" "}
          <a
            className="text-accent transition-colors hover:text-accent-hover"
            href={`mailto:${PRIVACY_CONTACT_EMAIL}`}
          >
            {PRIVACY_CONTACT_EMAIL}
          </a>
        </p>
      </footer>
    </PageShell>
  );
}

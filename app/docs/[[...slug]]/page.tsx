import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import defaultMdxComponents from "fumadocs-ui/mdx";
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "fumadocs-ui/layouts/docs/page";
import { source } from "@/lib/source";

type DocsPageProps = Readonly<{
  params: Promise<{ slug?: string[] }>;
}>;

export default async function Page({
  params,
}: DocsPageProps): Promise<React.JSX.Element> {
  const { slug } = await params;
  const page = source.getPage(slug);
  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX components={{ ...defaultMdxComponents, Tab, Tabs }} />
      </DocsBody>
    </DocsPage>
  );
}

export function generateStaticParams(): Array<{ slug?: string[] }> {
  return source.generateParams();
}

export async function generateMetadata({
  params,
}: DocsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = source.getPage(slug);
  if (!page) notFound();

  return {
    title: `${page.data.title} — Threadbase Docs`,
    description: page.data.description,
  };
}

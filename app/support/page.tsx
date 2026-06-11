import type { Metadata } from "next";
import Link from "next/link";
import { BulletList } from "@/components/BulletList";
import { Footer } from "@/components/Footer";
import { SectionHeading } from "@/components/SectionHeading";
import { FOOTER } from "@/lib/content";

const SUPPORT_EMAIL = "support@threadbase.sh";

export const metadata: Metadata = {
  title: "Support — Threadbase",
  description:
    "Get help with Threadbase setup, pairing, notifications, bug reports, and app questions.",
};

const SUPPORT_TOPICS = [
  "Questions about installing or pairing the Threadbase app",
  "Help with the desktop streamer, QR pairing, or server connections",
  "Bug reports, crashes, notification problems, or unexpected behavior",
  "Privacy, data handling, and App Store support questions",
];

const REQUEST_DETAILS = [
  "Your device model and iOS version",
  "The Threadbase app version, if available",
  "What you were trying to do",
  "Any error message you saw",
  "Whether the issue happens every time or only sometimes",
];

export default function SupportPage(): React.JSX.Element {
  return (
    <div className="app-shell min-h-screen">
      <main className="px-6 py-24 sm:px-8 lg:px-10">
        <article className="container-shell max-w-3xl">
          <p className="section-kicker mb-4 text-xs font-semibold uppercase text-muted">
            Threadbase support
          </p>
          <h1 className="text-balance text-4xl font-semibold tracking-tighter text-primary sm:text-5xl">
            How can we help?
          </h1>
          <p className="mt-6 text-lg leading-8 text-secondary">
            For Threadbase questions, setup help, bug reports, or privacy requests,
            email{" "}
            <a
              className="font-medium text-accent transition-colors hover:text-accent-hover"
              href={`mailto:${SUPPORT_EMAIL}`}
            >
              {SUPPORT_EMAIL}
            </a>
            .
          </p>

          <div className="mt-8 rounded-4-5xl border border-white/6 bg-white/2 p-6">
            <h2 className="text-xl font-semibold tracking-[-0.03em] text-primary">
              Contact support
            </h2>
            <p className="mt-3 leading-7 text-secondary">
              Send your request to{" "}
              <a
                className="font-medium text-accent transition-colors hover:text-accent-hover"
                href={`mailto:${SUPPORT_EMAIL}`}
              >
                {SUPPORT_EMAIL}
              </a>
              . We review incoming support mail directly and will use your email address
              only to respond to your request.
            </p>
          </div>

          <div className="mt-14 grid gap-12 lg:grid-cols-2">
            <section>
              <SectionHeading>What we can help with</SectionHeading>
              <BulletList items={SUPPORT_TOPICS} />
            </section>

            <section>
              <SectionHeading>What to include</SectionHeading>
              <p className="mt-6 leading-8 text-secondary">
                You can send a short message, but these details help us investigate faster:
              </p>
              <BulletList items={REQUEST_DETAILS} />
            </section>
          </div>

          <SectionHeading>Privacy and data</SectionHeading>
          <p className="mt-6 leading-8 text-secondary">
            Threadbase is a thin client for self-hosted streamers. The app does not
            run its own analytics, crash-reporting, or telemetry service. Read the{" "}
            <Link
              className="font-medium text-accent transition-colors hover:text-accent-hover"
              href="/privacy"
            >
              privacy policy
            </Link>{" "}
            for the full data handling summary.
          </p>

          <footer className="mt-16 border-t border-white/6 pt-6 text-sm leading-7 text-muted">
            <p>
              Support email:{" "}
              <a
                className="font-medium text-accent transition-colors hover:text-accent-hover"
                href={`mailto:${SUPPORT_EMAIL}`}
              >
                {SUPPORT_EMAIL}
              </a>
            </p>
          </footer>
        </article>
      </main>
      <Footer footer={FOOTER} />
    </div>
  );
}

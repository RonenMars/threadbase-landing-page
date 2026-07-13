import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Privacy Policy — Threadbase",
  description:
    "How Threadbase handles streamer traffic, push notifications, crash reporting, feedback, screenshots, and diagnostics.",
};

const EFFECTIVE_DATE = "2026-07-12";

const TRAFFIC_CATEGORIES = [
  "Core traffic to your streamers — the app's normal function.",
  "Expo push-notification delivery — optional notifications.",
  "Crash reporting (Sentry) — automatic reporting is off by default and opt-in; a single crash can also be reported manually at any time.",
  "User-initiated feedback submissions — only when you send feedback.",
  "Optional screenshots or diagnostics you explicitly select — only when you choose to include them.",
];

const AUTOMATIC_REPORTING = [
  "Automatic reporting. Disabled by default and opt-in. Nothing is sent automatically unless you turn on \"Share anonymous crash reports\" in Settings -> Crash Reporting. Once enabled, future crashes are sent automatically until you turn it off again.",
  "Manual, one-time report. If the app crashes, the recovery screen offers a \"Report this crash\" button. Tapping it sends that single crash report even if automatic reporting is off. This is a deliberate action you take, not something the app does on its own. It does not turn on automatic reporting; after sending, the app may ask once whether you'd like to turn automatic reporting on going forward, and remembers your answer so it does not ask again.",
];

const CRASH_REPORTING_DETAILS: Array<React.ReactNode> = [
  <>
    <strong className="text-primary">Service provider.</strong> Crash reports are
    processed by{" "}
    <a
      className="text-accent transition-colors hover:text-accent-hover"
      href="https://sentry.io/"
    >
      Sentry
    </a>
    , a third-party error-monitoring service, under Sentry's own terms and
    data-processing agreements.
  </>,
  <>
    <strong className="text-primary">What is sent.</strong> Only sanitized technical
    information: the app version and build number, the platform (iOS or Android),
    the operating-system major/minor version, the JavaScript engine, the release
    channel or environment, the Expo runtime version, the EAS update identifier, a
    generic connection-mode category (local, remote, or unknown), and the type,
    message, and stack trace of the error. Reports also include an anonymous,
    randomly generated installation identifier used only to group reports; it is not
    tied to your identity, your device's advertising identifier, or your streamer
    credentials.
  </>,
  <>
    <strong className="text-primary">What is excluded.</strong> Crash reports do not
    intentionally include prompts, terminal output, source code, file contents,
    credentials, authentication tokens, server addresses, hostnames, IP addresses,
    repository names or paths, session names or content, or your device name. A
    sanitization step runs on every report before it is transmitted; anything that
    cannot be confidently sanitized is dropped rather than sent.
  </>,
  <>
    <strong className="text-primary">A note on absolutes.</strong> We design crash
    reporting to exclude the categories above, and we apply sanitization before
    sending. We cannot, however, describe unexpected behavior in the underlying SDK
    or platform as an absolute impossibility, which is why crash reporting is opt-in
    and off by default.
  </>,
  <>
    <strong className="text-primary">Your control.</strong> You can enable or disable
    crash reporting at any time in Settings. Disabling it stops future reporting
    immediately and deletes the anonymous installation identifier from your device.
  </>,
  <>
    <strong className="text-primary">Previously submitted reports.</strong> Reports
    already sent before you disable crash reporting remain in Sentry subject to the
    retention below; disabling does not retroactively delete them.
  </>,
  <>
    <strong className="text-primary">Retention.</strong> Crash reports are retained
    according to the configured Sentry project retention (by default, 90 days) and
    then deleted.
  </>,
  <>
    <strong className="text-primary">Deletion requests.</strong> To request deletion
    of reports associated with your anonymous installation identifier where feasible,
    contact support@threadbase.sh.
  </>,
  <>
    <strong className="text-primary">Processing location.</strong> Crash reports are
    processed in the region configured for the Sentry project.
  </>,
];

const FEEDBACK_DETAILS = [
  "What is sent. The description you type, an optional reply email address if you provide one, and only if you leave the \"Include technical diagnostics\" option enabled, the same category of sanitized technical metadata described for diagnostics below. Before you submit, the screen shows you exactly what will be included.",
  "How it is sent. Feedback is delivered through the first available of: a configured feedback endpoint, the Sentry User Feedback channel (only when crash reporting is enabled), your device's email app, or a copy-to-clipboard option you can paste into the Threadbase feedback page. Feedback works whether or not crash reporting is enabled.",
  "Optional email. If you provide a reply email, it is stored with your feedback so we can respond. Leaving it blank keeps your submission anonymous.",
  "What is excluded. As with crash reports, feedback does not intentionally include prompts, terminal output, source code, credentials, server addresses, or session content.",
];

const SCREENSHOT_AND_DIAGNOSTIC_DETAILS = [
  "Screenshots. Threadbase never captures your screen automatically. If you attach a screenshot to feedback, you select it explicitly from your photo library, you can preview and remove it, and it is submitted exactly as you selected it. Attached screenshots are re-encoded to strip embedded metadata (such as location) and are size-limited. Screenshots are used only to deliver the feedback you submit and are not retained beyond what is necessary for that submission and its handling.",
  "Diagnostics. You can copy or export a diagnostics report from the app. It contains only the sanitized technical metadata categories described above, never prompts, terminal output, credentials, server addresses, session content, or your device name. You control whether it is copied or submitted.",
];

const STAYS_ON_DEVICE = [
  "Your prompts and draft prompts.",
  "Claude Code, Codex, and other agent conversation content.",
  "Terminal output and session content.",
  "Your streamer URLs, API keys, and pairing credentials (in the iOS Keychain / Android Keystore).",
  "Your session names, favorites, and app settings.",
];

const YOUR_CONTROL = [
  "Crash reporting is off by default; enable or disable it any time in Settings.",
  "Feedback and diagnostics are only ever sent when you initiate them.",
  "Removing a server revokes its push token.",
  "Uninstalling the app deletes everything stored locally.",
  "Contact support@threadbase.sh with any privacy question or deletion request.",
];

const PERMISSIONS: Array<{ permission: string; why: string }> = [
  {
    permission: "Camera",
    why: "Scanning a QR code to pair with a streamer, and attaching photos to your sessions.",
  },
  {
    permission: "Photo library",
    why: "Attaching photos from your library to your sessions, and attaching a screenshot to feedback.",
  },
  { permission: "Microphone", why: "Dictating prompts by voice." },
  { permission: "Speech recognition", why: "Converting your speech to text on-device." },
  {
    permission: "Face ID / biometrics",
    why: "Optionally locking access to your conversations.",
  },
  { permission: "Notifications", why: "Delivering session notifications, if you enable them." },
];

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
    <ol className="mt-6 list-decimal space-y-3 pl-5 leading-7 text-secondary">
      {items.map((item) => (
        <li className="pl-2" key={item}>
          {item}
        </li>
      ))}
    </ol>
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
      <table className="block w-full border-collapse text-left text-sm md:table">
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

export default function PrivacyPolicyPage(): React.JSX.Element {
  return (
    <PageShell
      kicker="Threadbase privacy"
      heading="Privacy Policy"
      description="Threadbase is a thin client for the Claude Code sessions you run on your own computer, reached through a Threadbase streamer instance that you operate. Threadbase is local-first by design: your prompts, session content, and credentials stay on your device and on the streamers you configure."
      wide
    >
      <p className="mt-8 leading-8 text-secondary">
        This policy describes the specific, limited cases in which data leaves your
        device, and the controls you have over each.
      </p>

      <SectionHeading>The kinds of network traffic Threadbase uses</SectionHeading>
      <p className="mt-6 leading-8 text-secondary">
        Threadbase separates its traffic into five distinct categories. Each is
        described in its own section below.
      </p>
      <NumberedList items={TRAFFIC_CATEGORIES} />

      <SectionHeading>1. Core traffic to your streamers</SectionHeading>
      <p className="mt-6 leading-8 text-secondary">
        Threadbase connects only to the streamer URLs you configure. Session content,
        prompts, provider metadata, file attachments you send, and status events go
        solely to those streamers. Threadbase does not route this traffic through any
        Threadbase-operated server, and it does not copy it anywhere else. Your API
        keys and server credentials are stored on your device (in the iOS Keychain /
        Android Keystore) and are used only to authenticate to your own streamers.
      </p>

      <SectionHeading>2. Expo push-notification delivery</SectionHeading>
      <p className="mt-6 leading-8 text-secondary">
        If you enable notifications, Threadbase obtains a push token from Expo's push
        service and shares that token with each streamer you have paired, so the
        streamer can notify you when a session needs attention. The token is delivered
        through Expo's notification relay. Removing a server in Settings revokes its
        push token. The token is an opaque delivery address; it does not contain your
        session content.
      </p>

      <SectionHeading>3. Optional crash reporting (Sentry)</SectionHeading>
      <p className="mt-6 leading-8 text-secondary">
        Threadbase includes optional crash reporting to help diagnose defects, sent
        through two paths:
      </p>
      <PolicyList items={AUTOMATIC_REPORTING} />
      <p className="mt-6 leading-8 text-secondary">
        Both paths send the same sanitized data described below, through the same
        service.
      </p>
      <PolicyList items={CRASH_REPORTING_DETAILS} />

      <SectionHeading>4. User-initiated feedback submissions</SectionHeading>
      <p className="mt-6 leading-8 text-secondary">
        The Help & Feedback screen lets you send a bug report, feature request, or
        general feedback. This is always a deliberate action you initiate; Threadbase
        never sends feedback on its own.
      </p>
      <PolicyList items={FEEDBACK_DETAILS} />

      <SectionHeading>5. Optional screenshots and diagnostics you select</SectionHeading>
      <PolicyList items={SCREENSHOT_AND_DIAGNOSTIC_DETAILS} />
      <p className="mt-6 leading-8 text-secondary">
        Screenshots and manually entered feedback may contain content you choose to
        include. Please review anything you attach before submitting.
      </p>

      <SectionHeading>What stays on your device</SectionHeading>
      <PolicyList items={STAYS_ON_DEVICE} />
      <p className="mt-6 leading-8 text-secondary">
        Uninstalling the app deletes everything Threadbase stored locally. Crash
        reports or feedback you submitted before uninstalling are not stored on your
        device and are governed by the retention terms above.
      </p>

      <SectionHeading>What we do not collect</SectionHeading>
      <p className="mt-6 leading-8 text-secondary">
        Threadbase does not use advertising, tracking, fingerprinting, or behavioral
        telemetry. It does not include a product-analytics SDK. It does not
        automatically capture your screen, console output, or network requests. The
        only data that leaves your device is the core streamer traffic you direct, the
        optional push-notification token, and only with your action or opt-in consent,
        the crash reports, feedback, screenshots, and diagnostics described above.
      </p>

      <SectionHeading>Permissions the app uses</SectionHeading>
      <DataTable
        caption="Permissions used by the app"
        headers={["Permission", "Why"]}
        rows={PERMISSIONS.map((row) => [row.permission, row.why])}
      />

      <SectionHeading>Your control</SectionHeading>
      <PolicyList items={YOUR_CONTROL} />

      <footer className="mt-16 border-t border-white/6 pt-6 text-sm leading-7 text-muted">
        <p>Effective date: {EFFECTIVE_DATE}</p>
        <p>Last updated: {EFFECTIVE_DATE}</p>
        <p className="mt-1">
          Contact:{" "}
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

import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { FOOTER } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy — Threadbase",
  description: "How the Threadbase iOS and macOS apps handle your data.",
};

const LAST_UPDATED = "2026-05-31";

const STAYS_ON_DEVICE = [
  "Server URLs and API keys (Keychain / Keystore via SecureStore)",
  "Session display names, draft prompts, UI settings, quick-access list, React Query cache",
  "All Claude Code session content fetched from your streamer",
];

const LEAVES_DEVICE: Array<{ data: string; destination: string; purpose: string }> = [
  {
    data: "Session content, prompts, files, status events",
    destination: "The Threadbase streamer URL you configured",
    purpose: "Show your sessions in the app",
  },
  {
    data: "Expo push token (ExponentPushToken[…])",
    destination:
      "(a) Expo's push relay; (b) every streamer you've paired with, via POST /api/push/register",
    purpose: "Deliver session notifications",
  },
  {
    data: "Pairing handshake",
    destination: "The streamer URL encoded in the pair QR you scan",
    purpose: "Exchange API key during setup",
  },
];

const PERMISSIONS: Array<{ permission: string; why: string }> = [
  { permission: "Camera", why: "Scan pairing QR codes; attach photos to sessions" },
  { permission: "Photo library", why: "Attach photos to sessions" },
  {
    permission: "Microphone + speech recognition",
    why: "Dictate prompts (speech-to-text is on-device)",
  },
  { permission: "Notifications", why: "Deliver session status alerts from your streamers" },
];

const YOUR_CONTROL = [
  "Remove a server in Settings to revoke its push token and stop all traffic to it",
  "Disable notifications system-wide in iOS Settings → Threadbase",
  "Uninstalling the app deletes every byte stored locally; nothing persists off-device",
];

function SectionHeading({ children }: { children: React.ReactNode }): React.JSX.Element {
  return (
    <h2 className="mt-14 text-2xl font-semibold tracking-[-0.04em] text-primary sm:text-3xl">
      {children}
    </h2>
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

export default function PrivacyPage(): React.JSX.Element {
  return (
    <div className="app-shell min-h-screen">
      <main className="px-6 py-24 sm:px-8 lg:px-10">
        <article className="container-shell max-w-3xl">
          <h1 className="text-balance text-4xl font-semibold tracking-[-0.05em] text-primary sm:text-5xl">
            Privacy
          </h1>
          <p className="mt-6 text-lg leading-8 text-secondary">
            Threadbase is a thin client for self-hosted Threadbase streamers. It does not
            run any analytics, crash-reporting, or telemetry service of its own.
          </p>

          <SectionHeading>What stays on your device</SectionHeading>
          <ul className="mt-6 space-y-3 leading-7 text-secondary">
            {STAYS_ON_DEVICE.map((item) => (
              <li className="flex gap-3" key={item}>
                <span
                  aria-hidden="true"
                  className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-secondary"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <SectionHeading>What leaves your device, and where it goes</SectionHeading>
          <DataTable
            caption="Data that leaves your device"
            headers={["Data", "Destination", "Purpose"]}
            rows={LEAVES_DEVICE.map((row) => [row.data, row.destination, row.purpose])}
          />

          <SectionHeading>What we do not collect</SectionHeading>
          <p className="mt-6 leading-8 text-secondary">
            The app makes <strong className="text-primary">no network calls to any
            developer-operated backend</strong> — there is no Threadbase analytics server,
            no crash-reporting endpoint, no advertising or tracking SDK. Apart from the
            Expo push relay (used solely to deliver notifications you opted into) and the
            streamer URLs you yourself enter, the app talks to nothing.
          </p>

          <SectionHeading>Permissions used</SectionHeading>
          <DataTable
            caption="Permissions used by the app"
            headers={["Permission", "Why"]}
            rows={PERMISSIONS.map((row) => [row.permission, row.why])}
          />

          <SectionHeading>Your control</SectionHeading>
          <ul className="mt-6 space-y-3 leading-7 text-secondary">
            {YOUR_CONTROL.map((item) => (
              <li className="flex gap-3" key={item}>
                <span
                  aria-hidden="true"
                  className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-secondary"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <footer className="mt-16 border-t border-white/6 pt-6 text-sm leading-7 text-muted">
            <p>Last updated: {LAST_UPDATED}</p>
            <p className="mt-1">
              Contact:{" "}
              <a
                className="text-accent transition-colors hover:text-accent-hover"
                href="mailto:ronenmars@gmail.com"
              >
                ronenmars@gmail.com
              </a>
            </p>
          </footer>
        </article>
      </main>
      <Footer footer={FOOTER} />
    </div>
  );
}

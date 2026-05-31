import Link from "next/link";

export const metadata = {
  title: "Threadbase — Other Surfaces",
  description: "Electron, VS Code, and IntelliJ surfaces for Threadbase. Coming soon.",
};

export default function SolutionsPage(): React.JSX.Element {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-bg-primary px-6 text-center">
      <p className="mb-3 text-xs uppercase tracking-[0.18em] text-muted">Other surfaces</p>
      <h1 className="text-3xl font-semibold text-primary sm:text-4xl">Other surfaces</h1>
      <p className="mt-4 max-w-md text-base text-secondary">
        Threadbase also ships Electron, VS Code, and IntelliJ surfaces. The dedicated page for them is coming soon.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full border border-border px-5 py-2 text-sm text-secondary transition-colors hover:border-accent-primary hover:text-primary"
      >
        Back to Threadbase
      </Link>
    </main>
  );
}

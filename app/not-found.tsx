import Link from "next/link";

export default function NotFound(): React.JSX.Element {
  return (
    <div className="app-shell min-h-screen">
      <main className="container-shell flex min-h-screen items-center justify-center px-6 py-24 sm:px-8 lg:px-10">
        <section className="screenshot-shell relative w-full max-w-3xl overflow-hidden rounded-8 border border-border-strong bg-[linear-gradient(180deg,rgba(8,12,20,0.96),rgba(11,18,31,0.92))] p-8 text-center shadow-[0_28px_80px_rgba(3,7,14,0.56)] sm:p-12">
          <div className="app-grid absolute inset-0 opacity-20" />
          <div className="relative space-y-6">
            <p className="text-xs uppercase tracking-[0.26em] text-accent-strong">
              404
            </p>
            <h1 className="text-balance text-4xl font-semibold tracking-[-0.05em] text-primary sm:text-5xl">
              Page not found
            </h1>
            <p className="mx-auto max-w-xl leading-7 text-secondary">
              The route you requested does not exist in this local build.
            </p>
            <div className="flex justify-center">
              <Link
                className="inline-flex min-w-44 items-center justify-center rounded-full border border-accent bg-accent px-6 py-3 font-medium tracking-tight text-slate-950 transition-all duration-300 ease-out hover:border-accent-strong hover:bg-accent-strong"
                href="/"
              >
                Return home
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

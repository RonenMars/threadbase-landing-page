export function SectionHeading({ children }: { children: React.ReactNode }): React.JSX.Element {
  return (
    <h2 className="mt-14 text-2xl font-semibold tracking-[-0.04em] text-primary sm:text-3xl">
      {children}
    </h2>
  );
}

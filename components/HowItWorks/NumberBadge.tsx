interface NumberBadgeProps {
  n: number;
}

export function NumberBadge({ n }: NumberBadgeProps): React.JSX.Element {
  return (
    <div
      className="flex h-8 w-8 items-center justify-center rounded-full border bg-bg-secondary font-mono text-[13px] text-accent-strong"
      style={{ borderColor: "rgba(99, 179, 255, 0.3)" }}
      aria-hidden="true"
    >
      {n}
    </div>
  );
}

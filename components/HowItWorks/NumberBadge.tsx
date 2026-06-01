interface NumberBadgeProps {
  n: number;
}

export function NumberBadge({ n }: NumberBadgeProps): React.JSX.Element {
  return (
    <div
      className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-bg-secondary text-[13px] text-accent-strong"
      aria-hidden="true"
    >
      {n}
    </div>
  );
}

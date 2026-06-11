export function BulletList({ items }: { items: string[] }): React.JSX.Element {
  return (
    <ul className="mt-6 space-y-3 leading-7 text-secondary">
      {items.map((item) => (
        <li className="flex gap-3" key={item}>
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

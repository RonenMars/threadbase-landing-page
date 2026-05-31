import type { ReactNode } from "react";

interface PhoneProps {
  children?: ReactNode;
  screenLit?: boolean;
}

export function Phone({ children, screenLit = false }: PhoneProps): React.JSX.Element {
  return (
    <svg viewBox="0 0 80 160" className="h-full w-auto" aria-hidden="true">
      {/* outline */}
      <rect
        x="2"
        y="2"
        width="76"
        height="156"
        rx="14"
        fill="none"
        stroke="#9fb0c9"
        strokeWidth="1.5"
      />
      {/* screen */}
      <rect
        x="6"
        y="14"
        width="68"
        height="132"
        rx="4"
        fill={screenLit ? "#0b1320" : "#070b11"}
      />
      {/* inner top highlight */}
      <line
        x1="8"
        y1="15"
        x2="72"
        y2="15"
        stroke="#b5e3ff"
        strokeOpacity="0.12"
        strokeWidth="1"
      />
      {/* screen content slot */}
      <foreignObject x="8" y="18" width="64" height="124">
        <div
          className="h-full w-full font-mono text-[5px] leading-tight text-accent-strong"
        >
          {children}
        </div>
      </foreignObject>
    </svg>
  );
}

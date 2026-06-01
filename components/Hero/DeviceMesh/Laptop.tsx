import type { ReactNode } from "react";

interface LaptopProps {
  children?: ReactNode;
  /** Scale (1 = primary; 0.7 = revealed secondary; 0.5 = farther) */
  scale?: number;
}

export function Laptop({ children, scale = 1 }: LaptopProps): React.JSX.Element {
  return (
    <svg
      viewBox="0 0 200 130"
      className="h-full w-auto"
      style={{ transform: `scale(${scale})`, transformOrigin: "center" }}
      aria-hidden="true"
    >
      {/* screen body */}
      <rect
        x="10"
        y="6"
        width="180"
        height="110"
        rx="6"
        fill="none"
        stroke="#9fb0c9"
        strokeWidth="1.5"
      />
      {/* screen inner */}
      <rect x="14" y="10" width="172" height="102" rx="3" fill="#0b1320" />
      {/* base */}
      <path
        d="M 4 122 L 196 122 L 188 128 L 12 128 Z"
        fill="none"
        stroke="#9fb0c9"
        strokeWidth="1.5"
      />
      {/* inner top highlight */}
      <line
        x1="16"
        y1="11"
        x2="184"
        y2="11"
        stroke="#b5e3ff"
        strokeOpacity="0.12"
        strokeWidth="1"
      />
      {/* content */}
      <foreignObject x="16" y="14" width="168" height="96">
        <div
          className="h-full w-full font-mono text-[5px] leading-tight text-accent-strong"
        >
          {children}
        </div>
      </foreignObject>
    </svg>
  );
}

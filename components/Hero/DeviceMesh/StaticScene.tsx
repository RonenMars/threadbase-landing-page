import { Phone } from "./Phone";
import { Laptop } from "./Laptop";
import { ServerRack } from "./ServerRack";
import { PTY_LINES } from "./sceneTimeline";

/**
 * Reduced-motion fallback — renders the wide-shot composition statically.
 * No pulses, no streaming, no replay button.
 */
export function StaticScene(): React.JSX.Element {
  return (
    <div className="relative mx-auto aspect-video w-full max-w-3xl">
      <svg
        viewBox="0 0 1000 500"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        {/* Static threads */}
        <path
          d="M 250 280 Q 400 250 500 280"
          stroke="#63b3ff"
          strokeOpacity="0.4"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M 350 380 Q 425 320 500 280"
          stroke="#63b3ff"
          strokeOpacity="0.4"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M 750 280 Q 625 200 500 280"
          stroke="#f08a24"
          strokeOpacity="0.4"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>

      {/* Device layer (CSS positioning over the SVG) */}
      <div className="absolute left-[20%] top-[40%] h-32 w-auto">
        <Laptop scale={1}>{PTY_LINES.phoneAndLaptop1.join("\n")}</Laptop>
      </div>
      <div className="absolute left-[8%] top-[68%] h-24 w-auto">
        <Laptop scale={0.7}>{PTY_LINES.laptop2.join("\n")}</Laptop>
      </div>
      <div className="absolute left-[72%] top-[42%] h-24 w-auto">
        <Laptop scale={0.7}>{PTY_LINES.laptop3.join("\n")}</Laptop>
      </div>
      <div className="absolute right-[2%] top-[20%] h-20 w-auto">
        <ServerRack />
      </div>
      <div className="absolute left-[45%] top-[36%] h-40 w-auto">
        <Phone screenLit>{PTY_LINES.phoneAndLaptop1.join("\n")}</Phone>
      </div>
    </div>
  );
}

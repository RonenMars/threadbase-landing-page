// next/font/google is a build-time transform; outside Next it has no loader to call.
type FontResult = {
  className: string;
  variable: string;
  style: { fontFamily: string };
};

function font(name: string): (options: { variable?: string }) => FontResult {
  return (options) => ({
    className: `font-${name}`,
    variable: options.variable ?? "",
    style: { fontFamily: name },
  });
}

export const Inter = font("inter");
export const JetBrains_Mono = font("jetbrains-mono");

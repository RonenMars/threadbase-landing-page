"use client";

interface GlitchTitleProps {
  text: string;
  className?: string;
}

export function GlitchTitle({ text, className }: GlitchTitleProps) {
  // Color the punchline word ("Live.") in the brand orange.
  const PUNCHLINE = "Live.";
  const idx = text.lastIndexOf(PUNCHLINE);

  return (
    <h1
      id="hero-headline"
      className={className}
      data-text={text}
    >
      {idx === -1 ? (
        text
      ) : (
        <>
          {text.slice(0, idx)}
          <span className="text-accent-secondary">{PUNCHLINE}</span>
          {text.slice(idx + PUNCHLINE.length)}
        </>
      )}
    </h1>
  );
}

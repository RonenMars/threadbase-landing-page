"use client";

interface GlitchTitleProps {
  text: string;
  className?: string;
}

export function GlitchTitle({ text, className }: GlitchTitleProps) {
  return (
    <h1
      id="hero-headline"
      className={className}
      data-text={text}
    >
      {text}
    </h1>
  );
}

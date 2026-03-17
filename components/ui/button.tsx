"use client";

import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border font-medium tracking-tight transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary disabled:pointer-events-none disabled:opacity-50 motion-safe:hover:-translate-y-0.5",
  {
    variants: {
      variant: {
        primary:
          "border-accent bg-[#1c68c4] text-white shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_10px_36px_rgba(28,104,196,0.45)] hover:border-accent-strong hover:bg-[#2a7fd8] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.12),0_14px_52px_rgba(99,179,255,0.55),0_0_28px_rgba(99,179,255,0.2)]",
        outline:
          "border-border-strong bg-white/2 text-primary hover:border-accent hover:bg-white/6",
        secondary:
          "border-accent-secondary bg-accent-secondary/12 text-primary hover:border-accent-secondary hover:bg-accent-secondary/20",
        ghost:
          "border-transparent bg-transparent text-secondary hover:text-primary",
      },
      size: {
        default: "h-11 px-5",
        lg: "h-12 px-6 text-[0.95rem]",
        sm: "h-9 px-4 text-xs",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export type ButtonProps = ButtonPrimitive.Props &
  VariantProps<typeof buttonVariants>;

function Button({
  className,
  variant = "primary",
  size = "default",
  ...props
}: ButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

Button.displayName = "Button";

export { Button, buttonVariants };

import { Slot } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "group/btn relative inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-[transform,background-color,box-shadow,color,border-color] duration-200 ease-out active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-green-cta text-white shadow-[0_8px_24px_-8px_rgb(54_124_37/0.65)] hover:-translate-y-0.5 hover:shadow-[0_14px_32px_-10px_rgb(54_124_37/0.8)]",
        navy: "bg-brand-900 text-white shadow-soft hover:-translate-y-0.5 hover:bg-brand-700 dark:bg-brand-700 dark:hover:bg-brand-600",
        outline: "border border-border bg-card text-heading hover:-translate-y-0.5 hover:border-brand-600/40 hover:shadow-soft",
        glass: "glass text-white hover:-translate-y-0.5 hover:bg-white/20",
        ghost: "text-heading hover:bg-surface-2",
        whatsapp: "bg-whatsapp text-white hover:-translate-y-0.5 hover:brightness-105",
      },
      size: {
        sm: "h-10 px-4 text-sm",
        md: "h-12 px-6 text-[0.95rem]",
        lg: "h-14 px-8 text-base",
        icon: "size-11",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export type ButtonProps = ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean };

export function Button({ className, variant, size, asChild, ...props }: ButtonProps) {
  const Cmp = asChild ? Slot.Root : "button";
  return <Cmp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

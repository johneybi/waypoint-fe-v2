import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
<<<<<<< Updated upstream
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
=======
  "inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-2xl typography-action-base-bold transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px] active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: "bg-[#0EA5E9] text-white hover:bg-[#0284C7]",
        outline:
          "border border-[#E2E2E2] bg-white hover:bg-[#F0F0F0] hover:text-[#191919]",
        destructive:
          "bg-[#E46962] text-white hover:bg-[#DC2626] focus-visible:ring-[#E46962]/20 dark:focus-visible:ring-[#E46962]/40 dark:bg-[#E46962]/60",
>>>>>>> Stashed changes
        secondary:
          "bg-[#A3A3A3] text-white hover:bg-[#838383]",
        ghost:
          "hover:bg-[#F0F0F0] hover:text-[#191919] dark:hover:bg-[#F0F0F0]/50",
        link: "text-[#0EA5E9] underline-offset-4 hover:underline",
        kakao: "bg-[#FEE500] text-[#191919] hover:bg-[#FEE500]/80",
        naver: "bg-[#03C75A] text-white hover:bg-[#03C75A]/80",
        google:
          "bg-white text-black border border-[#E2E2E2] hover:bg-[#F0F0F0] hover:text-[#191919]",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
<<<<<<< Updated upstream
    />
=======
    >
      {asChild ? (
        children
      ) : (
        <>
          {icon && <span data-slot="icon">{icon}</span>}
          {children}
          {rightIcon && <span data-slot="right-icon">{rightIcon}</span>}
        </>
      )}
    </Comp>
>>>>>>> Stashed changes
  )
}

export { Button, buttonVariants }

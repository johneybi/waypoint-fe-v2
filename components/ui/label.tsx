"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
// import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Pencil } from "lucide-react"

// const labelVariants = cva(
//   "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
// )

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & {
      required?: boolean
      onEdit?: () => void
  }
>(({ className, children, required, onEdit, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center justify-between", className)}
    {...props}
  >
    <div className="flex items-center gap-1">
        {children}
        {required && <span className="text-destructive">*</span>}
    </div>
    {onEdit && (
        <button onClick={onEdit} className="text-muted-foreground hover:text-foreground">
            <Pencil className="h-3 w-3" />
        </button>
    )}
  </LabelPrimitive.Root>
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }

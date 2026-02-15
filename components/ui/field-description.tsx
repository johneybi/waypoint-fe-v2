import * as React from "react"
import { cn } from "@/lib/utils"

interface FieldDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
    error?: boolean
}

const FieldDescription = React.forwardRef<HTMLParagraphElement, FieldDescriptionProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn(
          "text-[0.8rem] text-muted-foreground",
          error && "text-destructive",
          className
        )}
        {...props}
      />
    )
  }
)
FieldDescription.displayName = "FieldDescription"

export { FieldDescription }

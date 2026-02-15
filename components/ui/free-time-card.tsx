import * as React from "react"
import { Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface FreeTimeCardProps extends React.HTMLAttributes<HTMLDivElement> {
  time?: string
  title?: string
  description?: string
}

export function FreeTimeCard({
  className,
  time = "17:00",
  title = "자유 시간",
  description,
  ...props
}: FreeTimeCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1 rounded-xl border border-border bg-card p-4 shadow-sm",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-primary" />
        <h3 className="font-semibold text-foreground">{title}</h3>
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}

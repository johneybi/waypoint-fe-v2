"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface DayNavigatorProps extends React.HTMLAttributes<HTMLDivElement> {
  days: string[]
  currentDay: string
  onSelectDay: (day: string) => void
}

export function DayNavigator({
  className,
  days,
  currentDay,
  onSelectDay,
  ...props
}: DayNavigatorProps) {
  return (
    <div
      className={cn(
        "sticky top-14 z-40 flex w-full overflow-x-auto bg-background/80 px-4 py-3 backdrop-blur-md no-scrollbar border-b border-border/40",
        className
      )}
      {...props}
    >
      <div className="flex gap-2">
        {days.map((day) => (
          <button
            key={day}
            onClick={() => onSelectDay(day)}
            className={cn(
              "whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 active:scale-95",
              currentDay === day
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
            )}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  )
}

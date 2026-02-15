"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface TimelineItemProps extends React.HTMLAttributes<HTMLDivElement> {
  time: string
  location?: string
  isLast?: boolean
  children: React.ReactNode
}

export function TimelineItem({
  time,
  location,
  isLast = false,
  children,
  className,
  ...props
}: TimelineItemProps) {
  return (
    <div className={cn("flex w-full gap-4", className)} {...props}>
      {/* Divider Column */}
      <div className="flex flex-col items-center pt-1">
        {/* Dot */}
        <div className="h-3 w-3 rounded-full border-[3px] border-primary bg-background ring-4 ring-background shadow-sm z-10" />
        
        {/* Line - Solid and Connected */}
        {!isLast && (
            <div className="flex-1 w-[2px] bg-[#E5E7EB] -mt-1" />
        )}
      </div>

      {/* Content Column */}
      <div className={cn("flex-1 pb-10", isLast && "pb-0")}>
        {/* Time & Location Metadata */}
        <div className="flex items-center gap-2 mb-3">
            <span className="text-sm font-bold text-[#1C2024]">{time}</span>
            {location && (
                <>
                    <span className="h-3 w-[1px] bg-border" />
                    <span className="text-sm font-medium text-muted-foreground">{location}</span>
                </>
            )}
        </div>

        {children}
      </div>
    </div>
  )
}

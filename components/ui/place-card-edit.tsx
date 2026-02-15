"use client"

import * as React from "react"
import { MoreVertical } from "lucide-react"
import { PlaceBadge } from "@/components/ui/place-badge"
import { cn } from "@/lib/utils"

interface PlaceCardEditProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
  time?: string
  type?: string
  isLast?: boolean
}

export function PlaceCardEdit({
  className,
  title = "Place Name",
  description,
  time,
  type,
  isLast = false,
  ...props
}: PlaceCardEditProps) {
  return (
    <div className={cn("flex w-full", className)} {...props}>
      {/* Time Column (Optional, can be passed or handled by parent) */}
     
      {/* Card Content */}
      <div className="flex-1 rounded-2xl bg-card border border-border/50 p-5 relative overflow-hidden shadow-sm">
         <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1.5 overflow-hidden">
               <div className="flex items-center gap-2">
                 {/* Optional: Add badge if type is provided */}
                 {type && <PlaceBadge type={type} />}
                 <h3 className="text-sm font-bold text-foreground leading-5 truncate">{title}</h3>
               </div>
               {/* Description is optional in edit mode, usually just title is shown or very brief */}
               {description && (
                   <p className="text-xs text-muted-foreground truncate">{description}</p>
               )}
            </div>
            
            <button className="flex-shrink-0 text-muted-foreground hover:text-foreground transition-colors p-1 -mr-2 -mt-2">
               <MoreVertical className="h-5 w-5" />
            </button>
         </div>
      </div>
    </div>
  )
}

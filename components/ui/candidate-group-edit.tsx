"use client"

import * as React from "react"
import { ChevronUp, MoreVertical } from "lucide-react"
import { PlaceBadge } from "@/components/ui/place-badge"
import { cn } from "@/lib/utils"

interface CandidateGroupEditProps extends React.HTMLAttributes<HTMLDivElement> {
  candidates: {
    id: string
    title: string
    type?: string
  }[]
}

export function CandidateGroupEdit({
  className,
  candidates,
  ...props
}: CandidateGroupEditProps) {
  const [isExpanded, setIsExpanded] = React.useState(false)
  const visibleCandidates = isExpanded ? candidates : candidates.slice(0, 3)
  const hasMore = candidates.length > 3
  
  return (
    <div 
        className={cn(
            "flex flex-col rounded-2xl bg-muted p-1.5 gap-1.5 transition-all overflow-hidden",
            className
        )} 
        {...props}
    >
      {/* Content List */}
      <div className="flex flex-col gap-1.5 w-full">
        {visibleCandidates.map((candidate, index) => (
            <div key={candidate.id} className="flex items-center justify-between rounded-xl bg-background px-3.5 py-2.5 shadow-sm">
                <div className="flex items-center gap-3">
                    {/* Icon Badge */}
                    <PlaceBadge type={candidate.type} />

                    {/* Title */}
                    <span className="text-sm font-bold text-foreground">
                        {candidate.title}
                    </span>
                </div>
                
                <button className="text-muted-foreground hover:text-foreground">
                    <MoreVertical className="h-5 w-5" />
                </button>
            </div>
        ))}
      </div>

      {/* Toggle Footer */}
      {(hasMore || isExpanded) && (
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex w-full items-center justify-center gap-1.5 py-2 text-muted-foreground hover:text-foreground transition-colors"
          >
             <span className="text-sm font-medium">
                {isExpanded ? "접기" : `총 ${candidates.length}개의 후보지 모두 보기`}
             </span>
             <ChevronUp className={cn("h-5 w-5 transition-transform duration-200", isExpanded ? "rotate-0" : "rotate-180")} />
          </button>
      )}

    </div>
  )
}

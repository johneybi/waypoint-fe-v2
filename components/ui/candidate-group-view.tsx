"use client"

import * as React from "react"
import { ChevronUp } from "lucide-react"
import { CandidateCard } from "@/components/ui/candidate-card"
import { cn } from "@/lib/utils"

interface CandidateGroupViewProps extends React.HTMLAttributes<HTMLDivElement> {
  // We can pass the raw items or component children, but structured data is cleaner for limit logic
  items: {
    title: string
    address: string
    voteCount?: number
    commentCount?: number
    author?: string
  }[]
}

export function CandidateGroupView({
  className,
  items,
  ...props
}: CandidateGroupViewProps) {
  const [isExpanded, setIsExpanded] = React.useState(false)
  const visibleItems = isExpanded ? items : items.slice(0, 3)
  const hasMore = items.length > 3

  return (
    <div className={cn("flex flex-col gap-3 rounded-[20px] border border-dashed border-border bg-muted/30 p-3", className)} {...props}>
        <div className="px-1">
          <h4 className="text-sm font-semibold text-muted-foreground">아직 장소가 확정되지 않았어요</h4>
        </div>

        <div className="flex flex-col gap-3">
          {visibleItems.map((item, index) => (
             <CandidateCard 
                key={index}
                title={item.title}
                address={item.address}
                voteCount={item.voteCount}
                commentCount={item.commentCount}
                author={item.author}
             />
          ))}
        </div>

        {/* Footer Actions (Horizontal Row) */}
        <div className="mt-2 flex items-center justify-between border-t border-dashed border-border/50 pt-2">
            {/* Toggle Button */}
            {(hasMore || isExpanded) ? (
                <button 
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-1.5 rounded-md hover:bg-muted"
                >
                    <span>{isExpanded ? "접기" : `+${items.length - 3}개 더보기`}</span>
                    <ChevronUp className={cn("h-3.5 w-3.5 transition-transform", isExpanded ? "rotate-0" : "rotate-180")} />
                </button>
            ) : <div />} {/* Spacer if no toggle */}

            {/* Select Action */}
            <button className="flex items-center justify-center rounded-lg bg-white border border-border px-3 py-1.5 text-xs font-bold text-foreground shadow-sm transition-all hover:bg-muted active:scale-95">
                후보지 선택하기
            </button>
        </div>
    </div>
  )
}

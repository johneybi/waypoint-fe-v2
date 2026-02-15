"use client"

import * as React from "react"
import { MessageCircle, Laugh, Smile, Frown } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PlaceBadge } from "@/components/ui/place-badge"
import { cn } from "@/lib/utils"

interface CandidateCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  address: string
  author?: string
  voteCount?: number
  commentCount?: number
  type?: string
}

export function CandidateCard({
  className,
  title,
  address,
  author = "Writer",
  voteCount = 3,
  commentCount = 12,
  type = "PLACE",
  ...props
}: CandidateCardProps) {
  
  return (
    <div 
      className={cn(
        "relative flex w-full flex-col overflow-hidden rounded-[16px] border border-border/60 bg-card shadow-sm transition-all hover:shadow-md",
        className
      )} 
      {...props}
    >
      <div className="flex flex-col gap-3 p-4">
        {/* Header */}
        <div className="flex items-start justify-between">
            <div className="flex items-start gap-2">
                {/* Type Icon Badge */}
                <PlaceBadge type={type} className="mt-0.5" />
                
                <div className="flex flex-col gap-0.5">
                    <h3 className="text-base font-bold text-foreground leading-tight">{title}</h3>
                    <p className="text-xs text-muted-foreground">{address}</p>
                </div>
            </div>
            
            {/* Author Badge */}
            <div className="shrink-0 flex items-center gap-1.5 rounded-full bg-muted pl-1 pr-2 py-0.5">
                <Avatar className="h-4 w-4">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${author}`} alt={author} />
                    <AvatarFallback className="text-[9px]">{author[0]}</AvatarFallback>
                </Avatar>
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider max-w-[60px] truncate">{author}</span>
            </div>
        </div>

        {/* Footer Info */}
        <div className="flex items-center justify-between border-t border-dashed border-border/50 pt-3">
             {/* Reactions (Ghost style) */}
             <div className="flex items-center gap-0.5">
                 <button className="group flex h-8 items-center gap-1 rounded-lg px-2.5 text-muted-foreground transition-all hover:bg-amber-50 hover:text-amber-600 active:scale-95">
                     <Laugh className="h-4 w-4" />
                     <span className="text-xs font-semibold">3</span>
                 </button>
                 <button className="group flex h-8 items-center gap-1 rounded-lg px-2.5 text-muted-foreground transition-all hover:bg-blue-50 hover:text-blue-600 active:scale-95">
                     <Smile className="h-4 w-4" />
                     <span className="text-xs font-semibold">3</span>
                 </button>
                 <button className="group flex h-8 items-center gap-1 rounded-lg px-2.5 text-muted-foreground transition-all hover:bg-red-50 hover:text-red-600 active:scale-95">
                     <Frown className="h-4 w-4" />
                     <span className="text-xs font-semibold">3</span>
                 </button>
             </div>

             {/* Comments */}
             <button className="flex h-8 items-center gap-1.5 rounded-lg border border-[#E2E2E2] bg-white px-3 text-[#1C2024] transition-colors hover:bg-slate-50 active:scale-95">
                 <MessageCircle className="h-4 w-4 text-gray-400" />
                 <span className="text-xs font-normal">{commentCount}</span>
             </button>
        </div>
      </div>
    </div>
  )
}

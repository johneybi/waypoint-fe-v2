"use client"

import * as React from "react"
import { Check, Frown, Laugh, MessageCircle, Smile } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PlaceBadge } from "@/components/ui/place-badge"
import { cn } from "@/lib/utils"
// Refactored to use semantic tokens


interface PlaceCardProps extends React.HTMLAttributes<HTMLDivElement> {
  image?: string
  title?: string
  description?: string
  author?: string
  reactionCount?: number
  commentCount?: number
  variant?: "confirmed" | "candidate"
  confirmationMessage?: string
  type?: string
}

export function PlaceCard({
  className,
  image = "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80",
  title = "Place Name",
  description = "Description of the place...",
  author = "Writer",
  reactionCount = 9,
  commentCount = 12,

  variant = "confirmed",
  confirmationMessage,
  type = "PLACE",
  ...props
}: PlaceCardProps) {
  return (
    <div className={cn("relative flex w-full flex-col", className)} {...props}>
      {/* Decorative Background Layers (Stacked Effect) */}
      <div className="absolute inset-x-2 -top-1 flex justify-center">
        <div className="h-full w-full -rotate-1 rounded-[24px] bg-neutral-100 opacity-60" />
      </div>

      {/* Main Card */}
      <div className="relative flex w-full flex-col overflow-hidden rounded-[24px] border border-border/60 bg-card shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-shadow hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 px-5 pt-5 pb-3">
        <div className="flex items-start gap-2.5">
            {/* Type Badge */}
            <PlaceBadge type={type} className="mt-0.5" />
            <h3 className="text-lg font-bold text-foreground leading-snug line-clamp-2 break-keep">{title}</h3>
        </div>
        
        {/* Author Badge */}
        <div className="shrink-0 flex items-center gap-1.5 rounded-full bg-muted pl-1 pr-2.5 py-1">
          <Avatar className="h-5 w-5">
            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${author}`} alt={author} />
            <AvatarFallback className="text-[10px]">{author[0]}</AvatarFallback>
          </Avatar>
          <span className="text-xs font-semibold text-muted-foreground max-w-[80px] truncate">{author}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col gap-3 w-full">
        {/* Image - Full Width */}
        <div className="relative w-full overflow-hidden bg-muted aspect-[16/10]">
          <img
            src={image}
            alt={title}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
        
        <div className="px-5 pb-2">
          <p className="line-clamp-2 text-sm text-[#757575] leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {/* Footer / Reactions */}
      <div className="flex items-center justify-between border-t border-dashed border-border/60 px-5 py-3 bg-white">
         <div className="flex items-center gap-1">
             {/* Reaction: Nice (Laugh) */}
             <button className="group flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-muted-foreground transition-all hover:bg-amber-50 hover:text-amber-600 active:scale-95">
                 <Laugh className="h-4 w-4" />
                 <span className="text-xs font-semibold">3</span>
             </button>
             {/* Reaction: SOSO (Smile) */}
             <button className="group flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-muted-foreground transition-all hover:bg-blue-50 hover:text-blue-600 active:scale-95">
                 <Smile className="h-4 w-4" />
                 <span className="text-xs font-semibold">3</span>
             </button>
             {/* Reaction: Bad (Frown) */}
             <button className="group flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-muted-foreground transition-all hover:bg-red-50 hover:text-red-600 active:scale-95">
                 <Frown className="h-4 w-4" />
                 <span className="text-xs font-semibold">3</span>
             </button>
         </div>
         
         <button className="flex h-8 items-center gap-1.5 rounded-lg border border-[#E2E2E2] bg-white px-3 text-[#1C2024] transition-colors hover:bg-slate-50 active:scale-95">
            <MessageCircle className="h-4 w-4 text-gray-400" />
            <span className="text-xs font-normal">의견 {commentCount}</span>
         </button>
      </div>

      {/* Confirmation Footer */}
      {confirmationMessage && (
        <div className="px-5 pb-5 bg-white rounded-b-[24px] -mt-1">
             <div className="flex items-center justify-center gap-1.5 rounded-xl border border-border bg-[#F0F0F0] py-2.5 text-center">
                 <div className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-primary text-white">
                    <Check className="h-2.5 w-2.5" />
                 </div>
                 <span className="text-xs font-bold text-primary">{confirmationMessage}</span>
             </div>
        </div>
      )}
      </div>
    </div>
  )
}

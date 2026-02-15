"use client"

import * as React from "react"
import { MoreHorizontal, Users } from "lucide-react"
import { cn } from "@/lib/utils"

interface CollectionCardProps extends React.HTMLAttributes<HTMLDivElement> {
  image?: string
  title?: string
  userCount?: number
}

export function CollectionCard({ 
  className,
  image = "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80", 
  title = "제주도 여행",
  userCount = 4,
  ...props 
}: CollectionCardProps) {
  return (
    <div className={cn("relative flex w-[335px] flex-col items-start", className)} {...props}>
      {/* Decorative Background Layers */}
      <div className="absolute inset-x-0 -top-1.5 flex justify-center">
        <div className="h-[232px] w-[335px] -rotate-2 rounded-3xl bg-neutral-300" />
      </div>
      <div className="absolute inset-x-0 -top-2 flex justify-center">
        <div className="h-[232px] w-[335px] rotate-3 rounded-3xl bg-neutral-200" />
      </div>

      {/* Main Card */}
      <div className="relative flex w-full flex-col overflow-hidden rounded-3xl border border-[#E2E2E2] bg-[#FAFAFA] shadow-sm">
        {/* Image Area: 11:5 aspect ratio = 45.45% padding-bottom */}
        <div className="relative w-full bg-white" style={{ paddingBottom: '45.45%' }}>
           <img 
             src={image} 
             alt={title} 
             className="absolute inset-0 h-full w-full object-cover" 
           />
        </div>

        {/* Content Area */}
        <div className="flex items-end justify-between px-5 py-4 pt-2.5">
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-bold leading-7 text-[#1C2024]">{title}</h3>
            <div className="flex items-center gap-1 text-[#757575]">
              <Users className="h-4 w-4" />
              <span className="text-sm">{userCount}명 참여 중</span>
            </div>
          </div>

          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white/60 backdrop-blur-sm transition-colors hover:bg-white/80">
            <MoreHorizontal className="h-6 w-6 text-[#1C2024]" />
          </button>
        </div>
      </div>
    </div>
  )
}

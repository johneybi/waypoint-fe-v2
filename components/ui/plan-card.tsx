"use client"

import * as React from "react"
import { MoreHorizontal, Users } from "lucide-react"
import { cn } from "@/lib/utils"

interface PlanCardProps extends React.HTMLAttributes<HTMLDivElement> {
  image?: string
  title?: string
  userCount?: number
  dateRange?: string
}

export function PlanCard({
  className,
  image = "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80",
  title = "제주도 여행",
  userCount = 4,
  dateRange = "2025.12.30 ~ 2026.01.01",
  ...props
}: PlanCardProps) {
  return (
    <div className={cn("relative flex w-[335px] flex-col overflow-hidden rounded-tl-3xl rounded-tr-3xl rounded-br-3xl rounded-bl-xl border border-slate-200 bg-[#E7E7E7] shadow-sm", className)} {...props}>
      {/* Upper Section */}
      <div className="relative w-full">
         <div className="aspect-[16/9] w-full bg-white">
             <img src={image} alt={title} className="h-full w-full object-cover" />
         </div>
      </div>

      {/* Content Section */}
      <div className="relative flex w-full items-end justify-between rounded-tl-xl rounded-br-3xl bg-[#FAFAFA] px-5 pb-3.5 pt-2.5">
        
        {/* Floating Badge */}
        <div className="absolute left-4 -top-9 flex items-center justify-center rounded-full bg-[#1C2024]/40 px-3 py-1 backdrop-blur-md">
            <span className="text-xs text-white">{dateRange}</span>
        </div>

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

       {/* Ticket Bottom Effect */}
       <div className="flex h-6 w-full items-center justify-end bg-[#FAFAFA] pl-px">
         <div className="flex h-full w-full flex-col justify-between overflow-hidden rounded-tl-xl bg-[#F0F0F0] py-1 pl-1">
            {/* Gradient Lines Simulation */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-[#D9D9D9] to-transparent opacity-50" />
            <div className="w-full h-px bg-gradient-to-r from-transparent via-[#D9D9D9] to-transparent opacity-50" />
            <div className="w-full h-px bg-gradient-to-r from-transparent via-[#D9D9D9] to-transparent opacity-50" />
            <div className="w-full h-px bg-gradient-to-r from-transparent via-[#D9D9D9] to-transparent opacity-50" />
            <div className="w-full h-px bg-gradient-to-r from-transparent via-[#D9D9D9] to-transparent opacity-50" />
            <div className="w-full h-px bg-gradient-to-r from-transparent via-[#D9D9D9] to-transparent opacity-50" />
         </div>
       </div>
    </div>
  )
}

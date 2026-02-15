"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { MapPin } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroupItem } from "@/components/ui/radio-group"

interface SelectionCardProps extends React.ComponentProps<"div"> {
  title: string
  address: string
  selected?: boolean
  type?: "checkbox" | "radio"
  value?: string // For radio
  id?: string // For checkbox
  onCheckedChange?: (checked: boolean) => void // For checkbox
}

export function SelectionCard({
  title,
  address,
  selected,
  type = "checkbox",
  value,
  id,
  onCheckedChange,
  className,
  ...props
}: SelectionCardProps) {
  const isSelected = selected

  return (
    <div
      className={cn(
        "relative flex flex-col items-start rounded-[20px] bg-[#F0F0F0] px-5 py-3 transition-all",
        isSelected && "border-[2px] border-[#0EA5E9]", // Sky 500 border when selected
        !isSelected && "border-[2px] border-transparent",
        className
      )}
      {...props}
    >
      <div className="flex w-full items-start justify-between gap-3">
        {/* Control */}
        <div className="order-first pt-0.5">
           {type === 'checkbox' ? (
             <Checkbox 
                checked={selected} 
                onCheckedChange={onCheckedChange}
                id={id}
             />
           ) : (
             <RadioGroupItem value={value!} id={id} checked={selected} />
           )}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col gap-[7px]">
          <span className="font-semibold leading-6 text-[#1C2024]">{title}</span>
          <div className="flex items-center gap-[3px] text-[#737373]">
            <MapPin className="h-[18px] w-[18px]" />
            <span className="text-sm leading-5">{address}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

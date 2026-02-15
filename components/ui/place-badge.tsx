"use client"

import * as React from "react"
import { Umbrella, Mountain, Coffee, Utensils, MapPin, Tent, BedDouble, Camera } from "lucide-react"
import { cn } from "@/lib/utils"

export type PlaceType = "BEACH" | "ISLAND" | "CAFE" | "RESTAURANT" | "ACCOMMODATION" | "ATTRACTION" | "PLACE"

interface PlaceBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: string | PlaceType
}

export function PlaceBadge({ className, type = "PLACE", ...props }: PlaceBadgeProps) {
  
  const getTypeIcon = () => {
      // Normalize type to uppercase for case-insensitive matching
      const normalizedType = type?.toUpperCase() || "PLACE";

      switch(normalizedType) {
          case "BEACH": return <Umbrella className="h-3.5 w-3.5" />; // Blue
          case "ISLAND": return <Mountain className="h-3.5 w-3.5" />; // Green
          case "CAFE": return <Coffee className="h-3.5 w-3.5" />; // Amber/Brown
          case "RESTAURANT": return <Utensils className="h-3.5 w-3.5" />; // Orange
          case "ACCOMMODATION": return <BedDouble className="h-3.5 w-3.5" />; // Purple/Indigo
          case "ATTRACTION": return <Camera className="h-3.5 w-3.5" />; // Pink
          case "CAMPING": return <Tent className="h-3.5 w-3.5" />; // Green/Forest
          default: return <MapPin className="h-3.5 w-3.5" />; // Default Slate
      }
  }

  const getTypeColor = () => {
      const normalizedType = type?.toUpperCase() || "PLACE";

      switch(normalizedType) {
          case "BEACH": return "bg-blue-100 text-blue-600 border-blue-200";
          case "ISLAND": return "bg-emerald-100 text-emerald-600 border-emerald-200";
          case "CAFE": return "bg-amber-100 text-amber-700 border-amber-200";
          case "RESTAURANT": return "bg-orange-100 text-orange-600 border-orange-200";
          case "ACCOMMODATION": return "bg-indigo-100 text-indigo-600 border-indigo-200";
          case "ATTRACTION": return "bg-pink-100 text-pink-600 border-pink-200";
          case "CAMPING": return "bg-green-100 text-green-700 border-green-200";
          default: return "bg-slate-100 text-slate-600 border-slate-200";
      }
  }

  return (
    <div 
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full p-1.5 border border-transparent transition-colors",
        getTypeColor(),
        className
      )}
      {...props}
    >
      {getTypeIcon()}
    </div>
  )
}

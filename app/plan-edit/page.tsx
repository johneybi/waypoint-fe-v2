"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowLeft, ChevronRight, Menu, Plus, Map as MapIcon, CalendarDays } from "lucide-react"
import { PlaceCardEdit } from "@/components/ui/place-card-edit"
import { CandidateGroupEdit } from "@/components/ui/candidate-group-edit"
import { TimelineItem } from "@/components/ui/timeline"
import { DayNavigator } from "@/components/ui/day-navigator"
import { BudgetEdit } from "@/components/ui/budget-edit"
import { cn } from "@/lib/utils"

export default function PlanEditPage() {
  
  // Mock Data (Same as Plan View for consistency)
  const scheduleData: Record<string, { date: string; items: any[] }> = {
    "Day 1": {
      date: "2024.10.24 (토)",
      items: [
        { type: "place", placeType: "ATTRACTION", time: "09:00", location: "서울시 마포구", title: "헤이리 예술 마을", description: "유럽풍의 정원, 베이커리, 카페, 레스토랑 등이 있는 테마 마을" },
        { type: "group", time: "12:00", location: "5개의 후보지", candidates: [
            { id: "c1", title: "우도 산호해수욕장", type: "BEACH" },
            { id: "c2", title: "검멀레 해수욕장", type: "BEACH" },
            { id: "c3", title: "비양도", type: "ISLAND" },
            { id: "c4", title: "하고수동 해수욕장", type: "BEACH" },
            { id: "c5", title: "서빈백사", type: "BEACH" }
        ]},
        { type: "freetime", time: "15:00", location: "월정리 해변", description: "투명카약 체험 및 카페 휴식" },
        { type: "place", placeType: "ATTRACTION", time: "17:00", location: "제주시", title: "제주도 동부에서 가장 아름다운 유채꽃 명소와 성산일출봉 뷰포인트", description: "유채꽃밭 구경 및 사진 촬영", isLast: true }
      ]
    },
    "Day 2": {
      date: "2024.10.25 (일)",
      items: [
        { type: "place", time: "10:00", location: "숙소", title: "호텔 조식", description: "신선한 제주 재료로 만든 조식 뷔페" },
        { type: "place", time: "12:00", location: "제주시 구좌읍", title: "만장굴", description: "세계 최장 길이의 용암 동굴" },
        { type: "place", time: "18:00", location: "제주시", title: "동문시장", description: "제주의 맛있는 먹거리가 가득한 야시장", isLast: true }
      ]
    },
    "Day 3": {
      date: "2024.10.26 (월)",
      items: [
        { type: "place", time: "11:00", location: "체크아웃", title: "숙소 체크아웃", description: "짐 정리 및 로비에서 만남" },
        { type: "place", time: "15:00", location: "제주공항", title: "공항 도착", description: "면세점 쇼핑 및 비행기 탑승 대기", isLast: true }
      ]
    }
  }

  const days = Object.keys(scheduleData)
  
  // State for expand/collapse of days
  const [openDays, setOpenDays] = React.useState<Record<string, boolean>>({
    "Day 1": true,
    "Day 2": true,
    "Day 3": true
  })

  // View State
  const [viewMode, setViewMode] = React.useState<"map" | "list">("list")
  const [activeTab, setActiveTab] = React.useState<"plan" | "budget">("plan")
  const [showNavigator, setShowNavigator] = React.useState(true)
  const [selectedDay, setSelectedDay] = React.useState("Day 1")
  const observerRef = React.useRef<IntersectionObserver | null>(null)
  const isClickingRef = React.useRef(false)

   // Intersection Observer Logic (Reused)
   React.useEffect(() => {
    if (typeof window === "undefined") return

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (isClickingRef.current) return

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const visibleDay = entry.target.id.replace("-", " ")
            const formattedDay = visibleDay.charAt(0).toUpperCase() + visibleDay.slice(1)
            setSelectedDay(formattedDay)
          }
        })
      },
      {
        rootMargin: "-20% 0px -60% 0px", 
        threshold: 0
      }
    )

    const dayElements = document.querySelectorAll('[id^="day-"]')
    dayElements.forEach((el) => observerRef.current?.observe(el))

    return () => observerRef.current?.disconnect()
  }, [days])
  
  const handleScrollToDay = (day: string) => {
    isClickingRef.current = true
    setSelectedDay(day)
    const element = document.getElementById(day.replace(" ", "-").toLowerCase())
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
      setOpenDays(prev => ({ ...prev, [day]: true }))
      setTimeout(() => { isClickingRef.current = false }, 1000)
    }
  }

  const toggleDay = (day: string) => {
    setOpenDays(prev => ({ ...prev, [day]: !prev[day] }))
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-background pb-32">
       {/* Header - Edit Mode Specific */}
       <header className="sticky top-0 z-50 flex h-14 items-center justify-between bg-background px-4 border-b border-border">
         {/* Left: End Edit */}
         <Link href="/plan-view" className="-ml-1">
            <button className="flex items-center gap-1 py-2 px-2 text-sm font-bold text-muted-foreground hover:text-foreground transition-colors">
               <ArrowLeft className="h-5 w-5" />
               <span>편집 종료</span>
            </button>
         </Link>
         
         {/* Center: Title */}
         <div className="font-semibold text-lg text-foreground absolute left-1/2 -translate-x-1/2 pointer-events-none">
            편집모드
         </div>

         {/* Right: View Controls */}
         <div className="flex items-center gap-1 -mr-1">
           <button 
             onClick={() => setViewMode(viewMode === "map" ? "list" : "map")}
             className={cn(
               "p-2 rounded-full transition-colors",
               viewMode === "map" ? "text-primary bg-primary/10" : "text-muted-foreground hover:bg-muted"
             )}
             aria-label="Toggle Map"
           >
              <MapIcon className="h-5 w-5" />
           </button>
           
           <button 
             onClick={() => setShowNavigator(!showNavigator)}
             className={cn(
               "p-2 rounded-full transition-colors",
               showNavigator ? "text-primary bg-primary/10" : "text-muted-foreground hover:bg-muted"
             )}
             aria-label="Toggle Day Navigator"
           >
              <CalendarDays className="h-5 w-5" />
           </button>
         </div>
       </header>
 
       {/* Map Area (Placeholder) */}
       <div 
         className={cn(
           "sticky top-14 z-30 w-full overflow-hidden bg-muted transition-all duration-300 ease-in-out",
           viewMode === "map" ? "h-[240px] border-b border-border shadow-sm" : "h-0 border-transparent shadow-none"
         )}
       >
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/40">
              <MapIcon className="h-10 w-10 opacity-20" />
          </div>
          {/* Add/Remove Buttons Overlay */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-1">
              <button className="flex h-10 w-10 items-center justify-center rounded-full bg-card text-muted-foreground shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-transform hover:scale-105 active:scale-95 text-2xl font-normal leading-none pb-1">+</button>
              <button className="flex h-10 w-10 items-center justify-center rounded-full bg-card text-muted-foreground shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-transform hover:scale-105 active:scale-95 text-2xl font-normal leading-none pb-1">-</button>
          </div>
       </div>

       {/* Project Info Header */}
       <div className="px-5 py-6 bg-background">
          <div className="flex items-center justify-between">
             <div>
                <h1 className="text-2xl font-bold text-foreground leading-tight">제주도 여행</h1>
                <span className="text-sm font-semibold text-muted-foreground block mt-1">14박 15일 여행</span>
             </div>

          </div>
       </div>

       {/* Day Navigator */}
       {showNavigator && (
         <div 
           className={cn(
             "sticky z-40 bg-background border-b border-border transition-all duration-300 ease-in-out",
             viewMode === "map" ? "top-[296px]" : "top-14"
           )}
         >
           <DayNavigator 
              days={days}
              currentDay={selectedDay}
              onSelectDay={handleScrollToDay}
              className=""
           />
         </div>
       )}
       
       <div className="flex-1 transition-all duration-300">
         {activeTab === "plan" ? (
           <>
             {/* Timeline Section */}
             <div className="px-5 pt-4 pb-24">
                {days.map((day) => {
                  const schedule = scheduleData[day]
                  const isOpen = openDays[day]
                  
                  return (
                    <div 
                      key={day} 
                      id={day.replace(" ", "-").toLowerCase()} 
                      className={cn(
                        "mb-8",
                        viewMode === "map" ? "scroll-mt-[372px]" : "scroll-mt-36"
                      )}
                    >
                      {/* Day Header */}
                       <button 
                         onClick={() => toggleDay(day)}
                         className="flex w-[calc(100%+40px)] items-center gap-3 py-4 transition-colors hover:bg-muted/50 -ml-5 px-5"
                       >
                          <span className="text-lg font-bold text-foreground">DAY {day.replace("Day ", "")}</span>
                          <span className="text-sm text-muted-foreground font-normal">하루를 계획해보세요</span>
                          <ChevronRight 
                             className={cn(
                               "h-5 w-5 text-muted-foreground ml-auto transition-transform duration-200",
                               isOpen ? "rotate-90" : "rotate-0"
                             )} 
                          />
                       </button>

                       {/* Dynamic Items */}
                       <div className={cn("flex flex-col pt-2 transition-all", !isOpen && "hidden")}>
                         {schedule.items.map((item, index) => {
                           if (item.type === "group") {
                              return (
                                  <TimelineItem key={`${day}-${index}`} time={item.time} location={item.location} isLast={item.isLast}>
                                      <CandidateGroupEdit candidates={item.candidates} />
                                  </TimelineItem>
                              )
                           }
                           
                           return (
                              <TimelineItem key={`${day}-${index}`} time={item.time} location={item.location} isLast={item.isLast}>
                                  <PlaceCardEdit 
                                    title={item.title || item.location} 
                                    description={item.description}
                                    type={item.placeType}
                                  />
                              </TimelineItem>
                           )
                         })}
                       </div>
                    </div>
                  )
                })}
             </div>
           </>
         ) : (
           <BudgetEdit />
         )}
       </div>

       {/* Unified Floating Toolbar (iOS Capsule Style) */}
       <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center p-1.5 gap-3 rounded-full border border-border/40 bg-background/80 shadow-2xl backdrop-blur-xl ring-1 ring-border/50 max-w-[90vw]">
          
          {/* Segmented Control (Navigation) */}
          <div className="flex shrink-0 items-center gap-1 rounded-full bg-muted/50 p-1">
             <button 
                onClick={() => setActiveTab("plan")}
                className={cn(
                  "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold shadow-sm transition-all border whitespace-nowrap",
                  activeTab === "plan" ? "bg-background text-foreground border-border/50" : "font-medium text-muted-foreground border-transparent hover:bg-background/50 hover:text-foreground"
                )}
             >
                <span>여행 플랜</span>
             </button>
             <button 
                onClick={() => setActiveTab("budget")}
                className={cn(
                  "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold shadow-sm transition-all border whitespace-nowrap",
                  activeTab === "budget" ? "bg-background text-foreground border-border/50" : "font-medium text-muted-foreground border-transparent hover:bg-background/50 hover:text-foreground"
                )}
             >
                <span>예산</span>
             </button>
          </div>

          <div className="w-px h-8 bg-border/50 shrink-0" />

          {/* Primary Action (Add Place) */}
          <button className="flex shrink-0 h-11 items-center gap-2 rounded-full bg-primary px-5 text-primary-foreground shadow-lg transition-transform hover:scale-105 active:scale-95 duration-200">
             <Plus className="h-5 w-5" />
             <span className="font-bold text-sm leading-none whitespace-nowrap pt-0.5">장소 추가</span>
          </button>
       </div>

    </div>
  )
}

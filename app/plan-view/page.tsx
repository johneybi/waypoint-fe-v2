"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowLeft, ChevronRight, Map as MapIcon, Menu, CalendarDays } from "lucide-react"
import { PlaceCard } from "@/components/ui/place-card"
import { CandidateGroupView } from "@/components/ui/candidate-group-view"
import { TimelineItem } from "@/components/ui/timeline"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FreeTimeCard } from "@/components/ui/free-time-card"
import { DayNavigator } from "@/components/ui/day-navigator"
import { BudgetView } from "@/components/ui/budget-view"
import { cn } from "@/lib/utils"

export default function PlanViewPage() {
  const [viewMode, setViewMode] = React.useState<"map" | "list">("map")
  const [activeTab, setActiveTab] = React.useState<"plan" | "budget">("budget")
  
  // Mock Data
  const scheduleData: Record<string, { date: string; items: any[] }> = {
    "Day 1": {
      date: "2024.10.24 (토)",
      items: [
        { type: "place", placeType: "ATTRACTION", time: "02:00", location: "서울시 마포구", title: "헤이리 예술 마을", description: "유럽풍의 정원, 베이커리, 카페, 레스토랑 등이 있는 테마 마을", image: "https://images.unsplash.com/photo-1499591934245-40b55745b905?auto=format&fit=crop&w=800&q=80" },
        { type: "place", placeType: "ATTRACTION", time: "03:00", location: "서울시 마포구", title: "섭지코지", description: "제주 동부 해안에 볼록 튀어나온 섭지코지는 성산일출봉을 배경으로...", image: "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?auto=format&fit=crop&w=800&q=80", confirmationMessage: "총 3개의 후보지 중 이 장소로 확정되었어요" },
        { type: "group", time: "04:00", location: "5개의 후보지", candidates: [
            { title: "우도 산호해수욕장", address: "제주시 우도면 연평리", voteCount: 3, commentCount: 8, author: "User1", type: "BEACH" },
            { title: "검멀레 해수욕장", address: "제주시 우도면 연평리", voteCount: 2, commentCount: 5, author: "User2", type: "BEACH" },
            { title: "비양도", address: "제주시 우도면", voteCount: 4, commentCount: 10, author: "User3", type: "ISLAND" },
            { title: "하고수동 해수욕장", address: "제주시 우도면", voteCount: 1, commentCount: 2, author: "User4", type: "BEACH" },
            { title: "서빈백사", address: "제주시 우도면", voteCount: 5, commentCount: 12, author: "User5", type: "BEACH" }
        ]},
        { type: "freetime", time: "17:00", location: "자유 시간", description: "근처 소품샵 구경 및 개별 식사" },
        { type: "place", placeType: "ATTRACTION", time: "05:00", location: "제주시 조천읍", title: "제주도 동부에서 가장 아름다운 유채꽃 명소와 성산일출봉 뷰포인트", description: "제주도 서귀포시 성산읍 고성리 섭지코지 근처 유채꽃밭...", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80", author: "Jeju_Island_Professional_Photographer_2024", isLast: true }
      ]
    },
    "Day 2": {
      date: "2024.10.25 (일)",
      items: [
        { type: "place", placeType: "ACCOMMODATION", time: "10:00", location: "숙소", title: "호텔 조식", description: "신선한 제주 재료로 만든 조식 뷔페", image: "https://images.unsplash.com/photo-1525351484331-18c3171aa35c?auto=format&fit=crop&w=800&q=80" },
        { type: "place", placeType: "ATTRACTION", time: "12:00", location: "제주시 구좌읍", title: "만장굴", description: "세계 최장 길이의 용암 동굴", image: "https://images.unsplash.com/photo-1476900543704-4312b78632f8?auto=format&fit=crop&w=800&q=80" },
        { type: "freetime", time: "15:00", location: "월정리 해변", description: "투명카약 체험 및 카페 휴식" },
        { type: "place", placeType: "ATTRACTION", time: "18:00", location: "제주시", title: "동문시장", description: "제주의 맛있는 먹거리가 가득한 야시장", image: "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=800&q=80", isLast: true }
      ]
    },
    "Day 3": {
      date: "2024.10.26 (월)",
      items: [
        { type: "place", placeType: "ACCOMMODATION", time: "11:00", location: "체크아웃", title: "숙소 체크아웃", description: "짐 정리 및 로비에서 만남" },
        { type: "place", placeType: "RESTAURANT", time: "13:00", location: "제주시", title: "자매국수", description: "제주 3대 고기국수 맛집", image: "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=800&q=80" },
        { type: "place", placeType: "ATTRACTION", time: "15:00", location: "제주공항", title: "공항 도착", description: "면세점 쇼핑 및 비행기 탑승 대기", isLast: true }
      ]
    }
  }

  const days = Object.keys(scheduleData)

  const [showNavigator, setShowNavigator] = React.useState(true)
  const [openDays, setOpenDays] = React.useState<Record<string, boolean>>({
    "Day 1": true,
    "Day 2": true,
    "Day 3": true
  })
  const [selectedDay, setSelectedDay] = React.useState("Day 1")
  const observerRef = React.useRef<IntersectionObserver | null>(null)
  const isClickingRef = React.useRef(false)

  React.useEffect(() => {
    if (typeof window === "undefined") return

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (isClickingRef.current) return

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Find the day that is most visible
            const visibleDay = entry.target.id.replace("-", " ") // "day-1" -> "day 1"
            const formattedDay = visibleDay.charAt(0).toUpperCase() + visibleDay.slice(1) // "Day 1"
            setSelectedDay(formattedDay)
          }
        })
      },
      {
        rootMargin: "-20% 0px -60% 0px", // Trigger when element is near top
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
      
      // Reset clicking flag after scrolling finishes (approximate)
      setTimeout(() => {
        isClickingRef.current = false
      }, 1000)
    }
  }

  const toggleDay = (day: string) => {
    setOpenDays(prev => ({ ...prev, [day]: !prev[day] }))
  }


  // Removed single schedule selection

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur-md">
        <button className="p-1">
          <ArrowLeft className="h-6 w-6 text-foreground" />
        </button>

        {/* View Controls */}
        <div className="flex items-center gap-1">
          {activeTab === "plan" && (
            <button 
              onClick={() => setViewMode(viewMode === "map" ? "list" : "map")}
              className={cn(
                "p-2 rounded-full transition-colors",
                viewMode === "map" ? "text-primary bg-primary/10" : "text-foreground hover:bg-muted"
              )}
              aria-label="Toggle Map"
            >
               <MapIcon className="h-5 w-5" />
            </button>
          )}
          
          <button 
            onClick={() => setShowNavigator(!showNavigator)}
            className={cn(
              "p-2 rounded-full transition-colors",
              showNavigator ? "text-primary bg-primary/10" : "text-foreground hover:bg-muted"
            )}
            aria-label="Toggle Day Navigator"
          >
             <CalendarDays className="h-5 w-5" />
          </button>

          <button className="p-2 rounded-full text-foreground hover:bg-muted transition-colors" aria-label="Menu">
             <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>
      


      {/* Map Area (Placeholder) */}
      <div 
        className={cn(
          "sticky top-14 z-30 w-full overflow-hidden bg-muted transition-all duration-300 ease-in-out",
          (viewMode === "map" && activeTab === "plan") ? "h-[240px] border-b border-border shadow-sm" : "h-0 border-transparent shadow-none"
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

      {/* Trip Info Header */}
      <div className="px-5 py-6">
         <div className="flex items-center justify-between">
            <div>
               <h1 className="text-2xl font-bold text-foreground">제주도 여행</h1>
               <span className="text-sm font-semibold text-muted-foreground">14박 15일 여행</span>
            </div>
             <Link href="/plan-edit">
               <button className="rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90">
                  편집 하기
               </button>
             </Link>
         </div>

      </div>

      <div className="flex-1 transition-all duration-300">
        {/* Sticky Day Navigator (Visible for both Plan and Budget) */}
        <div 
          className={cn(
            "sticky z-40 transition-all duration-300 ease-in-out overflow-hidden",
            (viewMode === "map" && activeTab === "plan") ? "top-[296px]" : "top-14",
            showNavigator ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <DayNavigator 
              days={days}
              currentDay={selectedDay}
              onSelectDay={handleScrollToDay}
              className="bg-background border-b border-border"
          />
        </div>

        {activeTab === "plan" ? (
          <>
            {/* Timeline Section */}
            <div className="px-5 pb-24">
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
                        className="mt-6 flex w-[calc(100%+40px)] items-center justify-between border-b border-border/60 py-4 transition-colors hover:bg-muted/50 active:bg-muted -ml-5 px-5"
                      >
                        <div className="flex items-center gap-4">
                            {/* Day Badge */}
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                <span className="text-xl font-bold">{day.replace("Day ", "")}</span>
                            </div>
                            <div className="flex flex-col items-start gap-0.5">
                                <h2 className="text-xl font-bold text-foreground">{day.toUpperCase()}</h2>
                                <p className="text-sm font-medium text-muted-foreground">{schedule.date}</p>
                            </div>
                        </div>
                        
                        <ChevronRight 
                            className={cn(
                              "h-5 w-5 text-muted-foreground transition-transform duration-200",
                              isOpen ? "rotate-90" : "rotate-0"
                            )} 
                        />
                      </button>

                      {/* Dynamic Items */}
                      <div className={cn("flex flex-col pt-4 transition-all", !isOpen && "hidden")}>
                        {schedule.items.map((item, index) => {
                          if (item.type === "group") {
                            return (
                              <TimelineItem key={`${day}-${index}`} time={item.time} location={item.location}>
                                  <CandidateGroupView items={item.candidates} />
                              </TimelineItem>
                            )
                          }
                          
                          if (item.type === "freetime") {
                            return (
                              <TimelineItem key={`${day}-${index}`} time={item.time} location={item.location}>
                                  <FreeTimeCard description={item.description} />
                              </TimelineItem>
                            )
                          }

                          return (
                            <TimelineItem key={`${day}-${index}`} time={item.time} location={item.location} isLast={item.isLast}>
                                <PlaceCard 
                                  title={item.title} 
                                  description={item.description}
                                  image={item.image}
                                  confirmationMessage={item.confirmationMessage}
                                  author={item.author}
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
          <BudgetView />
        )}
      </div>

      {/* Floating Bottom Tabs */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
         <div className="flex items-center gap-1 rounded-full border border-border/40 bg-background/80 p-1.5 shadow-2xl backdrop-blur-xl ring-1 ring-border">
            <button 
              onClick={() => setActiveTab("plan")}
              className={cn(
                "flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-all",
                activeTab === "plan" ? "bg-primary text-primary-foreground shadow-md" : "text-muted-foreground hover:bg-muted hover:text-foreground font-medium"
              )}
            >
               <span>여행 플랜</span>
            </button>
            <button 
              onClick={() => setActiveTab("budget")}
              className={cn(
                "flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-all",
                activeTab === "budget" ? "bg-primary text-primary-foreground shadow-md" : "text-muted-foreground hover:bg-muted hover:text-foreground font-medium"
              )}
            >
               <span>예산</span>
            </button>
         </div>
      </div>
    </div>
  )
}

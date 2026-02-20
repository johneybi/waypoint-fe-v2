'use client'

import React, { useState, useMemo } from 'react'
import { Check, ChevronRight, ChevronDown, CalendarDays, Info, ReceiptIcon, Calculator, Laugh, Smile, Angry, Wallet, Users, Goal, TrendingDown } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from '@/lib/utils'
// Type Definitions
// -----------------------------------------------------------------------------
export type ExpenseItem = {
  id: string;
  type: 'place' | 'candidate';
  category: string;
  title: string;
  cost: number;
  isConfirmed?: boolean;
}

export type CandidateExpenseGroup = {
  id: string;
  type: 'candidate_group';
  candidates: ExpenseItem[];
  selectedId?: string; // which candidate is selected
  isConfirmed?: boolean;
}

export type BudgetDayData = {
  dayNum: number;
  dateStr: string;
  expenses: (ExpenseItem | CandidateExpenseGroup)[];
}

// -----------------------------------------------------------------------------
// Mock Data (matches the new structure without authors)
// -----------------------------------------------------------------------------
const daysData: BudgetDayData[] = [
  {
    dayNum: 1,
    dateStr: "12월 24일",
    expenses: [
      {
        id: "p1",
        type: "place",
        category: "숙소",
        title: "신라호텔 제주",
        cost: 450000,
        isConfirmed: true,
      },
      {
        id: "c-group-1",
        type: "candidate_group",
        candidates: [
          {
            id: "c1",
            type: "candidate",
            category: "식당",
            title: "흑돼지 몽상",
            cost: 80000,
          },
          {
            id: "c2",
            type: "candidate",
            category: "식당",
            title: "해녀식당",
            cost: 65000,
          }
        ],
        isConfirmed: false,
      }
    ]
  },
  {
    dayNum: 2,
    dateStr: "12월 25일",
    expenses: [
      {
        id: "p2",
        type: "place",
        category: "관광",
        title: "성산일출봉 입장료",
        cost: 10000,
        isConfirmed: true,
      },
      {
        id: "c-group-2",
        type: "candidate_group",
        candidates: [
          {
            id: "c3",
            type: "candidate",
            category: "카페",
            title: "우도 블랑로쉐",
            cost: 24000,
          },
          {
            id: "c4",
            type: "candidate",
            category: "카페",
            title: "바다뷰 카페",
            cost: 18000,
          }
        ],
        selectedId: "c3",
        isConfirmed: true,
      }
    ]
  }
];

// -----------------------------------------------------------------------------
// Candidate Card (Inside Group)
// -----------------------------------------------------------------------------
export function CandidateExpenseCard({ item, confirmedMessage }: { item: ExpenseItem, confirmedMessage?: string }) {
  // Candidate cards have the same core styling but are nested inside the gray group
  return (
    <div className="relative flex w-full flex-col">
       {/* Decorative Background for Confirmations */}
       {confirmedMessage && (
         <div className="absolute inset-x-2 -top-1 flex justify-center">
            <div className="h-full w-full -rotate-1 rounded-[16px] bg-primary/10 opacity-60" />
         </div>
       )}
       
       <div className={cn(
         "relative flex w-full flex-col overflow-hidden rounded-[16px] border bg-card shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-md",
         confirmedMessage ? "border-primary/20" : "border-border"
       )}>
          {/* Header Row */}
          <div className="flex items-center justify-between px-4 pt-[14px] pb-[12px]">
              <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-[10px]">
                    📍
                  </span>
                  <h3 className="text-base font-bold text-foreground line-clamp-1">{item.title}</h3>
              </div>
          </div>

          <div className="px-5 pb-[14px]">
             <div className="text-[14px] text-muted-foreground font-normal leading-[20px] line-clamp-2">
                예산액: {item.cost.toLocaleString()}원
             </div>
          </div>
       </div>
    </div>
  )
}

// -----------------------------------------------------------------------------
// Component: ExpenseCard
// -----------------------------------------------------------------------------
export function ExpenseCard({ item, confirmedMessage }: { item: ExpenseItem, confirmedMessage?: string }) {
  return (
    <div className="relative flex w-full flex-col">
       {/* Decorative Background for Confirmations */}
       {confirmedMessage && (
         <div className="absolute inset-x-2 -top-1 flex justify-center">
            <div className="h-full w-full -rotate-1 rounded-[16px] bg-primary/10 opacity-60" />
         </div>
       )}
       {/* Main Card */}
       <div className={cn(
         "relative flex w-full flex-col overflow-hidden rounded-[16px] border bg-card shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-md",
         confirmedMessage ? "border-primary/20" : "border-border"
       )}>
          {/* Header Row */}
          <div className="flex items-center justify-between px-4 pt-[14px] pb-[12px]">
              <div className="flex items-center gap-2">
                  <span className="rounded-md bg-muted px-2 py-1 text-xs font-bold text-muted-foreground">
                    {item.category}
                  </span>
                  <h3 className="text-base font-bold text-foreground line-clamp-1">{item.title}</h3>
              </div>
          </div>
          {/* Price Row */}
          <div className="px-4 pb-[14px]">
             <div className="text-lg font-bold text-foreground text-right w-full">
                {item.cost.toLocaleString()}원
             </div>
          </div>
          {/* Confirmation Footer */}
          {confirmedMessage && (
            <div className="border-t border-border/40 border-dashed px-4 py-3 bg-card">
                 <div className="flex items-center justify-center gap-1.5 rounded-[8px] border border-primary/20 bg-primary/5 py-2 text-center w-full">
                     <div className="flex h-[14px] w-[14px] items-center justify-center rounded-full bg-primary text-white">
                        <Check className="h-2.5 w-2.5" />
                     </div>
                     <span className="text-[12px] font-bold text-primary">{confirmedMessage}</span>
                 </div>
            </div>
          )}
       </div>
    </div>
  )
}


// -----------------------------------------------------------------------------
// Component: Budget Summary Board
// -----------------------------------------------------------------------------
function BudgetSummaryBoard({ 
  mode, 
  totalBudget, 
  personCount, 
  totalExpense 
}: { 
  mode: 'budget' | 'expense', 
  totalBudget: number, 
  personCount: number, 
  totalExpense: number 
}) {
  const costPerPerson = mode === 'budget' ? Math.floor(totalBudget / personCount) : Math.floor(totalExpense / personCount);
  const remaining = totalBudget - totalExpense;
  const isDeficit = remaining < 0;

  return (
    <div className="px-[20px] pt-8 pb-4 flex flex-col gap-4">
      {/* Dynamic Summary Cards */}
      {mode === 'budget' && (
        <div className="bg-card border border-border flex flex-col gap-[4px] items-center justify-center p-[16px] rounded-[16px] w-full shadow-[0px_1px_3px_0px_rgba(0,0,0,0.05)] transition-all">
          <div className="flex gap-[4px] items-start w-full">
            <span className="text-[14px] font-medium text-muted-foreground">우리의 여행예산</span>
            <span className="text-[14px] font-bold text-foreground">{totalBudget.toLocaleString()}원</span>
          </div>
          <div className="flex gap-[4px] items-center w-full">
            <span className="text-[14px] font-medium text-muted-foreground">현재 여행 예산이</span>
            <span className={cn("text-[14px] font-bold", isDeficit ? "text-destructive" : "text-primary")}>
              {Math.abs(remaining).toLocaleString()}원
            </span>
            <span className="text-[14px] font-medium text-muted-foreground">
              {isDeficit ? "만큼 모자라요." : "만큼 남았어요."}
            </span>
          </div>
        </div>
      )}

      {/* Common Metrics */}
      <div className="flex flex-col gap-[8px] w-full px-[4px]">
        <div className="flex items-center w-full">
          <div className="flex flex-col gap-[6px] w-full">
            <span className="text-[14px] font-semibold text-muted-foreground">현재 최대 지출</span>
            <span className="text-[16px] font-bold text-foreground">{totalExpense.toLocaleString()}원</span>
          </div>
          <div className="flex flex-col gap-[6px] w-full">
            <span className="text-[14px] font-semibold text-muted-foreground">1인당 비용</span>
            <span className="text-[16px] font-bold text-foreground">{costPerPerson.toLocaleString()}원</span>
          </div>
        </div>
        <span className="text-[12px] font-medium text-muted-foreground">후보지 중 가장 비싼 장소로 계산됐어요!</span>
      </div>
    </div>
  )
}

// -----------------------------------------------------------------------------
// Helper: Calculate Daily Max Total
// -----------------------------------------------------------------------------
const getDayMaxTotal = (day: BudgetDayData) => {
  return day.expenses.reduce((acc, exp) => {
    if (exp.type === "place") return acc + exp.cost;
    if (exp.type === "candidate_group") {
       const maxCost = Math.max(...(exp as CandidateExpenseGroup).candidates.map(c => c.cost), 0);
       return acc + maxCost;
    }
    return acc;
  }, 0);
}

// -----------------------------------------------------------------------------
// Page: Budget View
// -----------------------------------------------------------------------------
export function BudgetEdit() {
  // State for Dual-Mode Budget Settings
  const [budgetMode, setBudgetMode] = useState<'budget' | 'expense'>('budget');
  const [totalBudget, setTotalBudget] = useState(1500000);
  const [personCount, setPersonCount] = useState(4);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Temporary state for the dialog form
  const [tempMode, setTempMode] = useState<'budget' | 'expense'>(budgetMode);
  const [tempTotalBudget, setTempTotalBudget] = useState(totalBudget);
  const [tempPersonCount, setTempPersonCount] = useState(personCount);

  // Calculate generic total expense using the helper
  const overallMaxExpense = useMemo(() => {
    return daysData.reduce((total, day) => total + getDayMaxTotal(day), 0);
  }, [daysData]);

  const handleOpenDialog = () => {
    setTempMode(budgetMode);
    setTempTotalBudget(totalBudget);
    setTempPersonCount(personCount);
    setIsDialogOpen(true);
  };

  const handleSaveSettings = () => {
    setBudgetMode(tempMode);
    setTotalBudget(tempTotalBudget);
    setPersonCount(tempPersonCount);
    setIsDialogOpen(false);
  };

  return (
    <div className="flex h-full w-full flex-col bg-background overflow-y-auto">
      
      {/* Sticky Top Header */}
      <div className="sticky top-0 z-20 flex w-full flex-col bg-background/90 backdrop-blur-md border-b-[0.667px] border-border">
        <div className="flex h-14 items-center justify-between px-[20px]">
          <h1 className="text-[16px] font-bold text-foreground">예산 편집</h1>
        </div>
      </div>

      <BudgetSummaryBoard 
        mode={budgetMode} 
        totalBudget={totalBudget} 
        personCount={personCount} 
        totalExpense={overallMaxExpense} 
      />

      {/* Trigger Button & Modal Context */}
      <div className="px-[20px] pb-6">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <button 
              onClick={handleOpenDialog}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-muted/50 py-3.5 text-sm font-semibold text-foreground transition-all hover:bg-muted active:scale-[0.98]"
            >
               <Wallet className="h-4 w-4" />
               <span>우리의 여행예산 편집하기</span>
            </button>
          </DialogTrigger>
          
          <DialogContent className="sm:max-w-[425px] rounded-t-2xl sm:rounded-2xl p-0 overflow-hidden bg-background gap-0 border-border">
            <div className="p-6 pb-2">
              <DialogHeader className="text-left space-y-2">
                <DialogTitle className="text-xl font-bold">원하시는 예산 관리 모드를 선택해주세요.</DialogTitle>
                <DialogDescription className="text-sm text-muted-foreground leading-relaxed">
                  예산을 미리 정해두고 계획하거나, 등록한 일정의 지출을 나중에 N빵 할 수 있습니다.
                </DialogDescription>
              </DialogHeader>
            </div>

            <Tabs 
              defaultValue={tempMode} 
              onValueChange={(v) => setTempMode(v as 'budget' | 'expense')}
              className="w-full flex flex-col"
            >
              <div className="px-6 pt-4 pb-2">
                <TabsList className="grid w-full grid-cols-2 bg-muted/50 p-1 rounded-xl">
                  <TabsTrigger value="budget" className="rounded-lg text-sm font-bold data-[state=active]:shadow-sm">예산 중심</TabsTrigger>
                  <TabsTrigger value="expense" className="rounded-lg text-sm font-bold data-[state=active]:shadow-sm">지출 중심</TabsTrigger>
                </TabsList>
              </div>

              <div className="flex-1 bg-muted/10 p-6">
                <TabsContent value="budget" className="mt-0 space-y-6 animate-in fade-in-50">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 pb-2 border-b border-border/50">
                       <Goal className="h-5 w-5 text-primary" />
                       <h4 className="font-bold text-foreground text-base">예산 중심으로 계획하기</h4>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-muted-foreground">총 여행 예산</label>
                      <div className="relative">
                        <input 
                          type="number" 
                          value={tempTotalBudget} 
                          onChange={(e) => setTempTotalBudget(Number(e.target.value))}
                          className="flex h-12 w-full rounded-xl border border-border bg-background px-4 py-2 text-base font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none placeholder:font-normal"
                          placeholder="예: 1500000"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">원</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-muted-foreground">여행 인원수</label>
                      <div className="relative">
                        <input 
                          type="number" 
                          value={tempPersonCount} 
                          onChange={(e) => setTempPersonCount(Number(e.target.value))}
                          className="flex h-12 w-full rounded-xl border border-border bg-background px-4 py-2 text-base font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none placeholder:font-normal"
                          placeholder="예: 4"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">명</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="expense" className="mt-0 space-y-6 animate-in fade-in-50">
                   <div className="space-y-4">
                    <div className="flex items-center gap-2 pb-2 border-b border-border/50">
                       <TrendingDown className="h-5 w-5 text-primary" />
                       <h4 className="font-bold text-foreground text-base">지출 중심으로 계획하기</h4>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed bg-muted/50 p-3 rounded-xl border border-border/50">
                      총 예산을 제한하지 않습니다.<br/>동행하는 여행 인원수만 입력하시면, 추가하신 일정의 지출 합계를 기반으로 1인당 비용을 알아서 계산해 드립니다.
                    </p>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-muted-foreground">여행 인원수</label>
                      <div className="relative">
                        <input 
                          type="number" 
                          value={tempPersonCount} 
                          onChange={(e) => setTempPersonCount(Number(e.target.value))}
                          className="flex h-12 w-full rounded-xl border border-border bg-background px-4 py-2 text-base font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none placeholder:font-normal"
                          placeholder="예: 4"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">명</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </div>

              {/* Bottom Actions */}
              <div className="p-4 bg-background border-t border-border flex items-center justify-end gap-2">
                 <button 
                   className="px-5 py-2.5 rounded-xl text-sm font-bold text-muted-foreground hover:bg-muted transition-colors"
                   onClick={() => setIsDialogOpen(false)}
                 >
                    취소
                 </button>
                 <button 
                   className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:opacity-90 transition-opacity flex items-center gap-1 shadow-sm"
                   onClick={handleSaveSettings}
                 >
                    <Check className="h-4 w-4" />
                    설정 완료
                 </button>
              </div>
            </Tabs>
          </DialogContent>
        </Dialog>
      </div>

      {/* Days List */}
      <div className="flex flex-col pb-20">
        {daysData.map((day, dayIndex) => (
          <div key={dayIndex} className="flex flex-col w-full">
            
            {/* Day Header - Added Daily Max Total Context */}
            <div className="border-border border-b-[0.667px] border-solid flex items-center justify-between px-[20px] py-[16px] relative w-full bg-background z-10 sticky top-14">
              <div className="flex gap-[16px] items-center">
                  <div className="bg-primary/10 rounded-[18px] shrink-0 h-[48px] w-[48px] relative flex items-center justify-center">
                      <span className="text-primary text-[20px] font-bold leading-[28px]">
                        {day.dayNum}
                      </span>
                  </div>
                  <div className="flex flex-col gap-[2px] items-start shrink-0">
                      <span className="text-foreground text-[20px] font-bold leading-[28px]">DAY {day.dayNum}</span>
                      <span className="text-muted-foreground text-[14px] leading-[20px]">{day.dateStr}</span>
                  </div>
              </div>
              <div className="flex items-center gap-2">
                 <span className="text-foreground text-[18px] font-bold">{getDayMaxTotal(day).toLocaleString()}원</span>
              </div>
            </div>

            <div className="flex flex-col px-[20px] py-[24px]">
                {/* Timeline and cards wrapper */}
                <div className="flex">
                    <div className="flex flex-col gap-[24px] w-full">
                      {day.expenses.map((expense, expenseIndex) => {
                        if (expense.type === "candidate_group") {
                          const group = expense as CandidateExpenseGroup;
                          if (group.isConfirmed) {
                            // Lo-fi Confirmed State UX Flow
                            const confirmedCandidate = group.candidates.find(c => c.id === group.selectedId) || group.candidates[0];
                            return (
                               <div key={expenseIndex} className="relative w-full flex flex-col">
                                 <ExpenseCard 
                                    item={confirmedCandidate} 
                                 />
                                 {/* Instructional banner positioned closely to the card */}
                                 <div className="flex items-center justify-center mt-3 bg-muted rounded-[8px] py-3 text-[12px] font-medium text-muted-foreground shadow-sm">
                                    {`총 ${group.candidates.length}개의 후보지 중 이 장소로 확정되었어요.`}
                                 </div>
                               </div>
                            )
                          } else {
                            // Lo-Fi Unconfirmed Candidate Group UX Flow
                            return (
                               <div key={expenseIndex} className="relative w-full">
                                  <div className="bg-muted border border-border border-dashed flex flex-col items-start p-[12px] rounded-[24px] w-full">
                                    <div className="flex items-center justify-between w-full pb-3 px-2 pt-1">
                                      <span className="text-[14px] font-bold text-foreground">{`${group.candidates.length}개의 후보지가 있어요!`}</span>
                                      <button className="bg-background border border-border shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] rounded-full px-4 py-1.5 text-[13px] font-bold text-foreground transition-all duration-200 hover:bg-muted hover:shadow-sm">비교하기</button>
                                    </div>
                                    <div className="flex flex-col gap-[12px] w-full">
                                      {group.candidates.map((candidate, idx) => (
                                        <CandidateExpenseCard key={idx} item={candidate} />
                                      ))}
                                    </div>
                                  </div>
                               </div>
                            )
                          }
                        }

                        // Regular Expense
                        return (
                          <div key={expenseIndex} className="relative w-full">
                            <ExpenseCard 
                                item={expense as ExpenseItem} 
                                confirmedMessage={(expense as ExpenseItem).isConfirmed ? "확정됨" : undefined}
                            />
                          </div>
                        )
                      })}
                    </div>
                </div>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  )
}

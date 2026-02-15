"use client"

import * as React from "react"
import { Bell, Check, ChevronRight, Home, MapPin, Settings, User } from "lucide-react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { PlaceCard } from "@/components/ui/place-card"
import { CandidateCard } from "@/components/ui/candidate-card"
import { FreeTimeCard } from "@/components/ui/free-time-card"
import { DayNavigator } from "@/components/ui/day-navigator"
import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage, AvatarBadge } from "@/components/ui/avatar"
import { BottomSheet, type BottomSheetItem } from "@/components/ui/bottom-sheet"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CollectionCard } from "@/components/ui/collection-card"
import { PlanCard } from "@/components/ui/plan-card"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { FieldDescription } from "@/components/ui/field-description"
import { InputForm } from "@/components/ui/input-form"
import { Label } from "@/components/ui/label"
import { SelectDropdown, type SelectDropdownItem } from "@/components/ui/select-dropdown"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export default function DesignSystemPage() {
  const [checked, setChecked] = React.useState<boolean | "indeterminate">(true)
  const [inputValue, setInputValue] = React.useState("")
  const [textareaValue, setTextareaValue] = React.useState("")
  const [bottomSheetOpen, setBottomSheetOpen] = React.useState(false)

  const selectItems: SelectDropdownItem[] = [
    { id: "1", label: "Option 1" },
    { id: "2", label: "Option 2", description: "With description" },
    { id: "3", label: "Disabled", disabled: true },
    { id: "4", label: "With Icon", icon: <User className="size-4" /> },
  ]

  const bottomSheetItems: BottomSheetItem[] = [
    { id: "1", label: "Share", icon: <User /> },
    { id: "2", label: "Add to favorites", icon: <Check /> },
    { id: "3", label: "Delete", icon: <Bell />, description: "This action cannot be undone" },
  ]

  return (
    <div className="min-h-screen bg-zinc-50 p-8 dark:bg-black font-sans">
      <div className="mx-auto max-w-4xl space-y-12">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold">Design System</h1>
          <p className="text-muted-foreground">
            A showcase of the UI components used in Waypoint FE v2.
          </p>
        </header>

        {/* Buttons */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold border-b pb-2">Buttons</h2>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Standard Variants</h3>
            <div className="flex flex-wrap gap-4">
              <Button>Default (Primary)</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="link">Link</Button>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Social Logins</h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="kakao">Kakao Login</Button>
              <Button variant="naver">Naver Login</Button>
              <Button variant="google">Google Login</Button>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">Sizes & Icons</h3>
            <div className="flex flex-wrap gap-4 items-center">
              <Button size="lg">Size L (Default)</Button>
              <Button size="sm">Size S</Button>
              <Button size="icon" variant="outline"><Settings className="size-5" /></Button>
              <Button size="icon" variant="ghost"><Settings className="size-5" /></Button>
              <Button icon={<User className="size-5"/>}>With Left Icon</Button>
              <Button rightIcon={<ChevronRight className="size-5"/>}>With Right Icon</Button>
            </div>
          </div>
        </section>

        {/* Inputs */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold border-b pb-2">Inputs & Forms</h2>
          <div className="grid gap-4 max-w-md">
            <div className="space-y-2">
              <Label>Label</Label>
              <InputForm placeholder="Default Input" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
              <FieldDescription>This is a helper text.</FieldDescription>
            </div>
            
            <div className="space-y-2">
              <Label required>Required Label</Label>
              <InputForm error placeholder="Error Input" />
              <FieldDescription error>This field is required.</FieldDescription>
            </div>

             <div className="space-y-2">
              <Label onEdit={() => alert("Edit clicked")}>Editable Label</Label>
              <Textarea placeholder="Textarea" value={textareaValue} onChange={(e) => setTextareaValue(e.target.value)} />
            </div>

             <div className="flex items-center gap-2">
                <Checkbox checked={checked === true} onCheckedChange={(c) => setChecked(c)} />
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Accept terms and conditions
                </label>
             </div>
          </div>
        </section>

        {/* Selection */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold border-b pb-2">Selection</h2>
          <div className="flex flex-col gap-8">
            {/* Dropdown */}
            <div className="space-y-2">
               <h3 className="text-sm font-medium text-muted-foreground">Dropdown</h3>
               <SelectDropdown className="w-[180px]" items={selectItems} />
            </div>

            {/* Checkboxes */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground">Checkboxes</h3>
              <div className="flex flex-col gap-4">
                {/* Base Checkbox */}
                <div className="flex items-center gap-2">
                  <Checkbox id="check-base" />
                  <label htmlFor="check-base" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Base Checkbox
                  </label>
                </div>

                {/* Checkbox Card */}
                <div className="flex flex-col gap-2">
                  <span className="text-xs text-muted-foreground">Checkbox Card</span>
                  <div className="relative flex flex-col items-start rounded-[20px] bg-[#F0F0F0] px-5 py-3 transition-all border-[2px] border-transparent has-[[data-state=checked]]:border-[#0EA5E9]">
                     <div className="flex w-full items-start gap-4">
                        <Checkbox id="check-card" className="mt-1" />
                        <div className="flex flex-1 flex-col gap-1">
                          <label htmlFor="check-card" className="font-semibold text-[#1C2024] cursor-pointer">헤이리 예술 마을</label>
                          <div className="flex items-center gap-1 text-[#737373]">
                             <MapPin className="h-4 w-4" />
                             <span className="text-sm">서울시 마포구 와우산로</span>
                          </div>
                        </div>
                     </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Radio Group */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground">Radio Group</h3>
              <RadioGroup defaultValue="location-1">
                 {/* Radio Card 1 */}
                 <div className="relative flex flex-col items-start rounded-[20px] bg-[#F0F0F0] px-5 py-3 transition-all border-[2px] border-transparent has-[[data-state=checked]]:border-[#0EA5E9]">
                     <div className="flex w-full items-start gap-4">
                        <RadioGroupItem value="location-1" id="radio-1" className="mt-1" />
                        <div className="flex flex-1 flex-col gap-1">
                          <label htmlFor="radio-1" className="font-semibold text-[#1C2024] cursor-pointer">헤이리 예술 마을</label>
                          <div className="flex items-center gap-1 text-[#737373]">
                             <MapPin className="h-4 w-4" />
                             <span className="text-sm">서울시 마포구 와우산로</span>
                          </div>
                        </div>
                     </div>
                  </div>

                 {/* Radio Card 2 (Unchecked state example) */}
                 <div className="relative flex flex-col items-start rounded-[20px] bg-[#F0F0F0] px-5 py-3 transition-all border-[2px] border-transparent has-[[data-state=checked]]:border-[#0EA5E9]">
                     <div className="flex w-full items-start gap-4">
                        <RadioGroupItem value="location-2" id="radio-2" className="mt-1" />
                        <div className="flex flex-1 flex-col gap-1">
                          <label htmlFor="radio-2" className="font-semibold text-[#1C2024] cursor-pointer">홍대 예술 거리</label>
                          <div className="flex items-center gap-1 text-[#737373]">
                             <MapPin className="h-4 w-4" />
                             <span className="text-sm">서울시 마포구 홍익로</span>
                          </div>
                        </div>
                     </div>
                  </div>
              </RadioGroup>
            </div>

            {/* Tabs */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground">Tabs</h3>
              <Tabs defaultValue="tab1" className="w-[400px]">
                <TabsList>
                  <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                  <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                </TabsList>
                <div className="mt-4 p-4 rounded-lg bg-gray-50 border border-gray-100">
                  <TabsContent value="tab1">
                    <p className="text-sm text-gray-600">Content for Tab 1</p>
                  </TabsContent>
                  <TabsContent value="tab2">
                    <p className="text-sm text-gray-600">Content for Tab 2</p>
                  </TabsContent>
                </div>
              </Tabs>
            </div>

            {/* Complex Cards */}
            <div className="space-y-4">
               <h3 className="text-sm font-medium text-muted-foreground">Complex Cards</h3>
               <div className="flex flex-col gap-10 p-4">
                  <div className="space-y-2">
                     <span className="text-xs text-muted-foreground">Collection Card (Stacked)</span>
                     <CollectionCard />
                  </div>
                  <div className="space-y-2">
                     <span className="text-xs text-muted-foreground">Plan Card (Ticket)</span>
                     <PlanCard />
                  </div>
               </div>
            </div>
          </div>
        </section>

        {/* Avatars */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold border-b pb-2">Avatars</h2>
          <div className="flex gap-4 items-end">
            <Avatar size="lg">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
              <AvatarBadge />
            </Avatar>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar size="sm">
              <AvatarFallback>SM</AvatarFallback>
            </Avatar>
          </div>
          <div>
            <AvatarGroup>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback>+1</AvatarFallback>
              </Avatar>
               <AvatarGroupCount>+3</AvatarGroupCount>
            </AvatarGroup>
          </div>
        </section>

        {/* Overlays */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold border-b pb-2">Overlays</h2>
          <div className="flex flex-wrap gap-4">
            {/* Dialog */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Open Dialog</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline">Cancel</Button>
                  <Button>Continue</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Alert Dialog */}
             <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Open Alert Dialog</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            {/* Drawer */}
             <Drawer>
              <DrawerTrigger asChild>
                <Button variant="outline">Open Drawer</Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Drawer Title</DrawerTitle>
                  <DrawerDescription>This is a drawer description.</DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                  <Button>Submit</Button>
                  <DrawerClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>

             {/* Bottom Sheet */}
             <Button variant="outline" onClick={() => setBottomSheetOpen(true)}>Open Bottom Sheet</Button>
             <BottomSheet
                open={bottomSheetOpen}
                onOpenChange={setBottomSheetOpen}
                items={bottomSheetItems}
             />
          </div>
        </section>
        {/* Plan View Components */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold border-b pb-2">Plan View Components</h2>
          <div className="grid gap-8 max-w-md">
            
            {/* Place Card */}
            <div className="space-y-2">
               <h3 className="text-sm font-medium text-muted-foreground">Place Card</h3>
               <PlaceCard 
                 title="헤이리 예술 마을" 
                 description="유럽풍의 정원, 베이커리, 카페, 레스토랑 등이 있는 테마 마을" 
                 image="https://images.unsplash.com/photo-1499591934245-40b55745b905?auto=format&fit=crop&w=800&q=80" 
               />
            </div>

            {/* Place Card (Confirmed) */}
            <div className="space-y-2">
               <h3 className="text-sm font-medium text-muted-foreground">Place Card (Confirmed)</h3>
               <PlaceCard 
                 title="섭지코지" 
                 description="제주 동부 해안에 볼록 튀어나온 섭지코지는 성산일출봉을 배경으로..." 
                 image="https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?auto=format&fit=crop&w=800&q=80" 
                 confirmationMessage="총 3개의 후보지 중 이 장소로 확정되었어요"
               />
            </div>

            {/* Candidate Card */}
            <div className="space-y-2">
               <h3 className="text-sm font-medium text-muted-foreground">Candidate Card</h3>
               <div className="flex flex-col gap-3 rounded-[20px] border border-dashed border-border bg-muted/30 p-3">
                  <CandidateCard 
                      title="우도 산호해수욕장"
                      address="제주시 우도면 연평리"
                      voteCount={3}
                      commentCount={8}
                  />
                  <CandidateCard 
                      title="검멀레 해수욕장"
                      address="제주시 우도면 연평리"
                      voteCount={2}
                      commentCount={5}
                  />
               </div>
            </div>

            {/* Free Time Card */}
            <div className="space-y-2">
               <h3 className="text-sm font-medium text-muted-foreground">Free Time Card</h3>
               <FreeTimeCard description="근처 소품샵 구경 및 개별 식사" />
            </div>

            {/* Day Navigator */}
            <div className="space-y-2">
               <h3 className="text-sm font-medium text-muted-foreground">Day Navigator</h3>
               <div className="relative h-20 w-full overflow-hidden rounded-lg border border-border">
                  <DayNavigator 
                    days={["Day 1", "Day 2", "Day 3"]}
                    currentDay="Day 1"
                    onSelectDay={() => {}}
                    className="absolute top-0 left-0 right-0"
                  />
               </div>
            </div>

          </div>
        </section>
      </div>
    </div>
  )
}

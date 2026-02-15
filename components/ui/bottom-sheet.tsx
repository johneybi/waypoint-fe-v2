"use client"

import * as React from "react"
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"
import { cn } from "@/lib/utils"

export interface BottomSheetItem {
    id: string
    label: string
    icon?: React.ReactNode
    description?: string
    onClick?: () => void
}

interface BottomSheetProps {
    open?: boolean
    onOpenChange?: (open: boolean) => void
    trigger?: React.ReactNode
    items: BottomSheetItem[]
}

export function BottomSheet({ open, onOpenChange, trigger, items }: BottomSheetProps) {
    return (
        <Drawer open={open} onOpenChange={onOpenChange}>
            {trigger && <DrawerTrigger asChild>{trigger}</DrawerTrigger>}
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <div className="p-4 pb-0">
                        <div className="flex flex-col gap-2">
                             {items.map((item) => (
                                 <button
                                    key={item.id}
                                    onClick={() => {
                                        item.onClick?.()
                                        onOpenChange?.(false)
                                    }}
                                    className="flex w-full items-center gap-4 rounded-lg px-4 py-3 text-left transition-colors hover:bg-muted"
                                 >
                                    {item.icon && <span className="text-muted-foreground">{item.icon}</span>}
                                    <div className="flex flex-col">
                                        <span className="font-medium">{item.label}</span>
                                        {item.description && (
                                            <span className="text-xs text-muted-foreground">{item.description}</span>
                                        )}
                                    </div>
                                 </button>
                             ))}
                        </div>
                    </div>
                    <div className="p-4 mt-2">
                         <button className="w-full rounded-lg bg-muted py-3 font-semibold" onClick={() => onOpenChange?.(false)}>Cancel</button>
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    )
}

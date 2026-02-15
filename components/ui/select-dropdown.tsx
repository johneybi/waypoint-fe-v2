"use client"

import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

type Description = React.ReactNode | React.ReactNode[]

export type SelectDropdownItem = {
  id: string
  label: React.ReactNode
  description?: Description
  icon?: React.ReactNode
  disabled?: boolean
  onSelect?: () => void
}

type SelectDropdownProps = React.ComponentProps<typeof Select> & {
  items: SelectDropdownItem[]
  placeholder?: string
  className?: string
}

function normalizeDescription(description?: Description) {
  if (!description) return []
  return Array.isArray(description) ? description : [description]
}

function SelectDropdown({
  items,
  placeholder = "Select option",
  className,
  value,
  onValueChange,
  ...props
}: SelectDropdownProps) {
  const handleValueChange = (newValue: string) => {
    if (onValueChange) {
      onValueChange(newValue)
    }
    const selectedItem = items.find((item) => item.id === newValue)
    selectedItem?.onSelect?.()
  }

  return (
    <Select value={value} onValueChange={handleValueChange} {...props}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {items.map((item) => {
             const descriptionLines = normalizeDescription(item.description)
             const hasDescription = descriptionLines.length > 0
            return (
              <SelectItem
                key={item.id}
                value={item.id}
                disabled={item.disabled}
                className={cn(hasDescription && "items-start")}
              >
                <div className="flex items-center gap-2">
                  {item.icon && (
                    <span className="flex items-center text-foreground [&_svg]:size-4 [&_svg]:opacity-100">
                      {item.icon}
                    </span>
                  )}
                  <div className="flex flex-col items-start gap-0.5">
                    <span className="truncate font-semibold text-[#1C2024]">
                      {item.label}
                    </span>
                    {hasDescription && (
                      <span className="truncate text-xs font-normal text-muted-foreground">
                        {descriptionLines}
                      </span>
                    )}
                  </div>
                </div>
              </SelectItem>
            )
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export { SelectDropdown }
export type { SelectDropdownProps }

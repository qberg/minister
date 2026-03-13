"use client"

import * as React from "react"
import { Select as SelectPrimitive } from "radix-ui"
import { ChevronDownIcon, CheckIcon, ChevronUpIcon } from "lucide-react"
import { cn } from "@repo/design-system/lib/utils"

function Select(props: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />
}

function SelectGroup({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      className={cn("p-1", className)}
      {...props}
    />
  )
}

function SelectValue(props: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />
}

const selectTriggerBaseClasses = [
  "border-input",
  "data-[placeholder]:text-muted-foreground",
  "dark:bg-input/30",
  "dark:hover:bg-input/50",
  "focus-visible:border-ring",
  "focus:ring-1 focus:ring-accent/20 focus:ring-offset-0",
  "focus-visible:ring-ring/50",
  "aria-invalid:ring-destructive/20",
  "dark:aria-invalid:ring-destructive/40",
  "aria-invalid:border-destructive",
  "dark:aria-invalid:border-destructive/50",
  "gap-1.5",
  "rounded-full",
  "border border-neutral-200/15 data-[state=open]:border-accent/60",
  "bg-neutral-950/20 backdrop-blur-md",
  "py-6 px-6",
  "text-sm text-body font-body",
  "transition-colors",
  "select-none",
  "focus-visible:ring-[3px]",
  "aria-invalid:ring-[3px]",
  "data-[size=default]:h-8",
  "data-[size=sm]:h-7",
  "data-[size=sm]:rounded-[min(var(--radius-md),10px)]",
  "*:data-[slot=select-value]:flex",
  "*:data-[slot=select-value]:gap-1.5",
  "*:data-[slot=select-value]:line-clamp-1",
  "*:data-[slot=select-value]:items-center",
  "[&_svg:not([class*='size-'])]:size-4",
  "[&_svg]:pointer-events-none",
  "[&_svg]:shrink-0",
  "flex",
  "w-fit",
  "items-center",
  "justify-between",
  "whitespace-nowrap",
  "outline-none",
  "disabled:cursor-not-allowed",
  "disabled:opacity-50",
"transition-all duration-300 ease-out"
].join(" ")

function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: "sm" | "default"
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(selectTriggerBaseClasses, className)}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="text-muted-foreground size-4 pointer-events-none" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

const selectContentBaseClasses = [
  "bg-transparent backdrop-blur-2xl",
  "text-neutral-200",
  "data-open:animate-in",
  "data-closed:animate-out",
  "data-closed:fade-out-0",
  "data-open:fade-in-0",
  "data-closed:zoom-out-95",
  "data-open:zoom-in-95",
  "data-[side=bottom]:slide-in-from-top-2",
  "data-[side=left]:slide-in-from-right-2",
  "data-[side=right]:slide-in-from-left-2",
  "data-[side=top]:slide-in-from-bottom-2",
  "ring-foreground/10",
  "min-w-36",
  "rounded-lg border border-yellow-50/10",
  "shadow-md",
  "ring-1",
  "duration-100",
  "relative",
  "z-50",
  // FIX 1: Use proper arbitrary value syntax for the variable
  "max-h-[var(--radix-select-content-available-height)]", 
  "origin-(--radix-select-content-transform-origin)",
  // FIX 2: Removed overflow from here, moved to Viewport
  "data-[align-trigger=true]:animate-none",
].join(" ")

function SelectContent({
  className,
  children,
  position = "popper",
  align = "center",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        data-align-trigger={position === "item-aligned"}
        data-lenis-prevent
        position={position}
        align={align}
        className={cn(
          selectContentBaseClasses,
          position === "popper" &&
            [
              "data-[side=bottom]:translate-y-1",
              "data-[side=left]:-translate-x-1",
              "data-[side=right]:translate-x-1",
              "data-[side=top]:-translate-y-1",
            ].join(" "),
          className
        )}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          data-position={position}
          className={cn(
            "p-1",
            // FIX 3: Force scroll here
            "overflow-y-auto overflow-x-hidden", 
            position === "popper" &&
              "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn(
        ["text-muted-foreground", "px-1.5", "py-1", "text-xs"].join(" "),
        className
      )}
      {...props}
    />
  )
}

const selectItemBaseClasses = [
  "focus:bg-accent",
  "focus:text-accent-foreground focus:text-blue-950",
  "not-data-[variant=destructive]:focus:**:text-accent-foreground",
  "gap-1.5",
  "rounded-md",
  "py-1",
  "pr-8",
  "pl-1.5",
  "text-sm font-body",
  "[&_svg:not([class*='size-'])]:size-4",
  "*:[span]:last:flex",
  "*:[span]:last:items-center",
  "*:[span]:last:gap-2",
  "relative",
  "flex",
  "w-full",
  "cursor-default",
  "items-center",
  "outline-hidden",
  "select-none",
  "data-[disabled]:pointer-events-none",
  "data-[disabled]:opacity-50",
  "[&_svg]:pointer-events-none",
  "[&_svg]:shrink-0",
].join(" ")

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(selectItemBaseClasses, className)}
      {...props}
    >
      <span className="pointer-events-none absolute right-2 flex size-4 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="pointer-events-none" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn(
        ["bg-border", "-mx-1", "my-1", "h-px", "pointer-events-none"].join(" "),
        className
      )}
      {...props}
    />
  )
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(
        [
          "bg-popover",
          "z-10",
          "flex",
          "cursor-default",
          "items-center",
          "justify-center",
          "py-1",
          "[&_svg:not([class*='size-'])]:size-4",
        ].join(" "),
        className
      )}
      {...props}
    >
      <ChevronUpIcon />
    </SelectPrimitive.ScrollUpButton>
  )
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(
        [
          "bg-popover",
          "z-10",
          "flex",
          "cursor-default",
          "items-center",
          "justify-center",
          "py-1",
          "[&_svg:not([class*='size-'])]:size-4",
        ].join(" "),
        className
      )}
      {...props}
    >
      <ChevronDownIcon />
    </SelectPrimitive.ScrollDownButton>
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}


import { cn } from "@repo/design-system/lib/utils"
import * as React from "react"

function Textarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "min-h-[120px]",
  "border border-neutral-200/15",
  "bg-neutral-950/20 backdrop-blur-md",
                  "focus:border-accent/60 focus:bg-neutral-950/40 focus:outline-none focus:ring-1 focus:ring-accent/20",
  "focus-visible:ring-ring/50",
  "aria-invalid:ring-destructive/20",
  "dark:aria-invalid:ring-destructive/40",
  "aria-invalid:border-destructive",
  "dark:aria-invalid:border-destructive/50",
  "disabled:bg-input/50",
  "dark:disabled:bg-input/80",
  "rounded-4xl",
  "border",
  "px-5",
  "py-4",
        "text-body",
  "focus-visible:ring-[3px]",
  "aria-invalid:ring-[3px]",
  "text-sm",
  "placeholder:text-neutral-500",
  "flex",
  "field-sizing-content",
  "min-h-16",
  "w-full",
  "outline-none",
  "disabled:cursor-not-allowed",
  "disabled:opacity-50",
                  "transition-all duration-300 ease-out",
        className)}
      {...props}
    />
  )
}

export { Textarea }

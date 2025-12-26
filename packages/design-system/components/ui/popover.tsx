"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "@repo/design-system/lib/utils"; // Adjust path if needed
import { motion } from "motion/react";

const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;
const PopoverAnchor = PopoverPrimitive.Anchor;

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 8, children, ...props }, ref) => {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        asChild 
        {...props}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: -8, filter: "blur(4px)" }}
          animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30,
            mass: 0.5,
            restDelta: 0.01
          }}
          style={{ transformOrigin: "top center",
          }}
          className={cn(
            "z-50 min-w-[300px] lg:min-w-[20vw] outline-none",
            "rounded-2xl border border-black/5 bg-white/85 p-2 lg:p-4",
            "shadow-2xl shadow-black/10 backdrop-blur-xl saturate-150",
            "border-neutral-500 border",
            className
          )}
        >
          {children}
        </motion.div>
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  );
});
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };

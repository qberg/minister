"use client";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@repo/design-system/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/design-system/components/ui/popover";
import { cn } from "@repo/design-system/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import React from "react";
import type { MapZoneOption } from "@/types";

type Props = {
  zones: MapZoneOption[];
  activeSlug: string | null;
  onSelect: (slug: string) => void;
  isLoading?: boolean;
};

export function ZoneCombobox({
  zones,
  activeSlug,
  onSelect,
  isLoading,
}: Props) {
  const [open, setOpen] = React.useState(false);

  const selectedLabel = React.useMemo(
    () =>
      zones.find((z) => z.slug === activeSlug)?.name ||
      "Select a ward/village...",
    [zones, activeSlug]
  );

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger asChild>
        <button
          aria-expanded={open}
          className={cn(
            "mx-auto flex h-12 w-80 items-center justify-between rounded-full border border-neutral-500 bg-white px-4 py-3 font-medium text-sm shadow-sm transition-all hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-600 lg:w-full",
            !activeSlug && "text-gray-500",
            isLoading && "cursor-wait opacity-70"
          )}
          disabled={isLoading}
          role="combobox"
          type="button"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />
              Loading zones...
            </span>
          ) : (
            <span className="truncate font-dm-sans font-normal">
              {selectedLabel}
            </span>
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-40" />
        </button>
      </PopoverTrigger>

      <PopoverContent align="center" className="mt-1 w-full p-0">
        <Command>
          <CommandInput placeholder="Search ward or village..." />
          <CommandList>
            <CommandEmpty>No zone found.</CommandEmpty>

            {/* Group: Wards */}
            <CommandGroup heading="Wards">
              {zones
                .filter((z) => z.type === "ward")
                .map((zone) => (
                  <CommandItem
                    key={zone.slug}
                    onSelect={() => {
                      onSelect(zone.slug || "");
                      setOpen(false);
                    }}
                    value={zone.name}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4 text-blue-600",
                        activeSlug === zone.slug ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {zone.name}
                  </CommandItem>
                ))}
            </CommandGroup>

            {/* Group: Villages/Others */}
            <CommandGroup heading="Villages & Other Areas">
              {zones
                .filter((z) => z.type !== "ward")
                .map((zone) => (
                  <CommandItem
                    key={zone.slug}
                    onSelect={() => {
                      onSelect(zone.slug || "");
                      setOpen(false);
                    }}
                    value={zone.name}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4 text-blue-600",
                        activeSlug === zone.slug ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {zone.name}
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

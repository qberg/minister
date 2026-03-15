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
import { useMemo, useState } from "react";
import type { IssueOption } from "@/app/actions/get-issues";

type Props = {
  issues: IssueOption[];
  value: string | null;
  onChange: (slug: string | null) => void;
  placeholder?: string;
};

export function TypeFilter({
  issues,
  value,
  onChange,
  placeholder = "Select a Work Type",
}: Props) {
  const [open, setOpen] = useState(false);

  const selectedLabel = useMemo(
    () => issues.find((i) => i.slug === value)?.name ?? placeholder,
    [issues, value, placeholder]
  );

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger asChild>
        <button
          aria-expanded={open}
          className={cn(
            "flex h-10 w-72 items-center justify-between rounded-full border border-neutral-500 bg-white px-4 py-2 text-sm shadow-sm transition-all hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-primary",
            !value && "text-gray-500"
          )}
          role="combobox"
          type="button"
        >
          <span className="truncate font-body font-normal text-body-subtle text-sm">
            {selectedLabel}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-40" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-72 p-0">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandEmpty>No results.</CommandEmpty>
            <CommandGroup>
              {/* Clear option */}
              {value && (
                <CommandItem
                  className="text-body-subtle italic"
                  onSelect={() => {
                    onChange(null);
                    setOpen(false);
                  }}
                  value="__clear__"
                >
                  Clear filter
                </CommandItem>
              )}
              {issues.map((issue) => (
                <CommandItem
                  key={issue.slug}
                  onSelect={() => {
                    onChange(issue.slug);
                    setOpen(false);
                  }}
                  value={issue.name}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4 text-primary",
                      value === issue.slug ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {issue.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

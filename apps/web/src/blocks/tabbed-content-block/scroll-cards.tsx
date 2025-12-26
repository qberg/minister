"use client";

import {
  ScrollSpy,
  ScrollSpyContent,
  ScrollSpyContentContainer,
  ScrollSpyList,
  ScrollSpyTrigger,
} from "@repo/design-system/components/ui/scroll-spy";
import OrgCard from "@/components/org-card";
import type { OrgInfoTabItem } from "@/types";

function ScrollCards({ items }: { items: OrgInfoTabItem[] }) {
  if (!items || items.length === 0) {
    return null;
  }

  const defaultTabValue = items[0]?.id || "tab-0";

  return (
    <div className="relative hidden md:block">
      <ScrollSpy defaultValue={defaultTabValue}>
        <div className="relative mx-auto flex gap-8 px-4 py-8">
          {/* Left: Sticky Tabs */}
          <ScrollSpyList className="sticky top-32 w-[12vw] self-start">
            <div className="flex flex-col gap-5 lxl:gap-10">
              {items.map((item, index) => {
                const tabId = item.id || `tab-${index}`;
                return (
                  <ScrollSpyTrigger
                    className="relative w-full border-transparent border-l-4 px-4 py-3 text-center text-background uppercase transition-all hover:bg-gray-100"
                    key={tabId}
                    value={tabId}
                  >
                    {item.label}
                  </ScrollSpyTrigger>
                );
              })}
            </div>
          </ScrollSpyList>

          {/* Right: Content Sections */}
          <ScrollSpyContentContainer className="flex flex-1 flex-col gap-12">
            {items.map((item, index) => {
              const tabId = item.id || `tab-${index}`;
              return (
                <ScrollSpyContent className="" key={tabId} value={tabId}>
                  <OrgCard {...item} />
                </ScrollSpyContent>
              );
            })}
          </ScrollSpyContentContainer>
        </div>
      </ScrollSpy>
    </div>
  );
}

export default ScrollCards;

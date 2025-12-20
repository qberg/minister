"use client";

import {
  ScrollSpy,
  ScrollSpyList,
  ScrollSpyTrigger,
  ScrollSpyContent,
  ScrollSpyContentContainer,
} from "@repo/design-system/components/ui/scroll-spy";

export function TestScrollSpy() {
  const mockTabs = [
    { id: "tab-0", label: "Introduction", color: "bg-blue-500" },
    { id: "tab-1", label: "Features", color: "bg-green-500" },
    { id: "tab-2", label: "Features", color: "bg-green-500" },
    { id: "tab-3", label: "Features", color: "bg-green-500" },
    { id: "tab-4", label: "Features", color: "bg-green-500" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <ScrollSpy defaultValue="tab-0">
        <div className="flex gap-8 container mx-auto px-4 py-8 relative">
          {/* Left: Sticky Tabs */}
          <ScrollSpyList className="w-64 sticky top-24 self-start">
            <div className="bg-white rounded-lg shadow p-4 space-y-2">
              {mockTabs.map((tab) => (
                <ScrollSpyTrigger
                  key={tab.id}
                  value={tab.id}
                  className="
                    w-full text-left px-4 py-3 rounded
                    border-l-4 border-transparent
                    hover:bg-gray-100
                    data-[active=true]:border-blue-500
                    data-[active=true]:bg-blue-50
                    transition-all
                  "
                >
                  {tab.label}
                </ScrollSpyTrigger>
              ))}
            </div>
          </ScrollSpyList>

          {/* Right: Content Sections */}
          <ScrollSpyContentContainer className="flex-1 bg-red-50">
            {mockTabs.map((tab) => (
              <ScrollSpyContent
                key={tab.id}
                value={tab.id}
                className="min-h-screen mb-12"
              >
                <div
                  className={`${tab.color} rounded-lg p-12 text-white h-[80vh] flex items-center justify-center`}
                >
                  <div className="text-center">
                    <h2 className="text-4xl font-bold mb-4">{tab.label}</h2>
                    <p className="text-xl">Scroll down or click another tab</p>
                  </div>
                </div>
              </ScrollSpyContent>
            ))}
          </ScrollSpyContentContainer>
        </div>
      </ScrollSpy>
    </div>
  );
}

"use client";

import { cn } from "@repo/design-system/lib/utils";
import { type Locale, useLocale } from "@repo/i18n";
import { usePathname, useRouter } from "@repo/i18n/navigation";
import { motion } from "motion/react";
import { useEffect, useState, useTransition } from "react";

export function LanguageSwitcher() {
  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const [optimisticLocale, setOptimisticLocale] =
    useState<string>(currentLocale);

  useEffect(() => {
    setOptimisticLocale(currentLocale);
  }, [currentLocale]);

  const options = [
    { id: "en", label: "English" },
    { id: "ta-IN", label: "\u0BA4\u0BAE\u0BBF\u0BB4\u0BCD" },
  ];

  const handleSwitch = (newLocale: string) => {
    if (newLocale === optimisticLocale) {
      return;
    }

    setOptimisticLocale(newLocale);

    startTransition(() => {
      router.replace(pathname, { locale: newLocale as Locale });
    });
  };

  return (
    <div
      className={cn(
        "relative flex w-fit items-center rounded-full p-1",
        "bg-primary/75 ring-1 ring-slate-900/5 backdrop-blur-sm",
        "font-body"
      )}
    >
      {options.map((option) => {
        const isActive = optimisticLocale === option.id;

        return (
          <button
            className={cn(
              "relative z-10 flex min-w-[60px] cursor-pointer items-center justify-center rounded-full px-3 py-1.5 font-medium text-sm transition-colors duration-200",
              isActive
                ? "text-surface-muted"
                : "text-surface-muted/75 hover:text-slate-200",
              isPending && "cursor-wait opacity-80"
            )}
            disabled={isPending}
            key={option.id}
            onClick={() => handleSwitch(option.id)}
            type="button"
          >
            {isActive && (
              <motion.div
                className={cn(
                  "-z-10 absolute inset-0 rounded-full shadow-sm",
                  "bg-white ring-1 ring-slate-900/5",
                  "bg-secondary"
                )}
                layoutId="active-pill"
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 30,
                }}
              />
            )}

            <span
              className={cn(
                "relative z-20 leading-none",
                option.id === "ta-IN" && "pb-[2px]"
              )}
            >
              {option.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

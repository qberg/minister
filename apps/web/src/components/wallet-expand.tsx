"use client";

import { cn } from "@repo/design-system/lib/utils";
import {
  ArrowDownLeft,
  ArrowUpRight,
  CreditCard,
  MoreHorizontal,
  Plus,
  QrCode,
  Send,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type React from "react";
import { useEffect, useRef, useState } from "react";

function useOutsideClick(
  ref: React.RefObject<HTMLElement>,
  handler: () => void
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler();
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

// --- Types ---
type CardData = {
  id: string;
  bankName: string;
  balance: string;
  cardNumber: string;
  color: string;
  theme: "dark" | "light";
};

// --- Mock Data ---
const CARDS: CardData[] = [
  {
    id: "1",
    bankName: "Family Card",
    balance: "$2,850.00",
    cardNumber: "**** 4829",
    color: "bg-neutral-900",
    theme: "dark",
  },
  {
    id: "2",
    bankName: "Personal Savings",
    balance: "$12,400.50",
    cardNumber: "**** 9921",
    color: "bg-white",
    theme: "light",
  },
  {
    id: "3",
    bankName: "Travel Fund",
    balance: "$850.00",
    cardNumber: "**** 1102",
    color: "bg-indigo-600",
    theme: "dark",
  },
];

// --- Sub-components ---

const ActionButton = ({
  icon: Icon,
  label,
  theme,
}: {
  icon: any;
  label: string;
  theme: "dark" | "light";
}) => (
  <div className="flex flex-col items-center gap-2">
    <button
      className={cn(
        "rounded-full p-4 transition-colors",
        theme === "dark"
          ? "bg-white/10 text-white hover:bg-white/20"
          : "bg-black/5 text-black hover:bg-black/10"
      )}
    >
      <Icon size={20} />
    </button>
    <span
      className={cn(
        "font-medium text-xs",
        theme === "dark" ? "text-neutral-400" : "text-neutral-500"
      )}
    >
      {label}
    </span>
  </div>
);

const TransactionRow = ({
  name,
  date,
  amount,
  type,
  theme,
}: {
  name: string;
  date: string;
  amount: string;
  type: "in" | "out";
  theme: "dark" | "light";
}) => (
  <div className="flex items-center justify-between py-3">
    <div className="flex items-center gap-3">
      <div
        className={cn(
          "rounded-full p-2",
          theme === "dark" ? "bg-white/10" : "bg-black/5"
        )}
      >
        {type === "out" ? (
          <ArrowUpRight size={16} />
        ) : (
          <ArrowDownLeft size={16} />
        )}
      </div>
      <div>
        <p
          className={cn(
            "font-medium text-sm",
            theme === "dark" ? "text-white" : "text-black"
          )}
        >
          {name}
        </p>
        <p
          className={cn(
            "text-xs",
            theme === "dark" ? "text-neutral-500" : "text-neutral-400"
          )}
        >
          {date}
        </p>
      </div>
    </div>
    <span
      className={cn(
        "font-semibold text-sm",
        type === "out"
          ? theme === "dark"
            ? "text-white"
            : "text-black"
          : "text-emerald-500"
      )}
    >
      {type === "out" ? "-" : "+"} {amount}
    </span>
  </div>
);

// --- Main Component ---

export const Skiper23 = () => {
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useOutsideClick(containerRef, () => setActiveCard(null));

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-100 p-8 font-sans">
      <div
        className="relative flex w-full max-w-sm flex-col gap-4"
        ref={containerRef}
      >
        <h2 className="mb-2 px-1 font-bold text-neutral-800 text-xl">
          My Wallet
        </h2>

        {CARDS.map((card) => {
          const isActive = activeCard === card.id;
          const isOtherActive = activeCard !== null && activeCard !== card.id;

          return (
            <motion.div
              animate={{
                height: isActive ? 500 : 180, // Expand height
                opacity: isOtherActive ? 0.5 : 1, // Dim others
                scale: isOtherActive ? 0.95 : 1, // Shrink others slightly
                zIndex: isActive ? 10 : 1,
              }}
              className={cn(
                "relative w-full cursor-pointer overflow-hidden border border-black/5 shadow-xl",
                card.color
              )}
              initial={{ borderRadius: 24 }}
              key={card.id}
              layout
              onClick={() => setActiveCard(isActive ? null : card.id)}
              style={{
                borderRadius: 24,
                // If it's the second or third card in the stack, we can add negative margin to stack them
                // but for this specific "expand" interaction, a clean list usually works better.
                // You can uncomment the line below to mimic a tight wallet stack:
                // marginTop: activeCard ? 0 : -100
              }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
            >
              {/* --- Card Header (Visible Always) --- */}
              <motion.div
                className="relative z-10 flex h-full flex-col justify-between p-6"
                layout="position"
              >
                {/* Top Row */}
                <div className="flex items-start justify-between">
                  <div
                    className={cn(
                      "rounded-full p-2 backdrop-blur-md",
                      card.theme === "dark"
                        ? "bg-white/10 text-white"
                        : "bg-black/5 text-black"
                    )}
                  >
                    <CreditCard size={20} />
                  </div>

                  {/* Menu Icon / Close Icon */}
                  <button
                    className={cn(
                      "rounded-full p-2 transition-colors",
                      card.theme === "dark"
                        ? "text-neutral-400 hover:bg-white/10 hover:text-white"
                        : "text-neutral-500 hover:bg-black/5 hover:text-black"
                    )}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveCard(isActive ? null : card.id);
                    }}
                  >
                    {isActive ? <X size={20} /> : <MoreHorizontal size={20} />}
                  </button>
                </div>

                {/* Balance Info (Moves when expanded) */}
                <motion.div layout="position">
                  <p
                    className={cn(
                      "font-medium text-sm opacity-80",
                      card.theme === "dark"
                        ? "text-neutral-300"
                        : "text-neutral-600"
                    )}
                  >
                    Current Balance
                  </p>
                  <h3
                    className={cn(
                      "mt-1 font-bold text-3xl",
                      card.theme === "dark" ? "text-white" : "text-neutral-900"
                    )}
                  >
                    {card.balance}
                  </h3>
                  {!isActive && (
                    <p
                      className={cn(
                        "mt-4 font-mono text-sm opacity-60",
                        card.theme === "dark"
                          ? "text-neutral-400"
                          : "text-neutral-500"
                      )}
                    >
                      {card.cardNumber}
                    </p>
                  )}
                </motion.div>

                {/* Expanded Content (Hidden when collapsed) */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      animate={{ opacity: 1 }}
                      className="mt-8 flex flex-col gap-6"
                      exit={{ opacity: 0 }}
                      initial={{ opacity: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      {/* Actions Grid */}
                      <div className="flex justify-between px-2">
                        <ActionButton
                          icon={Send}
                          label="Send"
                          theme={card.theme}
                        />
                        <ActionButton
                          icon={QrCode}
                          label="Receive"
                          theme={card.theme}
                        />
                        <ActionButton
                          icon={Plus}
                          label="Top up"
                          theme={card.theme}
                        />
                        <ActionButton
                          icon={MoreHorizontal}
                          label="More"
                          theme={card.theme}
                        />
                      </div>

                      {/* Recent Transactions Stub */}
                      <div
                        className={cn(
                          "flex-1 rounded-2xl p-4",
                          card.theme === "dark" ? "bg-white/5" : "bg-black/5"
                        )}
                      >
                        <h4
                          className={cn(
                            "mb-2 font-semibold text-sm",
                            card.theme === "dark"
                              ? "text-neutral-300"
                              : "text-neutral-700"
                          )}
                        >
                          Recent Activity
                        </h4>
                        <div
                          className="divide-y divide-dashed"
                          style={{
                            borderColor:
                              card.theme === "dark"
                                ? "rgba(255,255,255,0.1)"
                                : "rgba(0,0,0,0.1)",
                          }}
                        >
                          <TransactionRow
                            amount="$15.99"
                            date="Today, 9:41 AM"
                            name="Netflix"
                            theme={card.theme}
                            type="out"
                          />
                          <TransactionRow
                            amount="$9.99"
                            date="Yesterday"
                            name="Spotify"
                            theme={card.theme}
                            type="out"
                          />
                          <TransactionRow
                            amount="$4,250.00"
                            date="Mon, 28 Aug"
                            name="Salary"
                            theme={card.theme}
                            type="in"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

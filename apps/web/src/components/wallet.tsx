"use client";

import { CreditCard, Wallet, Wifi } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

// Your existing types and data
type CardTheme = "dark" | "light" | "blue" | "orange";

interface CardData {
  id: string;
  bankName: string;
  balance: string;
  number: string;
  expiry: string;
  theme: CardTheme;
}

const CARDS: CardData[] = [
  {
    id: "1",
    bankName: "Nova Bank",
    balance: "$12,450.00",
    number: "4522",
    expiry: "12/26",
    theme: "dark",
  },
  {
    id: "2",
    bankName: "Family Fund",
    balance: "$2,850.50",
    number: "8829",
    expiry: "09/25",
    theme: "light",
  },
  {
    id: "3",
    bankName: "Travel Wise",
    balance: "$850.00",
    number: "1102",
    expiry: "04/24",
    theme: "blue",
  },

  {
    id: "4",
    bankName: "4 Bank",
    balance: "$12,450.00",
    number: "4522",
    expiry: "12/26",
    theme: "orange",
  },

  {
    id: "5",
    bankName: "4 Bank",
    balance: "$12,450.00",
    number: "4522",
    expiry: "12/26",
    theme: "light",
  },
];

const getThemeStyles = (theme: CardTheme) => {
  const styles = {
    dark: "bg-gradient-to-br from-zinc-900 to-zinc-800 text-white",
    light: "bg-white text-zinc-900",
    blue: "bg-gradient-to-br from-blue-600 to-blue-500 text-white",
    orange: "bg-gradient-to-br from-orange-500 to-orange-400 text-white",
  };
  return styles[theme];
};

export const WalletGallery = () => {
  const [selectedId, setSelectedId] = useState<string>(CARDS[0].id);

  return (
    <div className="relative min-h-screen bg-zinc-50 p-6">
      {/* Header */}
      <header className="mb-8">
        <h1 className="flex items-center gap-2 font-bold text-2xl text-zinc-900">
          <Wallet className="text-zinc-400" /> My Wallet
        </h1>
      </header>

      {/* Main Card Area - Full height with bottom padding for thumbnails */}
      <div className="relative h-[calc(100vh-200px)]">
        <AnimatePresence mode="sync">
          {CARDS.map(
            (card) =>
              card.id === selectedId && (
                <motion.div
                  animate={{ opacity: 1 }}
                  className={`absolute inset-0 rounded-3xl ${getThemeStyles(card.theme)} overflow-hidden shadow-2xl`}
                  exit={{ opacity: 0 }}
                  initial={{ opacity: 0 }}
                  key={card.id}
                  layoutId={`card-${card.id}`}
                  transition={{
                    layout: {
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                      restDelta: 0.01,
                    },
                    opacity: { duration: 0.1 },
                  }}
                >
                  {/* Card Content - we'll build this next */}
                  <div className="relative z-10 flex h-full flex-col justify-between p-8">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2 opacity-80">
                        <Wifi size={20} />
                        <span className="font-mono text-sm">NFC</span>
                      </div>
                      <CreditCard className="opacity-80" size={28} />
                    </div>

                    <div>
                      <p className="mb-2 text-sm opacity-80">{card.bankName}</p>
                      <p className="font-bold text-5xl">{card.balance}</p>
                      <div className="mt-6 flex gap-3 font-mono text-xl opacity-70">
                        <span>••••</span>
                        <span>••••</span>
                        <span>••••</span>
                        <span>{card.number}</span>
                      </div>
                    </div>

                    <div className="flex justify-between opacity-80">
                      <div>
                        <p className="mb-1 text-xs uppercase">Card Holder</p>
                        <p className="font-semibold">JAMES DOE</p>
                      </div>
                      <div className="text-right">
                        <p className="mb-1 text-xs uppercase">Expires</p>
                        <p className="font-semibold">{card.expiry}</p>
                      </div>
                    </div>
                  </div>

                  {/* Background decoration */}
                  <div className="-right-10 -top-10 pointer-events-none absolute h-64 w-64 rounded-full bg-white/10 blur-3xl" />
                </motion.div>
              )
          )}
        </AnimatePresence>
      </div>

      {/* Thumbnails at Bottom */}
      <div className="-mx-4 absolute right-6 bottom-6 left-6 flex gap-3 overflow-x-auto">
        {CARDS.map(
          (card) =>
            card.id !== selectedId && (
              <motion.div
                className={`flex-1 rounded-2xl ${getThemeStyles(card.theme)} cursor-pointer p-4 shadow-lg`}
                key={card.id}
                layoutId={`card-${card.id}`}
                onClick={() => setSelectedId(card.id)}
                transition={{
                  layout: {
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                    restDelta: 0.01,
                  },
                }}
              >
                <p className="mb-1 text-xs opacity-70">{card.bankName}</p>
                <p className="font-bold text-lg">{card.balance}</p>
              </motion.div>
            )
        )}
      </div>
    </div>
  );
};

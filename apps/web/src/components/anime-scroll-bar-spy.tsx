"use client";

import { useScrollSpy } from "@repo/design-system/components/ui/scroll-spy";
import { cn } from "@repo/design-system/lib/utils";
import { Menu, X } from "lucide-react";
import {
  AnimatePresence,
  motion,
  type PanInfo,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Header as HeaderData } from "@/payload-types";
import type { AnimeScrollSectionData } from "@/types";
import { CMSLink } from "./cms-link";

const CONFIG = {
  THUMB_WIDTH: 6,
  TOTAL_TICKS: 40,
  TOAST_DURATION: 1200,
  ANIMATION: {
    SPRING: { stiffness: 300, damping: 30, restDelta: 0.01 } as const,
    APPEAR: {
      initial: { opacity: 0, y: 20, scale: 0.95 },
      animate: { opacity: 1, y: 0, scale: 1 },
      exit: { opacity: 0, y: 20, scale: 0.95 },
      transition: { type: "spring", stiffness: 300, damping: 25 },
    } as const,
    MENU: {
      open: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 25,
          staggerChildren: 0.05,
        },
      },
      closed: {
        opacity: 0,
        scale: 0.9,
        y: 20,
        transition: { type: "spring", stiffness: 400, damping: 30 },
      },
    } as const,
  },
};

// --- Sub-Components ---

const ScrollCard = ({
  title,
  isVisible,
}: {
  title: string;
  isVisible: boolean;
}) => (
  <AnimatePresence>
    {isVisible && (
      <motion.div
        animate={{ opacity: 1, y: -12, scale: 1 }}
        className="absolute bottom-full left-0 hidden w-full md:block"
        exit={{ opacity: 0, y: 4, scale: 0.95 }}
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <div className="flex w-full flex-col items-center justify-center rounded-xl bg-primary p-3 shadow-xl ring-1 ring-white/10 md:rounded-2xl">
          <div className="text-pretty font-heading font-medium text-[12px] text-primary-foreground leading-[1.1] md:text-[14px]">
            {title}
          </div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

const Ticks = () => {
  const ticks = useMemo(() => [...Array(CONFIG.TOTAL_TICKS)], []);

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-between">
      {ticks.map((_, i) => {
        const isMajor = i % 5 === 0;
        return (
          <motion.div
            animate={{ opacity: isMajor ? 0.8 : 0.2 }}
            className={cn(
              "rounded-full bg-secondary",
              isMajor ? "h-[16px] w-[2px]" : "h-[10px] w-[1.5px]"
            )}
            initial={{ opacity: 0.2 }}
            key={i}
          />
        );
      })}
    </div>
  );
};

const MenuPanel = ({
  isOpen,
  navItems,
  onClose,
}: {
  isOpen: boolean;
  navItems: HeaderData["navItems"];
  onClose: () => void;
}) => {
  if (!navItems) {
    return null;
  }
  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          animate="open"
          className="absolute right-4 bottom-full mb-4 w-64 origin-bottom-right overflow-hidden rounded-2xl bg-primary shadow-2xl ring-1 ring-white/10"
          exit="closed"
          initial="closed"
          variants={CONFIG.ANIMATION.MENU}
        >
          <nav className="flex flex-col p-2">
            {navItems.map((item) => (
              <motion.div
                key={item.id}
                variants={{
                  open: { opacity: 1, x: 0 },
                  closed: { opacity: 0, x: 10 },
                }}
              >
                <CMSLink {...item.link}>
                  <button
                    className="block rounded-xl px-4 py-3 font-medium text-primary-foreground/90 text-sm transition-all hover:bg-white/10 hover:pl-6"
                    onClick={onClose}
                    type="button"
                  >
                    {item.link.label}
                  </button>
                </CMSLink>
              </motion.div>
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- Main Component ---

type Props = {
  sections: AnimeScrollSectionData[];
  navItems?: HeaderData["navItems"];
};

export const AnimeScrollBarSpy = ({ sections, navItems }: Props) => {
  const { activeValue } = useScrollSpy();
  const trackRef = useRef<HTMLDivElement>(null);

  // -- State --
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [ghostX, setGhostX] = useState<number | null>(null);

  // New: Toast State
  const [isToastVisible, setIsToastVisible] = useState(false);
  const toastTimerRef = useRef<NodeJS.Timeout | null>(null);

  // -- Scroll Logic --
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, CONFIG.ANIMATION.SPRING);
  const xPercent = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  // -- Toast Effect: Trigger on Section Change --
  useEffect(() => {
    // Don't show toast for Hero (start) or Footer (end)
    if (!activeValue || activeValue === "hero" || activeValue === "footer") {
      setIsToastVisible(false);
      return;
    }

    setIsToastVisible(true);

    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }

    toastTimerRef.current = setTimeout(() => {
      setIsToastVisible(false);
    }, CONFIG.TOAST_DURATION);

    return () => {
      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current);
      }
    };
  }, [activeValue]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!trackRef.current || isDragging) {
      setGhostX(null);
      return;
    }
    const rect = trackRef.current.getBoundingClientRect();
    const relativeX = e.clientX - rect.left;
    const clamped = Math.max(0, Math.min(relativeX, rect.width));
    setGhostX(clamped);
  };

  const handleTrackClick = (e: React.MouseEvent) => {
    if (!trackRef.current || isDragging) {
      return;
    }
    const rect = trackRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    const totalHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: totalHeight * ratio, behavior: "instant" });
  };

  const handleDrag = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (!trackRef.current) {
      return;
    }
    const rect = trackRef.current.getBoundingClientRect();
    const currentX = info.point.x - rect.left;
    const ratio = Math.max(0, Math.min(1, currentX / rect.width));
    const totalHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: totalHeight * ratio, behavior: "instant" });
  };

  // -- Derived Data --
  const activeSection = sections.find((s) => s.id === activeValue);
  const activeTitle = activeSection?.title || "Home";
  const isFooter = activeValue === "footer";

  // Logic: Show Card if (Dragging OR Hovering OR Toast Timer is Active)
  const showCard = isDragging || isHovering || isToastVisible;

  return (
    <AnimatePresence>
      {!isFooter && (
        <motion.div
          className="-translate-x-1/2 fixed bottom-2 left-1/2 z-[9999] flex items-end gap-3 md:bottom-6 md:left-[85%] md:w-auto"
          key="scroll-spy-container"
          {...CONFIG.ANIMATION.APPEAR}
        >
          {/* Scroll Bar Pill Container */}
          <motion.div
            className="relative flex h-[45px] w-[60vw] items-center rounded-xl bg-primary px-3 shadow-2xl ring-1 ring-white/10 md:h-[60px] md:w-[280px] md:rounded-2xl md:px-6"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => {
              setIsHovering(false);
              setGhostX(null);
            }}
            onMouseMove={handleMouseMove}
          >
            {/* The Toast Card */}
            <ScrollCard isVisible={!!showCard} title={activeTitle} />

            <div
              className="relative h-[20px] w-full cursor-pointer"
              onClick={handleTrackClick}
              ref={trackRef}
            >
              <Ticks />

              <AnimatePresence>
                {ghostX !== null && !isDragging && (
                  <motion.div
                    animate={{ opacity: 1, scale: 1 }}
                    className="-translate-y-1/2 absolute top-1/2 h-4 w-1.5 rounded-full bg-[#FF4B4B]/30"
                    exit={{ opacity: 0, scale: 0 }}
                    initial={{ opacity: 0, scale: 0 }}
                    style={{ left: ghostX, x: "-50%" }}
                  />
                )}
              </AnimatePresence>

              <motion.div
                className="-translate-y-1/2 absolute top-1/2 z-20 h-6 w-1.5 cursor-grab rounded-full bg-[#FF4B4B] shadow-[0_0_15px_rgba(255,75,75,0.6)] active:cursor-grabbing"
                drag="x"
                dragConstraints={trackRef}
                dragElastic={0}
                dragMomentum={false}
                onDrag={handleDrag}
                onDragEnd={() => setIsDragging(false)}
                onDragStart={() => setIsDragging(true)}
                style={{ left: xPercent, x: "-50%" }}
              />
            </div>
          </motion.div>

          {/* Mobile Hamburger */}
          <div className="relative block md:hidden">
            <MenuPanel
              isOpen={isMenuOpen}
              navItems={navItems}
              onClose={() => setIsMenuOpen(false)}
            />
            <motion.button
              className={cn(
                "flex h-[45px] w-[45px] items-center justify-center rounded-xl shadow-2xl outline-none transition-colors",
                "bg-primary text-primary-foreground ring-1 ring-white/10 hover:bg-primary/90"
              )}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    initial={{ rotate: -90, opacity: 0 }}
                    key="close"
                  >
                    <X className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    initial={{ rotate: 90, opacity: 0 }}
                    key="menu"
                  >
                    <Menu className="h-5 w-5 text-secondary/75" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

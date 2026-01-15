"use client";

import { useScrollSpy } from "@repo/design-system/components/ui/scroll-spy";
import { cn } from "@repo/design-system/lib/utils";
import { Link } from "@repo/i18n/navigation";
import { Menu, X } from "lucide-react";
import {
  AnimatePresence,
  type MotionValue,
  motion,
  type PanInfo,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Header as HeaderData } from "@/payload-types";
import type { AnimeScrollSectionData } from "@/types";

// --- Configuration ---
const CONFIG = {
  MINORS_PER_SECTION: 4,
  THUMB_WIDTH: 6,
  TOAST_DURATION: 1000,
  ANIMATION: {
    SPRING: { stiffness: 300, damping: 30, restDelta: 0.01 } as const,
    APPEAR: { delay: 2, type: "spring", stiffness: 300, damping: 10 } as const,
    LABEL: { type: "spring", stiffness: 400, damping: 20 } as const,
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
          delayChildren: 0.1,
        },
      },
      closed: {
        opacity: 0,
        scale: 0.9,
        y: 20,
        transition: { type: "spring", stiffness: 400, damping: 30 },
      },
    } as const,
    ITEM: {
      open: { opacity: 1, y: 0 },
      closed: { opacity: 0, y: 10 },
    } as const,
  },
};

// --- Custom Hooks ---

/**
 * Manages the visibility of the label toast based on active section changes.
 */
function useSectionToast(activeValue: string | null) {
  const [isToastActive, setIsToastActive] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!activeValue) {
      return;
    }

    setIsToastActive(true);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setIsToastActive(false);
    }, CONFIG.TOAST_DURATION);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [activeValue]);

  return isToastActive;
}

/**
 * Handles the bidirectional relationship between scroll progress and drag gestures.
 */
function useScrollSync(trackRef: React.RefObject<HTMLDivElement>) {
  const { scrollYProgress } = useScroll();

  // Smooth out the raw scroll progress
  const smoothProgress = useSpring(scrollYProgress, CONFIG.ANIMATION.SPRING);

  // Map progress to CSS values for the thumb
  const xPercent = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);
  const xMotion = useTransform(smoothProgress, [0, 1], ["0%", "-100%"]);

  const handleDrag = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      if (!trackRef.current) {
        return;
      }

      const trackRect = trackRef.current.getBoundingClientRect();
      const availableWidth = trackRect.width - CONFIG.THUMB_WIDTH;
      const newX = info.point.x - trackRect.left;

      // Calculate percentage (clamped 0-1)
      const progress = Math.max(0, Math.min(1, newX / availableWidth));

      const totalScrollable =
        document.documentElement.scrollHeight - window.innerHeight;

      window.scrollTo({
        top: totalScrollable * progress,
        behavior: "instant",
      });
    },
    [trackRef]
  );

  return { smoothProgress, xPercent, xMotion, handleDrag };
}

// --- Sub-Components ---

const ScrollLabel = ({
  isVisible,
  title,
  leftPercent,
}: {
  isVisible: boolean;
  title: string;
  leftPercent: number;
}) => (
  <div
    className="-top-16 -translate-x-1/2 pointer-events-none absolute z-20 flex w-80 justify-center"
    style={{ left: `${leftPercent}%` }}
  >
    <AnimatePresence>
      {isVisible && (
        <motion.div
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="relative flex flex-col items-center"
          exit={{ opacity: 0, y: 10, scale: 0.8 }}
          initial={{ opacity: 0, y: 10, scale: 0.8 }}
          transition={CONFIG.ANIMATION.LABEL}
        >
          <div className="rounded-lg bg-zinc-900 px-3 py-1.5 font-bold text-xs text-zinc-100 shadow-xl dark:bg-zinc-100 dark:text-zinc-900">
            {title}
          </div>
          <div className="-mt-1 h-2 w-2 rotate-45 bg-zinc-900 dark:bg-zinc-100" />
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const RulerTicks = ({ count }: { count: number }) => {
  const ticks = useMemo(() => Array.from({ length: count }), [count]);

  return (
    <div className="flex items-center justify-between gap-1">
      {ticks.map((_, i) => {
        const isMajor = i % 5 === 0;
        return (
          <div
            className={cn(
              "transition-colors duration-300",
              isMajor
                ? "h-[18px] w-0.5 bg-secondary opacity-80"
                : "h-[15px] w-[1.5px] bg-secondary opacity-20"
            )}
            key={i}
          />
        );
      })}
    </div>
  );
};

const DraggableThumb = ({
  trackRef,
  xPercent,
  xMotion,
  onDrag,
  setDragState,
}: {
  trackRef: React.RefObject<HTMLDivElement>;
  xPercent: MotionValue<string>;
  xMotion: MotionValue<string>;
  onDrag: (event: any, info: PanInfo) => void;
  setDragState: (isDragging: boolean) => void;
}) => (
  <motion.div
    className="-translate-y-1/2 absolute top-1/2 z-10 h-6 w-1.5 cursor-grab rounded-full bg-[#FF4B4B] shadow-[0_0_15px_rgba(255,75,75,0.5)] active:cursor-grabbing"
    drag="x"
    dragConstraints={trackRef}
    dragElastic={0}
    dragMomentum={false}
    onDrag={onDrag}
    onDragEnd={() => setDragState(false)}
    onDragStart={() => setDragState(true)}
    style={{ left: xPercent, x: xMotion }}
  />
);

// --- Menu panel ---
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
          className="absolute right-4 bottom-full mb-2 w-64 origin-bottom-right rounded-2xl bg-primary"
          exit="closed"
          initial="closed"
          variants={CONFIG.ANIMATION.MENU}
        >
          <nav className="flex flex-col gap-1">
            {navItems.map((item, i) => {
              const link = item.link;
              if (!link) {
                return null;
              }

              return (
                <motion.div key={i} variants={CONFIG.ANIMATION.ITEM}>
                  <Link
                    className="block rounded-xl px-4 py-3 font-medium text-primary-foreground/80 text-sm transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground"
                    href={link.url || "#"}
                    onClick={onClose}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              );
            })}
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

  // Local State
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Custom Hook Logic
  const isToastActive = useSectionToast(activeValue);
  const { xPercent, xMotion, handleDrag } = useScrollSync(trackRef);

  // Derived State
  const activeSection = sections.find((s) => s.id === activeValue);
  const activeIndex = sections.findIndex((s) => s.id === activeValue);
  const activeTitle = activeSection?.title || "Browsing";
  const shouldShowLabel = isDragging || isHovering || isToastActive;

  const maxIndex = sections.length - 1;

  const totalTicks =
    (sections.length - 1) * (CONFIG.MINORS_PER_SECTION + 1) + 1;

  const labelPositionPercent =
    activeIndex >= 0 && maxIndex > 0 ? (activeIndex / maxIndex) * 100 : 0;

  console.log(navItems);

  return (
    <div className="-translate-x-1/2 fixed bottom-6 sxl:bottom-12 left-1/2 z-9999 flex w-[80vw] items-stretch justify-center gap-2 md:bottom-8 md:w-auto">
      <motion.div
        animate={{ opacity: 1, scale: 1 }}
        className="flex w-[60vw] items-center rounded-2xl bg-primary 4xl:px-8 px-6 sxl:px-8 4xl:py-4 py-4 sxl:py-6 text-primary-foreground md:w-[280px]"
        initial={{ opacity: 0, scale: 0.8 }}
        style={{ transformOrigin: "bottom center" }}
        transition={CONFIG.ANIMATION.APPEAR}
      >
        <div
          className="group relative w-full cursor-grab active:cursor-grabbing"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          ref={trackRef}
        >
          <ScrollLabel
            isVisible={shouldShowLabel}
            leftPercent={labelPositionPercent}
            title={activeTitle}
          />

          <RulerTicks count={totalTicks} />

          <DraggableThumb
            onDrag={handleDrag}
            setDragState={setIsDragging}
            trackRef={trackRef}
            xMotion={xMotion}
            xPercent={xPercent}
          />
        </div>
      </motion.div>

      {/* mobile hamburger*/}
      <div className="relative block md:hidden">
        <MenuPanel
          isOpen={isMenuOpen}
          navItems={navItems}
          onClose={() => setIsMenuOpen(false)}
        />
        {/* Toggle Button */}
        <motion.button
          animate={{ opacity: 1, scale: 1 }}
          aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
          className={cn(
            "flex aspect-square h-full items-center justify-center rounded-2xl shadow-2xl outline-none transition-colors duration-200",
            "bg-primary text-primary-foreground",
            "hover:cursor-pointer"
          )}
          initial={{ opacity: 0, scale: 0.8 }}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          transition={{ ...CONFIG.ANIMATION.APPEAR, delay: 2.1 }}
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
                <Menu className="h-6 w-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
};

'use client'

import { useLenis } from "lenis/react";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { motion } from "motion/react";

type ScrollSpyContextValue = {
  activeValue: string;
  setActiveValue: (value: string) => void;
  scrollToValue: (value: string) => void;
  registerTrigger: (value: string, element: HTMLElement) => void;
  registerContent: (value: string, element: HTMLElement) => void;
  unregisterTrigger: (value: string) => void;
  unregisterContent: (value: string) => void;
};

const ScrollSpyContext = createContext<ScrollSpyContextValue | null>(null);

export function useScrollSpy() {
  const context = useContext(ScrollSpyContext);
  if (!context) {
    throw new Error("ScrollSpy components must be used within <ScrollSpy>");
  }
  return context;
}

type ScrollSpyProps = {
  children: React.ReactNode;
  defaultValue: string;
  offset?: number;
  onValueChange?: (value: string) => void;
};

export function ScrollSpy({
  children,
  defaultValue,
  offset = 100,
  onValueChange,
}: ScrollSpyProps) {
  const [activeValue, setActiveValueState] = useState(defaultValue);
  const lenis = useLenis();

  const triggersRef = useRef<Map<string, HTMLElement>>(new Map());
  const contentsRef = useRef<Map<string, HTMLElement>>(new Map());
  const isScrollingToRef = useRef(false);
  const activeValueRef = useRef(activeValue);

  useEffect(() => {
    activeValueRef.current = activeValue;
  }, [activeValue]);

  const setActiveValue = useCallback(
    (value: string) => {
      setActiveValueState(value);
      onValueChange?.(value);
    },
    [onValueChange],
  );

  const registerTrigger = useCallback((value: string, element: HTMLElement) => {
    triggersRef.current.set(value, element);
  }, []);

  const registerContent = useCallback((value: string, element: HTMLElement) => {
    contentsRef.current.set(value, element);
  }, []);

  const unregisterTrigger = useCallback((value: string) => {
    triggersRef.current.delete(value);
  }, []);

  const unregisterContent = useCallback((value: string) => {
    contentsRef.current.delete(value);
  }, []);

  const scrollToValue = useCallback(
    (value: string) => {
      const contentElement = contentsRef.current.get(value);

      if (!contentElement) return;

      isScrollingToRef.current = true;
      const rect = contentElement.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const top = rect.top + scrollTop - offset;

      if (lenis) {
        lenis.scrollTo(top, {
          duration: 1.2,
          onComplete: () => {
            isScrollingToRef.current = false;
          },
        });
      } else {
        // Fallback to native scroll if Lenis not available
        window.scrollTo({
          top,
          behavior: "smooth",
        });
        setTimeout(() => {
          isScrollingToRef.current = false;
        }, 1200);
      }

      setActiveValue(value);
    },
    [offset, setActiveValue, lenis],
  );

  // Handle scroll updates
  const handleScroll = useCallback(() => {
    if (isScrollingToRef.current) return;

    const scrollTop = window.scrollY;
    const contents = Array.from(contentsRef.current.entries());

    if (contents.length === 0) return;

    let newActiveValue = contents[0][0];

    for (let i = contents.length - 1; i >= 0; i--) {
      const [value, element] = contents[i];
      const rect = element.getBoundingClientRect();
      const elementTopInDocument = rect.top + scrollTop;

      if (scrollTop >= elementTopInDocument - offset - 200) {
        newActiveValue = value;
        break;
      }
    }

    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollTop + windowHeight >= documentHeight - 10) {
      newActiveValue = contents[contents.length - 1][0];
    }

    if (newActiveValue !== activeValueRef.current) {
      setActiveValue(newActiveValue);
    }
  }, [offset, setActiveValue]);

  // Use Lenis scroll updates if available, otherwise use native scroll
  useLenis(handleScroll);

  const contextValue: ScrollSpyContextValue = {
    activeValue,
    setActiveValue,
    scrollToValue,
    registerTrigger,
    registerContent,
    unregisterTrigger,
    unregisterContent,
  };

  return (
    <ScrollSpyContext.Provider value={contextValue}>
      {children}
    </ScrollSpyContext.Provider>
  );
}

type ScrollSpyListProps = {
  children: React.ReactNode;
  className?: string;
};

export function ScrollSpyList({ children, className }: ScrollSpyListProps) {
  return <nav className={className}>{children}</nav>;
}

type ScrollSpyContentContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export function ScrollSpyContentContainer({
  children,
  className,
}: ScrollSpyContentContainerProps) {
  return <div className={className}>{children}</div>;
}

type ScrollSpyTriggerProps = {
  value: string;
  children: React.ReactNode;
  className?: string;
};

export function ScrollSpyTrigger({
  value,
  children,
  className,
}: ScrollSpyTriggerProps) {
  const { activeValue, scrollToValue, registerTrigger, unregisterTrigger } =
    useScrollSpy();
  const triggerRef = useRef<HTMLButtonElement>(null);

  const isActive = activeValue === value;

  useEffect(() => {
    if (triggerRef.current) {
      registerTrigger(value, triggerRef.current);
    }

    return () => {
      unregisterTrigger(value);
    };
  }, [value, registerTrigger, unregisterTrigger]);

  const handleClick = () => {
    scrollToValue(value);
  };

  return (
    <motion.button
      ref={triggerRef}
      onClick={handleClick}
      className={className}
      data-active={isActive}
      // iOS-like tap animation
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.15 }}
    >
{isActive && (
        <motion.div
          layoutId="active-tab-bg"
          className="absolute inset-0 bg-accent"
          transition={{ type: "spring", stiffness: 300, damping: 30, restDelta: 0.01 }}
        />
      )}

      <span className="relative z-10 text-background mix-blend-multiply dark:mix-blend-normal">
        {children}
      </span>
    </motion.button>
  );
}

type ScrollSpyContentProps = {
  value: string;
  children: React.ReactNode;
  className?: string;
};

export function ScrollSpyContent({
  value,
  children,
  className,
}: ScrollSpyContentProps) {
  const { registerContent, unregisterContent } = useScrollSpy();
  const contentRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      registerContent(value, contentRef.current);
    }

    return () => {
      unregisterContent(value);
    };
  }, [value, registerContent, unregisterContent]);

  return (
    <motion.section
      ref={contentRef}
      id={value}
      className={className}
      initial={{ opacity: 1, y: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-150px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
}

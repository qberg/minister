import React, {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";

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
  offset,
  onValueChange,
}: ScrollSpyProps) {
  const [activeValue, setActiveValueState] = useState(defaultValue);

  const triggersRef = useRef<Map<string, HTMLElement>>(new Map());
  const contentsRef = useRef<Map<string, HTMLElement>>(new Map());

  const setActiveValue = useCallback(
    (value: string) => {
      setActiveValueState(value);
      onValueChange?.value;
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
}

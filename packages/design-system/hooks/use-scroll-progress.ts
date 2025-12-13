import { useEffect } from "react";
import { MotionValue } from "motion/react";

interface UseScrollProgressOptions {
  enabled?: boolean;
  label?: string;
  throttle?: number;
}

export function useScrollProgress(
  scrollYProgress: MotionValue<number>,
  options: UseScrollProgressOptions = {},
) {
  const { enabled = false, label = "scrollYProgress", throttle = 0 } = options;

  useEffect(() => {
    if (!enabled) return;

    let timeoutId: NodeJS.Timeout | null = null;

    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (throttle > 0) {
        if (timeoutId) return;
        timeoutId = setTimeout(() => {
          console.log(`${label}:`, latest.toFixed(3));
          timeoutId = null;
        }, throttle);
      } else {
        console.log(`${label}:`, latest.toFixed(3));
      }
    });

    return () => {
      unsubscribe();
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [scrollYProgress, enabled, label, throttle]);
}

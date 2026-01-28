"use client";

import { useEffect, useRef } from "react";

export function ConsoleBranding({ text }: { text: string }) {
  const loggedRef = useRef(false);

  useEffect(() => {
    if (!loggedRef.current) {
      // biome-ignore lint: console for branding
      console.log(text);
      loggedRef.current = true;
    }
  }, [text]);

  return null;
}

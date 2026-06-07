"use client";

import { useEffect, useState } from "react";
import { Preloader } from "@/components/layout/Preloader";

const STORAGE_KEY = "tipsy-preloader-v2";

export function PreloaderWrapper({ children }: { children: React.ReactNode }) {
  // Start true so the dark preloader covers the page on first render.
  // useEffect corrects it immediately for returning visitors (1-frame flash at most).
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) {
      // Returning visitor — skip immediately, no animation needed
      setShowPreloader(false);
    } else {
      // First visit — lock scroll and let the preloader run
      document.documentElement.style.overflow = "hidden";
    }
  }, []);

  const handleDone = () => {
    sessionStorage.setItem(STORAGE_KEY, "1");
    setShowPreloader(false);
    document.documentElement.style.overflow = "";
  };

  return (
    <>
      {showPreloader && <Preloader onDone={handleDone} />}
      {children}
    </>
  );
}

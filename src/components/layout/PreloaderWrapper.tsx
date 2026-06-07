"use client";

import { useEffect, useState } from "react";
import { Preloader } from "@/components/layout/Preloader";
import { useAmbience } from "@/lib/ambience-context";

const STORAGE_KEY = "tipsy-preloader-v2";

export function PreloaderWrapper({ children }: { children: React.ReactNode }) {
  const [showPreloader, setShowPreloader] = useState(true);
  const { choose } = useAmbience();

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) {
      setShowPreloader(false);
    } else {
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
      {showPreloader && <Preloader onDone={handleDone} onChoice={choose} />}
      {children}
    </>
  );
}

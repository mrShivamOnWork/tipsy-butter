"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from "react";

const AUDIO_SRC   = "/audio/cafe-ambience.mp3";
const STORAGE_KEY = "tipsy-ambience"; // "yes" | "no" | null (first visit)

// Desktop/laptop gets more presence; mobile earpiece stays subtle
function getTargetVol(): number {
  if (typeof window === "undefined") return 0.12;
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ? 0.22  // desktop — clearer, more immersive
    : 0.12; // mobile  — subtle background
}

type AmbienceCtx = {
  enabled: boolean;
  hasChoice: boolean; // false = first visit, show prompt
  choose: (yes: boolean) => void;
  toggle: () => void;
};

const Ctx = createContext<AmbienceCtx>({
  enabled: false,
  hasChoice: true,
  choose: () => {},
  toggle: () => {},
});

export function AmbienceProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  // Start as true to prevent prompt flash on SSR; set to false in effect if needed
  const [hasChoice, setHasChoice] = useState(true);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function clearFade() {
    if (fadeTimerRef.current !== null) {
      clearInterval(fadeTimerRef.current);
      fadeTimerRef.current = null;
    }
  }

  function getOrCreateAudio(): HTMLAudioElement {
    if (!audioRef.current) {
      const a = new Audio(AUDIO_SRC);
      a.loop = true;
      a.volume = 0;
      a.preload = "none"; // lazy — only loads when user chooses ambience
      audioRef.current = a;
    }
    return audioRef.current;
  }

  function fadeIn() {
    const a = getOrCreateAudio();
    const target = getTargetVol();
    clearFade();
    a.play().catch(() => {});
    fadeTimerRef.current = setInterval(() => {
      if (a.volume < target - 0.004) {
        a.volume = Math.min(a.volume + 0.006, target);
      } else {
        a.volume = target;
        clearFade();
      }
    }, 80);
  }

  function fadeOut() {
    const a = audioRef.current;
    if (!a) return;
    clearFade();
    fadeTimerRef.current = setInterval(() => {
      if (a.volume > 0.007) {
        a.volume = Math.max(a.volume - 0.008, 0);
      } else {
        a.volume = 0;
        a.pause();
        clearFade();
      }
    }, 80);
  }

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === null) {
      // First visit — preloader will show the choice screen
      setHasChoice(false);
    } else if (saved === "yes") {
      setEnabled(true);
      // Returning visitor: browser may block autoplay without a user gesture.
      // Try immediately; if blocked, start the moment they first interact with the page.
      const a = getOrCreateAudio();
      a.play()
        .then(() => {
          const target = getTargetVol();
          clearFade();
          fadeTimerRef.current = setInterval(() => {
            if (a.volume < target - 0.004) {
              a.volume = Math.min(a.volume + 0.006, target);
            } else {
              a.volume = target;
              clearFade();
            }
          }, 80);
        })
        .catch(() => {
          document.addEventListener("pointerdown", () => fadeIn(), { once: true });
        });
    }
    return () => {
      clearFade();
      audioRef.current?.pause();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function choose(yes: boolean) {
    localStorage.setItem(STORAGE_KEY, yes ? "yes" : "no");
    setHasChoice(true);
    setEnabled(yes);
    if (yes) fadeIn();
  }

  function toggle() {
    const next = !enabled;
    localStorage.setItem(STORAGE_KEY, next ? "yes" : "no");
    setEnabled(next);
    if (next) fadeIn();
    else fadeOut();
  }

  return (
    <Ctx.Provider value={{ enabled, hasChoice, choose, toggle }}>
      {children}
    </Ctx.Provider>
  );
}

export const useAmbience = () => useContext(Ctx);

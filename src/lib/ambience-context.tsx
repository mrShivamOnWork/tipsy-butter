"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from "react";

// Place your cafe ambience audio at: public/audio/cafe-ambience.mp3
// Recommended: ~3-5 min loopable cafe atmosphere track (no music, no lyrics).
const AUDIO_SRC = "/audio/cafe-ambience.mp3";
const STORAGE_KEY = "tipsy-ambience"; // "yes" | "no" | null (first visit)
const TARGET_VOLUME = 0.12; // 12% — barely present, just atmosphere

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
    clearFade();
    a.play().catch(() => {
      // Browser may block autoplay — silently fail
    });
    fadeTimerRef.current = setInterval(() => {
      if (a.volume < TARGET_VOLUME - 0.004) {
        a.volume = Math.min(a.volume + 0.005, TARGET_VOLUME);
      } else {
        a.volume = TARGET_VOLUME;
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
      // First visit — reveal the prompt
      setHasChoice(false);
    } else if (saved === "yes") {
      setEnabled(true);
      fadeIn();
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

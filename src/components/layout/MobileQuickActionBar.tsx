import Link from "next/link";
import { siteConfig } from "@/data/site";

export function MobileQuickActionBar() {
  return (
    <nav
      aria-label="Quick cafe actions"
      className="fixed inset-x-0 bottom-0 z-[95] border-t border-outline-variant/40 bg-surface/96 shadow-[0_-10px_30px_rgba(35,25,22,0.08)] backdrop-blur-md md:hidden"
    >
      <div className="grid grid-cols-3 px-4 pb-[max(env(safe-area-inset-bottom),0.75rem)] pt-3">
        <Link
          href="/menu"
          className="flex h-10 items-center justify-center border-r border-outline-variant/30 font-label-caps text-[9px] uppercase tracking-[0.18em] text-primary transition-colors hover:text-secondary"
        >
          Menu
        </Link>
        <a
          href={siteConfig.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-10 items-center justify-center border-r border-outline-variant/30 font-label-caps text-[9px] uppercase tracking-[0.18em] text-primary transition-colors hover:text-secondary"
        >
          Directions
        </a>
        <a
          href={siteConfig.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-10 items-center justify-center font-label-caps text-[9px] uppercase tracking-[0.18em] text-primary transition-colors hover:text-secondary"
        >
          Message
        </a>
      </div>
    </nav>
  );
}

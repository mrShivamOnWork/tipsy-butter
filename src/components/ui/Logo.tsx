import Image from "next/image";

interface LogoProps {
  variant?: "light" | "dark";
  showText?: boolean;
  size?: "sm" | "md";
}

/**
 * Reliable Logo component.
 * - light variant: shows the logo image (dark marks on transparent bg) + text
 * - dark variant: text only — no CSS filter hacks that produce white squares
 */
export function Logo({ variant = "light", showText = true, size = "md" }: LogoProps) {
  const isDark = variant === "dark";
  const imgSize = size === "md" ? 36 : 32;

  return (
    <div className="flex items-center gap-3">
      {!isDark && (
        <div className="relative shrink-0" style={{ width: imgSize, height: imgSize }}>
          <Image
            src="/images/logo/clean-logo-concept.png"
            alt="The Tipsy Butter logo"
            fill
            className="object-contain"
            priority
            sizes={`${imgSize}px`}
          />
        </div>
      )}
      {showText && (
        <div className="flex flex-col leading-none gap-[3px]">
          <span
            className={`font-headline-xl font-black text-[1.05rem] md:text-[1.15rem] uppercase tracking-[-0.02em] leading-none ${
              isDark ? "text-[#F0EAE0]" : "text-primary"
            }`}
          >
            Tipsy Butter
          </span>
          <span
            className={`font-label-accent text-[7.5px] uppercase tracking-[0.32em] hidden md:block ${
              isDark ? "text-[#F0EAE0]/40" : "text-outline"
            }`}
          >
            Cafe & Bakehouse
          </span>
        </div>
      )}
    </div>
  );
}

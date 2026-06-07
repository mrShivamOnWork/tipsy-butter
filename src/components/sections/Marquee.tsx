const items = [
  "FRESH BAKES DAILY",
  "✦",
  "WARM COFFEE",
  "✦",
  "DIGOS CITY",
  "✦",
  "OPEN TUE – SUN",
  "✦",
];

function Track() {
  return (
    <div className="marquee-track" aria-hidden>
      {items.map((item, i) => (
        <span
          key={i}
          className={
            item === "✦"
              ? "text-tertiary text-xs opacity-60"
              : "font-label-caps uppercase tracking-[0.45em] text-on-surface-variant text-[10px] font-semibold"
          }
        >
          {item}
        </span>
      ))}
    </div>
  );
}

export function Marquee() {
  return (
    <div
      className="bg-surface-container py-5 overflow-hidden whitespace-nowrap border-y border-outline-variant/30"
      aria-label="Cafe highlights"
    >
      <div className="marquee-container">
        <Track />
        <Track />
        <Track />
      </div>
    </div>
  );
}

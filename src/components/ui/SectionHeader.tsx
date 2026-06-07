type Props = {
  label: string;
  heading: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
};

export function SectionHeader({
  label,
  heading,
  description,
  align = "left",
  light = false,
}: Props) {
  return (
    <div className={align === "center" ? "text-center" : ""}>
      <span
        className={`font-label-accent text-xs uppercase tracking-[0.25em] block mb-4 ${
          light ? "text-primary-fixed-dim/80" : "text-outline"
        }`}
      >
        {label}
      </span>
      <h2
        className={`font-headline-lg text-4xl md:text-5xl leading-tight ${
          light ? "text-chalk-white" : "text-primary"
        }`}
      >
        {heading}
      </h2>
      {description && (
        <p
          className={`font-body-lg mt-6 max-w-lg leading-relaxed ${
            light ? "text-white/70" : "text-on-surface-variant"
          } ${align === "center" ? "mx-auto" : ""}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

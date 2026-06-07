type Props = { label: string; variant?: "dark" | "light" };

export function ServiceBadge({ label, variant = "dark" }: Props) {
  if (variant === "light") {
    return (
      <div className="flex items-center gap-3 px-5 py-3 border border-[#C8C0B0]/50 bg-[#EDE7DA] text-[#5A5046] font-body-md text-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-[#C4541C] shrink-0" />
        {label}
      </div>
    );
  }
  return (
    <div className="flex items-center gap-3 px-5 py-3 border border-[#F0EAE0]/10 bg-[#F0EAE0]/5 text-[#A89880] font-body-md text-sm">
      <span className="w-1.5 h-1.5 rounded-full bg-[#C4541C] shrink-0" />
      {label}
    </div>
  );
}

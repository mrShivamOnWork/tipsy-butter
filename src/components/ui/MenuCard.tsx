import Image from "next/image";
import type { MenuItem } from "@/data/menu";
import { ImageGrain } from "./ImageGrain";

type Props = {
  item: MenuItem;
};

export function MenuCard({ item }: Props) {
  return (
    <div className="group cursor-default card-lift" data-cursor="taste">
      {/* Image container — sharp corners, cream bg for loading state */}
      <div className="aspect-[4/5] overflow-hidden mb-5 relative shadow-lg bg-[#F5F0E6]">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
        />
        <ImageGrain grainOpacity={0.24} vignetteOpacity={0.22} />
        <div className="absolute bottom-4 right-4 bg-[#F5F0E6]/92 backdrop-blur-sm px-4 py-1.5 z-10">
          <span className="font-label-accent text-sm text-[#0D0B09]">{item.price}</span>
        </div>
        {item.tag && (
          <div className="absolute top-4 left-4 bg-[#C4541C] text-[#F0EAE0] px-3 py-1 text-xs font-label-accent uppercase tracking-wider z-10">
            {item.tag}
          </div>
        )}
      </div>
      <h3 className="font-headline-md font-black text-xl text-[#F0EAE0] mb-2 group-hover:text-[#C4541C] transition-colors duration-300">
        {item.name}
      </h3>
      <p className="font-body-md text-sm text-[#A89880] leading-relaxed">
        {item.description}
      </p>
    </div>
  );
}

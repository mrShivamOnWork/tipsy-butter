import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { TodaysFavorites } from "@/components/sections/TodaysFavorites";
import { CafeExperience } from "@/components/sections/CafeExperience";
import { MenuBoard } from "@/components/sections/MenuBoard";
import { MiniGallery } from "@/components/sections/MiniGallery";
import { CommunityProof } from "@/components/sections/CommunityProof";
import { VisitSection } from "@/components/sections/VisitSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <TodaysFavorites />
      <CafeExperience />
      <MenuBoard />
      <CommunityProof />
      <MiniGallery />
      <VisitSection />
    </>
  );
}

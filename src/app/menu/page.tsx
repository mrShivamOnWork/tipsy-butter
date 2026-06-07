import type { Metadata } from "next";
import { MenuContent } from "./MenuContent";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Browse The Tipsy Butter's full menu — croissants, pastries, fresh breads, specialty coffee, and desserts freshly made every day in Digos City.",
};

export default function MenuPage() {
  return <MenuContent />;
}

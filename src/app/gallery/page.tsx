import type { Metadata } from "next";
import { GalleryContent } from "./GalleryContent";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Browse The Tipsy Butter photo gallery — pastries, coffee, cafe interior, and daily bakes from our bakehouse in Digos City.",
};

export default function GalleryPage() {
  return <GalleryContent />;
}

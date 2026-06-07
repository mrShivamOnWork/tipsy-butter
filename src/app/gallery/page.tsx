import type { Metadata } from "next";
import { GalleryContent } from "./GalleryContent";

export const metadata: Metadata = {
  title: "The Journal",
  description:
    "Little moments from The Tipsy Butter — fresh bakes, quiet tables, warm coffee. A visual journal from our corner of Digos City.",
};

export default function GalleryPage() {
  return <GalleryContent />;
}

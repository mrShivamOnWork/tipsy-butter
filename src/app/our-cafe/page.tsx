import type { Metadata } from "next";
import { OurCafeContent } from "./OurCafeContent";

export const metadata: Metadata = {
  title: "Our Cafe",
  description:
    "Step inside The Tipsy Butter — a cozy cafe and bakehouse in Digos City. Warm atmosphere, fresh pastries, specialty coffee, and a welcoming space for slow mornings.",
};

export default function OurCafePage() {
  return <OurCafeContent />;
}

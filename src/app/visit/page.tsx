import type { Metadata } from "next";
import { VisitContent } from "./VisitContent";

export const metadata: Metadata = {
  title: "Visit Us",
  description:
    "Find The Tipsy Butter in Digos City. Located at Doña Aurora 3rd Street, San Jose, Digos. Open Tuesday to Sunday 8:00am–7:00pm.",
};

export default function VisitPage() {
  return <VisitContent />;
}

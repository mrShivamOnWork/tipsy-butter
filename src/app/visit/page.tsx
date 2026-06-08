import type { Metadata } from "next";
import { VisitContent } from "./VisitContent";

export const metadata: Metadata = {
  title: "Visit Us",
  description:
    "Find The Tipsy Butter in Digos City. Located at Doña Aurora 3rd Street, San Jose. Open Tuesday–Thursday 8am–7pm, Friday–Saturday 8am–8pm, Sunday 9am–6pm. Closed Monday.",
};

export default function VisitPage() {
  return <VisitContent />;
}

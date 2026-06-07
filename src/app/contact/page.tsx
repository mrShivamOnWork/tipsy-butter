import type { Metadata } from "next";
import { ContactContent } from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with The Tipsy Butter. Find us at Doña Aurora 3rd Street, San Jose, Digos City or reach out via Facebook. Open Tuesday to Sunday.",
};

export default function ContactPage() {
  return <ContactContent />;
}

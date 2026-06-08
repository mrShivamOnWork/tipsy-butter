import type { Metadata } from "next";
import { Josefin_Sans, Hanken_Grotesk, Plus_Jakarta_Sans, Caveat } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransitionProvider } from "@/components/layout/PageTransitionProvider";
import { PreloaderWrapper } from "@/components/layout/PreloaderWrapper";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import { MobileQuickActionBar } from "@/components/layout/MobileQuickActionBar";
import { PremiumCursor } from "@/components/ui/PremiumCursor";
import { AmbienceProvider } from "@/lib/ambience-context";
import { AudioToggle } from "@/components/ui/AudioToggle";

const josefin = Josefin_Sans({
  weight: ["100", "300", "400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-josefin",
  display: "swap",
});

const hanken = Hanken_Grotesk({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const caveat = Caveat({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tipsybutter.vercel.app"),
  title: {
    default: "The Tipsy Butter | Cafe & Bakehouse in Digos City",
    template: "%s | The Tipsy Butter",
  },
  description:
    "Visit The Tipsy Butter, a cozy cafe and bakehouse in Digos City serving coffee, croissants, pastries, fresh bakes, desserts, and warm cafe moments.",
  keywords: [
    "cafe in Digos",
    "Digos cafe",
    "croissants Digos",
    "pastries Digos",
    "bakehouse Digos",
    "The Tipsy Butter",
    "coffee Digos City",
    "bakery Davao del Sur",
    "cafe Philippines",
    "fresh pastries Digos",
    "specialty coffee Davao del Sur",
  ],
  authors: [{ name: "The Tipsy Butter" }],
  creator: "The Tipsy Butter",
  openGraph: {
    type: "website",
    locale: "en_PH",
    url: "https://tipsybutter.vercel.app",
    siteName: "The Tipsy Butter",
    title: "The Tipsy Butter | Cafe & Bakehouse in Digos City",
    description:
      "Fresh bakes. Warm coffee. Better days. Your daily ritual in Digos City.",
    images: [
      {
        url: "https://tipsybutter.vercel.app/opengraph-image",
        width: 1200,
        height: 630,
        alt: "The Tipsy Butter — Cafe & Bakehouse in Digos City",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Tipsy Butter | Cafe & Bakehouse in Digos City",
    description: "Fresh bakes. Warm coffee. Better days. Your daily ritual in Digos City.",
    images: ["https://tipsybutter.vercel.app/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["CafeOrCoffeeShop", "Bakery"],
  name: "The Tipsy Butter",
  description:
    "Cozy cafe and bakehouse in Digos City, Philippines. Specialty coffee, fresh croissants, pastries, and homemade desserts.",
  url: "https://tipsybutter.vercel.app",
  telephone: "+639327337466",
  image: "https://tipsybutter.vercel.app/opengraph-image",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Doña Aurora 3rd Street, San Jose",
    addressLocality: "Digos City",
    addressRegion: "Davao del Sur",
    postalCode: "8002",
    addressCountry: "PH",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Tuesday", "Wednesday", "Thursday"],
      opens: "08:00",
      closes: "19:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Friday", "Saturday"],
      opens: "08:00",
      closes: "20:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Sunday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  servesCuisine: ["Coffee", "Pastries", "Bakery"],
  priceRange: "₱₱",
  sameAs: ["https://www.facebook.com/Thetipsybutter/"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${josefin.variable} ${hanken.variable} ${jakarta.variable} ${caveat.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-background text-on-surface font-body-md overflow-x-hidden">
        <AmbienceProvider>
          <PremiumCursor />
          <AudioToggle />
          <SmoothScrollProvider>
            <PreloaderWrapper>
              <PageTransitionProvider>
                <Navbar />
                <main>{children}</main>
                <Footer />
                <MobileQuickActionBar />
              </PageTransitionProvider>
            </PreloaderWrapper>
          </SmoothScrollProvider>
        </AmbienceProvider>
      </body>
    </html>
  );
}

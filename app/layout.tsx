import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import LogoTap from "@/components/site/LogoTap";
import VisitPresence from "@/components/site/VisitPresence";
import { SITE_URL } from "@/lib/metadata";
import { montserrat, plexMono } from "./fonts/fonts";
// import "@fortawesome/fontawesome-svg-core/styles.css";
// import { config } from "@fortawesome/fontawesome-svg-core";
// config.autoAddCss = false;
import "./globals.css";
import "./site.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

// Defaults; every route sets its own title, description, canonical URL and Open Graph (lib/metadata.ts).
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Paramount Intelligence | AI Engineering & Consulting",
  description:
    "Build useful AI, improve software, and take stalled projects into production with Paramount Intelligence's consulting and forward-deployed engineering.",
  icons: {
    icon: "/images/logo-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // data-scroll-behavior: Next.js turns smooth scrolling off while it changes route, so every page opens at the top.
  return (
    <html lang="en" className={`${montserrat.variable} ${plexMono.variable}`} data-scroll-behavior="smooth">
      <body className={montserrat.className}>
        {children}
        <LogoTap />
        <VisitPresence />
        <Analytics />
      </body>
    </html>
  );
}

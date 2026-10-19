import type { Viewport } from "next";
import { IBM_Plex_Mono, Montserrat } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import AssistantWidget from "@/components/AssistantWidget";
import LogoTap from "@/components/site/LogoTap";
// import "@fortawesome/fontawesome-svg-core/styles.css";
// import { config } from "@fortawesome/fontawesome-svg-core";
// config.autoAddCss = false;
import "./globals.css";
import "./site.css";

// 300–800, as the reference loads it: text set heavier (a <b> inside bold text) renders at 800.
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-montserrat",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-plex-mono",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata = {
  title: "Paramount Intelligence - Technology Consulting and Engineering Firm",
  description:
    "Paramount Intelligence is a technology consulting and engineering firm delivering AI, data, cloud, and automation solutions that drive measurable business impact.",
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
        <Analytics />
      </body>
    </html>
  );
}

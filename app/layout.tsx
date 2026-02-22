import { Montserrat } from "next/font/google";
// import "@fortawesome/fontawesome-svg-core/styles.css";
// import { config } from "@fortawesome/fontawesome-svg-core";
// config.autoAddCss = false;
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata = {
  title: "Paramount Intelligence - Technology Consulting and Engineering Firm",
  description:
    "Paramount Intelligence is a technology consulting and engineering firm delivering AI, data, cloud, and automation solutions that drive measurable business impact.",
  icons: {
    icon: "/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <div className="max-w-480 mx-auto">{children}</div>
      </body>
    </html>
  );
}

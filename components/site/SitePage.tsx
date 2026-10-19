import type { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

/**
 * A redesigned page: shared Header and Footer around `<main id="top">`.
 * `pi-page` scopes the reference's element styles to the page (see the top of app/site.css).
 */
export default function SitePage({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main id="top" className="pi-page">
        {children}
      </main>
      <Footer />
    </>
  );
}

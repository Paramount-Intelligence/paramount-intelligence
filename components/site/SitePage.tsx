import type { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBehaviours from "@/components/site/PageBehaviours";

/**
 * A redesigned page: shared Header and Footer around `<main id="top">`, plus the reference's page behaviours.
 * `pi-page` scopes the reference's element styles to the page (see the top of app/site.css).
 * `piUpdates`: a page updated in the approved v37 artifact. Its header, page and footer sit inside `.pi-updates`
 * (display: contents, so the layout is unchanged), which turns on app/pi-updates.css for that page only.
 */
export default function SitePage({ children, piUpdates = false }: { children: ReactNode; piUpdates?: boolean }) {
  const page = (
    <>
      <Header />
      <main id="top" className="pi-page">
        {children}
      </main>
      <Footer />
      <PageBehaviours />
    </>
  );
  return piUpdates ? <div className="pi-updates">{page}</div> : page;
}

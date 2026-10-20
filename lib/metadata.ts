import type { Metadata } from "next";

export const SITE_URL = "https://paramountintelligence.co";
export const SITE_NAME = "Paramount Intelligence";

// The square brand icon: the reference has no share image, so link previews use the small "summary" card.
const SHARE_IMAGE = { url: "/images/logo-icon.png", width: 256, height: 256, alt: SITE_NAME };

/** A route's title, description, canonical URL, Open Graph and Twitter card (relative to metadataBase). */
export function pageMetadata({ title, description, path }: { title: string; description?: string; path: string }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", siteName: SITE_NAME, locale: "en_US", url: path, title, description, images: [SHARE_IMAGE] },
    twitter: { card: "summary", title, description, images: [SHARE_IMAGE.url] },
  };
}

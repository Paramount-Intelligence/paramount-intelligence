"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { initSiteBehaviours } from "@/lib/site-behaviours";

/** Runs the reference's page behaviours (lib/site-behaviours.ts) on the page's <main> once it is mounted. */
export default function PageBehaviours() {
  const pathname = usePathname();
  useEffect(() => {
    const root = document.querySelector<HTMLElement>("main.pi-page");
    if (!root) return;
    return initSiteBehaviours(root);
  }, [pathname]);
  return null;
}

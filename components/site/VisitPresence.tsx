"use client";

import { useEffect } from "react";
import { listenForVisit } from "@/lib/visit";

/**
 * Lets the other open tabs of the site know this one is open, so the renovation crane shows once per visit
 * (lib/visit.ts). In the root layout, so it runs on every page.
 */
export default function VisitPresence() {
  useEffect(() => listenForVisit(), []);
  return null;
}

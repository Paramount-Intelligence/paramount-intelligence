"use client";

import { useScrollReveal } from "@/lib/useScrollReveal";

/**
 * Drop this anywhere in the page tree to activate scroll-reveal
 * for all .reveal / .reveal-left / .reveal-right elements.
 */
export default function ScrollRevealInit() {
  useScrollReveal();
  return null;
}

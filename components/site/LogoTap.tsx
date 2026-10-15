"use client";

import { useEffect } from "react";

const TILES = ".lw, .xlogos img";

/**
 * Client logos are grey until hovered (site.css). On touch screens a tap does the same:
 * it adds `.on` to the tapped tile and clears the others. Delegated, so it covers every page.
 */
export default function LogoTap() {
  useEffect(() => {
    const onTouch = (e: TouchEvent) => {
      const tile = (e.target as Element | null)?.closest?.(TILES);
      const was = tile?.classList.contains("on");
      document.querySelectorAll(TILES).forEach((t) => t.classList.remove("on"));
      if (tile && !was) tile.classList.add("on");
    };
    document.addEventListener("touchstart", onTouch, { passive: true });
    return () => document.removeEventListener("touchstart", onTouch);
  }, []);
  return null;
}

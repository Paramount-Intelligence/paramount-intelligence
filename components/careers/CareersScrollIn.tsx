"use client";

import { useEffect } from "react";

/**
 * Cards, steps, role rows and FAQ rows ease in as they scroll into view, from a visible resting state
 * (`.g-in`, careers.css). Nothing moves with reduced motion.
 */
export default function CareersScrollIn() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add("g-in");
          io.unobserve(en.target);
        }
      }),
      { rootMargin: "0px 0px -8% 0px" },
    );
    document.querySelectorAll(".g-card, .g-step, .g-role, .g-q").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}

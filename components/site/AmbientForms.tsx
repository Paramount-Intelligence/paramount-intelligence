"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { shapesFor } from "@/lib/ambient-shapes";

declare global {
  interface Window {
    PIAmbient?: { mount: (shapes: number[]) => () => void; unmount: () => void };
  }
}

/**
 * The ambient 3D particle forms behind each open section (approved in artifact v37).
 * The engine (public/pi/ambient-forms.js) finds the page's top-level <section>s, decides which ones get a form,
 * and draws each form on a canvas behind that section's content (pointer-events: none, page layout unchanged).
 * It is re-mounted on every route change, because client-side navigation replaces the sections.
 */
export default function AmbientForms() {
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!ready || !window.PIAmbient) return;
    const shapes = pathname ? shapesFor(pathname) : null;
    if (!shapes) {
      window.PIAmbient.unmount();
      return;
    }
    let destroy: (() => void) | undefined;
    // wait two frames so the new route's sections are laid out before the engine measures them
    let id = requestAnimationFrame(() => {
      id = requestAnimationFrame(() => {
        destroy = window.PIAmbient?.mount(shapes);
      });
    });
    return () => {
      cancelAnimationFrame(id);
      destroy?.();
    };
  }, [pathname, ready]);

  return <Script src="/pi/ambient-forms.js" strategy="afterInteractive" onReady={() => setReady(true)} />;
}

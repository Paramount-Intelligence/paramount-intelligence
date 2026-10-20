"use client";

import { useEffect } from "react";

type Cleanup = () => void;

/**
 * Runs a full case study page's own scripts (from the reference) on its <main> once the page is mounted.
 * They run as written, with window, document, timers and observers that remember what the scripts register,
 * so leaving the page removes every listener, timer, animation frame and observer it added. `__root` is the
 * page's <main> and `__header` the shared header (see docs/website-redesign/tools/generate-case-study-pages.mjs).
 */
function run(root: HTMLElement, scripts: string[]): Cleanup {
  const listeners: [EventTarget, string, EventListenerOrEventListenerObject, boolean | AddEventListenerOptions | undefined][] = [];
  const timeouts = new Set<number>(), intervals = new Set<number>(), frames = new Set<number>();
  const observers: { disconnect(): void }[] = [];

  const add = (target: EventTarget) => (type: string, fn: EventListenerOrEventListenerObject, opts?: boolean | AddEventListenerOptions) => {
    target.addEventListener(type, fn, opts);
    listeners.push([target, type, fn, opts]);
  };
  const timers = {
    setTimeout: (fn: TimerHandler, ms?: number, ...args: unknown[]) => {
      const id = window.setTimeout(() => {
        timeouts.delete(id);
        (fn as (...a: unknown[]) => void)(...args);
      }, ms);
      timeouts.add(id);
      return id;
    },
    setInterval: (fn: TimerHandler, ms?: number, ...args: unknown[]) => {
      const id = window.setInterval(fn, ms, ...args);
      intervals.add(id);
      return id;
    },
    clearTimeout: (id?: number) => { if (id !== undefined) { timeouts.delete(id); window.clearTimeout(id); } },
    clearInterval: (id?: number) => { if (id !== undefined) { intervals.delete(id); window.clearInterval(id); } },
    requestAnimationFrame: (fn: FrameRequestCallback) => {
      const id = window.requestAnimationFrame((t) => {
        frames.delete(id);
        fn(t);
      });
      frames.add(id);
      return id;
    },
    cancelAnimationFrame: (id: number) => { frames.delete(id); window.cancelAnimationFrame(id); },
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const observed = <T extends new (...a: any[]) => { disconnect(): void }>(Base: T) =>
    class extends Base {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      constructor(...a: any[]) {
        super(...a);
        observers.push(this);
      }
    };
  const shadowed: Record<string, unknown> = {
    ...timers,
    addEventListener: add(window),
    removeEventListener: window.removeEventListener.bind(window),
    IntersectionObserver: observed(IntersectionObserver),
    ResizeObserver: observed(ResizeObserver),
    MutationObserver: observed(MutationObserver),
  };
  const proxy = <T extends object>(target: T, own: Record<string, unknown>) =>
    new Proxy(target, {
      get(t, p) {
        if (typeof p === "string" && p in own) return own[p];
        const v = Reflect.get(t, p, t);
        return typeof v === "function" && !/^[A-Z]/.test(String(p)) ? v.bind(t) : v;
      },
      set: (t, p, v) => Reflect.set(t, p, v, t),
    });
  // Queries see only the page, as in the reference, whose header and footer the shared ones replace.
  const doc = proxy(document, {
    addEventListener: add(document),
    querySelector: (s: string) => root.querySelector(s),
    querySelectorAll: (s: string) => root.querySelectorAll(s),
    getElementsByClassName: (s: string) => root.getElementsByClassName(s),
    getElementsByTagName: (s: string) => root.getElementsByTagName(s),
  });
  const win = proxy(window, { ...shadowed, document: doc });

  const htmlStyle = document.documentElement.getAttribute("style");
  const names = ["window", "self", "document", "__root", "__header", ...Object.keys(shadowed)];
  const values = [win, win, doc, root, document.querySelector("header.nav"), ...Object.values(shadowed)];
  for (const code of scripts) {
    try {
      new Function(...names, code)(...values);
    } catch (err) {
      console.error(err);
    }
  }

  return () => {
    listeners.forEach(([t, type, fn, opts]) => t.removeEventListener(type, fn, opts));
    timeouts.forEach((id) => window.clearTimeout(id));
    intervals.forEach((id) => window.clearInterval(id));
    frames.forEach((id) => window.cancelAnimationFrame(id));
    observers.forEach((o) => o.disconnect());
    if (htmlStyle === null) document.documentElement.removeAttribute("style");
    else document.documentElement.setAttribute("style", htmlStyle);
  };
}

export default function CaseStudyScripts({ scripts }: { scripts: string[] }) {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>("main.cs-page");
    if (!root) return;
    const markup = root.innerHTML;
    const cleanup = run(root, scripts);
    return () => {
      cleanup();
      // React's development double mount: run the scripts again on the page as it was rendered.
      if (root.isConnected) {
        root.innerHTML = markup;
        root.classList.remove("js");
      }
    };
  }, [scripts]);
  return null;
}

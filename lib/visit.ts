/**
 * One visit = from the first tab of the site a visitor opens until they close the last one (Ali, 22 Oct 2026).
 * The renovation crane shows once per visit: not again in another tab, on a reload, or after "×", but again on the
 * next visit.
 *
 * Every open tab of the site runs `listenForVisit()` (components/site/VisitPresence.tsx, in the root layout) and
 * answers on a BroadcastChannel. A new tab asks whether any other tab is open: no answer means a new visit. Whether
 * the crane was shown in this visit travels with the answers and is kept per tab in sessionStorage, which survives
 * reloads but not closing the tab. Nothing is kept once the last tab closes.
 */

const CHANNEL = "pi-visit";
const SEEN = "pi-crane-seen";
/** How long a new tab waits for the other tabs to answer. */
const ASK_MS = 300;

type Message = { type: "ask" } | { type: "here"; seen: boolean } | { type: "seen" };

function session(value?: "1"): boolean {
  try {
    if (value) sessionStorage.setItem(SEEN, value);
    return sessionStorage.getItem(SEEN) === "1";
  } catch {
    return false;
  }
}

const channel = () => (typeof BroadcastChannel === "undefined" ? null : new BroadcastChannel(CHANNEL));

/** Answer other tabs of the site while this one is open. Returns the cleanup. */
export function listenForVisit(): () => void {
  const ch = channel();
  if (!ch) return () => {};
  ch.onmessage = (e: MessageEvent<Message>) => {
    if (e.data?.type === "ask") ch.postMessage({ type: "here", seen: session() } satisfies Message);
    else if (e.data?.type === "seen") session("1");
  };
  return () => ch.close();
}

/** A claim still waiting for answers: a second call meanwhile (React runs effects twice in development) shares it. */
let pending: Promise<boolean> | null = null;

/**
 * Whether to show the crane now: true only once per visit. Showing it marks the visit (this tab and every open one).
 * Without BroadcastChannel it falls back to once per tab.
 */
export function claimCraneForThisVisit(): Promise<boolean> {
  pending ??= claim().finally(() => {
    pending = null;
  });
  return pending;
}

async function claim(): Promise<boolean> {
  if (session()) return false;
  const ch = channel();
  let seen = false;
  if (ch) {
    ch.onmessage = (e: MessageEvent<Message>) => {
      if (e.data?.type === "here" && e.data.seen) seen = true;
    };
    ch.postMessage({ type: "ask" } satisfies Message);
    await new Promise((r) => setTimeout(r, ASK_MS));
  }
  session("1");
  if (!seen) ch?.postMessage({ type: "seen" } satisfies Message);
  ch?.close();
  return !seen;
}

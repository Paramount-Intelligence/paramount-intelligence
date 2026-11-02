// Page behaviours from docs/website-redesign/reference/assets/site.js, run on a redesigned page's <main>
// once it is mounted (components/site/PageBehaviours.tsx). Same logic and timings as the reference.
// The header menus, mobile menu and the footer's copy button are React components; logo tap-to-colour is LogoTap.
// Every listener, timer and added node is removed by the returned cleanup.

type Ctx = { root: HTMLElement; reduce: boolean; signal: AbortSignal; later: (fn: () => void) => void };

const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode) => r.querySelector<T>(s);
const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode) => Array.from(r.querySelectorAll<T>(s));

/* --- lifecycle + accordion (homepage) --- */
function lifecycle({ root, signal }: Ctx) {
  const acc = $("#acc", root);
  if (!acc) return;
  const notes = [
    "New capability: from a business objective to the first useful release, connected to your systems.",
    "Recovery & readiness: from a prototype that stalls to a production release with an operating owner.",
    "Specialist support: alongside your team across the lifecycle, on a defined workstream.",
  ];
  const lanes = $$(".lane", root), accItems = $$(".acc-item", acc), note = $("#lcNote", root);
  const setAcc = (i: number) => {
    accItems.forEach((it, k) => {
      const on = k === i;
      it.classList.toggle("open", on);
      it.querySelector("button")!.setAttribute("aria-expanded", String(on));
      it.querySelector<HTMLElement>(".acc-body")!.hidden = !on;
    });
    lanes.forEach((l, k) => {
      l.classList.toggle("on", k === i);
      l.setAttribute("aria-pressed", String(k === i));
    });
    if (note) note.textContent = notes[i];
  };
  accItems.forEach((it, k) => it.querySelector("button")!.addEventListener("click", () => setAcc(k), { signal }));
  lanes.forEach((l, k) => l.addEventListener("click", () => setAcc(k), { signal }));
  setAcc(0);
}

/* --- stepped stages (any number of instances) --- */
function stages({ root, reduce, signal, later }: Ctx) {
  $$(".stages", root).forEach((wrap) => {
    const st = $$(".st", wrap), run = $(".run", wrap);
    let si = 0, hold = false;
    if (!st.length) return;
    const setStage = (i: number) => {
      si = i;
      st.forEach((s, k) => {
        s.classList.toggle("on", k === i);
        s.classList.toggle("done", k < i);
        s.setAttribute("aria-pressed", String(k === i));
      });
      if (run) {
        const cur = st[i].getBoundingClientRect(), box = wrap.getBoundingClientRect();
        run.style.width = Math.max(0, cur.left - box.left + 28) + "px";
      }
    };
    st.forEach((s, k) => {
      s.addEventListener("click", () => { hold = true; setStage(k); }, { signal });
      s.addEventListener("mouseenter", () => { hold = true; setStage(k); }, { signal });
      s.addEventListener("mouseleave", () => { hold = false; }, { signal });
    });
    setStage(0);
    if (!reduce) {
      const id = setInterval(() => { if (!hold) setStage((si + 1) % st.length); }, 2600);
      later(() => clearInterval(id));
    }
    window.addEventListener("resize", () => setStage(si), { signal });
  });
}

/* --- tabs (horizontal and vertical) --- */
function tabs({ root, signal }: Ctx) {
  $$('[role="tablist"]', root).forEach((list) => {
    const all = $$('[role="tab"]', list);
    const vertical = list.getAttribute("aria-orientation") === "vertical";
    const sel = (t: HTMLElement) => {
      all.forEach((x) => {
        const on = x === t;
        x.setAttribute("aria-selected", String(on));
        x.tabIndex = on ? 0 : -1;
        const p = document.getElementById(x.getAttribute("aria-controls") ?? "");
        if (p) p.hidden = !on;
      });
    };
    all.forEach((t, i) => {
      t.addEventListener("click", () => sel(t), { signal });
      t.addEventListener("keydown", (e) => {
        const next = vertical ? "ArrowDown" : "ArrowRight", prev = vertical ? "ArrowUp" : "ArrowLeft";
        if (e.key === next || e.key === prev) {
          e.preventDefault();
          const n = all[(i + (e.key === next ? 1 : -1) + all.length) % all.length];
          sel(n);
          n.focus();
        }
      }, { signal });
    });
  });
}

/* --- consulting funnel --- */
function funnel({ root, reduce, later }: Ctx) {
  const fz = $("#funnel", root);
  if (!fz) return;
  const NS = "http://www.w3.org/2000/svg", g = $<SVGGElement>("#fzDots", fz)!, card = $<SVGRectElement>("#fzCard rect", fz)!;
  const gates = [{ x: 158, a: 66, b: 174 }, { x: 248, a: 86, b: 154 }, { x: 338, a: 104, b: 136 }];
  const N = 16;
  let seed = 11;
  const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
  const fate = [3, 0, 1, 0, 2, 0, 1, 0, 0, 2, 1, 0, 1, 0, 2, 0];
  const slots = [0, 0, 0];
  type Dot = { x0: number; y0: number; pass: number; jit: number; el: SVGCircleElement; slot: number };
  const dots: Dot[] = [];
  const added: Element[] = [];
  const mk = (r: number, fill: string, op: number) => {
    const c = document.createElementNS(NS, "circle");
    c.setAttribute("r", String(r)); c.setAttribute("fill", fill); c.setAttribute("opacity", String(op));
    g.appendChild(c); added.push(c);
    return c;
  };
  const tick = document.createElementNS(NS, "path");
  tick.setAttribute("d", "M390 143l6 6 12-12"); tick.setAttribute("fill", "none"); tick.setAttribute("stroke", "#3dbe8b");
  tick.setAttribute("stroke-width", "3"); tick.setAttribute("opacity", "0");
  g.appendChild(tick); added.push(tick);
  later(() => added.forEach((n) => n.remove()));
  for (let i = 0; i < N; i++) {
    const x0 = 26 + (i % 4) * 22 + rnd() * 6, y0 = 56 + Math.floor(i / 4) * 40 + rnd() * 10;
    const ghost = mk(4.5, "#ffffff", 0.18);
    ghost.setAttribute("cx", String(x0)); ghost.setAttribute("cy", String(y0));
    const d: Dot = { x0, y0, pass: fate[i], jit: rnd(), el: mk(4.5, "#ffffff", 1), slot: 0 };
    if (d.pass < 3) d.slot = slots[d.pass]++;
    dots.push(d);
  }
  const T = [0.6, 1.9, 3.2, 4.5, 5.6], CYCLE = 8.2;
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
  const ease = (t: number) => { t = Math.max(0, Math.min(1, t)); return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; };
  const laneY = (d: Dot, k: number) => { const gt = gates[k]; return lerp(gt.a + 9, gt.b - 9, d.jit); };
  const pos = (d: Dot, t: number): [number, number, string, number] => {
    if (t < T[0]) return [d.x0, d.y0, "#ffffff", ease(t / T[0])];
    let px = d.x0, py = d.y0;
    for (let k = 0; k < 3; k++) {
      const t1 = T[k + 1], gx = gates[k].x, gy = laneY(d, k);
      if (t < t1) { const e = ease((t - T[k]) / (t1 - T[k])); return [lerp(px, gx - 9, e), lerp(py, gy, e), k === 0 ? "#ffffff" : "#09b6f9", 1]; }
      if (d.pass === k) { const e2 = ease((t - t1) / 0.8); return [lerp(gx - 9, gx - (slots[k] - 1) * 5 + d.slot * 10, e2), lerp(gy, 224, e2), "rgba(160,185,240,.55)", 1]; }
      px = gx - 9; py = gy;
    }
    const e3 = ease((t - T[3]) / (T[4] - T[3]));
    return [lerp(px, 400, e3), lerp(py, 120, e3), "#3dbe8b", e3 > 0.95 ? Math.max(0, 1 - (t - T[4]) * 3) : 1];
  };
  const draw = (t: number) => {
    dots.forEach((d) => {
      const p = pos(d, t);
      d.el.setAttribute("cx", p[0].toFixed(1)); d.el.setAttribute("cy", p[1].toFixed(1));
      d.el.setAttribute("fill", p[2]); d.el.setAttribute("opacity", String(p[3]));
    });
    const done = t > T[4];
    card.setAttribute("fill", done ? "rgba(61,190,139,.42)" : "rgba(61,190,139,.14)");
    tick.setAttribute("opacity", done ? "1" : "0");
  };
  if (reduce) {
    draw(CYCLE - 0.2);
  } else {
    let st0: number | null = null, raf = 0;
    const loop = (ts: number) => {
      if (st0 === null) st0 = ts;
      const t = ((ts - st0) / 1000 + 4.0) % CYCLE;
      draw(Math.min(t, CYCLE - 0.4));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    later(() => cancelAnimationFrame(raf));
  }
}

/* --- software isometric layers --- */
function isoLayers({ root, reduce, signal, later }: Ctx) {
  const iso = $("#iso", root);
  if (!iso) return;
  const pls = $$<SVGElement>(".pl", iso), lis = $$(".iso-labels li", iso);
  let li = 0, hold = false;
  const hot = (k: number) => {
    pls.forEach((p) => p.classList.toggle("hot", +(p.getAttribute("data-l") ?? -1) === k));
    lis.forEach((l) => l.classList.toggle("hot", +(l.getAttribute("data-l") ?? -1) === k));
  };
  lis.forEach((l) => {
    l.addEventListener("mouseenter", () => { hold = true; hot(+(l.getAttribute("data-l") ?? 0)); }, { signal });
    l.addEventListener("mouseleave", () => { hold = false; }, { signal });
  });
  hot(0);
  if (!reduce) {
    const id = setInterval(() => { if (hold) return; li = (li + 1) % 3; hot(li); }, 2200);
    later(() => clearInterval(id));
  }
}

/* --- cloud release pipeline --- */
function releasePipeline({ root, reduce, later }: Ctx) {
  const rel = $("#rel", root);
  if (!rel) return;
  const nodes = $$(".rl-node", rel), envs = $$(".rl-env", rel), pkg = $(".rl-pkg", rel)!, fill = $(".rl-fill", rel)!;
  const sp = $<SVGPathElement>(".rl-spark .ln", rel)!, sa = $<SVGPathElement>(".rl-spark .area", rel)!;
  const pts: number[] = [];
  for (let q = 0; q < 31; q++) pts.push(30 + Math.sin(q / 3) * 6 + Math.random() * 6);
  const drawSpark = () => {
    const d = pts.map((y, k) => (k ? "L" : "M") + k * 10 + " " + y.toFixed(1)).join(" ");
    sp.setAttribute("d", d);
    sa.setAttribute("d", d + " L300 56 L0 56 Z");
  };
  const steps = [
    { n: 0, done: -1, env: [] as string[] },
    { n: 1, done: 0, env: [] },
    { n: 2, done: 1, env: ["dep"] },
    { n: 2, done: 1, env: ["live", "dep"] },
    { n: 2, done: 1, env: ["live", "live", "dep"] },
    { n: 3, done: 2, env: ["live", "live", "live"] },
    { n: -1, done: 3, env: ["live", "live", "live"] },
  ];
  const setStep = (s: (typeof steps)[number]) => {
    nodes.forEach((nd, k) => { nd.classList.toggle("act", k === s.n); nd.classList.toggle("done", k <= s.done); });
    envs.forEach((e, k) => { e.classList.remove("dep", "live"); if (s.env[k]) e.classList.add(s.env[k]); });
    const at = s.n >= 0 ? s.n : 3;
    pkg.style.left = 12.5 + at * 25 + "%";
    fill.style.width = (Math.max(0, Math.min(3, s.done + (s.n > s.done ? 0.5 : 0))) / 3) * 100 + "%";
  };
  drawSpark();
  if (reduce) {
    setStep(steps[6]);
  } else {
    let si = 0;
    setStep(steps[0]);
    const a = setInterval(() => { si = (si + 1) % (steps.length + 1); setStep(steps[Math.min(si, steps.length - 1)]); }, 1100);
    const b = setInterval(() => {
      pts.shift();
      const last = pts[pts.length - 1];
      pts.push(Math.max(12, Math.min(48, last + (Math.random() - 0.5) * 9)));
      drawSpark();
    }, 160);
    later(() => { clearInterval(a); clearInterval(b); });
  }
}

/* --- copy buttons inside the page (the footer's is CopyEmail) --- */
function copyButtons({ root, signal }: Ctx) {
  $$("[data-copy]", root).forEach((b) => {
    b.addEventListener("click", () => {
      const el = document.getElementById(b.getAttribute("data-copy")!);
      if (!el) return;
      const txt = el.textContent!.trim(), label = b.textContent;
      const sel = () => { const r = document.createRange(); r.selectNodeContents(el); const s = window.getSelection()!; s.removeAllRanges(); s.addRange(r); };
      try { navigator.clipboard.writeText(txt).then(() => { b.textContent = "Copied"; setTimeout(() => { b.textContent = label; }, 1800); }, sel); } catch { sel(); }
    }, { signal });
  });
}

/* --- filter chips + careers role filter --- */
function chips({ root, signal }: Ctx) {
  $$("[data-chips]", root).forEach((group) => {
    const cs = $$("button", group);
    cs.forEach((c) => c.addEventListener("click", () => {
      cs.forEach((x) => x.setAttribute("aria-pressed", String(x === c)));
      const lbl = $("#chipLabel", root);
      if (lbl) lbl.textContent = c.textContent;
    }, { signal }));
  });
  const roleWrap = $("#roles", root);
  if (!roleWrap) return;
  const roles = $$(".job", roleWrap), eoi = $("#eoi", root);
  $$("[data-chips] button", root).forEach((c) => c.addEventListener("click", () => {
    const cat = c.getAttribute("data-cat");
    let shown = 0;
    roles.forEach((r) => { const on = cat === "all" || r.getAttribute("data-cat") === cat; r.hidden = !on; if (on) shown++; });
    roleWrap.hidden = shown === 0;
    if (eoi) eoi.hidden = shown !== 0;
  }, { signal }));
}

/* --- forms: the reference's validation and success state; the data goes to the email APIs --- */
const val = (f: HTMLFormElement, id: string) => ($<HTMLInputElement>("#" + id, f)?.value ?? "").trim();
const SEND: Record<string, (f: HTMLFormElement) => Promise<Response>> = {
  // Contact (/contact-us) -> POST /api/send-contact-email (PORT-PLAN section 5)
  contact: (f) =>
    fetch("/api/send-contact-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: val(f, "f-name"),
        email: val(f, "f-email"),
        company: val(f, "f-co"),
        phone: val(f, "f-phone"),
        subject: val(f, "f-topic"),
        message: val(f, "f-msg"),
      }),
    }),
  // Careers register-interest (/careers/open-positions) -> POST /api/send-application-email, multipart
  careers: (f) => {
    const [first, ...rest] = val(f, "c-name").split(/\s+/);
    const url = val(f, "c-url");
    const body = new FormData();
    body.append("firstName", first);
    body.append("lastName", rest.join(" "));
    body.append("email", val(f, "c-email"));
    body.append("position", val(f, "c-area"));
    body.append(/linkedin\./i.test(url) ? "linkedIn" : "portfolio", url);
    // A job page's form names its role (data-role) at the top of the cover letter.
    const role = f.dataset.role ? `Applying for: ${f.dataset.role}\n\n` : "";
    body.append("coverLetter", `${role}Location and time zone: ${val(f, "c-loc")}\n\n${val(f, "c-work")}`);
    const cv = $<HTMLInputElement>("#c-cv", f)?.files?.[0];
    if (cv) body.append("resume", cv);
    return fetch("/api/send-application-email", { method: "POST", body });
  },
};

function forms({ root, signal }: Ctx) {
  $$<HTMLFormElement>("form[data-form]", root).forEach((f) => {
    const ok = f.parentNode!.querySelector<HTMLElement>(".form-ok");
    const fail = $(".send-err", f), btn = $<HTMLButtonElement>("button[type=submit]", f);
    let sending = false;
    // A required field must be filled in; a file input (optional) must be within its data-max-mb.
    const check = (el: HTMLInputElement) => {
      const field = el.closest(".field"), msg = field && field.querySelector<HTMLElement>(".err");
      const file = el.type === "file" ? el.files?.[0] : undefined;
      const valid = el.type === "file" ? !file || file.size <= Number(el.dataset.maxMb) * 1024 * 1024 : el.type === "checkbox" ? el.checked : el.type === "email" ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value.trim()) : el.value.trim() !== "";
      if (field) field.classList.toggle("bad", !valid);
      if (msg) {
        msg.textContent = valid ? "" : el.getAttribute("data-err");
        // The file field's message isn't in the reference layout, so it takes no space until it's needed.
        if (el.type === "file") msg.hidden = valid;
      }
      return valid;
    };
    // A file that is too large is reported as soon as it's chosen.
    $$<HTMLInputElement>("input[type=file][data-max-mb]", f).forEach((el) => el.addEventListener("change", () => check(el), { signal }));
    f.addEventListener("submit", async (e) => {
      e.preventDefault();
      let bad: HTMLElement | null = null;
      $$<HTMLInputElement>("[data-err]", f).forEach((el) => {
        if (!check(el) && !bad) bad = el;
      });
      if (bad) { (bad as HTMLElement).focus(); return; }
      const send = SEND[f.dataset.form!];
      if (!send || sending) return;
      sending = true;
      btn?.setAttribute("aria-busy", "true");
      if (fail) fail.hidden = true;
      let sent = false, emailError = "";
      try {
        const res = await send(f);
        sent = res.ok;
        // The server refuses an email that isn't one plain address (400, field "email"): shown under the email field.
        if (res.status === 400) { const body = await res.json().catch(() => null); if (body?.field === "email") emailError = String(body.error || ""); }
      } catch {}
      sending = false;
      btn?.removeAttribute("aria-busy");
      if (signal.aborted) return;
      const emailEl = emailError ? $<HTMLInputElement>("input[type=email]", f) : null;
      if (emailEl) {
        const field = emailEl.closest(".field"), msg = field && field.querySelector<HTMLElement>(".err");
        if (field) field.classList.add("bad");
        if (msg) msg.textContent = emailError;
        emailEl.focus();
        return;
      }
      if (!sent) { if (fail) fail.hidden = false; return; }
      f.hidden = true;
      if (ok) { ok.hidden = false; ok.focus(); }
    }, { signal });
    const reset = ok && ok.querySelector("[data-reset]");
    if (reset) reset.addEventListener("click", () => { f.reset(); ok!.hidden = true; f.hidden = false; }, { signal });
  });
}

const BEHAVIOURS = [lifecycle, stages, tabs, funnel, isoLayers, releasePipeline, copyButtons, chips, forms];

/** Start the page's behaviours inside `root`; returns the cleanup. */
export function initSiteBehaviours(root: HTMLElement): () => void {
  const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
  const ac = new AbortController();
  const cleanups: (() => void)[] = [];
  const ctx: Ctx = { root, reduce, signal: ac.signal, later: (fn) => cleanups.push(fn) };
  if (reduce) {
    // The reference pauses them as the page loads, so they hold their first frame.
    $$<SVGSVGElement>("svg", root).forEach((s) => { try { s.pauseAnimations?.(); s.setCurrentTime?.(0); } catch {} });
  }
  BEHAVIOURS.forEach((b) => b(ctx));
  return () => {
    ac.abort();
    cleanups.forEach((fn) => fn());
  };
}

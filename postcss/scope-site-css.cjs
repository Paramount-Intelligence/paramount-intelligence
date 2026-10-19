// PostCSS plugin that keeps global styles out of full case study pages (components/casestudies/full/), which are
// built on browser defaults plus their own styles. It adds a zero-specificity guard, :where(:not(.cs-page *)), to
// the subject of
// - every rule in app/site.css (the reference's design system), so its shared classes (.wrap, .hero, .btn, ...)
//   don't reach into a case study page;
// - Tailwind preflight's !important [hidden] rule, so a case study page's own rules can show a [hidden] element,
//   as they can over the browser default.
// Elsewhere nothing changes.
const GUARD = ":where(:not(.cs-page *))";

// Split a selector list on top-level commas.
function splitList(sel) {
  const out = [];
  let depth = 0, quote = "", cur = "";
  for (const ch of sel) {
    if (quote) { cur += ch; if (ch === quote) quote = ""; continue; }
    if (ch === '"' || ch === "'") quote = ch;
    else if (ch === "(" || ch === "[") depth++;
    else if (ch === ")" || ch === "]") depth--;
    else if (ch === "," && depth === 0) { out.push(cur.trim()); cur = ""; continue; }
    cur += ch;
  }
  if (cur.trim()) out.push(cur.trim());
  return out;
}

// Insert the guard at the end of the last compound selector, before any pseudo-element.
function guard(sel) {
  if (/^(:root|html|body)$/.test(sel) || sel.includes(":where(.nav,.foot,.pi-page)")) return sel;
  let depth = 0, start = 0;
  for (let i = 0; i < sel.length; i++) {
    const ch = sel[i];
    if (ch === "(" || ch === "[") depth++;
    else if (ch === ")" || ch === "]") depth--;
    else if (depth === 0 && /[\s>+~]/.test(ch)) start = i + 1;
  }
  const last = sel.slice(start);
  depth = 0;
  for (let i = 0; i < last.length; i++) {
    const ch = last[i];
    if (ch === "(" || ch === "[") depth++;
    else if (ch === ")" || ch === "]") depth--;
    else if (depth === 0 && last.startsWith("::", i)) return sel.slice(0, start) + last.slice(0, i) + GUARD + last.slice(i);
  }
  return sel + GUARD;
}

// Quotes optional: in production Tailwind's optimizer has already removed them.
const HIDDEN = /^\[hidden\]:where\(:not\(\[hidden=["']?until-found["']?\]\)\)$/;

module.exports = () => ({
  postcssPlugin: "scope-site-css",
  OnceExit(root) {
    const file = root.source?.input?.file ?? "";
    if (!/[\\/]app[\\/]site\.css$/.test(file)) {
      root.walkRules((rule) => {
        if (HIDDEN.test(rule.selector)) rule.selector = guard(rule.selector);
      });
      return;
    }
    root.walkRules((rule) => {
      for (let p = rule.parent; p && p.type !== "root"; p = p.parent) {
        if (p.type === "atrule" && (/keyframes$/.test(p.name) || p.name === "layer")) return;
      }
      rule.selector = splitList(rule.selector).map(guard).join(",");
    });
  },
});
module.exports.postcss = true;

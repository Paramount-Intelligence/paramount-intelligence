// Generates the full case study pages from the reference (docs/website-redesign/reference/case-study-*.html).
// Run: node docs/website-redesign/tools/generate-case-study-pages.mjs
//
// For each page it writes content/case-studies/<key>/:
//   body.html    the page body without its own header, footer, styles, scripts and comments;
//                links point to app routes, images to /images/case-studies/
//   style.css    the page's styles scoped to its root (.cs-<key>): html, body and :root rules apply to the
//                root (overflow: hidden becomes clip there), every other selector is prefixed with it, and
//                keyframes get a cs-<key>- prefix
//   script-N.js  the page's scripts in order (not the reference's menu or pi-top scripts); the reading bar
//                measures the shared header (__header), and the "js" class goes on the page root (__root)
// plus content/case-studies/pages.json, and app/case-studies/<slug>/page.tsx for each page.
// Pages render through components/casestudies/full/FullCaseStudy.tsx. The content is as written in the reference.

import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import postcss from "postcss";

const root = new URL("../../../", import.meta.url);
const read = (p) => readFileSync(new URL(p, root), "utf8");
const write = (p, s) => {
  mkdirSync(new URL(p.replace(/[^/]*$/, ""), root), { recursive: true });
  writeFileSync(new URL(p, root), s);
};

const REF = "docs/website-redesign/reference/";
const readme = read("docs/website-redesign/README-site.md");
const routeOf = Object.fromEntries(
  [...readme.matchAll(/\| `(case-study-[^`]+)` \| [^|]+\| `(\/case-studies\/[^`]+)` \|/g)].map((m) => [m[1], m[2]]),
);
// Card 50 has no route on the current site; PORT-PLAN.md section 3 proposes this slug.
routeOf["case-study-flexagon-execution-portal.html"] = "/case-studies/flexagon-implementation-execution-portal";

const PAGE_ROUTES = {
  "index.html": "/",
  "services.html": "/services",
  "industries.html": "/industries",
  "case-studies.html": "/case-studies",
  "about-us.html": "/about-us",
  "careers.html": "/careers/open-positions",
  "contact-us.html": "/contact-us",
};
function route(file) {
  const [f, hash] = file.split("#");
  const r =
    PAGE_ROUTES[f] ??
    routeOf[f] ??
    (/^services-[a-z-]+\.html$/.test(f) ? "/services/" + f.slice(9, -5) : undefined) ??
    (/^industries-[a-z-]+\.html$/.test(f) ? "/industries/" + f.slice(11, -5) : undefined);
  if (!r) throw new Error(`no route for ${file}`);
  return r + (hash ? "#" + hash : "");
}

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

function scopeSelector(sel, scope) {
  if (/^(html|body|:root)$/.test(sel)) return [scope];
  if (/^\*(::?(before|after))?$/.test(sel)) {
    const pseudo = sel.slice(1);
    return [scope + pseudo, `${scope} *${pseudo}`];
  }
  if (/^\.js\s/.test(sel)) return [scope + sel];
  if (/^(html|body|:root)\b/.test(sel)) throw new Error(`unhandled root selector: ${sel}`);
  return [`${scope} ${sel}`];
}

function scopeCss(css, key) {
  const scope = `.cs-${key}`;
  const ast = postcss.parse(css);
  ast.walkComments((c) => c.remove());
  const names = new Set();
  ast.walkAtRules("keyframes", (a) => {
    names.add(a.params.trim());
    a.params = `cs-${key}-${a.params.trim()}`;
  });
  ast.walkRules((r) => {
    if (r.parent?.type === "atrule" && /keyframes$/.test(r.parent.name)) return;
    const list = splitList(r.selector);
    // On <body>, overflow:hidden passes to the window; on the root it would make the root a scroll container,
    // and the sticky reading bar would stick inside it. clip keeps the overflow hidden without that.
    if (list.some((s) => /^(html|body)$/.test(s))) {
      r.walkDecls(/^overflow(-[xy])?$/, (d) => { d.value = d.value.replace(/\bhidden\b/g, "clip"); });
    }
    r.selector = list.flatMap((s) => scopeSelector(s, scope)).join(",");
  });
  ast.walkDecls(/^animation(-name)?$/, (d) => {
    d.value = d.value
      .split(",")
      .map((part) => part.replace(/[-\w]+/g, (tok) => (names.has(tok) ? `cs-${key}-${tok}` : tok)))
      .join(",");
  });
  return ast.toString().trim() + "\n";
}

const strip = (s, re) => s.replace(re, "");
const files = readdirSync(new URL(REF, root)).filter((f) => /^case-study-.*\.html$/.test(f)).sort();
const pages = [];

for (const file of files) {
  const key = file.slice("case-study-".length, -".html".length);
  const slug = routeOf[file];
  if (!slug) throw new Error(`no slug for ${file}`);
  const src = read(REF + file);
  const head = src.slice(0, src.indexOf("<body"));
  let body = src.slice(src.indexOf(">", src.indexOf("<body")) + 1, src.lastIndexOf("</body>"));

  const title = head.match(/<title>([^<]*)<\/title>/)[1].replace(/&amp;/g, "&");
  const description = head.match(/<meta name="description" content="([^"]*)"/)?.[1].replace(/&amp;/g, "&") ?? null;
  const caveat = /family=Caveat/.test(head);

  // The page's own header and footer give way to the shared ones.
  body = strip(body, /<header class="pi-nav">[\s\S]*?<\/header>\s*/);
  body = strip(body, /<footer class="pi-foot">[\s\S]*?<\/footer>\s*/);

  const styles = [...head.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g), ...body.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map((m) => m[1]);
  const scripts = [...body.matchAll(/<script>([\s\S]*?)<\/script>/g)]
    .map((m) => m[1])
    .filter((js) => !js.includes(".pi-menu > li.pi-has")); // the reference header's dropdowns
  body = strip(body, /<style[^>]*>[\s\S]*?<\/style>\s*/g);
  body = strip(body, /<script>[\s\S]*?<\/script>\s*/g);
  body = strip(body, /<!--[\s\S]*?-->\s*/g);

  body = body
    .replace(/href="([a-z-]+\.html(?:#[^"]*)?)"/g, (_, f) => `href="${route(f)}"`)
    .replace(/(src|poster)="images\//g, '$1="/images/case-studies/')
    .replace(/(src|poster)="assets\/logo\.png"/g, '$1="/images/logo-mark.png"');
  if (/(?:href|src|poster)="(?:images|assets)\/|href="[a-z-]+\.html/.test(body)) throw new Error(`${file}: unmapped path`);

  const js = scripts.map((s) =>
    s
      .replace(/document\.documentElement\.classList\.add\('js'\)/g, "__root.classList.add('js')")
      .replace(/document\.querySelector\('\.pi-nav'\)/g, "__header")
      .replace(/querySelector\('\.pi-wrap'\)/g, "querySelector('.wrap')")
      .replace(/(['"`])images\//g, "$1/images/case-studies/")
      .trim() + "\n",
  );

  const dir = `content/case-studies/${key}/`;
  write(dir + "body.html", body.trim() + "\n");
  write(dir + "style.css", scopeCss(styles.join("\n"), key));
  js.forEach((s, i) => write(`${dir}script-${i + 1}.js`, s));
  pages.push({ key, slug, title, description, scripts: js.length, caveat });

  write(
    `app${slug}/page.tsx`,
    `import FullCaseStudy, { caseStudyMetadata } from "@/components/casestudies/full/FullCaseStudy";

// Generated by docs/website-redesign/tools/generate-case-study-pages.mjs from ${REF}${file}.
export const dynamic = "force-static";
export const metadata = caseStudyMetadata(${JSON.stringify(key)});

export default function Page() {
  return <FullCaseStudy pageKey=${JSON.stringify(key)} />;
}
`,
  );
}

write("content/case-studies/pages.json", JSON.stringify(pages, null, 2) + "\n");
console.log(`${pages.length} case study pages:`, pages.map((p) => p.key).join(", "));

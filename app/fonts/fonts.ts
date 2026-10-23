import localFont from "next/font/local";

// The site's fonts, self-hosted so a build never fetches from Google Fonts. Latin woff2 files copied once from the
// @fontsource packages 5.3.0 (SIL Open Font License 1.1, see the LICENSE-*.txt files here); each is byte-identical
// to the file Google Fonts served. The family names are the plain names the site's CSS and the case study styles use
// ("Montserrat", "IBM Plex Mono"), as next/font/google declared them. The case study pages' italic Montserrat and
// Caveat are in case-study-fonts.ts.

// 300–800, as the reference loads it: text set heavier (a <b> inside bold text) renders at 800. One variable-weight
// file (@fontsource-variable/montserrat), byte-identical to the file Google Fonts served for these weights.
export const montserrat = localFont({
  src: "./montserrat-latin-wght-normal.woff2",
  weight: "300 800",
  style: "normal",
  display: "swap",
  variable: "--font-montserrat",
  declarations: [{ prop: "font-family", value: "Montserrat" }],
});

// No fallback metrics face, as with next/font/google: the stack in --mono (app/site.css) continues to the system monospace.
export const plexMono = localFont({
  src: [
    { path: "./ibm-plex-mono-latin-400-normal.woff2", weight: "400" },
    { path: "./ibm-plex-mono-latin-500-normal.woff2", weight: "500" },
  ],
  style: "normal",
  display: "swap",
  variable: "--font-plex-mono",
  adjustFontFallback: false,
  declarations: [{ prop: "font-family", value: "IBM Plex Mono" }],
});

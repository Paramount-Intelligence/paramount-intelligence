import localFont from "next/font/local";

// Fonts only the full case study pages use, kept apart from app/fonts/fonts.ts so their @font-face rules load on
// those pages only, as before. Latin woff2 files from @fontsource (see fonts.ts and the LICENSE-*.txt files here).

// The case study pages also use Montserrat italic 400 and, on Contract Intelligence, Caveat 600 (components/casestudies/full).
export const montserratItalic = localFont({
  src: "./montserrat-latin-400-italic.woff2",
  weight: "400",
  style: "italic",
  display: "swap",
  preload: false,
  variable: "--font-montserrat-italic",
  declarations: [{ prop: "font-family", value: "Montserrat" }],
});

export const caveat = localFont({
  src: "./caveat-latin-600-normal.woff2",
  weight: "600",
  style: "normal",
  display: "swap",
  preload: false,
  variable: "--font-caveat",
  declarations: [{ prop: "font-family", value: "Caveat" }],
});

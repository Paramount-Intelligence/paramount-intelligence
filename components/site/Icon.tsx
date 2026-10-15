// SVG icons from the reference sprite (docs/website-redesign/reference/*.html, <symbol id="i-…">).
// Trusted static markup, rendered inline with the reference's `.ico` stroke styles.

const ICONS = {
  "arrow": "<path d=\"M5 12h14M13 6l6 6-6 6\"/>",
  "chev": "<path d=\"M6 9l6 6 6-6\"/>",
  "agent": "<rect x=\"4\" y=\"8\" width=\"16\" height=\"12\" rx=\"2\"/><path d=\"M12 8V4M9 4h6M9 13h.01M15 13h.01M9.5 17h5\"/>",
  "code": "<path d=\"M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16\"/>",
  "plug": "<path d=\"M9 2v5M15 2v5M6 7h12v4a6 6 0 01-12 0V7zM12 17v5\"/>",
  "rocket": "<path d=\"M5 15c-1.5 1.3-2 5-2 5s3.7-.5 5-2c.7-.8.7-2.1-.1-2.9a2.2 2.2 0 00-2.9-.1zM12 15l-3-3a22 22 0 012-4A12.9 12.9 0 0122 2c0 2.7-.8 7.5-6 11a22.4 22.4 0 01-4 2zM9 12H4s.6-3 2-4c1.6-1.1 5 0 5 0M12 15v5s3-.6 4-2c1.1-1.6 0-5 0-5\"/>",
  "users": "<path d=\"M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM22 21v-2a4 4 0 00-3-3.9M16 3.1a4 4 0 010 7.8\"/>",
  "owner": "<path d=\"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z\"/><path d=\"M9 12l2 2 4-4\"/>",
  "check": "<rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\"/><path d=\"M8 12l3 3 5-6\"/>",
  "gauge": "<path d=\"M12 14l4-4M3.3 19a10 10 0 1117.4 0\"/>",
  "spark": "<path d=\"M12 3l1.9 5.8L20 10.7l-5.6 2.4L12 19l-2.4-5.9L4 10.7l6.1-1.9z\"/><path d=\"M19 3v4M21 5h-4\"/>",
  "wrench": "<path d=\"M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.8-3.8a6 6 0 01-7.9 7.9l-6.9 6.9a2.1 2.1 0 01-3-3l6.9-6.9a6 6 0 017.9-7.9l-3.8 3.8z\"/>",
  "team": "<circle cx=\"12\" cy=\"7\" r=\"3\"/><circle cx=\"5\" cy=\"10\" r=\"2.2\"/><circle cx=\"19\" cy=\"10\" r=\"2.2\"/><path d=\"M7 20v-1.5a5 5 0 0110 0V20M1.5 19v-.8A3.4 3.4 0 015 15M22.5 19v-.8A3.4 3.4 0 0019 15\"/>",
  "target": "<circle cx=\"12\" cy=\"12\" r=\"9\"/><circle cx=\"12\" cy=\"12\" r=\"5\"/><circle cx=\"12\" cy=\"12\" r=\"1\"/>",
  "flask": "<path d=\"M9 3h6M10 3v6L4.5 18.5A1.7 1.7 0 006 21h12a1.7 1.7 0 001.5-2.5L14 9V3M7 15h10\"/>",
  "blocks": "<rect x=\"3\" y=\"3\" width=\"7\" height=\"7\"/><rect x=\"14\" y=\"3\" width=\"7\" height=\"7\"/><rect x=\"3\" y=\"14\" width=\"7\" height=\"7\"/><path d=\"M14 17.5h7M17.5 14v7\"/>",
  "monitor": "<rect x=\"2\" y=\"3\" width=\"20\" height=\"14\" rx=\"1\"/><path d=\"M8 21h8M12 17v4M6 12l3-3 3 3 5-5\"/>",
  "compass": "<circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"M16.2 7.8l-2.1 6.3-6.3 2.1 2.1-6.3z\"/>",
  "layout": "<rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"1\"/><path d=\"M3 9h18M9 21V9\"/>",
  "db": "<ellipse cx=\"12\" cy=\"5\" rx=\"9\" ry=\"3\"/><path d=\"M3 5v14c0 1.7 4 3 9 3s9-1.3 9-3V5M3 12c0 1.7 4 3 9 3s9-1.3 9-3\"/>",
  "cloud": "<path d=\"M17.5 19H8a6 6 0 115.7-8h1.8a4 4 0 012 8z\"/>",
  "flow": "<rect x=\"3\" y=\"3\" width=\"6\" height=\"6\"/><rect x=\"15\" y=\"15\" width=\"6\" height=\"6\"/><path d=\"M6 9v4a2 2 0 002 2h7\"/><path d=\"M12 12l3 3-3 3\"/>",
  "eval": "<path d=\"M3 3v18h18\"/><path d=\"M7 15l4-4 3 3 6-6\"/>",
  "in": "<rect x=\"2\" y=\"2\" width=\"20\" height=\"20\" rx=\"2\"/><path d=\"M7 10v7M7 7v.01M11 17v-4a2 2 0 014 0v4M11 10v7\"/>",
  "search": "<circle cx=\"11\" cy=\"11\" r=\"7\"/><path d=\"M20 20l-4-4\"/>",
  "lock": "<rect x=\"4\" y=\"11\" width=\"16\" height=\"10\" rx=\"1\"/><path d=\"M8 11V7a4 4 0 018 0v4\"/>",
  "mail": "<rect x=\"3\" y=\"5\" width=\"18\" height=\"14\" rx=\"1\"/><path d=\"M3 7l9 6 9-6\"/>",
  "cal": "<rect x=\"3\" y=\"5\" width=\"18\" height=\"16\" rx=\"1\"/><path d=\"M3 10h18M8 3v4M16 3v4\"/>",
  "file": "<path d=\"M14 3H6a1 1 0 00-1 1v16a1 1 0 001 1h12a1 1 0 001-1V8z\"/><path d=\"M14 3v5h5M9 13h6M9 17h6\"/>",
  "brief": "<rect x=\"3\" y=\"7\" width=\"18\" height=\"13\" rx=\"1\"/><path d=\"M9 7V4h6v3M3 13h18\"/>",
  "chart": "<path d=\"M4 20V10M10 20V4M16 20v-7M22 20H2\"/>",
  "layers": "<path d=\"M12 3l9 5-9 5-9-5z\"/><path d=\"M3 13l9 5 9-5\"/>",
  "refresh": "<path d=\"M20 11a8 8 0 00-14.9-3M4 4v4h4M4 13a8 8 0 0014.9 3M20 20v-4h-4\"/>",
  "mic": "<rect x=\"9\" y=\"3\" width=\"6\" height=\"11\" rx=\"3\"/><path d=\"M5 11a7 7 0 0014 0M12 18v3\"/>",
  "eye": "<path d=\"M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z\"/><circle cx=\"12\" cy=\"12\" r=\"3\"/>",
  "link": "<path d=\"M10 14a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7l-1 1M14 10a4 4 0 00-5.7 0l-3 3a4 4 0 005.7 5.7l1-1\"/>",
  "handshake": "<path d=\"M2 12l4-4 4 2 4-3 4 3 4 4M6 8v6l4 4 2-2 2 2 4-4v-6\"/>",
  "msg": "<path d=\"M4 4h16v12H8l-4 4z\"/><path d=\"M8 9h8M8 12h5\"/>",
  "route": "<circle cx=\"6\" cy=\"19\" r=\"2\"/><circle cx=\"18\" cy=\"5\" r=\"2\"/><path d=\"M8 19h7a3 3 0 000-6H9a3 3 0 010-6h7\"/>",
  "person": "<circle cx=\"12\" cy=\"8\" r=\"4\"/><path d=\"M4 21a8 8 0 0116 0\"/>",
  "play": "<rect x=\"3\" y=\"5\" width=\"18\" height=\"14\" rx=\"1\"/><path d=\"M10 9l5 3-5 3z\"/>",
  "scale": "<path d=\"M12 3v18M5 21h14M5 7h14M5 7l-3 7h6zM19 7l-3 7h6z\"/>",
  "repeat": "<path d=\"M17 2l4 4-4 4M3 11V9a3 3 0 013-3h15M7 22l-4-4 4-4M21 13v2a3 3 0 01-3 3H3\"/>",
} as const;

export type IconName = keyof typeof ICONS;

export default function Icon({ name, className = "ico" }: { name: IconName; className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      dangerouslySetInnerHTML={{ __html: ICONS[name] }}
    />
  );
}

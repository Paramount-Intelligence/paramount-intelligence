"use client";

import { useRef, useState } from "react";

/** Email in a mono chip with a Copy button. Falls back to selecting the text. */
export default function CopyEmail({ email }: { email: string }) {
  const ref = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

  const select = () => {
    const el = ref.current;
    const sel = window.getSelection();
    if (!el || !sel) return;
    const range = document.createRange();
    range.selectNodeContents(el);
    sel.removeAllRanges();
    sel.addRange(range);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      select();
    }
  };

  return (
    <div className="mail">
      <code ref={ref}>{email}</code>
      <button type="button" onClick={copy}>
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}

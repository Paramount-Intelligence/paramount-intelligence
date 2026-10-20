import Link from "next/link";

/** Paramount mark and wordmark in the logo's own colours. */
export default function Brand({ label }: { label?: string }) {
  return (
    <Link className="brand" href="/" aria-label={label}>
      <img src="/images/logo-mark.png" alt="" width={28} height={38} />
      <b>
        <span className="b1">Paramount</span>
        <span className="b2">Intelligence</span>
      </b>
    </Link>
  );
}

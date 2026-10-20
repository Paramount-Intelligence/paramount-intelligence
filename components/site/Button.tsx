import Link from "next/link";
import type { ReactNode } from "react";
import Icon from "./Icon";

type Variant = "cyan" | "navy" | "line" | "ghost";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  /** Full width, label left and arrow right (closing CTA card). */
  wide?: boolean;
  /** Arrow in its own block (default on). */
  arrow?: boolean;
  className?: string;
};

/** Reference `.btn`: label plus the arrow in its own darker block. */
export default function Button({
  href,
  children,
  variant = "cyan",
  wide = false,
  arrow = true,
  className,
}: ButtonProps) {
  const cls = ["btn", `btn-${variant}`, wide && "btn-wide", className].filter(Boolean).join(" ");
  return (
    <Link className={cls} href={href}>
      {children}
      {arrow && (
        <span className="arr">
          <Icon name="arrow" />
        </span>
      )}
    </Link>
  );
}

/** Reference `.link`: royal-blue text link with an arrow. */
export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link className="link" href={href}>
      {children}
      <span className="arr">
        <Icon name="arrow" />
      </span>
    </Link>
  );
}

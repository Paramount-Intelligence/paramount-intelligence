"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Brand from "@/components/site/Brand";
import Button from "@/components/site/Button";
import Icon from "@/components/site/Icon";
import { INDUSTRIES, ROUTES, SERVICES } from "@/lib/site-nav";

type HeaderProps = {
  /** Admin console: show "Log out" instead of "Discuss a project". */
  showAdminLogout?: boolean;
};

type Drop = "svc" | "ind" | null;

const COMPANY = [
  { label: "Case Studies", href: ROUTES.caseStudies },
  { label: "About Us", href: ROUTES.about },
  { label: "Careers", href: ROUTES.careers },
  { label: "Contact Us", href: ROUTES.contact },
];

const under = (path: string, base: string) => path === base || path.startsWith(`${base}/`);

const canHover = () => window.matchMedia("(hover: hover)").matches;

export default function Header({ showAdminLogout = false }: HeaderProps) {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState<Drop>(null);
  const [mobOpen, setMobOpen] = useState(false);
  const menuRef = useRef<HTMLUListElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  // Close everything on navigation.
  useEffect(() => {
    setOpen(null);
    setMobOpen(false);
  }, [pathname]);

  // Close dropdowns on outside click and Escape.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setOpen(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  // Escape also closes the mobile menu and returns focus to the menu button.
  useEffect(() => {
    if (!mobOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setMobOpen(false);
      burgerRef.current?.focus();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobOpen]);

  const handleAdminLogout = async () => {
    try {
      const res = await fetch("/api/admin/logout", { method: "POST", credentials: "include" });
      if (!res.ok) throw new Error("Logout failed");
      window.location.href = "/admin/login";
    } catch (err) {
      console.error(err);
      alert("Failed to logout");
    }
  };

  const dropdown = (id: Exclude<Drop, null>, label: string, base: string, links: typeof SERVICES, foot: { label: string; href: string }[]) => {
    const isOpen = open === id;
    return (
      <li
        className={`has${isOpen ? " open" : ""}`}
        onMouseEnter={() => canHover() && setOpen(id)}
        onMouseLeave={() => canHover() && setOpen(null)}
      >
        <button
          type="button"
          className={under(pathname, base) ? "on" : undefined}
          aria-expanded={isOpen}
          aria-controls={`dd-${id}`}
          onClick={() => setOpen(isOpen ? null : id)}
        >
          {label} <Icon name="chev" />
        </button>
        <div className={`drop ${id}`} id={`dd-${id}`} onClick={() => setOpen(null)}>
          {links.map((l) => (
            <Link key={l.href} href={l.href}>
              <b>{l.label}</b>
              <span>{l.blurb}</span>
            </Link>
          ))}
          <div className="foot">
            {foot.map((f) => (
              <Link key={f.href} href={f.href}>
                {f.label} →
              </Link>
            ))}
          </div>
        </div>
      </li>
    );
  };

  return (
    <header className="nav">
      <div className="wrap">
        <Brand label="Paramount Intelligence home" />
        <ul className="menu" ref={menuRef}>
          <li>
            <Link className={pathname === "/" ? "on" : undefined} href={ROUTES.home}>
              Home
            </Link>
          </li>
          {dropdown("svc", "Services", ROUTES.services, SERVICES, [
            { label: "View all services", href: ROUTES.services },
            { label: "Forward-deployed AI engineering", href: ROUTES.forwardDeployed },
          ])}
          {dropdown("ind", "Industries", ROUTES.industries, INDUSTRIES, [
            { label: "View industries", href: ROUTES.industries },
          ])}
          {COMPANY.map((l) => (
            <li key={l.href}>
              <Link className={under(pathname, l.href) ? "on" : undefined} href={l.href}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="nav-cta">
          {showAdminLogout ? (
            <button type="button" className="btn btn-navy" onClick={handleAdminLogout}>
              Log out
            </button>
          ) : (
            <Button href={ROUTES.contact}>Discuss a project</Button>
          )}
          <button
            ref={burgerRef}
            className="burger"
            type="button"
            aria-expanded={mobOpen}
            aria-controls="mob"
            aria-label={mobOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobOpen((o) => !o)}
          >
            {/* No viewBox, as in the reference: the lines draw at their full 18px. */}
            <svg className="ico" aria-hidden="true">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>
        </div>
      </div>
      <nav className="mob" id="mob" hidden={!mobOpen} aria-label="Mobile" onClick={() => setMobOpen(false)}>
        <div className="wrap">
          <Link href={ROUTES.home}>Home</Link>
          <h4>Services</h4>
          {SERVICES.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
          <Link href={ROUTES.services}>View all services</Link>
          <h4>Industries</h4>
          {INDUSTRIES.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
          <Link href={ROUTES.industries}>View industries</Link>
          <h4>Company</h4>
          {COMPANY.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
          {showAdminLogout && (
            <button type="button" className="btn btn-navy" onClick={handleAdminLogout}>
              Log out
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}

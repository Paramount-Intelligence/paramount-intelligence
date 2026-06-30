"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { LogOut, Menu, X, ChevronRight } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

type MobileDropdownProps = {
  label: React.ReactNode;
  children: React.ReactNode;
};

function MobileDropdown({ label, children }: MobileDropdownProps) {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <button
        type="button"
        className="w-full flex items-center justify-between text-sm text-[#b5c8e2] hover:text-white font-medium py-2 px-0 focus:outline-none transition-colors"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span>{label}</span>
        <svg
          className={`w-4 h-4 ml-2 transition-transform duration-200 ${open ? "rotate-90" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      {open && (
        <div className="pl-4 pb-2 animate-slide-down space-y-1 mt-1">
          {children}
        </div>
      )}
    </div>
  );
}

const services = [
  { title: "AI Solutions and Engineering", href: "/services/ai-solutions-and-engineering" },
  { title: "AI Strategy and Consulting", href: "/services/ai-strategy-and-consulting" },
  { title: "Data and Analytics", href: "/services/data-and-analytics" },
  { title: "Cloud Services", href: "/services/cloud-services" },
  { title: "AI Workflow Automation", href: "/services/ai-workflow-automation" },
  { title: "AI Studio & Platform Engineering", href: "/services/ai-studio-and-platform-engineering" },
];

const industries = [
  { title: "Technology & Enterprise Software", href: "/industries/technology-and-enterprise-software" },
  { title: "Manufacturing, Industrial & Energy", href: "/industries/manufacturing-industrial-and-energy" },
  { title: "Telecommunications", href: "/industries/telecommunications" },
  { title: "Fintech & Digital Payments", href: "/industries/fintech-and-digital-payments" },
  { title: "B2B Enterprise Solutions", href: "/industries/b2b-enterprise-solutions" },
  { title: "Digital Lifestyle & Entertainment", href: "/industries/digital-lifestyle-and-entertainment" },
  { title: "Mobility, Ride-Hailing & Delivery", href: "/industries/mobility-ride-hailing-and-delivery" },
  { title: "E-commerce & Marketplaces", href: "/industries/e-commerce-and-marketplaces" },
];

const insights = [
  { title: "Blog", href: "https://transformwithtechnology.beehiiv.com/" },
];

const careers = [
  { title: "Open Positions", href: "/careers/open-positions" },
];

type HeaderProps = {
  showAdminLogout?: boolean;
};

export default function Header({ showAdminLogout = false }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300"
      style={{
        background: scrolled
          ? "rgba(6, 13, 26, 0.92)"
          : "rgba(6, 13, 26, 0.75)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: scrolled
          ? "1px solid rgba(30, 111, 217, 0.2)"
          : "1px solid rgba(255, 255, 255, 0.06)",
        boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.4)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-3 hover:opacity-85 transition-opacity group"
          >
            <Image
              src="/images/logo.png"
              alt="Paramount Intelligence"
              width={36}
              height={36}
              className="rounded-lg group-hover:scale-105 transition-transform duration-200"
            />
            <span className="text-base font-bold text-white hidden sm:block tracking-tight">
              Paramount Intelligence
            </span>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex" viewport={false}>
            <NavigationMenuList>
              {/* Services */}
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className="text-sm text-[#b5c8e2] hover:text-white bg-transparent hover:bg-[rgba(30,111,217,0.12)] data-[state=open]:bg-[rgba(30,111,217,0.12)] data-[state=open]:text-white transition-all rounded-lg px-3 py-2"
                >
                  Services
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div
                    className="animate-slide-down rounded-xl overflow-hidden shadow-2xl"
                    style={{
                      background: "rgba(13, 31, 60, 0.97)",
                      border: "1px solid rgba(30, 111, 217, 0.25)",
                      backdropFilter: "blur(20px)",
                    }}
                  >
                    <ul className="grid w-[520px] gap-1 p-3 md:grid-cols-2">
                      {services.map((service) => (
                        <NavListItem key={service.title} title={service.title} href={service.href} />
                      ))}
                    </ul>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Industries */}
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className="text-sm text-[#b5c8e2] hover:text-white bg-transparent hover:bg-[rgba(30,111,217,0.12)] data-[state=open]:bg-[rgba(30,111,217,0.12)] data-[state=open]:text-white transition-all rounded-lg px-3 py-2"
                >
                  Industries
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div
                    className="animate-slide-down rounded-xl overflow-hidden shadow-2xl"
                    style={{
                      background: "rgba(13, 31, 60, 0.97)",
                      border: "1px solid rgba(30, 111, 217, 0.25)",
                      backdropFilter: "blur(20px)",
                    }}
                  >
                    <ul className="grid w-[520px] gap-1 p-3 md:grid-cols-2">
                      {industries.map((industry) => (
                        <NavListItem key={industry.title} title={industry.title} href={industry.href} />
                      ))}
                    </ul>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Case Studies */}
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/case-studies"
                  className={navigationMenuTriggerStyle() + " text-sm text-[#b5c8e2] hover:text-white bg-transparent hover:bg-[rgba(30,111,217,0.12)] rounded-lg px-3 py-2 transition-all"}
                >
                  Case Studies
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* About Us */}
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/about-us"
                  className={navigationMenuTriggerStyle() + " text-sm text-[#b5c8e2] hover:text-white bg-transparent hover:bg-[rgba(30,111,217,0.12)] rounded-lg px-3 py-2 transition-all"}
                >
                  About Us
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* Insights */}
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className="text-sm text-[#b5c8e2] hover:text-white bg-transparent hover:bg-[rgba(30,111,217,0.12)] data-[state=open]:bg-[rgba(30,111,217,0.12)] data-[state=open]:text-white transition-all rounded-lg px-3 py-2"
                >
                  Insights
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div
                    className="animate-slide-down rounded-xl overflow-hidden shadow-2xl"
                    style={{
                      background: "rgba(13, 31, 60, 0.97)",
                      border: "1px solid rgba(30, 111, 217, 0.25)",
                      backdropFilter: "blur(20px)",
                    }}
                  >
                    <ul className="w-52 gap-1 p-3">
                      {insights.map((insight) => (
                        <NavListItem key={insight.title} title={insight.title} href={insight.href} />
                      ))}
                    </ul>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Career */}
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className="text-sm text-[#b5c8e2] hover:text-white bg-transparent hover:bg-[rgba(30,111,217,0.12)] data-[state=open]:bg-[rgba(30,111,217,0.12)] data-[state=open]:text-white transition-all rounded-lg px-3 py-2"
                >
                  Career
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div
                    className="animate-slide-down rounded-xl overflow-hidden shadow-2xl"
                    style={{
                      background: "rgba(13, 31, 60, 0.97)",
                      border: "1px solid rgba(30, 111, 217, 0.25)",
                      backdropFilter: "blur(20px)",
                    }}
                  >
                    <ul className="w-52 gap-1 p-3">
                      {careers.map((career) => (
                        <NavListItem key={career.title} title={career.title} href={career.href} />
                      ))}
                    </ul>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* CTA / Admin */}
          <div className="hidden lg:block">
            {showAdminLogout ? (
              <button
                type="button"
                onClick={handleAdminLogout}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-lg transition-all"
                style={{
                  background: "linear-gradient(135deg, #1e6fd9, #1559b4)",
                  boxShadow: "0 0 16px rgba(30,111,217,0.35)",
                }}
              >
                <LogOut className="h-4 w-4" />
                Log out
              </button>
            ) : (
              <Link
                href="/contact-us"
                className="btn-primary text-sm"
              >
                Contact Us
                <ChevronRight className="h-4 w-4" />
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#b5c8e2] hover:text-white transition-colors rounded-lg hover:bg-[rgba(30,111,217,0.15)]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div
            className="lg:hidden border-t py-4 animate-slide-down"
            style={{ borderColor: "rgba(30, 111, 217, 0.2)" }}
          >
            <nav className="flex flex-col space-y-1">
              <MobileDropdown label="Services">
                {services.map((s) => (
                  <Link
                    key={s.title}
                    href={s.href}
                    className="block py-2 text-sm text-[#8fa4c4] hover:text-[#6ba8ff] transition-colors"
                  >
                    {s.title}
                  </Link>
                ))}
              </MobileDropdown>

              <MobileDropdown label="Industries">
                {industries.map((i) => (
                  <Link
                    key={i.title}
                    href={i.href}
                    className="block py-2 text-sm text-[#8fa4c4] hover:text-[#6ba8ff] transition-colors"
                  >
                    {i.title}
                  </Link>
                ))}
              </MobileDropdown>

              <Link href="/case-studies" className="py-2 text-sm text-[#b5c8e2] hover:text-white transition-colors">
                Case Studies
              </Link>
              <Link href="/about-us" className="py-2 text-sm text-[#b5c8e2] hover:text-white transition-colors">
                About Us
              </Link>

              <MobileDropdown label="Insights">
                {insights.map((i) => (
                  <Link key={i.title} href={i.href} className="block py-2 text-sm text-[#8fa4c4] hover:text-[#6ba8ff] transition-colors">
                    {i.title}
                  </Link>
                ))}
              </MobileDropdown>

              <MobileDropdown label="Career">
                {careers.map((c) => (
                  <Link key={c.title} href={c.href} className="block py-2 text-sm text-[#8fa4c4] hover:text-[#6ba8ff] transition-colors">
                    {c.title}
                  </Link>
                ))}
              </MobileDropdown>

              <div className="pt-3">
                {showAdminLogout ? (
                  <button
                    type="button"
                    onClick={handleAdminLogout}
                    className="inline-flex items-center justify-center gap-2 w-full py-2.5 text-sm font-semibold text-white rounded-lg transition-all"
                    style={{ background: "linear-gradient(135deg, #1e6fd9, #1559b4)" }}
                  >
                    <LogOut className="h-4 w-4" />
                    Log out
                  </button>
                ) : (
                  <Link
                    href="/contact-us"
                    className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-semibold text-white rounded-lg transition-all"
                    style={{ background: "linear-gradient(135deg, #1e6fd9, #1559b4)" }}
                  >
                    Contact Us
                  </Link>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

const NavListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { title: string; href: string }
>(({ title, href, ...props }, ref) => (
  <li>
    <NavigationMenuLink asChild className="flex flex-row items-center gap-3 p-2.5 rounded-lg bg-transparent text-[#b5c8e2] hover:text-white transition-colors duration-200 hover:bg-[rgba(30,111,217,0.15)]">
      <Link
        ref={ref}
        href={href}
        prefetch={false}
        className="group flex w-full select-none items-center gap-3 no-underline outline-none"
        {...props}
      >
        <div
          className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors bg-[#3b88f5]/40 group-hover:bg-[#3b88f5]"
        />
        <span className="text-sm font-semibold leading-tight transition-colors">
          {title}
        </span>
      </Link>
    </NavigationMenuLink>
  </li>
));
NavListItem.displayName = "NavListItem";

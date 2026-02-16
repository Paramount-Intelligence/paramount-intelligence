"use client";

// MobileDropdown component for collapsible mobile menu sections
import * as React from "react";
type MobileDropdownProps = {
  label: React.ReactNode;
  children: React.ReactNode;
};

function MobileDropdown(props: MobileDropdownProps) {
  const { label, children } = props;
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <button
        type="button"
        className="w-full flex items-center justify-between text-sm text-gray-700 hover:text-gray-900 font-medium py-1 px-0 focus:outline-none"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span>{label}</span>
        <svg
          className={`w-4 h-4 ml-2 transition-transform ${open ? "rotate-90" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
      {open && <div className="pl-2 pb-2">{children}</div>}
    </div>
  );
}

import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const services = [
  {
    title: "AI Solutions and Engineering",
    href: "/services/ai-solutions-and-engineering",
  },
  {
    title: "AI Strategy and Consulting",
    href: "/services/ai-strategy-and-consulting",
  },
  {
    title: "Data and Analytics",
    href: "/services/data-and-analytics",
  },
  {
    title: "Cloud Services",
    href: "/services/cloud-services",
  },
  {
    title: "AI Workflow Automation",
    href: "/services/ai-workflow-automation",
  },
  // {
  //   title: "LLMOps service",
  //   href: "/services/llm-ops-service",
  // },
  // {
  //   title: "Automation",
  //   href: "#",
  // },
  // {
  //   title: "Web Scraping",
  //   href: "#",
  // },
];

const industries = [
  {
    title: "Technology & Enterprise Software",
    href: "/industries/technology-and-enterprise-software",
  },
  {
    title: "Manufacturing, Industrial & Energy",
    href: "/industries/manufacturing-industrial-and-energy",
  },
  {
    title: "Telecommunications",
    href: "/industries/telecommunications",
  },
  {
    title: "Fintech & Digital Payments",
    href: "/industries/fintech-and-digital-payments",
  },
  {
    title: "B2B Enterprise Solutions",
    href: "/industries/b2b-enterprise-solutions",
  },
  {
    title: "Digital Lifestyle & Entertainment",
    href: "/industries/digital-lifestyle-and-entertainment",
  },
  {
    title: "Mobility, Ride-Hailing & Delivery",
    href: "/industries/mobility-ride-hailing-and-delivery",
  },
  {
    title: "E-commerce & Marketplaces",
    href: "/industries/e-commerce-and-marketplaces",
  },
];

const insights = [
  {
    title: "Blog",
    href: "https://automate-with-ai.beehiiv.com/",
  },
];

const careers = [
  {
    title: "Open Positions",
    href: "/careers/open-positions",
  },
  // {
  //   title: "Life at PI",
  //   href: "/careers/life-at-pi",
  // },
  // {
  //   title: "Apply Now",
  //   href: "/careers/apply-now",
  // },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="max-w-350 mx-auto px-8 lg:px-12 xl:px-16">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          >
            <Image
              src="/images/logo.png"
              alt="Paramount Intelligence"
              width={32}
              height={32}
              className="rounded"
            />
            <span className="text-xl font-bold text-gray-900 hidden sm:block">
              Paramount Intelligence
            </span>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex" viewport={false}>
            <NavigationMenuList>
              {/* Services */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm text-gray-900 bg-white hover:bg-gray-50">
                  Services
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-gray-300">
                  <ul className="grid w-100 text-gray-900 gap-3 p-4 md:w-125 md:grid-cols-2 lg:w-150">
                    {services.map((service) => (
                      <ListItem
                        key={service.title}
                        title={service.title}
                        href={service.href}
                      ></ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Industries */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm text-gray-900 bg-white hover:bg-gray-50">
                  Industries
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-gray-300">
                  <ul className="grid w-100 text-gray-900 gap-3 p-4 md:w-125 md:grid-cols-2 lg:w-150">
                    {industries.map((industry) => (
                      <ListItem
                        key={industry.title}
                        title={industry.title}
                        href={industry.href}
                      ></ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Case Studies */}
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/case-studies"
                  className={
                    navigationMenuTriggerStyle() +
                    " text-sm text-gray-900 bg-white hover:bg-gray-50"
                  }
                >
                  Case studies
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* About Us */}
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/about-us"
                  className={
                    navigationMenuTriggerStyle() +
                    " text-sm text-gray-900 bg-white hover:bg-gray-50"
                  }
                >
                  About us
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* Insights */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm text-gray-900 bg-white hover:bg-gray-50">
                  Insights
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-gray-300">
                  <ul className="grid text-gray-900 w-75 gap-3 p-4">
                    {insights.map((insight) => (
                      <ListItem
                        key={insight.title}
                        title={insight.title}
                        href={insight.href}
                      ></ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Career */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm text-gray-900 bg-white hover:bg-gray-50">
                  Career
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-gray-300">
                  <ul className="grid text-gray-900 w-75 gap-3 p-4">
                    {careers.map((career) => (
                      <ListItem
                        key={career.title}
                        title={career.title}
                        href={career.href}
                      ></ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Contact Button */}
          <div className="hidden lg:block">
            <Link
              href="/contact-us"
              className="bg-black text-white px-6 py-2.5 text-sm font-medium hover:bg-gray-800 transition-all"
            >
              Contact us
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-700 hover:text-gray-900"
            aria-label="Toggle menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 py-4">
            <nav className="flex flex-col space-y-2">
              {/* Services Dropdown */}
              <MobileDropdown label="Services">
                {services.map((service) => (
                  <Link
                    key={service.title}
                    href={service.href}
                    className="block pl-4 py-1 text-sm text-gray-700 hover:text-gray-900"
                  >
                    {service.title}
                  </Link>
                ))}
              </MobileDropdown>

              {/* Industries Dropdown */}
              <MobileDropdown label="Industries">
                {industries.map((industry) => (
                  <Link
                    key={industry.title}
                    href={industry.href}
                    className="block pl-4 py-1 text-sm text-gray-700 hover:text-gray-900"
                  >
                    {industry.title}
                  </Link>
                ))}
              </MobileDropdown>

              <Link
                href="/case-studies"
                className="text-sm text-gray-700 hover:text-gray-900 py-1"
              >
                Case studies
              </Link>
              <Link
                href="/about-us"
                className="text-sm text-gray-700 hover:text-gray-900 py-1"
              >
                About us
              </Link>
              <MobileDropdown label="Insights">
                {insights.map((insight) => (
                  <Link
                    key={insight.title}
                    href={insight.href}
                    className="block pl-4 py-1 text-sm text-gray-700 hover:text-gray-900"
                  >
                    {insight.title}
                  </Link>
                ))}
              </MobileDropdown>
              <MobileDropdown label="Career">
                {careers.map((career) => (
                  <Link
                    key={career.title}
                    href={career.href}
                    className="block pl-4 py-1 text-sm text-gray-700 hover:text-gray-900"
                  >
                    {career.title}
                  </Link>
                ))}
              </MobileDropdown>
              <Link
                href="/contact-us"
                className="bg-black text-white px-6 py-2.5 text-sm font-medium rounded-md hover:bg-gray-800 transition-all text-center mt-2"
              >
                Contact us
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { title: string; href: string }
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          href={href}
          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-50 hover:text-gray-900 focus:bg-gray-50 focus:text-gray-900"
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-gray-500">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

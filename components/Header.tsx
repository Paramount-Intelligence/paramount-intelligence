"use client";

import * as React from "react";
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
    title: "LLM software: Custom Large Language Model",
    href: "/services/custom-llm-based-software",
  },
  {
    title: "RAG Advanced Engineering",
    href: "/services/agentic-ai",
  },
  {
    title: "LangChain Development",
    href: "/services/automation",
  },
  {
    title: "AI Consulting & Advisory",
    href: "/services/integration",
  },
  {
    title: "LLM Application Development",
    href: "/services/integration",
  },
  {
    title: "LLMOps service",
    href: "/services/integration",
  },
  {
    title: "Automation",
    href: "/services/integration",
  },
  {
    title: "Web Scraping",
    href: "/services/integration",
  },
];

const industries = [
  {
    title: "AI Consulting & Automation",
    href: "/industries/finance",
  },
  {
    title: "Manufacturing & Industrial",
    href: "/industries/manufacturing-industrial",
  },
  {
    title: "Technology & Enterprise Software",
    href: "/industries/technology-enterprise-software",
  },
  {
    title: "Telecommunications",
    href: "/industries/telecommunications",
  },
  {
    title: "Fintech & Digital Payments",
    href: "/industries/fintech-digital-payments",
  },
  {
    title: "B2B Enterprise Solutions",
    href: "/industries/b2b-enterprise-solutions",
  },
  {
    title: "Digital Lifestyle & Entertainment",
    href: "/industries/digital-lifestyle-entertainment",
  },
  {
    title: "Mobility, Ride-Hailing & Delivery",
    href: "/industries/mobility-ride-hailing-delivery",
  },
  {
    title: "E-commerce & Marketplaces",
    href: "/industries/e-commerce-marketplaces",
  },
  {
    title: "Drilling, Engineering & Energy Services",
    href: "/industries/drilling-engineering-energy-services",
  },
];

const insights = [
  {
    title: "Blog",
    href: "/blog",
  },
  {
    title: "Case Studies",
    href: "/case-studies",
  },
  {
    title: "Whitepapers",
    href: "/whitepapers",
  },
];

const careers = [
  {
    title: "Open Positions",
    href: "/careers/positions",
  },
  {
    title: "Life at PI",
    href: "/careers/culture",
  },
  {
    title: "Apply Now",
    href: "/careers/apply",
  },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="max-w-350 mx-auto px-8 lg:px-12 xl:px-16">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          >
            <Image
              src="/images/logo.jpeg"
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
          <NavigationMenu className="hidden lg:flex">
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
            <nav className="flex flex-col space-y-4">
              <Link
                href="/services"
                className="text-sm text-gray-700 hover:text-gray-900"
              >
                Services
              </Link>
              <Link
                href="/industries"
                className="text-sm text-gray-700 hover:text-gray-900"
              >
                Industries
              </Link>
              <Link
                href="/case-studies"
                className="text-sm text-gray-700 hover:text-gray-900"
              >
                Case studies
              </Link>
              <Link
                href="/about-us"
                className="text-sm text-gray-700 hover:text-gray-900"
              >
                About us
              </Link>
              <Link
                href="/insights"
                className="text-sm text-gray-700 hover:text-gray-900"
              >
                Insights
              </Link>
              <Link
                href="/careers"
                className="text-sm text-gray-700 hover:text-gray-900"
              >
                Career
              </Link>
              <Link
                href="/contact-us"
                className="bg-black text-white px-6 py-2.5 text-sm font-medium rounded-md hover:bg-gray-800 transition-all text-center"
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

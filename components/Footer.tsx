import Link from "next/link";
import Brand from "@/components/site/Brand";
import CopyEmail from "@/components/site/CopyEmail";
import Icon from "@/components/site/Icon";
import { CONTACT_EMAIL, INDUSTRIES, LINKEDIN_URL, ROUTES, SERVICES } from "@/lib/site-nav";

const COMPANY = [
  { label: "About Us", href: ROUTES.about },
  { label: "Case Studies", href: ROUTES.caseStudies },
  { label: "Careers", href: ROUTES.careers },
  { label: "Contact Us", href: ROUTES.contact },
];

export default function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div>
          <Brand />
          <p>AI engineering &amp; consulting for better products, less manual work, and systems organizations can rely on.</p>
        </div>
        {[
          { title: "Services", links: SERVICES },
          { title: "Industries", links: INDUSTRIES },
          { title: "Company", links: COMPANY },
        ].map((col) => (
          <div key={col.title}>
            <h4>{col.title}</h4>
            <ul>
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <h4>Contact</h4>
          <CopyEmail email={CONTACT_EMAIL} />
          <a className="li" href={LINKEDIN_URL} target="_blank" rel="noopener">
            <Icon name="in" />
            LinkedIn
          </a>
        </div>
        <div className="legal">
          <span>© 2026 Paramount Intelligence. All rights reserved.</span>
          <span>AI moves fast. We make it work.</span>
        </div>
      </div>
    </footer>
  );
}

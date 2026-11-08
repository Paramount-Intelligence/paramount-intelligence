import Link from "next/link";
import Brand from "@/components/site/Brand";
import CopyEmail from "@/components/site/CopyEmail";
import Icon from "@/components/site/Icon";
import { CONTACT_EMAIL, FOOTER_TAGLINE, INDUSTRIES, LINKEDIN_URL, ROUTES, SERVICES } from "@/lib/site-nav";

// The footer's Services column also links to the Paramount FDE Network section of /services (v37 artifact).
const FOOTER_SERVICES = [...SERVICES, { label: "Paramount FDE Network", href: `${ROUTES.services}#fde-network` }];

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
          <p>{FOOTER_TAGLINE}</p>
        </div>
        {[
          { title: "Services", links: FOOTER_SERVICES },
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
          <span>
            © 2026 Paramount Intelligence. All rights reserved. · <Link href={ROUTES.privacyPolicy}>Privacy Policy</Link>
          </span>
          <span>AI moves fast. We make it work.</span>
        </div>
      </div>
    </footer>
  );
}

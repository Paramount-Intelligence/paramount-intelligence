import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsletterHeader from "@/components/newsletter/Header";
import NewsletterHero from "@/components/newsletter/Hero";
import NewsletterBenefits from "@/components/newsletter/Benefits";
import SubscriptionForm from "@/components/newsletter/SubscriptionForm";
import PastIssues from "@/components/newsletter/PastIssues";
import Testimonials from "@/components/newsletter/Testimonials";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "The AI Intelligence Newsletter | Paramount Intelligence",
  description:
    "Get the latest AI trends, case studies, and actionable insights delivered to your inbox every week.",
  path: "/newsletter",
});

export default function NewsletterPage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      <NewsletterHeader />
      <NewsletterHero />
      <NewsletterBenefits />
      <div id="subscribe">
        <SubscriptionForm />
      </div>
      <PastIssues />
      <Testimonials />
      <Footer />
    </div>
  );
}

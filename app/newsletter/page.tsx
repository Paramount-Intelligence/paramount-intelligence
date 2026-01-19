import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsletterHeader from "@/components/newsletter/Header";
import NewsletterHero from "@/components/newsletter/Hero";
import NewsletterBenefits from "@/components/newsletter/Benefits";
import SubscriptionForm from "@/components/newsletter/SubscriptionForm";
import PastIssues from "@/components/newsletter/PastIssues";
import Testimonials from "@/components/newsletter/Testimonials";

export default function NewsletterPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
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

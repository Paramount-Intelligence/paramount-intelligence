import Header from "@/components/Header";
import IndustriesHeader from "@/components/industries/Header";
import IndustriesHero from "@/components/industries/Hero";
import TrustedBrands from "@/components/TrustedBrands";
import LLMServices from "@/components/AIServices";
import WhyChooseUs from "@/components/services/WhyChooseUs";
import CTASection from "@/components/services/CTASection";
import LatestArticles from "@/components/LatestArticles";
import Footer from "@/components/Footer";

export default function Services() {
  return (
    <div className="min-h-screen text-white overflow-x-hidden bg-white">
      <Header />
      <IndustriesHeader />
      <IndustriesHero />
      <TrustedBrands />
      <LLMServices />
      <WhyChooseUs />
      <CTASection />
      {/* <LatestArticles /> */}
      <Footer />
    </div>
  );
}

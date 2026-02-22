import Header from "@/components/Header";
import IndustriesHeader from "@/components/industries/Header";
import IndustriesHero from "@/components/industries/Hero";
import TrustedBrands from "@/components/TrustedBrands";
import IndustriesServices from "@/components/industries/IndustriesServices";
import WhyChooseUs from "@/components/industries/WhyChooseUs";
import CTASection from "@/components/industries/CTASection";
import Footer from "@/components/Footer";

export default function Services() {
  return (
    <div className="min-h-screen text-white overflow-x-hidden bg-white">
      <Header />
      {/* <IndustriesHeader /> */}
      <IndustriesHero />
      <TrustedBrands />
      <IndustriesServices />
      <WhyChooseUs />
      <CTASection />
      <Footer />
    </div>
  );
}

import Header from "@/components/Header";
import WhoWeServe from "@/components/industries/telecom/WhoWeServe";
import ProjectExperience from "@/components/industries/telecom/ProjectExperience";
import Footer from "@/components/Footer";
import TelecomHeader from "@/components/industries/telecom/Header";
import TelecomHero from "@/components/industries/telecom/Hero";
import TrustedBrands from "@/components/TrustedBrands";
import WhyChooseUs from "@/components/industries/telecom/WhyChooseUs";
import SoftwareProducts from "@/components/industries/telecom/SoftwareProducts";
import LLMServicesSection from "@/components/industries/telecom/LLMServicesSection";
import AddAICapabilities from "@/components/industries/telecom/AddAICapabilities";

export default function Home() {
  return (
    <div className="min-h-screen text-white overflow-x-hidden bg-white">
      <Header />
      <TelecomHeader />
      <TelecomHero />
      <SoftwareProducts />
      <TrustedBrands />
      <AddAICapabilities />
      <ProjectExperience />
      <LLMServicesSection />
      <WhoWeServe />
      <WhyChooseUs />
      <Footer />
    </div>
  );
}

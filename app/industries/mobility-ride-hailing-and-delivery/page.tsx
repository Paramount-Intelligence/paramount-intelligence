import Header from "@/components/Header";
import WhoWeServe from "@/components/industries/mobility/WhoWeServe";
import ProjectExperience from "@/components/industries/mobility/ProjectExperience";
import Footer from "@/components/Footer";
import MobilityHeader from "@/components/industries/mobility/Header";
import MobilityHero from "@/components/industries/mobility/Hero";
import TrustedBrands from "@/components/TrustedBrands";
import WhyChooseUs from "@/components/industries/mobility/WhyChooseUs";
import SoftwareProducts from "@/components/industries/mobility/SoftwareProducts";
import LLMServicesSection from "@/components/industries/mobility/LLMServicesSection";
import AddAICapabilities from "@/components/industries/mobility/AddAICapabilities";

export default function Home() {
  return (
    <div className="min-h-screen text-white overflow-x-hidden bg-white">
      <Header />
      <MobilityHeader />
      <MobilityHero />
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

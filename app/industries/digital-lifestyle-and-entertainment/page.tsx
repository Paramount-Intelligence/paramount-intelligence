import Header from "@/components/Header";
import WhoWeServe from "@/components/industries/lifestyle/WhoWeServe";
import ProjectExperience from "@/components/industries/lifestyle/ProjectExperience";
import Footer from "@/components/Footer";
import LifestyleHeader from "@/components/industries/lifestyle/Header";
import LifestyleHero from "@/components/industries/lifestyle/Hero";
import TrustedBrands from "@/components/TrustedBrands";
import WhyChooseUs from "@/components/industries/lifestyle/WhyChooseUs";
import SoftwareProducts from "@/components/industries/lifestyle/SoftwareProducts";
import LLMServicesSection from "@/components/industries/lifestyle/LLMServicesSection";
import AddAICapabilities from "@/components/industries/lifestyle/AddAICapabilities";

export default function Home() {
  return (
    <div className="min-h-screen text-white overflow-x-hidden bg-white">
      <Header />
      <LifestyleHeader />
      <LifestyleHero />
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

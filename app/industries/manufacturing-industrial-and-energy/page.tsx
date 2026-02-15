import Header from "@/components/Header";
import WhoWeServe from "@/components/industries/energy/WhoWeServe";
import ProjectExperience from "@/components/industries/energy/ProjectExperience";
import Footer from "@/components/Footer";
import EnergyHeader from "@/components/industries/energy/Header";
import EnergyHero from "@/components/industries/energy/Hero";
import TrustedBrands from "@/components/TrustedBrands";
import WhyChooseUs from "@/components/industries/energy/WhyChooseUs";
import SoftwareProducts from "@/components/industries/energy/SoftwareProducts";
import AIServices from "@/components/AIServices";
import AddAICapabilities from "@/components/industries/energy/AddAICapabilities";

export default function Home() {
  return (
    <div className="min-h-screen text-white overflow-x-hidden bg-white">
      <Header />
      <EnergyHeader />
      <EnergyHero />
      <SoftwareProducts />
      <TrustedBrands />
      <AddAICapabilities />
      <ProjectExperience />
      <AIServices />
      <WhoWeServe />
      <WhyChooseUs />
      <Footer />
    </div>
  );
}

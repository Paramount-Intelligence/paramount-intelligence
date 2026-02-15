import Header from "@/components/Header";
import WhoWeServe from "@/components/industries/fintech/WhoWeServe";
import ProjectExperience from "@/components/industries/fintech/ProjectExperience";
import Footer from "@/components/Footer";
import FintechHeader from "@/components/industries/fintech/Header";
import FintechHero from "@/components/industries/fintech/Hero";
import TrustedBrands from "@/components/TrustedBrands";
import WhyChooseUs from "@/components/industries/fintech/WhyChooseUs";
import SoftwareProducts from "@/components/industries/fintech/SoftwareProducts";
import AIServices from "@/components/AIServices";
import AddAICapabilities from "@/components/industries/fintech/AddAICapabilities";

export default function Home() {
  return (
    <div className="min-h-screen text-white overflow-x-hidden bg-white">
      <Header />
      <FintechHeader />
      <FintechHero />
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

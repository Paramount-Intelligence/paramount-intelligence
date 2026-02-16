import Header from "@/components/Header";
import WhoWeServe from "@/components/industries/tech/WhoWeServe";
import ProjectExperience from "@/components/industries/tech/ProjectExperience";
import Footer from "@/components/Footer";
import TechHeader from "@/components/industries/tech/Header";
import TechHero from "@/components/industries/tech/Hero";
import TrustedBrands from "@/components/TrustedBrands";
import WhyChooseUs from "@/components/industries/WhyChooseUs";
import SoftwareProducts from "@/components/industries/tech/SoftwareProducts";
import AIServices from "@/components/AIServices";
import AddAICapabilities from "@/components/industries/tech/AddAICapabilities";

export default function Home() {
  return (
    <div className="min-h-screen text-white overflow-x-hidden bg-white">
      <Header />
      {/* <TechHeader /> */}
      <TechHero />
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

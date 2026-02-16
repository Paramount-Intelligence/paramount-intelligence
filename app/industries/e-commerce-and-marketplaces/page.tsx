import Header from "@/components/Header";
import WhoWeServe from "@/components/industries/commerce/WhoWeServe";
import ProjectExperience from "@/components/industries/commerce/ProjectExperience";
import Footer from "@/components/Footer";
import CommerceHeader from "@/components/industries/commerce/Header";
import CommerceHero from "@/components/industries/commerce/Hero";
import TrustedBrands from "@/components/TrustedBrands";
import WhyChooseUs from "@/components/industries/WhyChooseUs";
import SoftwareProducts from "@/components/industries/commerce/SoftwareProducts";
import AIServices from "@/components/AIServices";
import AddAICapabilities from "@/components/industries/commerce/AddAICapabilities";

export default function Home() {
  return (
    <div className="min-h-screen text-white overflow-x-hidden bg-white">
      <Header />
      {/* <CommerceHeader /> */}
      <CommerceHero />
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

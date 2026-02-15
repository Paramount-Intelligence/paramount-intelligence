import Header from "@/components/Header";
import WhoWeServe from "@/components/industries/b2b/WhoWeServe";
import ProjectExperience from "@/components/industries/b2b/ProjectExperience";
import Footer from "@/components/Footer";
import B2bHeader from "@/components/industries/b2b/Header";
import B2bHero from "@/components/industries/b2b/Hero";
import TrustedBrands from "@/components/TrustedBrands";
import WhyChooseUs from "@/components/industries/b2b/WhyChooseUs";
import SoftwareProducts from "@/components/industries/b2b/SoftwareProducts";
import AIServices from "@/components/AIServices";
import AddAICapabilities from "@/components/industries/b2b/AddAICapabilities";

export default function Home() {
  return (
    <div className="min-h-screen text-white overflow-x-hidden bg-white">
      <Header />
      <B2bHeader />
      <B2bHero />
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

import Header from "@/components/Header";
import WhoWeServe from "@/components/services/WhoWeServe";
import ProjectExperience from "@/components/services/studio/ProjectExperience";
import Footer from "@/components/Footer";
import LLMHero from "@/components/services/studio/Hero";
import WhyGenerativeAI from "@/components/services/studio/WhyGenerativeAI";
import LLMServicesSection from "@/components/services/studio/LLMServicesSection";
import TrustedBrands from "@/components/TrustedBrands";
import WhyChooseUs from "@/components/services/WhyChooseUs";

export default function Home() {
  return (
    <div className="min-h-screen text-white overflow-x-hidden bg-white">
      <Header />
      {/* <LLMHeader /> */}
      <LLMHero />
      <WhyGenerativeAI />
      <LLMServicesSection />
      <WhoWeServe />
      <TrustedBrands />
      {/* <ScheduleCTA /> */}
      <WhyChooseUs />
      <ProjectExperience />
      {/* <LatestArticles /> */}
      <Footer />
    </div>
  );
}

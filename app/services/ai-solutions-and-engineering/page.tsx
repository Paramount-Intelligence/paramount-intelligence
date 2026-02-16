import Header from "@/components/Header";
import WhoWeServe from "@/components/services/WhoWeServe";
import ProjectExperience from "@/components/services/llm/ProjectExperience";
import LatestArticles from "@/components/LatestArticles";
import Footer from "@/components/Footer";

import LLMHero from "@/components/services/llm/Hero";
import WhyGenerativeAI from "@/components/services/llm/WhyGenerativeAI";
import LLMServicesSection from "@/components/services/llm/LLMServicesSection";
import ScheduleCTA from "@/components/services/llm/ScheduleCTA";
import TrustedBrands from "@/components/TrustedBrands";
import WhyChooseUs from "@/components/services/WhyChooseUs";

export default function Home() {
  return (
    <div className="min-h-screen text-white overflow-x-hidden bg-white">
      <Header />
      
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

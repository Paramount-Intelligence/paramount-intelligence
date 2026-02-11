import Header from "@/components/Header";
import WhoWeServe from "@/components/services/ai/WhoWeServe";
import ProjectExperience from "@/components/services/ai/ProjectExperience";
import LatestArticles from "@/components/LatestArticles";
import Footer from "@/components/Footer";
import LLMHeader from "@/components/services/ai/Header";
import LLMHero from "@/components/services/ai/Hero";
import WhyGenerativeAI from "@/components/services/ai/WhyGenerativeAI";
import LLMServicesSection from "@/components/services/ai/LLMServicesSection";
import ScheduleCTA from "@/components/services/ai/ScheduleCTA";
import TrustedBrands from "@/components/TrustedBrands";
import WhyChooseUs from "@/components/services/ai/WhyChooseUs";

export default function Home() {
  return (
    <div className="min-h-screen text-white overflow-x-hidden bg-white">
      <Header />
      <LLMHeader />
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

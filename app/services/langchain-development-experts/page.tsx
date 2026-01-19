import Header from "@/components/Header";
import WhoWeServe from "@/components/services/langchain/WhoWeServe";
import ProjectExperience from "@/components/ProjectExperience";
import LatestArticles from "@/components/LatestArticles";
import Footer from "@/components/Footer";
import LLMHeader from "@/components/services/langchain/Header";
import LLMHero from "@/components/services/langchain/Hero";
import WhyGenerativeAI from "@/components/services/langchain/WhyGenerativeAI";
import LLMServicesSection from "@/components/services/langchain/LLMServicesSection";
import ScheduleCTA from "@/components/services/langchain/ScheduleCTA";
import TrustedBrands from "@/components/services/langchain/TrustedBrands";
import WhyChooseUs from "@/components/services/langchain/WhyChooseUs";

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
      <ScheduleCTA />
      <WhyChooseUs />
      <ProjectExperience />
      {/* <LatestArticles /> */}
      <Footer />
    </div>
  );
}

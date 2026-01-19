import Header from "@/components/Header";
import WhoWeServe from "@/components/services/rag/WhoWeServe";
import ProjectExperience from "@/components/ProjectExperience";
import LatestArticles from "@/components/LatestArticles";
import Footer from "@/components/Footer";
import LLMHeader from "@/components/services/rag/Header";
import LLMHero from "@/components/services/rag/Hero";
import WhyGenerativeAI from "@/components/services/rag/WhyGenerativeAI";
import LLMServicesSection from "@/components/services/rag/LLMServicesSection";
import ScheduleCTA from "@/components/services/rag/ScheduleCTA";
import TrustedBrands from "@/components/services/rag/TrustedBrands";
import WhyChooseUs from "@/components/services/rag/WhyChooseUs";

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

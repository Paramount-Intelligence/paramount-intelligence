import Header from "@/components/Header";
import WhoWeServe from "@/components/services/ops/WhoWeServe";
import ProjectExperience from "@/components/ProjectExperience";
import LatestArticles from "@/components/LatestArticles";
import Footer from "@/components/Footer";
import LLMHeader from "@/components/services/ops/Header";
import LLMHero from "@/components/services/ops/Hero";
import WhyGenerativeAI from "@/components/services/ops/WhyGenerativeAI";
import LLMServicesSection from "@/components/services/ops/LLMServicesSection";
import ScheduleCTA from "@/components/services/ops/ScheduleCTA";
import TrustedBrands from "@/components/services/ops/TrustedBrands";
import WhyChooseUs from "@/components/services/ops/WhyChooseUs";

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

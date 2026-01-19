import Header from "@/components/Header";
import WhoWeServe from "@/components/services/models/WhoWeServe";
import ProjectExperience from "@/components/ProjectExperience";
import LatestArticles from "@/components/LatestArticles";
import Footer from "@/components/Footer";
import LLMHeader from "@/components/services/models/Header";
import LLMHero from "@/components/services/models/Hero";
import WhyGenerativeAI from "@/components/services/models/WhyGenerativeAI";
import LLMServicesSection from "@/components/services/models/LLMServicesSection";
import ScheduleCTA from "@/components/services/models/ScheduleCTA";
import TrustedBrands from "@/components/services/models/TrustedBrands";
import WhyChooseUs from "@/components/services/models/WhyChooseUs";

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

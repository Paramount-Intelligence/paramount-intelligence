import Header from "@/components/Header";
import WhoWeServe from "@/components/industries/tech/WhoWeServe";
import ProjectExperience from "@/components/industries/tech/ProjectExperience";
import LatestArticles from "@/components/LatestArticles";
import Footer from "@/components/Footer";
import TechHeader from "@/components/industries/tech/Header";
import TechHero from "@/components/industries/tech/Hero";
import WhyGenerativeAI from "@/components/industries/tech/WhyGenerativeAI";
import techindustriesSection from "@/components/industries/tech/techindustriesSection";
import ScheduleCTA from "@/components/industries/tech/ScheduleCTA";
import TrustedBrands from "@/components/TrustedBrands";
import WhyChooseUs from "@/components/industries/tech/WhyChooseUs";

export default function Home() {
  return (
    <div className="min-h-screen text-white overflow-x-hidden bg-white">
      <Header />
      <TechHeader />
      <TechHero />
      <WhyGenerativeAI />
      <techindustriesSection />
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

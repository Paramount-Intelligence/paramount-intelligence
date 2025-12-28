import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustedBrands from "@/components/TrustedBrands";
import MissionStatement from "@/components/MissionStatement";
import WhoWeServe from "@/components/WhoWeServe";
import ServicesSection from "@/components/ServicesSection";
import AIServices from "@/components/AIServices";
import FeaturedIn from "@/components/FeaturedIn";
import ProjectExperience from "@/components/ProjectExperience";
import LatestArticles from "@/components/LatestArticles";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen text-white overflow-x-hidden bg-white">
      <Header />
      <Hero />
      <TrustedBrands />
      <MissionStatement />
      <WhoWeServe />
      <ServicesSection />
      <AIServices />
      <FeaturedIn />
      <ProjectExperience />
      <LatestArticles />
      <Footer />
    </div>
  );
}

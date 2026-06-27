import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustedBrands from "@/components/TrustedBrands";
import MissionStatement from "@/components/MissionStatement";
import WhoWeServe from "@/components/WhoWeServe";
import ServicesSection from "@/components/ServicesSection";
import AIServices from "@/components/AIServices";
import FeaturedIn from "@/components/FeaturedIn";
import ProjectExperience from "@/components/ProjectExperience";
import Footer from "@/components/Footer";
import ScrollRevealInit from "@/components/ui/ScrollRevealInit";

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <ScrollRevealInit />
      <Header />
      <Hero />
      <TrustedBrands />
      <MissionStatement />
      <WhoWeServe />
      <ServicesSection />
      <AIServices />
      <FeaturedIn />
      <ProjectExperience />
      <Footer />
    </div>
  );
}

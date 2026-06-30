import Header from "@/components/Header";
import AboutHero from "@/components/about/Hero";
import Footer from "@/components/Footer";
import CompanyIntro from "@/components/about/CompanyIntro";
import Mission from "@/components/about/Mission";
import Approach from "@/components/about/Approach";
import Values from "@/components/about/Values";
import ClientSuccess from "@/components/about/ClientSuccess";

export default function Services() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />

      <AboutHero />
      <CompanyIntro />
      <Values />
      <Mission />
      {/* <Approach /> */}
      <ClientSuccess />
      <Footer />
    </div>
  );
}

import Header from "@/components/Header";
import AboutHeader from "@/components/about/Header";
import AboutHero from "@/components/about/Hero";
import Footer from "@/components/Footer";
import CompanyIntro from "@/components/about/CompanyIntro";
import Mission from "@/components/about/Mission";
import Approach from "@/components/about/Approach";
import Values from "@/components/about/Values";
import ClientSuccess from "@/components/about/ClientSuccess";

export default function Services() {
  return (
    <div className="min-h-screen text-white overflow-x-hidden bg-white">
      <Header />
      <AboutHeader />
      <AboutHero />
      <CompanyIntro />
      <Mission />
      <Values />
      <Approach />
      <ClientSuccess />
      <Footer />
    </div>
  );
}

import Header from "@/components/Header";
import WhoWeServe from "@/components/industries/energy/WhoWeServe";
import ProjectExperience from "@/components/industries/energy/ProjectExperience";
import Footer from "@/components/Footer";
import EnergyHeader from "@/components/industries/energy/Header";
import EnergyHero from "@/components/industries/energy/Hero";
import TrustedBrands from "@/components/TrustedBrands";
import WhyChooseUs from "@/components/industries/WhyChooseUs";
import SoftwareProducts from "@/components/industries/energy/SoftwareProducts";
import AddAICapabilities from "@/components/industries/energy/AddAICapabilities";
import IndustriesServices from "@/components/industries/IndustriesServices";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Manufacturing, Industrial & Energy | Paramount Intelligence",
  description:
    "Industrial operations depend on tightly controlled systems to maintain efficiency, safety, and reliability. We help organizations engineer them to operate intelligently at scale.",
  path: "/industries/manufacturing-industrial-and-energy",
});

export default function Home() {
  return (
    <div className="min-h-screen text-white overflow-x-hidden bg-white">
      <Header />
      {/* <EnergyHeader /> */}
      <EnergyHero />
      <SoftwareProducts />
      <TrustedBrands />
      <AddAICapabilities />
      <ProjectExperience />
      <IndustriesServices />
      <WhoWeServe />
      <WhyChooseUs />
      <Footer />
    </div>
  );
}

import Header from "@/components/Header";
import WhoWeServe from "@/components/industries/telecom/WhoWeServe";
import ProjectExperience from "@/components/industries/telecom/ProjectExperience";
import Footer from "@/components/Footer";
import TelecomHeader from "@/components/industries/telecom/Header";
import TelecomHero from "@/components/industries/telecom/Hero";
import TrustedBrands from "@/components/TrustedBrands";
import WhyChooseUs from "@/components/industries/WhyChooseUs";
import SoftwareProducts from "@/components/industries/telecom/SoftwareProducts";
import IndustriesServices from "@/components/industries/IndustriesServices";
import AddAICapabilities from "@/components/industries/telecom/AddAICapabilities";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Telecommunications | Paramount Intelligence",
  description:
    "Telecommunication networks are becoming software-defined and data-driven. We help operators engineer them to perform in real time at scale.",
  path: "/industries/telecommunications",
});

export default function Home() {
  return (
    <div className="min-h-screen text-white overflow-x-hidden bg-white">
      <Header />
      {/* <TelecomHeader /> */}
      <TelecomHero />
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

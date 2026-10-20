import Header from "@/components/Header";
import WhoWeServe from "@/components/industries/tech/WhoWeServe";
import ProjectExperience from "@/components/industries/tech/ProjectExperience";
import Footer from "@/components/Footer";
import TechHeader from "@/components/industries/tech/Header";
import TechHero from "@/components/industries/tech/Hero";
import TrustedBrands from "@/components/TrustedBrands";
import WhyChooseUs from "@/components/industries/WhyChooseUs";
import SoftwareProducts from "@/components/industries/tech/SoftwareProducts";
import IndustriesServices from "@/components/industries/IndustriesServices";
import AddAICapabilities from "@/components/industries/tech/AddAICapabilities";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Technology & Enterprise Software | Paramount Intelligence",
  description:
    "Technology and enterprise software platforms are evolving into intelligent systems. We help organizations engineer them for scale and reliability.",
  path: "/industries/technology-and-enterprise-software",
});

export default function Home() {
  return (
    <div className="min-h-screen text-white overflow-x-hidden bg-white">
      <Header />
      {/* <TechHeader /> */}
      <TechHero />
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

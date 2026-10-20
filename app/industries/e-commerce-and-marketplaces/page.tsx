import Header from "@/components/Header";
import WhoWeServe from "@/components/industries/commerce/WhoWeServe";
import ProjectExperience from "@/components/industries/commerce/ProjectExperience";
import Footer from "@/components/Footer";
import CommerceHeader from "@/components/industries/commerce/Header";
import CommerceHero from "@/components/industries/commerce/Hero";
import TrustedBrands from "@/components/TrustedBrands";
import WhyChooseUs from "@/components/industries/WhyChooseUs";
import SoftwareProducts from "@/components/industries/commerce/SoftwareProducts";
import AddAICapabilities from "@/components/industries/commerce/AddAICapabilities";
import IndustriesServices from "@/components/industries/IndustriesServices";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "E-commerce & Marketplaces | Paramount Intelligence",
  description:
    "Marketplaces depend on systems that optimize discovery, pricing, and operations in real time. We help organizations engineer them to scale reliably.",
  path: "/industries/e-commerce-and-marketplaces",
});

export default function Home() {
  return (
    <div className="min-h-screen text-white overflow-x-hidden bg-white">
      <Header />
      {/* <CommerceHeader /> */}
      <CommerceHero />
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

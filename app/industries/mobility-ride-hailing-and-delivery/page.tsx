import Header from "@/components/Header";
import WhoWeServe from "@/components/industries/mobility/WhoWeServe";
import ProjectExperience from "@/components/industries/mobility/ProjectExperience";
import Footer from "@/components/Footer";
import MobilityHeader from "@/components/industries/mobility/Header";
import MobilityHero from "@/components/industries/mobility/Hero";
import TrustedBrands from "@/components/TrustedBrands";
import WhyChooseUs from "@/components/industries/WhyChooseUs";
import SoftwareProducts from "@/components/industries/mobility/SoftwareProducts";
import AddAICapabilities from "@/components/industries/mobility/AddAICapabilities";
import IndustriesServices from "@/components/industries/IndustriesServices";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Mobility, Ride-Hailing & Delivery | Paramount Intelligence",
  description:
    "Mobility platforms depend on real-time systems to balance demand, supply, and operations. We help organizations engineer them to perform reliably at scale.",
  path: "/industries/mobility-ride-hailing-and-delivery",
});

export default function Home() {
  return (
    <div className="min-h-screen text-white overflow-x-hidden bg-white">
      <Header />
      {/* <MobilityHeader /> */}
      <MobilityHero />
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

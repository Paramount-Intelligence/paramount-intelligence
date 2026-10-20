import Header from "@/components/Header";
import WhoWeServe from "@/components/industries/lifestyle/WhoWeServe";
import ProjectExperience from "@/components/industries/lifestyle/ProjectExperience";
import Footer from "@/components/Footer";
import LifestyleHeader from "@/components/industries/lifestyle/Header";
import LifestyleHero from "@/components/industries/lifestyle/Hero";
import TrustedBrands from "@/components/TrustedBrands";
import WhyChooseUs from "@/components/industries/WhyChooseUs";
import SoftwareProducts from "@/components/industries/lifestyle/SoftwareProducts";
import AddAICapabilities from "@/components/industries/lifestyle/AddAICapabilities";
import IndustriesServices from "@/components/industries/IndustriesServices";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Digital Lifestyle & Entertainment | Paramount Intelligence",
  description:
    "Digital experiences depend on systems that personalize engagement at scale. We help organizations engineer them to perform reliably under constant demand.",
  path: "/industries/digital-lifestyle-and-entertainment",
});

export default function Home() {
  return (
    <div className="min-h-screen text-white overflow-x-hidden bg-white">
      <Header />
      {/* <LifestyleHeader /> */}
      <LifestyleHero />
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

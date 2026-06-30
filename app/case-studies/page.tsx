import Header from "@/components/Header";
import CaseStudiesHeader from "@/components/casestudies/Header";
import Footer from "@/components/Footer";
import CaseStudiesClient from "./CaseStudiesClient";

export default function CaseStudies() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      <CaseStudiesHeader />
      <CaseStudiesClient />
      <Footer />
    </div>
  );
}

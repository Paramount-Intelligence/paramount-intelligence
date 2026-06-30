import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CaseStudiesClient from "./CaseStudiesClient";

export default function CaseStudies() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      <CaseStudiesClient />
      <Footer />
    </div>
  );
}

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OpenPositionsHeader from "@/components/careers/open-positions/Header";
import OpenPositionsHero from "@/components/careers/open-positions/Hero";
import JobListings from "@/components/careers/open-positions/JobListings";
import Benefits from "@/components/careers/open-positions/Benefits";

export default function OpenPositionsPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <Header />
      <OpenPositionsHeader />
      <OpenPositionsHero />
      <JobListings />
      <Benefits />
      <Footer />
    </div>
  );
}

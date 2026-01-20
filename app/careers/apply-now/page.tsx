import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ApplyNowHeader from "@/components/careers/apply-now/Header";
import ApplyNowHero from "@/components/careers/apply-now/Hero";
import ApplicationForm from "@/components/careers/apply-now/ApplicationForm";
import HiringProcess from "@/components/careers/apply-now/HiringProcess";

export default function ApplyNowPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <Header />
      <ApplyNowHeader />
      <ApplyNowHero />
      <ApplicationForm />
      <HiringProcess />
      <Footer />
    </div>
  );
}

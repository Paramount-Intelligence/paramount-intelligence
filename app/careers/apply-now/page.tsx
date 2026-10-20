import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ApplyNowHeader from "@/components/careers/apply-now/Header";
import ApplyNowHero from "@/components/careers/apply-now/Hero";
import ApplicationForm from "@/components/careers/apply-now/ApplicationForm";
import HiringProcess from "@/components/careers/apply-now/HiringProcess";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Apply Now | Careers | Paramount Intelligence",
  description:
    "Take the next step toward building production-grade technology systems that power real businesses.",
  path: "/careers/apply-now",
});

export default function ApplyNowPage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      <ApplyNowHeader />
      <ApplyNowHero />
      <ApplicationForm />
      <HiringProcess />
      <Footer />
    </div>
  );
}

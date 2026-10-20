import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LifeAtPIHeader from "@/components/careers/life-at-pi/Header";
import LifeAtPIHero from "@/components/careers/life-at-pi/Hero";
import Culture from "@/components/careers/life-at-pi/Culture";
import TeamLife from "@/components/careers/life-at-pi/TeamLife";
import Testimonials from "@/components/careers/life-at-pi/Testimonials";
import JoinCTA from "@/components/careers/life-at-pi/JoinCTA";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Life at Paramount Intelligence | Careers",
  description:
    "More than just a workplace — it's a community of innovators, thinkers, and problem-solvers shaping the future of AI together.",
  path: "/careers/life-at-pi",
});

export default function LifeAtPIPage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      <LifeAtPIHeader />
      <LifeAtPIHero />
      <Culture />
      <TeamLife />
      <Testimonials />
      <JoinCTA />
      <Footer />
    </div>
  );
}

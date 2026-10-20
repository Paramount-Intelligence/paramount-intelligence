import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CandidatesHero from "@/components/candidates/Hero";
import CandidatesContent from "@/components/candidates/Content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "For Candidates | Join Paramount Intelligence",
  description:
    "Join a community of innovators at Paramount Intelligence. Work on cutting-edge AI projects, grow your career, and make a real impact from day one.",
  path: "/for-candidates",
});

export default function ForCandidates() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      <CandidatesHero />
      <CandidatesContent />
      <Footer />
    </div>
  );
}

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PrivacyHero from "@/components/privacy/Hero";
import PrivacyContent from "@/components/privacy/Content";

export const metadata = {
  title: "Privacy Policy | Paramount Intelligence",
  description:
    "Learn how Paramount Intelligence collects, uses, and protects your personal data. Our commitment to your privacy and data protection.",
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <Header />
      <PrivacyHero />
      <PrivacyContent />
      <Footer />
    </div>
  );
}

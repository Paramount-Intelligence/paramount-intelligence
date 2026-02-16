import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FAQHero from "@/components/faq/Hero";
import FAQContent from "@/components/faq/Content";

export const metadata = {
  title: "FAQ | Paramount Intelligence",
  description:
    "Find answers to frequently asked questions about joining Paramount Intelligence, our culture, projects, and career opportunities.",
};

export default function FAQ() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <Header />
      <FAQHero />
      <FAQContent />
      <Footer />
    </div>
  );
}

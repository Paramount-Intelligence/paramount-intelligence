import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactHero from "@/components/contact/Hero";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";


export default function ContactUs() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <Header />
      {/* <ContactHeader /> */}
      <ContactHero />
      <ContactForm />
      <ContactInfo />
      <Footer />
    </div>
  );
}

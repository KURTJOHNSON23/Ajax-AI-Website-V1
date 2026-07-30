import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import VoiceAI from "@/components/VoiceAI";
import HowItWorks from "@/components/HowItWorks";
import ROICalculator from "@/components/ROICalculator";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <VoiceAI />
        <HowItWorks />
        <ROICalculator />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}

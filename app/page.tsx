import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Automations from "@/components/Automations";
import VoiceAI from "@/components/VoiceAI";
import HowItWorks from "@/components/HowItWorks";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Automations />
        <VoiceAI />
        <HowItWorks />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}

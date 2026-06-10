import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VoiceDemo from "@/components/VoiceDemo";

export const metadata: Metadata = {
  title: "Live Voice AI Demo — Ajax AI Solutions",
  description:
    "Hear our AI receptionist in action. Call the demo and experience how Ajax AI handles real customer bookings for a plumbing business.",
};

export default function DemoPage() {
  return (
    <main className="min-h-screen bg-[#0A0F1C] text-white">
      <Navbar />
      <VoiceDemo />
      <Footer />
    </main>
  );
}

import Cursor from "@/components/Cursor";
import ScrollProgress from "@/components/ScrollProgress";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import Modules from "@/components/Modules";
import Deployments from "@/components/Deployments";
import AskAI from "@/components/AskAI";
import TrainingLog from "@/components/TrainingLog";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Certificates from "@/components/Certificates";
import CvDownload from "@/components/CvDownload";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Cursor />
      <Header />

            <main>
        <Hero />
        <Ticker />
        <Modules />
        <Deployments />
        <AskAI />
        <TrainingLog />
        <Certificates />
        <CvDownload />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
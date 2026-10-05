import Cursor from "@/components/Cursor";
import ScrollProgress from "@/components/ScrollProgress";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import Modules from "@/components/Modules";
import Deployments from "@/components/Deployments";

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

        {/* TEMPORARY placeholders. We replace each one in the next steps. */}
        <section id="ask" className="min-h-screen pt-[100px]">
          <div className="wrap"><p className="lb">ask ai</p></div>
        </section>
        <section id="log" className="min-h-screen pt-[100px]">
          <div className="wrap"><p className="lb">training log</p></div>
        </section>
        <section id="contact" className="min-h-screen pt-[100px]">
          <div className="wrap"><p className="lb">contact</p></div>
        </section>
      </main>
    </>
  );
}
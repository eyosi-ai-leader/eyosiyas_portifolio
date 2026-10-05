import Cursor from "@/components/Cursor";
import ScrollProgress from "@/components/ScrollProgress";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Cursor />
      <Header />

      <main>
        <Hero />
        <Ticker />

        {/* TEMPORARY placeholders so the nav links work. We replace each one in the next steps. */}
        <section id="modules" className="min-h-screen pt-[100px]">
          <div className="wrap"><p className="lb">modules</p></div>
        </section>
        <section id="work" className="min-h-screen pt-[100px]">
          <div className="wrap"><p className="lb">deployments</p></div>
        </section>
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
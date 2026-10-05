import Cursor from "@/components/Cursor";
import ScrollProgress from "@/components/ScrollProgress";
import Reveal from "@/components/Reveal";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Cursor />

      <main>
        <section className="grid min-h-screen place-items-center">
          <div className="text-center">
            <p className="lb justify-center">TEST PAGE</p>
            <h1 className="font-display text-4xl font-bold text-cy">
              Steps 3 to 6 check
            </h1>
            <p className="mt-4 text-mu">
              Move your mouse, then scroll down.{" "}
              <a href="#next" className="text-or" data-cur="OPEN">
                hover me
              </a>
            </p>
            <p className="mt-2 text-xs text-mu">
              cursor: <span id="cx">0000, 0000</span>
            </p>
          </div>
        </section>

        <section id="next" className="min-h-screen pt-24">
          <div className="wrap">
            <p className="lb">TEST SECTION</p>
            <Reveal as="h2" scramble className="font-display sec-title">
              Four systems, one engineer
            </Reveal>
            <Reveal as="p" className="mb-8 text-mu">
              I fade in when you scroll to me.
            </Reveal>
            <button className="dep-btn" data-cur="LOAD">
              <small>DEP-01</small>
              <b>Hover this button</b>
            </button>
          </div>
        </section>
      </main>
    </>
  );
}
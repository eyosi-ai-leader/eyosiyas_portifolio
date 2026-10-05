"use client";

import { useEffect, useRef } from "react";
import { useScramble } from "@/hooks/useScramble";

const NAME = "Eyosiyas Hailemichael";
const ROLES = [
  "AI-native software engineer",
  "full-stack developer",
  "database architect",
  "agent builder",
];

export default function Hero() {
  const nameRef = useRef(null);
  const roleRef = useRef(null);

  // name scrambles into place on load
  useScramble(nameRef, NAME, 1400);

  // typing / deleting role line
  useEffect(() => {
    let roleIndex = 0;
    let charCount = 0;
    let deleting = false;
    let timer;

    function tick() {
      const word = ROLES[roleIndex];
      charCount += deleting ? -1 : 1;
      if (roleRef.current) {
        roleRef.current.textContent = "> " + word.slice(0, charCount) + "_";
      }

      let delay = deleting ? 28 : 65;
      if (!deleting && charCount === word.length) {
        deleting = true;
        delay = 1500;
      } else if (deleting && charCount === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % ROLES.length;
        delay = 300;
      }
      timer = setTimeout(tick, delay);
    }

    tick();
    return () => clearTimeout(timer);
  }, []);

  return (
    // "nofx" shows the plain portrait. Remove it in Step 16 when three.js is added.
    <section id="home" className="hero nofx">
      {/* Step 16: <PortraitCanvas /> goes here */}

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="hero-fb" src="/portrait.jpg" alt="Eyosiyas Hailemichael" />

      <span className="br br-tl" />
      <span className="br br-tr" />
      <span className="br br-bl" />
      <span className="br br-br" />

      <div className="wrap relative z-[2] flex h-full flex-col justify-center pt-[60px]">
        <div className="inline-flex w-max items-center gap-[10px] border border-ln bg-[rgba(4,12,20,0.6)] px-3 py-[7px] text-[11px] text-cy backdrop-blur-[6px]">
          <span>●</span>SYSTEM ONLINE · AI-NATIVE SOFTWARE ENGINEER
        </div>

        <h1
          ref={nameRef}
          className="mt-[22px] mb-4 max-w-[12ch] font-display text-[length:clamp(28px,5.4vw,80px)] leading-[1.04] font-bold tracking-[-0.03em]"
        >
          {NAME}
        </h1>

        <div ref={roleRef} className="mb-[10px] h-6 text-[15px] text-or" />

        <p className="mb-7 max-w-[48ch] leading-[1.8] text-mu">
          I design and build full-stack products with intelligence built in:
          interfaces, APIs, data, and AI agents that solve real problems.
        </p>

        <div className="flex flex-wrap gap-3">
          <a className="btn btn-p" data-cur="OPEN" href="#work">
            View deployments
          </a>
          <a className="btn" data-cur="ASK" href="#ask">
            Ask my AI
          </a>
        </div>
      </div>

      <div className="tel absolute inset-x-[30px] bottom-[22px] z-[3] flex flex-wrap justify-between gap-[14px] text-[11px] text-mu">
        <span>SCAN <b id="sn">000</b>%</span>
        <span>POINTS <b id="pt">0</b></span>
        <span>CURSOR <b id="cx">0000, 0000</b></span>
        <span>FPS <b id="fp">60</b></span>
      </div>
    </section>
  );
}
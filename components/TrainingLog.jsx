"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/Reveal";

const EPOCHS = [
  {
    label: "epoch 1",
    title: "BSc Information Systems",
    text: "Arsi University. Very Great Distinction, CGPA 3.76/4.00, exit exam 79. Graduating 2026.",
  },
  {
    label: "epoch 2",
    title: "Certified Full-Stack Developer",
    text: "Responsive web apps, REST APIs, and database-driven systems.",
  },
  {
    label: "epoch 3",
    title: "AI-assisted systems",
    text: "An AI-powered garage platform with a chatbot, plus a church management system.",
  },
  {
    label: "epoch 4",
    title: "Community platforms",
    text: "The Arsi Technology Club platform for events, registrations, and announcements.",
  },
];

export default function TrainingLog() {
  const epRefs = useRef([]);
  const [lit, setLit] = useState(EPOCHS.map(() => false));

  // light up each epoch once it passes 70% of the screen height
  useEffect(() => {
    function onScroll() {
      const next = EPOCHS.map((_, i) => {
        const el = epRefs.current[i];
        return !!el && el.getBoundingClientRect().top < window.innerHeight * 0.7;
      });
      setLit((prev) => (prev.every((v, i) => v === next[i]) ? prev : next));
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="log" className="pt-[100px] pb-5">
      <div className="wrap">
        <Reveal className="lb">training log</Reveal>
        <Reveal as="h2" scramble className="font-display sec-title">
          Loss goes down. Skill goes up.
        </Reveal>

        <div className="grid grid-cols-2 items-center gap-10 max-[980px]:grid-cols-1">
          {/* the loss curve draws itself when this block is revealed */}
          <Reveal className="cv">
                        <svg viewBox="0 0 400 240">
              <path d="M10 206C60 196 80 106 140 76C200 46 260 36 390 20" />
              <text x="10" y="232">epoch 1</text>
              <text x="330" y="232">epoch 4</text>
              <text x="10" y="12">skill</text>
            </svg>
          </Reveal>

          <div>
            {EPOCHS.map((epoch, i) => (
              <div
                key={epoch.label}
                ref={(el) => {
                  epRefs.current[i] = el;
                }}
                className={`ep ${lit[i] ? "on" : ""}`}
              >
                <small>{epoch.label}</small>
                <h4 className="font-display">{epoch.title}</h4>
                <p>{epoch.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
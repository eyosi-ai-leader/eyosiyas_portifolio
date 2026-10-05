"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/Reveal";
import {
  knowledge,
  fallbackAnswer,
  greeting,
  suggestionChips,
} from "@/data/knowledge";

// five mouth bars with random heights, used while the AI is "speaking"
const randomBars = () => [0, 1, 2, 3, 4].map(() => 6 + Math.random() * 14);

/* ---------- the robot face: eyes follow the mouse, blinks, talking mouth ---------- */

function RobotFace({ bars }) {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    // pupils follow the mouse
    function onMove(e) {
      svg.querySelectorAll(".eye").forEach((g) => {
        const r = g.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const angle = Math.atan2(e.clientY - cy, e.clientX - cx);
        const dist = Math.min(10, Math.hypot(e.clientX - cx, e.clientY - cy) / 20);
        const pupil = g.querySelector(".pp");
        if (pupil) {
          pupil.style.transform =
            "translate(" + Math.cos(angle) * dist + "px," + Math.sin(angle) * dist + "px)";
        }
      });
    }

    // blink every 3.6 seconds
    const blink = setInterval(() => {
      svg.querySelectorAll(".lid").forEach((lid) =>
        lid.animate(
          [
            { transform: "scaleY(1)" },
            { transform: "scaleY(.1)" },
            { transform: "scaleY(1)" },
          ],
          { duration: 220 }
        )
      );
    }, 3600);

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      clearInterval(blink);
    };
  }, []);

  const lid = { transformBox: "fill-box", transformOrigin: "center" };
  const pupil = { transition: "transform .12s" };

  return (
    <div className="grid place-items-center border border-ln bg-pn p-[26px]">
      <svg
        ref={svgRef}
        viewBox="0 0 240 220"
        fill="none"
        stroke="var(--cy)"
        strokeWidth="1.5"
        className="w-[min(320px,100%)]"
      >
        <path d="M120 10V34" />
        <circle cx="120" cy="8" r="5" fill="var(--or)" stroke="none" />
        <rect x="22" y="34" width="196" height="150" rx="34" fill="var(--bg2)" />
        <rect x="8" y="86" width="12" height="44" rx="5" />
        <rect x="220" y="86" width="12" height="44" rx="5" />

        <g className="eye">
          <rect className="lid" style={lid} x="52" y="68" width="50" height="50" rx="14" />
          <circle className="pp" style={pupil} cx="77" cy="93" r="13" fill="var(--cy)" stroke="none" />
        </g>
        <g className="eye">
          <rect className="lid" style={lid} x="138" y="68" width="50" height="50" rx="14" />
          <circle className="pp" style={pupil} cx="163" cy="93" r="13" fill="var(--cy)" stroke="none" />
        </g>

        {/* mouth: a flat line when quiet, five moving bars when speaking */}
        <g fill="var(--cy)" stroke="none">
          {bars ? (
            bars.map((h, i) => (
              <rect key={i} x={90 + i * 14} y="150" width="8" height={h} rx="2" />
            ))
          ) : (
            <rect x="96" y="156" width="48" height="4" rx="2" />
          )}
        </g>
      </svg>
    </div>
  );
}

/* ---------- the whole section ---------- */

export default function AskAI() {
  const [messages, setMessages] = useState([{ role: "a", text: greeting }]);
  const [pending, setPending] = useState(null); // answer being typed, or null
  const [bars, setBars] = useState(null); // mouth shape
  const [value, setValue] = useState("");

  const busy = useRef(false);
  const timer = useRef(null);
  const msgsRef = useRef(null);
  const inputRef = useRef(null);

  // ask a question: show it, wait 450ms, then type the answer 2 letters every 16ms
  function say(question) {
    if (busy.current || !question.trim()) return;
    busy.current = true;

    setMessages((m) => [...m, { role: "u", text: question }]);
    setPending("");

    const hit = knowledge.find((k) => k.pattern.test(question.toLowerCase()));
    const answer = hit ? hit.answer : fallbackAnswer;

    let i = 0;
    timer.current = setTimeout(function step() {
      i += 2;
      setPending(answer.slice(0, i));
      setBars(randomBars());

      if (i < answer.length) {
        timer.current = setTimeout(step, 16);
      } else {
        setMessages((m) => [...m, { role: "a", text: answer }]);
        setPending(null);
        setBars(null);
        busy.current = false;
      }
    }, 450);
  }

  function onSubmit(e) {
    e.preventDefault();
    say(value);
    setValue("");
  }

  // keep the newest message in view
  useEffect(() => {
    const el = msgsRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, pending]);

  // stop timers if the component is removed
  useEffect(() => () => clearTimeout(timer.current), []);

  // press "/" anywhere to jump to the chat and focus the input
  useEffect(() => {
    let focusTimer;
    function onKey(e) {
      if (e.key === "/" && !/INPUT|TEXTAREA/.test(document.activeElement.tagName)) {
        e.preventDefault();
        document.getElementById("ask")?.scrollIntoView();
        focusTimer = setTimeout(
          () => inputRef.current?.focus({ preventScroll: true }),
          600
        );
      }
    }
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      clearTimeout(focusTimer);
    };
  }, []);

  return (
    <section id="ask" className="pt-[100px] pb-5">
      <div className="wrap">
        <Reveal className="lb">ask ai</Reveal>
        <Reveal as="h2" scramble className="font-display sec-title">
          Interview my portfolio.
        </Reveal>

        <Reveal className="grid grid-cols-[0.9fr_1.1fr] items-center gap-[30px] max-[980px]:grid-cols-1">
          <RobotFace bars={bars} />

          <div className="flex h-[430px] flex-col border border-ln bg-pn">
            <div className="border-b border-ln px-4 py-3 text-[11px] text-mu">
              EYOSIYAS-AI · answers come from my CV, pre-written
            </div>

            <div
              ref={msgsRef}
              className="flex-1 overflow-auto p-4 text-[13px] leading-[1.8]"
            >
              {messages.map((m, i) => (
                <div key={i} className={`msg ${m.role}`}>
                  {m.text}
                </div>
              ))}
              {pending !== null && (
                <div className="msg a">
                  {pending}
                  <span className="cr" />
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-2 px-4 pb-3">
              {suggestionChips.map((chip) => (
                <button
                  key={chip}
                  type="button"
                  className="chat-chip"
                  onClick={() => say(chip)}
                >
                  {chip}
                </button>
              ))}
            </div>

            <form className="flex border-t border-ln" onSubmit={onSubmit}>
              <input
                ref={inputRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Ask about my skills, projects, or availability..."
                autoComplete="off"
                aria-label="Ask a question"
                className="flex-1 bg-transparent px-4 py-[14px] text-tx outline-none placeholder:text-[#757575]"
              />
              <button className="bg-cy px-5 font-medium text-[#02121a]">send</button>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
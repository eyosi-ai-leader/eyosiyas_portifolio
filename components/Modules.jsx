"use client";

import Reveal from "@/components/Reveal";

/* ---------- the four animated SVGs ---------- */

function InterfaceSvg() {
  return (
    <svg viewBox="0 0 160 96">
      <rect x="8" y="6" width="144" height="84" rx="3" />
      <path d="M8 20H152" />
      <circle className="bl" cx="18" cy="13" r="2" />
      <circle className="bl" cx="26" cy="13" r="2" style={{ animationDelay: ".4s" }} />
      <rect className="wd" x="18" y="30" width="80" height="6" />
      <rect className="wd" x="18" y="44" width="110" height="6" style={{ animationDelay: ".5s" }} />
      <rect className="wd" x="18" y="58" width="60" height="6" style={{ animationDelay: "1s" }} />
      <path className="fl" d="M118 80l12-10" />
    </svg>
  );
}

function BackendSvg() {
  return (
    <svg viewBox="0 0 160 96">
      <g className="rg">
        <circle cx="52" cy="48" r="26" strokeDasharray="8 5.4" strokeWidth="10" />
        <circle cx="52" cy="48" r="15" />
      </g>
      <g className="rg r">
        <circle cx="112" cy="48" r="19" strokeDasharray="7 4.4" strokeWidth="9" style={{ stroke: "var(--or)" }} />
        <circle cx="112" cy="48" r="10" style={{ stroke: "var(--or)" }} />
      </g>
    </svg>
  );
}

function DataSvg() {
  return (
    <svg viewBox="0 0 160 96">
      <g>
        {[14, 40, 66].map((y, i) => (
          <g key={y}>
            <ellipse cx="60" cy={y} rx="40" ry="9" />
            <path d={`M20 ${y}v18a40 9 0 0 0 80 0V${y}`} />
            <circle className="bl" cx="96" cy={y + 14} r="2.4" style={{ animationDelay: `${i * 0.6}s` }} />
          </g>
        ))}
        <path className="fl" d="M108 20H150M108 46H140M108 72H150" />
      </g>
    </svg>
  );
}

// x position of each neural-network layer, and the y position of its nodes
const NN_LAYERS = [
  [20, [18, 48, 78]],
  [80, [10, 34, 58, 82]],
  [140, [30, 66]],
];

function IntelligenceSvg() {
  return (
    <svg viewBox="0 0 160 96">
      <g>
        {/* lines between neighbouring layers */}
        {[0, 1].flatMap((a) =>
          NN_LAYERS[a][1].flatMap((y1) =>
            NN_LAYERS[a + 1][1].map((y2) => (
              <path
                key={`${a}-${y1}-${y2}`}
                className="fl"
                style={{ strokeOpacity: 0.7 }}
                d={`M${NN_LAYERS[a][0]} ${y1}L${NN_LAYERS[a + 1][0]} ${y2}`}
              />
            ))
          )
        )}
        {/* nodes */}
        {NN_LAYERS.flatMap(([x, ys]) =>
          ys.map((y) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="5" style={{ fill: "var(--bg2)" }} />
          ))
        )}
      </g>
    </svg>
  );
}

/* ---------- card content ---------- */

const MODULES = [
  {
    id: "MOD-01",
    title: "Interface",
    Svg: InterfaceSvg,
    text: "React and TypeScript interfaces that load fast, adapt to every screen, and make complex tools feel simple.",
  },
  {
    id: "MOD-02",
    title: "Backend",
    Svg: BackendSvg,
    text: "Node.js and Express APIs with JWT authentication, validation, and role-based access that scale cleanly.",
  },
  {
    id: "MOD-03",
    title: "Data",
    Svg: DataSvg,
    text: "MySQL and MongoDB models designed first: clean schemas, fast queries, and data that stays trustworthy.",
  },
  {
    id: "MOD-04",
    title: "Intelligence",
    Svg: IntelligenceSvg,
    text: "OpenAI-powered assistants and agents wired into real data, so features act on facts instead of guesses.",
  },
];

/* ---------- 3D tilt + cursor glow ---------- */

function tilt(e) {
  const card = e.currentTarget;
  const r = card.getBoundingClientRect();
  const x = e.clientX - r.left;
  const y = e.clientY - r.top;
  card.style.setProperty("--mx", x + "px");
  card.style.setProperty("--my", y + "px");
  card.style.transform =
    "perspective(800px) rotateX(" +
    (y / r.height - 0.5) * -8 +
    "deg) rotateY(" +
    (x / r.width - 0.5) * 8 +
    "deg)";
}

function untilt(e) {
  e.currentTarget.style.transform = "";
}

export default function Modules() {
  return (
    <section id="modules" className="pt-[100px] pb-5">
      <div className="wrap">
        <Reveal className="lb">modules</Reveal>
        <Reveal as="h2" scramble className="font-display sec-title">
          Four systems, one engineer.
        </Reveal>

        <div className="grid grid-cols-4 gap-4 max-[980px]:grid-cols-2 max-[560px]:grid-cols-1">
          {MODULES.map(({ id, title, Svg, text }) => (
            <Reveal key={id} className="mod" onMouseMove={tilt} onMouseLeave={untilt}>
              <small>{id}</small>
              <h3 className="font-display">{title}</h3>
              <Svg />
              <p>{text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
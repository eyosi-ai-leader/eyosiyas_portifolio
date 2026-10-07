"use client";

import { Fragment, useEffect, useState } from "react";
import Reveal from "@/components/Reveal";
import { projects } from "@/data/projects";

/* ---------- the flow diagram: boxes connected by dashed lines ---------- */

function Diagram({ nodes }) {
  const n = nodes.length;
  const X = (k) => 60 + k * (400 / Math.max(n - 1, 1));
  const Y = (k) => (k % 2 ? 135 : 80);

  return (
    <svg viewBox="0 0 520 210">
      {nodes.slice(0, -1).map((_, k) => (
        <path
          key={`edge-${k}`}
          className="ed"
          d={`M${X(k) + 46} ${Y(k)}L${X(k + 1) - 46} ${Y(k + 1)}`}
        />
      ))}
      {nodes.map((label, k) => (
        <g key={`${k}-${label}`} className="nd">
          <rect x={X(k) - 46} y={Y(k) - 20} width="92" height="40" rx="3" />
          <text x={X(k)} y={Y(k) + 4}>
            {label}
          </text>
        </g>
      ))}
    </svg>
  );
}

/* ---------- the right-hand panel for one project ---------- */

function ProjectView({ project }) {
  // how many "[ok]" log lines are visible (the first shows immediately)
  const [shown, setShown] = useState(1);

  useEffect(() => {
    const timers = project.logs
      .slice(1)
      .map((_, i) => setTimeout(() => setShown(i + 2), (i + 1) * 380));
    return () => timers.forEach(clearTimeout);
  }, [project]);

  return (
    <>
      <small className="text-[11.67px] text-or">
        {project.id} · status: {project.status}
      </small>
      <h3 className="font-display">{project.title}</h3>
      <p>{project.description}</p>

      <Diagram nodes={project.nodes} />

      <div className="dep-log">
        {project.logs.slice(0, shown).map((line, i) => (
          <Fragment key={i}>
            <b>[ok]</b> {line}
            {"\n"}
          </Fragment>
        ))}
      </div>

      <div className="dep-tags">
        {project.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>

      {/* the button only appears for projects that have a live url */}
      {project.url && (
        <a
          className="btn btn-p mt-[18px]"
          data-cur="VISIT"
          href={project.url}
          target="_blank"
          rel="noreferrer"
        >
          Visit live site ↗
        </a>
      )}
    </>
  );
}

/* ---------- the whole section ---------- */

export default function Deployments() {
  const [selected, setSelected] = useState(0);
  const project = projects[selected];

  return (
    <section id="work" className="pt-[100px] pb-5">
      <div className="wrap">
        <Reveal className="lb">deployments</Reveal>
        <Reveal as="h2" scramble className="font-display sec-title">
          {"Systems I've shipped."}
        </Reveal>

        <Reveal className="grid grid-cols-[320px_1fr] gap-5 max-[980px]:grid-cols-1">
          <div className="flex flex-col gap-[10px] max-[980px]:flex-row max-[980px]:overflow-auto">
            {projects.map((p, i) => (
              <button
                key={p.id}
                type="button"
                data-cur="LOAD"
                className={`dep-btn max-[980px]:min-w-[230px] ${i === selected ? "on" : ""}`}
                onClick={() => setSelected(i)}
                onMouseEnter={() => setSelected(i)}
              >
                <small>
                  {p.id}
                  {p.url ? " · live" : ""}
                </small>
                <b>{p.title}</b>
              </button>
            ))}
          </div>

          <div className="dep-view">
            {/* key makes React rebuild the panel, which restarts the log animation */}
            <ProjectView key={project.id} project={project} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
"use client";

import { useEffect, useRef } from "react";

export default function Cursor() {
  const ringRef = useRef(null);
  const dotRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    function onMove(e) {
      const x = e.clientX + "px";
      const y = e.clientY + "px";

      [ringRef, dotRef, labelRef].forEach((r) => {
        if (r.current) {
          r.current.style.left = x;
          r.current.style.top = y;
        }
      });

      // grow the ring over links, buttons, cards, or anything with data-cur="WORD"
      const target =
        e.target instanceof Element
          ? e.target.closest("[data-cur], a, button, .mod, .dep-btn")
          : null;

      ringRef.current?.classList.toggle("hov", !!target);
      if (labelRef.current) {
        labelRef.current.textContent = target ? target.dataset.cur || "" : "";
      }

      // live x/y readout in the hero telemetry (added in a later step)
      const readout = document.getElementById("cx");
      if (readout) {
        readout.textContent =
          String(e.clientX | 0).padStart(4, "0") +
          ", " +
          String(e.clientY | 0).padStart(4, "0");
      }
    }

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <>
      <div ref={ringRef} className="cur-ring" aria-hidden="true" />
      <div ref={dotRef} className="cur-dot" aria-hidden="true" />
      <div ref={labelRef} className="cur-label" aria-hidden="true" />
    </>
  );
}
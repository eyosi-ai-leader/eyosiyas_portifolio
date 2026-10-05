"use client";

import { useEffect } from "react";

const GLYPHS = "01<>/{}[]#$%&*";

// Reveals `text` inside `el` letter by letter, starting from random glyphs.
// Returns a function that cancels the animation.
export function scrambleText(el, text, ms = 1200, onDone) {
  if (!el) return () => {};

  const start = performance.now();
  let frame;
  let cancelled = false;

  function tick(now) {
    if (cancelled) return;
    const k = Math.min(Math.max((now - start) / ms, 0), 1);
    const revealed = Math.floor(k * text.length);

    el.textContent = text
      .split("")
      .map((char, i) =>
        i < revealed || char === " "
          ? char
          : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
      )
      .join("");

    if (k < 1) frame = requestAnimationFrame(tick);
    else if (onDone) onDone();
  }

  frame = requestAnimationFrame(tick);

  return () => {
    cancelled = true;
    cancelAnimationFrame(frame);
  };
}

// Hook version: scrambles `text` into the element when the component mounts.
export function useScramble(ref, text, ms = 1400) {
  useEffect(() => scrambleText(ref.current, text, ms), [ref, text, ms]);
}
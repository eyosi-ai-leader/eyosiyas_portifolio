"use client";

import { useEffect, useRef } from "react";
import { scrambleText } from "@/hooks/useScramble";

// <Reveal> fades its content in when it enters the screen.
// Add `scramble` to a text-only heading to also run the scramble effect once.
// Use `as` to choose the HTML tag: <Reveal as="h2" ...>
export default function Reveal({
  as: Tag = "div",
  scramble = false,
  className = "",
  children,
  ...rest
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          el.classList.add("in");
          if (scramble) scrambleText(el, el.textContent, 900);
          observer.unobserve(el);
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [scramble]);

  return (
    <Tag ref={ref} className={`rv ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
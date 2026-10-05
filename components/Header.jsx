"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { href: "#home", label: "system" },
  { href: "#modules", label: "modules" },
  { href: "#work", label: "deployments" },
  { href: "#ask", label: "ask ai" },
  { href: "#log", label: "training log" },
  { href: "#contact", label: "contact" },
];

export default function Header() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    // highlight the nav link of the section that is currently on screen
    function onScroll() {
      let current = "home";
      document.querySelectorAll("main section[id]").forEach((section) => {
        if (section.getBoundingClientRect().top < window.innerHeight * 0.45) {
          current = section.id;
        }
      });
      setActive(current);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-[env(safe-area-inset-top,0px)] z-50 flex items-center justify-between bg-[rgba(4,6,11,0.72)] px-[30px] py-4 text-[#e9f6ff] backdrop-blur-[10px]">
      <a
        href="#home"
        className="font-display text-[15px] font-bold tracking-[0.04em]"
      >
        <i className="not-italic text-[#4de1ff]">EH</i>
        {"//AI"}
      </a>

      <nav className="flex gap-[26px] text-[12px] max-[980px]:hidden">
        {LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={`[transition:.25s] hover:text-[#4de1ff] ${
              active === link.href.slice(1) ? "text-[#4de1ff]" : "text-[#8aa3b5]"
            }`}
          >
            {link.label}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-2 text-[11px] text-[#8aa3b5] max-[560px]:hidden">
        <i className="pulse-dot" />
        available for projects
      </div>
    </header>
  );
}
"use client";

import { useEffect, useRef, useState } from "react";
import {
  FaEnvelope,
  FaGithub,
  FaLinkedinIn,
  FaPhoneAlt,
  FaTelegramPlane,
} from "react-icons/fa";
import Reveal from "@/components/Reveal";
import { contact } from "@/data/contact";

const INTERESTS = [
  "Freelance Project",
  "Corporate Partnership",
  "Project Collaboration",
  "Startup Collaboration",
  "Technical Consultancy",
  "Other",
];

const labelCls =
  "mb-[6px] block text-[11px] uppercase tracking-[.14em] text-mu";

/* ---------- the "thank you" popup shown after the form is sent ---------- */

function ThankYouModal({ onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    // focus the button, close with the Escape key, and stop the page behind from scrolling
    closeRef.current?.focus();

    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[90] grid place-items-center bg-[rgba(2,6,12,0.72)] p-5 backdrop-blur-[6px]"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="thanks-title"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[440px] border border-cy bg-bg2 p-8 text-center shadow-[0_0_60px_color-mix(in_srgb,var(--cy)_25%,transparent)]"
      >
        <small className="text-[11.67px] text-or">MESSAGE · sent</small>

        <h3
          id="thanks-title"
          className="mt-[10px] mb-3 font-display text-[length:clamp(22px,3vw,30px)] leading-[1.15] font-bold"
        >
          Thank you!
        </h3>

        <p className="mb-6 leading-[1.8] text-mu">
          Your message has been sent. We will get in touch with you within 24
          hours.
        </p>

        <button
          ref={closeRef}
          type="button"
          data-cur="CLOSE"
          onClick={onClose}
          className="btn btn-p"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default function Contact() {
  const [status, setStatus] = useState("idle"); // idle | sending | error
  const [errorText, setErrorText] = useState("");
  const [thanks, setThanks] = useState(false); // show the popup?

  // sends the form to /api/contact, which emails it to you
  async function handleSubmit(e) {
    e.preventDefault();
    if (status === "sending") return;

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    setStatus("sending");
    setErrorText("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        form.reset();
        setStatus("idle");
        setThanks(true); // open the thank-you popup
        return;
      }

      setStatus("error");
      if (res.status === 429) {
        setErrorText("Too many messages. Please try again in a few minutes.");
      } else if (res.status === 400) {
        setErrorText("Please check the fields and try again.");
      } else {
        setErrorText(
          `Could not send right now. Please email me directly at ${contact.email}.`
        );
      }
    } catch {
      setStatus("error");
      setErrorText(
        `No connection. Please email me directly at ${contact.email}.`
      );
    }
  }

  const links = [
    {
      label: "email",
      value: contact.email,
      href: `mailto:${contact.email}`, // opens the visitor's email app in a new tab
      Icon: FaEnvelope,
      cur: "EMAIL",
      external: true,
    },
    {
      label: "phone",
      value: contact.phoneDisplay,
      href: `tel:${contact.phone}`,
      Icon: FaPhoneAlt,
      cur: "CALL",
    },
    {
      label: "telegram",
      value: `@${contact.telegram}`,
      href: `https://t.me/${contact.telegram}`,
      Icon: FaTelegramPlane,
      cur: "CHAT",
      external: true,
    },
    {
      label: "github",
      value: `github.com/${contact.github}`,
      href: `https://github.com/${contact.github}`,
      Icon: FaGithub,
      cur: "OPEN",
      external: true,
    },
    {
      label: "linkedin",
      value: contact.linkedin.replace(/^https?:\/\/(www\.)?/, ""),
      href: contact.linkedin,
      Icon: FaLinkedinIn,
      cur: "OPEN",
      external: true,
    },
  ];

  return (
    <>
      <section id="contact" className="pt-[110px] pb-10">
        <div className="wrap">
          <Reveal className="lb">contact</Reveal>
          <Reveal scramble className="font-display cta-big">
            {"Let's Build Together"}
          </Reveal>

          <Reveal className="grid grid-cols-2 gap-[30px] max-[980px]:grid-cols-1">
            <div>
              <p className="mb-[10px] leading-[1.8] text-mu">
                {"Ready to bring your ideas to life? Let's connect and make something amazing."}
              </p>

              <div className="flex flex-col gap-[10px]">
                {links.map(({ label, value, href, Icon, cur, external }) => (
                  <a
                    key={label}
                    href={href}
                    data-cur={cur}
                    {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                    className="dep-btn flex items-center gap-[14px]"
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center border border-ln text-[15px] text-cy">
                      <Icon />
                    </span>
                    <span className="min-w-0">
                      <small>{label}</small>
                      <b className="break-all">{value}</b>
                    </span>
                  </a>
                ))}
              </div>

              <p className="mt-[14px] text-[12px] text-mu">
                Addis Ababa, Ethiopia · replies within 24 hours. Your
                information will never be shared.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <label className={labelCls} htmlFor="c-name">
                Full Name *
              </label>
              <input
                id="c-name"
                name="name"
                required
                maxLength={100}
                autoComplete="name"
                className="fld placeholder:text-[#757575]"
                placeholder="Your full name"
              />

              <label className={labelCls} htmlFor="c-email">
                Email Address *
              </label>
              <input
                id="c-email"
                name="email"
                type="email"
                required
                maxLength={150}
                autoComplete="email"
                className="fld placeholder:text-[#757575]"
                placeholder="you@example.com"
              />

              <label className={labelCls} htmlFor="c-phone">
                Phone Number
              </label>
              <input
                id="c-phone"
                name="phone"
                type="tel"
                maxLength={40}
                autoComplete="tel"
                className="fld placeholder:text-[#757575]"
                placeholder="+251 ..."
              />

              <label className={labelCls} htmlFor="c-interest">
                {"I'm interested in *"}
              </label>
              <select
                id="c-interest"
                name="interest"
                required
                defaultValue=""
                className="fld"
              >
                <option value="" disabled className="bg-bg2 text-tx">
                  Select an option
                </option>
                {INTERESTS.map((item) => (
                  <option key={item} value={item} className="bg-bg2 text-tx">
                    {item}
                  </option>
                ))}
              </select>

              <label className={labelCls} htmlFor="c-subject">
                Subject *
              </label>
              <input
                id="c-subject"
                name="subject"
                required
                maxLength={150}
                className="fld placeholder:text-[#757575]"
                placeholder="What is this about?"
              />

              <label className={labelCls} htmlFor="c-message">
                Message *
              </label>
              <textarea
                id="c-message"
                name="message"
                required
                rows={4}
                maxLength={3000}
                className="fld resize placeholder:text-[#757575]"
                placeholder="What are we building?"
              />

              <button
                type="submit"
                disabled={status === "sending"}
                data-cur="SEND"
                className="btn border-cy bg-cy text-[#02121a] disabled:opacity-60"
              >
                {status === "sending" ? "Sending..." : "Send message"}
              </button>

              {status === "error" && (
                <p className="mt-[12px] text-[13px] text-or" role="alert">
                  {errorText}
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </section>

      {thanks && <ThankYouModal onClose={() => setThanks(false)} />}
    </>
  );
}
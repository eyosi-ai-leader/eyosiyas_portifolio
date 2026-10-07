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
import Toast from "@/components/Toast";
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

export default function Contact() {
  const [toast, setToast] = useState({ show: false, text: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [errorText, setErrorText] = useState("");
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  function showToast(text) {
    setToast({ show: true, text });
    clearTimeout(timer.current);
    timer.current = setTimeout(
      () => setToast((t) => ({ ...t, show: false })),
      1800
    );
  }

  // clicking the email copies it and shows "Email copied"
  function copyEmail(e) {
    e.preventDefault();
    navigator.clipboard?.writeText(contact.email).catch(() => {});
    showToast("Email copied");
  }

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
        setStatus("sent");
        showToast("Message sent");
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
      href: "#",
      Icon: FaEnvelope,
      cur: "COPY",
      onClick: copyEmail,
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
                {links.map(({ label, value, href, Icon, cur, onClick, external }) => (
                  <a
                    key={label}
                    href={href}
                    onClick={onClick}
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

              {status === "sent" && (
                <p className="mt-[12px] text-[13px] text-cy" role="status">
                  Thank you! Your message was sent. I will reply soon.
                </p>
              )}
              {status === "error" && (
                <p className="mt-[12px] text-[13px] text-or" role="alert">
                  {errorText}
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </section>

      <Toast show={toast.show}>{toast.text}</Toast>
    </>
  );
}
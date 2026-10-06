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

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  // clicking the email copies it and shows "Email copied" for 1.8 seconds
  function copyEmail(e) {
    e.preventDefault();
    navigator.clipboard?.writeText(contact.email).catch(() => {});
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1800);
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
            {"Let's deploy something."}
          </Reveal>

          <Reveal className="grid grid-cols-2 gap-[30px] max-[980px]:grid-cols-1">
            <div>
              <p className="mb-[18px] leading-[1.8] text-mu">
                Open to projects, collaborations, and full-time roles.
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
                Ethiopia · replies within 24 hours. Your information will never be shared.
              </p>
            </div>

            <div>
              <input className="fld placeholder:text-[#757575]" placeholder="Your name" />
              <input className="fld placeholder:text-[#757575]" placeholder="Your email" />
              <textarea
                className="fld resize placeholder:text-[#757575]"
                rows={3}
                placeholder="What are we building?"
              />
              <a
                className="btn border-cy bg-cy text-[#02121a]"
                data-cur="SEND"
                href={`mailto:${contact.email}`}
              >
                Send message
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <Toast show={copied}>Email copied</Toast>
    </>
  );
}
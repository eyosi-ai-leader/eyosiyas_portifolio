"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/Reveal";
import Toast from "@/components/Toast";

const EMAIL = "eyosi4314@gmail.com";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  // clicking the email copies it and shows "Email copied" for 1.8 seconds
  function copyEmail(e) {
    e.preventDefault();
    navigator.clipboard?.writeText(EMAIL).catch(() => {});
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1800);
  }

  return (
    <>
      <section id="contact" className="pt-[110px] pb-10">
        <div className="wrap">
          <Reveal className="lb">contact</Reveal>
          <Reveal scramble className="font-display cta-big">
            {"Let's deploy something."}
          </Reveal>

          <Reveal className="grid grid-cols-2 gap-[30px] max-[980px]:grid-cols-1">
            <div className="leading-[2.2] text-mu">
              Open to projects, collaborations, and full-time roles.
              <br />
              <a
                href="#"
                data-cur="COPY"
                onClick={copyEmail}
                className="border-b border-cy text-cy"
              >
                {EMAIL}
              </a>
              <br />
              github.com/eyosi4314
              <br />
              Ethiopia · replies within 24 hours
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
                href={`mailto:${EMAIL}`}
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
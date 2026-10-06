"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";
import { certificates } from "@/data/certificates";

export default function Certificates() {
  const [selected, setSelected] = useState(0);
  const cert = certificates[selected];

  return (
    <section id="certs" className="pt-[100px] pb-5">
      <div className="wrap">
        <Reveal className="lb">certificates</Reveal>
        <Reveal as="h2" scramble className="font-display sec-title">
          Verified checkpoints.
        </Reveal>

        <Reveal className="grid grid-cols-[320px_1fr] gap-5 max-[980px]:grid-cols-1">
          {/* list of certificates */}
          <div className="flex flex-col gap-[10px] max-[980px]:flex-row max-[980px]:overflow-auto">
            {certificates.map((c, i) => (
              <button
                key={c.id}
                type="button"
                data-cur="VIEW"
                className={`dep-btn max-[980px]:min-w-[230px] ${i === selected ? "on" : ""}`}
                onClick={() => setSelected(i)}
                onMouseEnter={() => setSelected(i)}
              >
                <small>{c.id}</small>
                <b>{c.title}</b>
              </button>
            ))}
          </div>

          {/* details of the selected certificate */}
          <div className="dep-view">
            <small className="text-[11.67px] text-or">
              {cert.id} · {cert.type}
            </small>
            <h3 className="font-display">{cert.title}</h3>
            <p>{cert.description}</p>

            <div className="mt-[14px] text-[12px] text-mu">
              <b className="font-medium text-cy">{cert.issuer}</b> · {cert.date}
            </div>

            <a
              href={cert.image}
              target="_blank"
              rel="noreferrer"
              data-cur="OPEN"
              className="mt-[18px] block border border-ln bg-bg2 p-3"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={cert.id}
                src={cert.image}
                alt={`${cert.title} certificate`}
                className="mx-auto max-h-[340px] w-auto max-w-full object-contain"
              />
            </a>

            <div className="dep-tags">
              {cert.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>

            {cert.verifyUrl && (
              <a
                className="btn mt-[14px] bg-pn"
                data-cur="VERIFY"
                href={cert.verifyUrl}
                target="_blank"
                rel="noreferrer"
              >
                Verify online
              </a>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
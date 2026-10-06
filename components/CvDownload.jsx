import Reveal from "@/components/Reveal";

// Put your CV in the public folder and set its path here.
const CV_FILE = "/Eyosiyas_Hailemichael_CV.pdf";

const FACTS = [
  ["role", "Information Systems graduate · Full-Stack Web Developer"],
  ["education", "B.Sc. Information Systems, Arsi University (2026), CGPA 3.76/4.00"],
  ["stack", "JavaScript, React.js, Node.js, Express.js, MongoDB, MySQL"],
  ["leadership", "President of the Technology-Based Club, class representative for 3 years"],
];

export default function CvDownload() {
  return (
    <section id="cv" className="pt-[100px] pb-5">
      <div className="wrap">
        <Reveal className="lb">cv</Reveal>
        <Reveal as="h2" scramble className="font-display sec-title">
          Download my CV.
        </Reveal>

        <Reveal className="grid grid-cols-[1.2fr_0.8fr] items-center gap-5 border border-ln bg-pn p-[26px] max-[980px]:grid-cols-1">
          <div>
            <small className="text-[11.67px] text-or">CV-01 · pdf</small>
            <h3 className="my-[6px] mb-[10px] font-display text-[length:clamp(20px,2.5vw,30px)] leading-[1.15] font-bold">
              Eyosiyas Hailemichael Tesema
            </h3>

            <div className="dep-log">
              {FACTS.map(([key, value]) => (
                <div key={key}>
                  <b>[ok]</b> {key}: {value}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <a
              className="btn btn-p text-center"
              data-cur="SAVE"
              href={CV_FILE}
              download="Eyosiyas_Hailemichael_CV.pdf"
            >
              Download CV (PDF)
            </a>
            <a
              className="btn bg-pn text-center"
              data-cur="OPEN"
              href={CV_FILE}
              target="_blank"
              rel="noreferrer"
            >
              Preview in browser
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
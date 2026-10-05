const WORDS = [
  "NEURAL NETS",
  "AI AGENTS",
  "REST APIS",
  "REACT",
  "NODE.JS",
  "MYSQL",
  "MONGODB",
  "LLM TOOLING",
  "AUTOMATION",
];

export default function Ticker() {
  return (
    <div className="overflow-hidden border-y border-ln bg-bg2 py-[13px] text-[12px] whitespace-nowrap text-mu">
      <div className="marquee">
        {[0, 1, 2, 3].map((round) =>
          WORDS.map((word) => (
            <span key={`${round}-${word}`}>
              {word}
              <em>✦</em>
            </span>
          ))
        )}
      </div>
    </div>
  );
}
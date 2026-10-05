// Pre-written answers for the "Ask AI" chat.
// The first pattern that matches the question wins, so the order matters.
export const knowledge = [
  {
    pattern: /language|speak|amharic|oromo|english/,
    answer: "I speak Amharic natively, English professionally, and some Afan Oromo.",
  },
  {
    pattern: /avail|hire|open|job|freelance|role|work with/,
    answer:
      "Yes, I'm available for projects and roles. The quickest way to reach me is eyosi4314@gmail.com.",
  },
  {
    pattern: /contact|email|reach|github|phone|where/,
    answer:
      "Email: eyosi4314@gmail.com. GitHub: github.com/eyosi4314. I'm based in Ethiopia and usually reply within 24 hours.",
  },
  {
    pattern: /educat|school|universit|study|degree|gpa|grad|exam/,
    answer:
      "BSc in Information Systems from Arsi University, graduating in 2026 with Very Great Distinction. CGPA 3.76 out of 4.00, exit exam score 79.",
  },
  {
    pattern: /stack|tech|tool|skill|framework|react|node|sql|database/,
    answer:
      "Frontend: React, TypeScript, HTML/CSS. Backend: Node.js, Express, REST, JWT. Data: MySQL, MongoDB. AI: OpenAI API, chatbots, automation. I'm exploring Next.js, Docker, Prisma, and LangChain.",
  },
  {
    pattern: /ai|llm|agent|chatbot|openai|intelligen/,
    answer:
      "I build AI into products: chatbots and assistants connected to real application data. The garage management system includes an AI chatbot for customer questions.",
  },
  {
    pattern: /project|garage|church|club|netflix|built|shipped|portfolio/,
    answer:
      "I've shipped four projects: an AI-powered garage management system, a church management system, the Arsi Technology Club platform, and a Netflix clone.",
  },
  {
    pattern: /who|you|about|do|build|what/,
    answer:
      "I'm Eyosiyas, an AI-native software engineer. I build full-stack products with clean interfaces, solid APIs, reliable databases, and AI inside.",
  },
];

export const fallbackAnswer =
  "I can answer questions about my skills, projects, education, languages, and availability. Try one of the buttons below.";

export const greeting =
  "Hi. I answer questions about Eyosiyas using his CV. Ask me anything.";

export const suggestionChips = [
  "What do you build?",
  "Tech stack",
  "Education",
  "Are you available?",
  "Contact",
];
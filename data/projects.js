// The 4 deployments shown in the "Systems I've shipped" section.
// url = live website link (leave it out if the project is not deployed).
export const projects = [
  {
    id: "DEP-01",
    title: "AI-Powered Garage Management System",
    description:
      "Full-stack platform with role-based workflows, an AI chatbot, and repair management.",
    status: "live",
    url: "https://asela-garage-management.netlify.app/",
    nodes: ["React UI", "Express API", "MySQL", "AI chatbot"],
    tags: ["React", "Node.js", "Express", "MySQL", "AI"],
    logs: [
      "auth service ready",
      "role-based access enabled",
      "repair workflow synced",
      "chatbot online",
    ],
  },
  {
    id: "DEP-02",
    title: "AI-Powered Church Management System",
    description:
      "One system for members, ministries, events, and finances, with clear permissions for each role.",
    status: "not deployed yet",
    // url: "https://arutechclub.netlify.app/",
    nodes: ["React UI", "Node API", "MySQL", "AI assist"],
    tags: ["React", "Node.js", "MySQL", "AI"],
    logs: [
      "members indexed",
      "ministries linked",
      "finance module ready",
      "assistant online",
    ],
  },
  {
    id: "DEP-03",
    title: "Arsi Technology Club Platform",
    description:
      "Events, registrations, and announcements for a growing student tech community.",
    status: "live",
    url: "https://arutechclub.netlify.app/",
    nodes: ["Vite + React", "Events API", "Data", "AI"],
    tags: ["React", "Vite", "AI"],
    logs: [
      "events synced",
      "registration open",
      "announcements live",
      "assistant online",
    ],
  },
  {
    id: "DEP-04",
    title: "Netflix Clone",
    description:
      "A streaming interface with reusable components and careful responsive design.",
    status: "live",
    url: "https://nettflixclone.netlify.app/",
    nodes: ["React", "Components", "CSS"],
    tags: ["React", "CSS"],
    logs: ["components built", "layouts responsive", "build passing"],
  },
];
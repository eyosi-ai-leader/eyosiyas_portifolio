// The 4 deployments shown in the "Systems I've shipped" section.
// url = live website link (leave it out if the project is not deployed).
// status = "live", "in development", or "not deployed yet".
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
    title: "AI-Powered Church Management Platform",
    description:
      "A complete platform for church life: a public website, member accounts with email verification and Google sign-in, role-based access for admins, pastors, and ministry leaders, announcements with live notifications and email, prayer requests, and an AI assistant.",
    status: "not deployed yet",
    nodes: ["Next.js UI", "Express API", "MySQL", "Church AI"],
    tags: ["Next.js", "Node.js", "Express", "MySQL", "Tailwind", "AI"],
    logs: [
      "email verification active",
      "role-based access enabled",
      "announcements and notifications live",
      "church AI assistant online",
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
    title: "FinTrack: Personal Finance Tracker",
    description:
      "A fintech platform built as Spring Boot microservices: separate services for users, income, expenses, budgets, and reporting, connected through an API gateway.",
    status: "in development",
    nodes: ["Client UI", "API Gateway", "Spring Boot", "MySQL"],
    tags: ["Java", "Spring Boot", "Spring Data JPA", "MySQL", "Microservices", "REST"],
    logs: [
      "user service ready",
      "income and expense services linked",
      "budget service tracking limits",
      "reporting service online",
    ],
  },
];
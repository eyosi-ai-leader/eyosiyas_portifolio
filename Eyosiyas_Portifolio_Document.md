# Eyosiyas Portfolio — Next.js Rebuild

Project documentation. Keep this file in the root of the project and tick off the checklist as you go.

---

## 1. Goal

Rebuild the single-file design `eyosiyas-portfolio-v5-ai.html` as a **Next.js** website that looks and behaves **exactly the same**, using:

- **JavaScript** (no TypeScript)
- **Tailwind CSS**
- **Next.js App Router**
- **three.js** (only for the hero particle portrait)

We build it **one file at a time**. Each step gives one complete file, an explanation, and what to expect in the browser.

---

## 2. About the site

**Owner:** Eyosiyas Hailemichael, AI-Native Software Engineer, based in Ethiopia.
**Style:** dark neon / terminal / "AI system" look with a light-mode fallback.
**Page type:** one long single page with 6 sections and a fixed header.

| # | Section id | Nav label | What it shows |
|---|---|---|---|
| 1 | `#home` | system | Hero: scrambling name, typing roles, particle portrait, telemetry |
| 2 | `#modules` | modules | "Four systems, one engineer": Interface, Backend, Data, Intelligence |
| 3 | `#work` | deployments | "Systems I've shipped": 4 clickable projects |
| 4 | `#ask` | ask ai | "Interview my portfolio": robot face + chat |
| 5 | `#log` | training log | "Loss goes down. Skill goes up.": loss curve + 4 epochs |
| 6 | `#contact` | contact | "Let's deploy something.": links + form |

Between Hero and Modules there is a **scrolling keyword ticker**. After Contact there is a **footer**.

---

## 3. Concepts you need

| Term | Meaning |
|---|---|
| **App Router** | The `app/` folder defines the site. `app/page.js` is the home page; `app/layout.js` wraps it. |
| **Component** | A function that returns HTML (JSX). One file per section keeps things readable. |
| **JSX** | HTML-looking syntax inside JavaScript. Use `className` instead of `class`. |
| **`"use client"`** | First line of any component that uses mouse events, timers, or browser APIs. Almost all of ours do. |
| **`useState`** | Stores a value that changes (selected project, chat messages). |
| **`useEffect`** | Runs code after the page loads (start typing animation, add event listeners, start three.js). |
| **`useRef`** | Gives direct access to an element (the canvas, the cursor div). |
| **Props** | Values passed into a component, like function arguments. |
| **Tailwind** | Style by adding classes: `className="border px-5 py-3"`. |

---

## 4. Design system

### Fonts
- **Display:** Unbounded (weights 500, 700): headings, logo, big text
- **Body/mono:** IBM Plex Mono (weights 400, 500): everything else
- Loaded with `next/font/google` and exposed as CSS variables.

### Colors (dark is the default)

| Token | Dark | Light | Used for |
|---|---|---|---|
| `bg` | `#04060b` | `#eef3f7` | page background |
| `bg2` | `#0a1018` | `#ffffff` | ticker, node fills |
| `tx` | `#e9f6ff` | `#0a1420` | main text |
| `mu` | `#8aa3b5` | `#53687a` | muted text |
| `cy` | `#4de1ff` | `#0788ab` | cyan accent |
| `or` | `#ff7a1a` | `#e5600a` | orange accent |
| `ln` | `rgba(120,200,255,.16)` | `rgba(10,40,70,.18)` | borders and lines |
| `pn` | `rgba(10,16,24,.72)` | `rgba(255,255,255,.8)` | panels and cards |

Light mode applies automatically with `prefers-color-scheme: light`. The **header** and **hero** stay dark in both modes.

### Breakpoints
- **≤ 980px:** nav hidden; modules become 2 columns; deployments, ask, log and contact become 1 column; project list scrolls horizontally.
- **≤ 560px:** modules 1 column; hero grid fainter; "available" chip hidden; telemetry shows only the first 2 items.

### Motion rules
- Respect `prefers-reduced-motion`: animations and transitions are turned off, reveal items are visible, the loss curve is fully drawn.
- Custom cursor only on devices with a fine pointer (mouse); hidden on touch.

---

## 5. How Tailwind is used

Your design uses effects Tailwind alone cannot express cleanly, so the work is split:

- **Tailwind classes:** layout, spacing, sizes, borders, flex/grid, responsive breakpoints, hover states.
- **`app/globals.css`:** color variables (dark + light), Tailwind theme registration, all `@keyframes` (gear rotation, blinking dots, dash flow, marquee, line draw, pulse), the hero grid mask, `color-mix()` glows, and the custom cursor rule.

Colors are registered in the Tailwind theme so you can write `text-cy`, `bg-bg2`, `border-ln`, `bg-pn` and get the exact same colors.

---

## 6. File structure

```
eyosiyas-portfolio/
├── public/
│   └── portrait.jpg
├── app/
│   ├── layout.js
│   ├── page.js
│   └── globals.css
├── components/
│   ├── Header.jsx
│   ├── Cursor.jsx
│   ├── ScrollProgress.jsx
│   ├── Reveal.jsx
│   ├── Hero.jsx
│   ├── PortraitCanvas.jsx
│   ├── Ticker.jsx
│   ├── Modules.jsx
│   ├── Deployments.jsx
│   ├── AskAI.jsx
│   ├── TrainingLog.jsx
│   ├── Contact.jsx
│   ├── Footer.jsx
│   └── Toast.jsx
├── hooks/
│   └── useScramble.js
├── data/
│   ├── projects.js
│   └── knowledge.js
├── PROJECT.md
└── package.json
```

---

## 7. What each file does

### App files
- **`app/layout.js`**: loads fonts, sets page title and viewport, wraps all pages.
- **`app/page.js`**: puts all components in order and gives each section its `id`.
- **`app/globals.css`**: Tailwind import, theme colors, keyframes, special effects.

### Small helpers
- **`ScrollProgress.jsx`**: 2px cyan-to-orange bar at the top that grows as you scroll.
- **`Reveal.jsx`**: wrapper that fades and slides content up when it enters the screen. Headings inside it scramble once when revealed.
- **`Cursor.jsx`**: rotating diamond ring + orange dot + small label. The ring grows over links, buttons and cards, and the label shows words like `OPEN`, `ASK`, `LOAD`, `COPY`, `SEND`.
- **`Toast.jsx`**: small "Email copied" message at the bottom.
- **`hooks/useScramble.js`**: reusable effect that reveals text letter by letter from random characters (`01<>/{}[]#$%&*`).

### Layout pieces
- **`Header.jsx`**: fixed top bar. Logo `EH//AI`, six nav links with the current section highlighted while scrolling, and a pulsing "available for projects" chip.
- **`Footer.jsx`**: copyright and "press / to ask my AI".

### Sections
- **`Hero.jsx`**: four corner brackets, status tag, name scrambles in, typing line cycling through roles (*AI-native software engineer, full-stack developer, database architect, agent builder*), subtitle, two buttons, and telemetry (SCAN %, POINTS, CURSOR x/y, FPS).
- **`PortraitCanvas.jsx`**: three.js scene that turns `portrait.jpg` into glowing particles that react to the mouse, with a scanning orange line and three rotating rings. Fades out as you scroll. If WebGL is unavailable, the plain portrait image is shown instead.
- **`Ticker.jsx`**: endless horizontal marquee of keywords (NEURAL NETS, AI AGENTS, REST APIS, REACT, NODE.JS, MYSQL, MONGODB, LLM TOOLING, AUTOMATION).
- **`Modules.jsx`**: four cards (MOD-01 Interface, MOD-02 Backend, MOD-03 Data, MOD-04 Intelligence). Each has an animated SVG, a cursor-following glow, and a 3D tilt on hover.
- **`Deployments.jsx`**: list of 4 projects on the left; the right panel shows title, description, an animated flow diagram of nodes, a typed-in "[ok]" status log, and tech tags. Hover or click selects a project.
- **`AskAI.jsx`**: robot face with eyes that follow the mouse and blink, and a mouth that animates while "speaking". Chat with typing effect, five suggestion chips, and a text input. Answers are pre-written and matched by keywords. Pressing `/` anywhere jumps to the chat.
- **`TrainingLog.jsx`**: an SVG loss curve that draws itself when visible, next to four "epochs" (education and experience) that light up as you scroll.
- **`Contact.jsx`**: big gradient heading, contact lines, click-to-copy email, and a form with a mailto button.

### Data files
- **`data/projects.js`**: the 4 deployments (id, title, description, diagram nodes, tags, log lines).
- **`data/knowledge.js`**: keyword patterns and answers for the chat (languages, availability, contact, education, stack, AI, projects, about).

---

## 8. Content reference

**Projects:** DEP-01 AI-Powered Garage Management System · DEP-02 Church Management System · DEP-03 Arsi Technology Club Platform · DEP-04 Netflix Clone

**Training log:**
1. BSc Information Systems, Arsi University, Very Great Distinction, CGPA 3.76/4.00, exit exam 79, graduating 2026
2. Certified Full-Stack Developer
3. AI-assisted systems (garage platform with chatbot, church management system)
4. Community platforms (Arsi Technology Club)

**Contact:** eyosi4314@gmail.com · github.com/eyosi4314 · Ethiopia · replies within 24 hours

---

## 9. Build steps

Each step is one file (or one small group), checked in the browser before moving on.

- [ ] **1.** Create the project (JavaScript, Tailwind, App Router), install `three`, add `portrait.jpg` to `public/`
- [ ] **2.** `app/layout.js`: fonts and title
- [ ] **3.** `app/globals.css`: colors, theme, keyframes
- [ ] **4.** `data/projects.js` and `data/knowledge.js`
- [ ] **5.** `app/page.js`: section skeleton with ids
- [ ] **6.** `ScrollProgress.jsx` and `Reveal.jsx`
- [ ] **7.** `Cursor.jsx`
- [ ] **8.** `Header.jsx`
- [ ] **9.** `hooks/useScramble.js` and `Hero.jsx`
- [ ] **10.** `Ticker.jsx`
- [ ] **11.** `Modules.jsx`
- [ ] **12.** `Deployments.jsx`
- [ ] **13.** `AskAI.jsx`
- [ ] **14.** `TrainingLog.jsx`
- [ ] **15.** `Contact.jsx`, `Footer.jsx`, `Toast.jsx`
- [ ] **16.** `PortraitCanvas.jsx` (three.js)
- [ ] **17.** Final checks and deploy to Vercel

---

## 10. Working rules

1. One step at a time. Do not move on until the current step works.
2. Every step gives one complete file you can copy in full.
3. If something breaks, paste the **exact error** and the **file you changed**.
4. The original HTML is the reference. When in doubt, the result should match it.

---

## 11. Known things to watch

- **Random text and server rendering:** the scramble effect uses random characters, so it must start inside `useEffect`, not while rendering. Otherwise Next.js shows a "hydration mismatch" warning.
- **three.js version:** the original used r128 from a CDN. The npm package is newer, so the particle shader gets a quick compatibility check in Step 16.
- **Cursor and touch:** the custom cursor must stay hidden on touch devices.
- **Section ids:** the nav highlight, the `/` shortcut and the smooth scrolling all depend on the ids `home`, `modules`, `work`, `ask`, `log`, `contact`. Don't rename them.

---

## 12. Commands cheat sheet

| Command | What it does |
|---|---|
| `npm run dev` | Start the site locally at `http://localhost:3000` |
| `npm run build` | Make a production build (also reveals errors) |
| `npm run start` | Run the production build locally |
| `npm install <name>` | Add a package |

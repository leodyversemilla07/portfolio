// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const PERSONAL_INFO = {
  name: "Leodyver S. Semilla",
  role: "Aspiring Software Engineer",
  tagline: "I just want to build something meaningful.",
  email: "leodyversemilla07@gmail.com",
  github: "https://github.com/leodyversemilla07",
  linkedin: "https://linkedin.com/in/leodyversemilla07",
  x: "https://x.com/ldyvrsmll07",
  resumeLink: "/resume.pdf",
  location: "Oriental Mindoro, Philippines",
  timezone: "GMT+8",
  currentlyLearning: "Advanced Blockchain Architecture",
  hobbies: ["Capture The Flag competitions", "Open source contributing", "Tech blogging"]
};

export const TECH_STACK = [
  // Languages
  {
    name: "PHP & TypeScript",
    logos: [
      "https://cdn.simpleicons.org/php",
      "https://cdn.simpleicons.org/typescript"
    ]
  },

  // Backend
  {
    name: "Laravel & Node.js",
    logos: [
      "https://cdn.simpleicons.org/laravel",
      "https://cdn.simpleicons.org/nodedotjs"
    ]
  },
  {
    name: "NestJS",
    logos: ["https://cdn.simpleicons.org/nestjs"]
  },

  // Frontend & Mobile
  {
    name: "React & Next.js",
    logos: [
      "https://cdn.simpleicons.org/react",
      "https://cdn.simpleicons.org/nextdotjs"
    ]
  },
  {
    name: "React Native & Expo",
    logos: [
      {
        src: "https://cdn.simpleicons.org/react",
        label: "React Native"
      },
      "https://cdn.simpleicons.org/expo"
    ]
  },
  {
    name: "Inertia.js",
    logos: ["https://cdn.simpleicons.org/inertia"]
  },
  {
    name: "Tailwind CSS & Shadcn UI",
    logos: [
      "https://cdn.simpleicons.org/tailwindcss",
      "https://cdn.simpleicons.org/shadcnui"
    ]
  },
  {
    name: "Convex",
    logos: [
      {
        src: "data:image/svg+xml,%3Csvg fill='%23EE342F' role='img' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Ctitle%3EConvex%3C/title%3E%3Cpath d='M15.09 18.916c3.488-.387 6.776-2.246 8.586-5.348-.857 7.673-9.247 12.522-16.095 9.545a3.47 3.47 0 0 1-1.547-1.314c-1.539-2.417-2.044-5.492-1.318-8.282 2.077 3.584 6.3 5.78 10.374 5.399m-10.501-7.65c-1.414 3.266-1.475 7.092.258 10.24-6.1-4.59-6.033-14.41-.074-18.953a3.44 3.44 0 0 1 1.893-.707c2.825-.15 5.695.942 7.708 2.977-4.09.04-8.073 2.66-9.785 6.442m11.757-5.437C14.283 2.951 11.053.992 7.515.933c6.84-3.105 15.253 1.929 16.17 9.37a3.6 3.6 0 0 1-.334 2.02c-1.278 2.594-3.647 4.607-6.416 5.352 2.029-3.763 1.778-8.36-.589-11.847'/%3E%3C/svg%3E",
        label: "Convex",
        slug: "convex"
      }
    ]
  },

  // Data & Infrastructure
  {
    name: "MySQL",
    logos: ["https://cdn.simpleicons.org/mysql"]
  },
  {
    name: "Docker",
    logos: ["https://cdn.simpleicons.org/docker"]
  },

  // Tooling
  {
    name: "Git & GitHub Actions",
    logos: [
      "https://cdn.simpleicons.org/git",
      "https://cdn.simpleicons.org/githubactions"
    ]
  },

  // Specialized
  {
    name: "Blockchain (MultiChain)",
    logos: ["https://cdn.simpleicons.org/ethereum"]
  },
  {
    name: "Cybersecurity (CTF)",
    logos: ["https://cdn.simpleicons.org/hackthebox"]
  }
];

export const SKILLS = [
  // Application Engineering
  "Full-stack web development",
  "REST API design & integration",
  "Authentication and role-based access control",
  "Database design and optimization",

  // Specialized Domains
  "Blockchain-powered app development",
  "Cybersecurity and CTF problem solving",
  "AI-assisted development",

  // Delivery & Collaboration
  "CI/CD automation and developer tooling",
  "Technical documentation and knowledge sharing"
];

export const PROJECTS = [
  {
    slug: "procuchain",
    title: "ProcuChain",
    description: "Solo-developed blockchain-powered Document Management System for Bids and Awards Committees. Built with MultiChain for secure, tamper-resistant storage and transparency.",
    fullDescription: "ProcuChain is a blockchain-powered Document Management System designed specifically for Bids and Awards Committees in government procurement processes. By leveraging MultiChain blockchain technology, it ensures secure, transparent, and tamper-resistant storage of procurement documents, providing an immutable audit trail for all transactions.",
    story: "For my capstone project, I witnessed how manual procurement tracking led to lost documents and accountability issues. I thought: what if we used blockchain to create an unchangeable record? That's how ProcuChain was born. Seeing government officials actually use it to prevent corruption is my proudest achievement.",
    features: [
      "Blockchain-powered document storage using MultiChain",
      "Immutable audit trail for all procurement transactions",
      "Secure access control for committee members",
      "Transparent document verification",
      "Tamper-resistant document integrity"
    ],
    tech: ["Laravel", "React", "MultiChain", "Heroku"],
    link: "https://www.procuchain.tech/",
    github: "https://github.com/leodyversemilla07"
  },
  {
    slug: "saliksikhub",
    title: "SaliksikHub",
    description: "An open-source, self-hosted academic journal management platform. Designed as a modern alternative to OJS with full plugin system, theme support, and multi-journal management.",
    fullDescription: "SaliksikHub (from the Filipino word 'saliksik', meaning 'research') is an open-source, self-hosted academic journal management platform. Designed as a modern alternative to OJS, it supports multiple journals within a single installation with a full plugin system, theme system, and guided setup wizard.",
    story: "Philippine universities struggle with expensive journal platforms. I built SaliksikHub as a free, modern alternative that Filipino researchers can actually afford to host. The name itself is Tagalog—a small way to make research tools more accessible to our community.",
    features: [
      "Multi-journal management under one or more institutions",
      "Full publication workflow: Submission → Peer Review → Editorial Decision → Copyediting → Publication",
      "Role-based access control: Super Admin, Managing Editor, Editor-in-Chief, Associate Editor, Reviewer, Author",
      "Plugin system with installable plugins per journal",
      "Per-journal theme customization (color, typography, branding)",
      "Installation wizard for guided first-run setup",
      "CMS for per-journal pages, sections, and navigation menus",
      "Journal-scoped announcements with public display",
      "MIT licensed, self-hosted, no vendor lock-in"
    ],
    tech: ["Laravel", "PHP", "React", "TypeScript", "Inertia.js", "Tailwind CSS", "shadcn/ui", "MySQL"],
    link: "https://github.com/leodyversemilla07/saliksikhub",
    github: "https://github.com/leodyversemilla07/saliksikhub"
  },
  {
    slug: "paymongo-cli",
    title: "PayMongo CLI",
    description: "A developer CLI for PayMongo local webhook testing, payment intent workflows, and integration debugging.",
    fullDescription: "PayMongo CLI is a terminal-first tool for developers integrating PayMongo. It is built to shorten the feedback loop around local webhook testing, payment intent workflows, and integration debugging without living in the dashboard.",
    story: "I got frustrated constantly switching between my code editor and PayMongo's dashboard while debugging webhooks. As someone who lives in the terminal, I built this CLI tool. Turns out, other Filipino developers had the same problem—it's now being used by teams across the Philippines.",
    features: [
      "Local Webhook Forwarding with integrated ngrok tunneling",
      "Webhook Triggering and Replay for simulation and inspection",
      "Payment Intent Workflows: create intents, attach payment methods, capture payments, create refunds",
      "Zero-Config Setup with paymongo init",
      "Real-time Monitoring with formatted terminal logs",
      "Privacy-First Analytics (opt-in, local storage only)",
      "Bulk Operations: Import/export payments and webhooks",
      "Rate Limiting Protection with automatic backoff",
      "Secure Management with local credential encryption"
    ],
    tech: ["Node.js", "TypeScript", "Oclif", "ngrok"],
    link: "https://www.npmjs.com/package/paymongo-cli",
    github: "https://github.com/leodyversemilla07/paymongo-cli"
  }
];

export const ACHIEVEMENTS = [
  {
    title: "Hack4Gov 3 Regional Highest Scorer & Wildcard National Qualifier",
    description: "Achieved highest individual score in the regional round, earning a wildcard qualification to the national finals of this government-focused cybersecurity competition.",
    type: "competition",
    date: "2024"
  }
];

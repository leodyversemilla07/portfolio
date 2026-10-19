# Personal Portfolio

A minimalist, high-performance single-page portfolio built with the latest web technologies, featuring clean typography and interactive elements.

## Tech Stack

- **Framework:** [Astro 7](https://astro.build/)
- **UI Framework:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Components:** [Shadcn UI](https://ui.shadcn.com/) (using the **Lyra** preset and [Base UI](https://base-ui.com/))
- **Fonts:** [JetBrains Mono](https://www.jetbrains.com/lp/mono/)
- **Icons:** [Phosphor Icons](https://phosphoricons.com/)
- **Package Manager:** npm
- **Deployment:** [Vercel](https://vercel.com/) static hosting

## Features

- **Binary Blitz:** An interactive logic game that challenges visitors to convert decimal numbers to 4-bit binary, reflecting the developer's focus on low-level systems and cybersecurity. High scores persist across sessions.
- **Modern Component Architecture:** Built using the Shadcn UI Lyra style for a sharp, technical aesthetic.
- **Full Responsiveness:** Optimized for everything from mobile devices to ultra-wide displays.
- **Dark Mode Support:** Integrated theme switching using Tailwind 4's native dark mode support, with a no-flash inline bootstrap.
- **SEO / Social Ready:** Open Graph, Twitter Card, canonical URL, and `schema.org` Person JSON-LD are emitted at build time.

## Getting Started

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Type-check .astro templates and TS/TSX sources
npm run check

# Preview the production build
npm run preview
```

> **Node.js:** `>=22.22.0` is required (Astro 7.4 / `@astrojs/react` 7 minimum).

## Project Structure

```
src/
├── components/      # React components (including Binary Blitz)
├── components/ui/   # Shadcn UI (Lyra preset) components
├── consts.ts        # Content source (personal info, projects, skills)
├── layouts/
│   └── layout.astro # Base HTML layout with SEO metadata
├── lib/
│   └── utils.ts     # `cn()` class-name helper
├── pages/
│   └── index.astro  # Main entry point and page structure
└── styles/
    └── global.css   # Tailwind v4 configuration and variables
```

## Content Management

Most content is managed in `src/consts.ts`. Update this file to change:
- `PERSONAL_INFO`: Name, role, contact info, and social links.
- `TECH_CATEGORIES`: Tech stack matrix grouped by domain.
- `SKILL_DOMAINS`: Core competency groupings.
- `PROJECTS`: Featured work with descriptions, tech lists, and links.
- `EXPERIENCES`: Work history entries.
- `EDUCATION`: Degree, honors, and coursework.
- `ACHIEVEMENTS`: Awards and professional recognition.

## License

This project is licensed under the [MIT License](./LICENSE).

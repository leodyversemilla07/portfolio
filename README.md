# Personal Portfolio

A minimalist, high-performance single-page portfolio built with the latest web technologies, featuring clean typography and interactive elements.

## Tech Stack

- **Framework:** [Astro 6](https://astro.build/)
- **UI Framework:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Components:** [Shadcn UI](https://ui.shadcn.com/) (using the **Lyra** preset and [Base UI](https://base-ui.com/))
- **Fonts:** [JetBrains Mono](https://www.jetbrains.com/lp/mono/) & General Sans
- **Icons:** [Phosphor Icons](https://phosphoricons.com/)
- **Deployment:** [Vercel](https://vercel.com/)

## Features

- **Binary Blitz:** An interactive logic game that challenges visitors to convert decimal numbers to 4-bit binary, reflecting the developer's focus on low-level systems and cybersecurity.
- **Modern Component Architecture:** Built using the Shadcn UI Lyra style for a sharp, technical aesthetic.
- **Full Responsiveness:** Optimized for everything from mobile devices to ultra-wide displays.
- **Dark Mode Support:** Integrated theme switching using Tailwind 4's native dark mode support.

## Getting Started

```bash
# Install dependencies
bun install

# Run dev server
bun run dev

# Build for production
bun run build
```

## Project Structure

```
src/
├── components/      # React components (including Binary Blitz)
├── components/ui/   # Shadcn UI (Lyra preset) components
├── consts.ts        # Content source (personal info, projects, skills)
├── layouts/
│   └── layout.astro # Base HTML layout with SEO metadata
├── pages/
│   └── index.astro  # Main entry point and page structure
└── styles/
    └── global.css   # Tailwind v4 configuration and variables
```

## Content Management

Most content is managed in `src/consts.ts`. Update this file to change:
- `PERSONAL_INFO`: Name, role, contact info, and social links.
- `TECH_STACK`: Skills and their corresponding logo URLs.
- `PROJECTS`: Featured work with descriptions, tech lists, and links.
- `ACHIEVEMENTS`: Awards and professional recognition.

## License

This project is licensed under the [MIT License](./LICENSE).

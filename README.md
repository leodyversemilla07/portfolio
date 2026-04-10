# Personal Portfolio

A minimalist, single-page portfolio built with Astro and React.

## Tech Stack

- **Framework:** [Astro](https://astro.build/)
- **UI:** [React](https://react.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Font:** [JetBrains Mono](https://www.jetbrains.com/lp/mono/)
- **Icons:** [Lucide](https://lucide.dev/)
- **Deployment:** [Vercel](https://vercel.com/)

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
├── consts.ts        # Personal info, projects, skills, achievements
├── layouts/
│   └── layout.astro # Base HTML layout
├── pages/
│   └── index.astro  # Single-page portfolio
└── styles/
    └── global.css   # Tailwind + JetBrains Mono font
```

## Customization

Edit `src/consts.ts` to update:
- Personal info (name, location, links)
- Projects
- Skills
- Achievements

## License

This project is licensed under the [MIT License](./LICENSE).

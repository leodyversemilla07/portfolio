# Agent Development Guide

A minimalist single-page portfolio.

## Tech Stack
- **Framework:** Astro
- **UI:** React
- **Styling:** Tailwind CSS v4
- **Font:** JetBrains Mono
- **Icons:** Lucide React

## Project Structure
```
src/
├── consts.ts        # All content (personal info, projects, skills)
├── layouts/
│   └── layout.astro # Base HTML layout
├── pages/
│   └── index.astro  # Single-page portfolio
└── styles/
    └── global.css   # Tailwind + font imports
```

## Commands
```bash
bun run dev    # Development
bun run build  # Production build
```

## Editing Content
All content is in `src/consts.ts`:
- `PERSONAL_INFO` - Name, links, location
- `SKILLS` - Tech stack list
- `PROJECTS` - Portfolio projects
- `ACHIEVEMENTS` - Recognition/awards

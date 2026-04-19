# Agent Development Guide

This document provides technical context for AI agents to understand how to effectively maintain and extend this portfolio.

## Technical Foundation

- **Astro 6 & React 19**: The project uses Astro as the static site generator with React 19 for interactive components.
- **Tailwind CSS v4**: Styling is built on the newest Tailwind v4. Note the absence of `tailwind.config.js`; all configuration is done via CSS variables in `src/styles/global.css`.
- **Shadcn UI (Lyra Style)**: The component system follows the `base-lyra` style. Components are located in `src/components/ui` and utilize `@base-ui/react` primitives.
- **Aesthetic**: Minimalist, technical, and sharp. Avoid rounded corners (prefer `rounded-none`) to stay consistent with the Lyra preset.

## Interactive Features

### Binary Blitz
- **Location**: `src/components/binary-blitz.tsx`
- **Logic**: A React-based binary conversion game.
- **State Management**: Uses React hooks (`useState`, `useEffect`, `useCallback`) for game logic and timer synchronization.
- **Responsiveness**: Uses Tailwind's responsive prefixes to adjust button sizing on mobile.

## Project Structure
```
src/
├── components/      # Interactive React components
├── components/ui/   # Primitive UI components (Shadcn)
├── consts.ts        # The "Single Source of Truth" for portfolio content
├── layouts/
│   └── layout.astro # Global wrapper and metadata
├── pages/
│   └── index.astro  # Main layout orchestration
└── styles/
    └── global.css   # Tailwind 4 config & OKLCH color system
```

## Maintenance Workflows

1. **Adding UI Components**: Use `bunx shadcn@latest add <component>` to add new primitives.
2. **Content Updates**: Always modify `src/consts.ts` for biographical or project data.
3. **Styling Changes**: Modify `src/styles/global.css`. Use OKLCH colors for modern color space support.
4. **Interactive Logic**: Implement as standalone React components in `src/components/` and import with `client:load` in Astro pages.

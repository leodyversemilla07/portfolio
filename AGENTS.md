# Agent Development Guide - My Portfolio

This document provides instructions and context for AI agents working on this portfolio project.

## Tech Stack
- **Framework:** [Astro 5+](https://astro.build/)
- **Frontend Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Components:** [shadcn/ui](https://ui.shadcn.com/) (based on Radix UI)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Language:** TypeScript

## Project Structure
- `src/pages/`: Contains Astro routes.
- `src/layouts/`: Base layouts for pages.
- `src/components/`: Reusable UI components.
    - `ui/`: shadcn/ui base components.
- `src/styles/`: Global styles and Tailwind configuration.
- `src/lib/`: Utility functions (e.g., `utils.ts` for Tailwind class merging).
- `public/`: Static assets like images and favicons.

## Development Guidelines

### Component Philosophy
- Prefer **React** components for interactive elements (e.g., `Portfolio.tsx`, `ModeToggle.tsx`).
- Use **Astro** components for static layouts and page structures (`Layout.astro`, `Header.astro`, `Footer.astro`) to minimize client-side JavaScript.
- Follow the shadcn/ui pattern: keep base UI components in `src/components/ui` and build composite components in `src/components`.

### Styling
- Use Tailwind CSS 4 utility classes for all styling.
- Follow the project's color palette defined in `src/styles/global.css`.
- Use the `cn()` utility from `src/lib/utils.ts` for conditional class merging.

### Dark Mode
- Dark mode is implemented. Ensure all new components are tested for both light and dark themes using Tailwind's `dark:` variant.

### Performance
- Leverage Astro's partial hydration. Use `client:load` or `client:visible` directives only when necessary for React components.

## Common Tasks

### Adding a new UI Component
```bash
npx shadcn@latest add [component-name]
```

### Running Development Server
```bash
npm run dev
```

### Building for Production
```bash
npm run build
```

## AI Agent Instructions
- **Consistency:** Maintain the existing design aesthetic (Material Design principles, clean spacing).
- **TypeScript:** Always use strict typing. Avoid `any`.
- **Documentation:** Add JSDoc comments to complex functions or components.
- **Verification:** After making changes, verify that the project builds without errors using `npm run build`.

# Gemini Development Context - My Portfolio

This file provides specific instructions and context for Gemini AI agents working on this repository.

## Project Vision
Create a modern, high-performance personal portfolio that showcases technical expertise and projects with a clean, minimal aesthetic.

## Tech Stack Deep Dive
- **Astro 5:** Using the latest features like Content Layer and View Transitions.
- **Tailwind CSS 4:** Utilizing the new `@theme` engine and CSS-first configuration.
- **React 19:** Leveraging the latest React features within Astro components.
- **shadcn/ui:** Component-based UI system for rapid, consistent development.

## Preferred Patterns for Gemini
- **Code Style:** Use functional components, hooks, and clean TypeScript interfaces.
- **Hydration:** Always consider the `client:*` directives in Astro. If a component doesn't need interactivity, keep it as a pure Astro component.
- **Styling:** Stick to Tailwind utility classes. Avoid custom CSS unless absolutely necessary (defined in `global.css`).
- **Icons:** Use `lucide-react` for all iconography.

## Memory & Context
- **Personal Info:** (Agent should look for content in `src/pages/index.astro` or dedicated content files to understand the user's background).
- **Design Tokens:** Refer to `src/styles/global.css` for the OKLCH-based color system.

## Tool Usage Instructions
- **Codebase Investigator:** Use this tool first for any architectural changes or when adding major features.
- **Shell Commands:** Use `npm run dev` to test changes and `npm run build` to verify production readiness.
- **File Replacements:** Be precise with `old_string` context to ensure successful tool calls.

## Documentation Requirements
- Keep `AGENTS.md` and `GEMINI.md` updated as the project evolves.
- Update `README.md` for any new setup instructions or external dependencies.

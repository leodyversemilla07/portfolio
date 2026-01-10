# Personal Portfolio

A modern, high-performance personal portfolio website showcasing technical expertise and projects. Built with a focus on speed, accessibility, and clean design.

## 🛠️ Tech Stack

- **Framework:** [Astro 5](https://astro.build/) - For high-performance static site generation and content layer.
- **UI Library:** [React 19](https://react.dev/) - Utilized for interactive components.
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/) - Using the latest CSS-first configuration and `@theme` engine.
- **Components:** [shadcn/ui](https://ui.shadcn.com/) - Accessible, reusable component primitives.
- **Icons:** [Lucide React](https://lucide.dev/) - Beautiful & consistent icons.

## ✨ Features

- 🚀 **Blazing Fast:** Static site generation ensures optimal load times and SEO.
- 🌗 **Dark Mode:** Built-in theme switcher supporting light, dark, and system preferences.
- 📱 **Fully Responsive:** Optimized for all device sizes, from mobile to desktop.
- 🎨 **Modern Design:** Clean aesthetic using OKLCH-based color systems.
- ♿ **Accessible:** Built on Radix UI primitives for WAI-ARIA compliance.

## 📂 Project Structure

```text
/
├── public/              # Static assets (resume, favicon, etc.)
├── src/
│   ├── assets/          # Project assets (images, svgs)
│   ├── components/      # UI components
│   │   ├── sections/    # Page sections (Hero, About, Work, etc.)
│   │   ├── ui/          # shadcn/ui primitives
│   │   └── ...          # Global components (Header, Footer, etc.)
│   ├── layouts/         # Page layouts
│   ├── lib/             # Utility functions
│   ├── pages/           # Astro routes
│   └── styles/          # Global styles (Tailwind v4)
├── astro.config.mjs     # Astro configuration
└── package.json         # Project dependencies
```

## 🧞 Commands

All commands are run from the root of the project:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally                       |

## 🚀 Getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/leodyversemilla07/portfolio.git
    cd portfolio
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    ```

4.  Open [http://localhost:4321](http://localhost:4321) in your browser.
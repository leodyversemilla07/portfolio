import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://leodyver.me',
  adapter: vercel(),
  integrations: [react(), sitemap()],
  vite: {
    // @ts-expect-error - @tailwindcss/vite and Astro bundle different Vite versions internally
    plugins: [tailwindcss()],
  },
});

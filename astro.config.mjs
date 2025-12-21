// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://leodyver-portfolio.com', // TODO: Replace with your actual domain
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});

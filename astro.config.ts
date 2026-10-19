import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // The apex domain (leodyver.me) 307-redirects to www on Vercel, so www is the
  // canonical origin. Keeping `site` pointed at the final URL means the
  // canonical link, Open Graph URL, sitemap and robots.txt all agree with the
  // URL that actually serves 200.
  site: 'https://www.leodyver.me',
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});

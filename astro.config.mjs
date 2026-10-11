// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/**
 * SITE_URL and BASE_PATH are set by the deploy workflow.
 *  - GitHub Pages (project site): SITE_URL=https://aravindacv.github.io  BASE_PATH=/academic-profile
 *  - Cloudflare Pages / custom domain: SITE_URL=https://your-domain       BASE_PATH=/
 */
const site = process.env.SITE_URL ?? 'https://aravindacv.github.io';
const base = process.env.BASE_PATH ?? '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  build: { format: 'directory' },
});

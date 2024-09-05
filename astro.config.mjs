import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import tailwind from '@astrojs/tailwind';

import remarkToc from 'remark-toc';

import rehypePresetMinify from 'rehype-preset-minify';

import sitemap from '@astrojs/sitemap';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind(), sitemap({
    // filter: (page) => page !== 'https://stargazers.club/secret-vip-lounge/',
    // customPages: ['https://stargazers.club/external-page', 'https://stargazers.club/external-page2'],
    changefreq: 'weekly',
    priority: 0.9,
    lastmod: new Date(),
  }), mdx({
    syntaxHighlight: 'shiki',
    shikiConfig: { theme: 'dracula' },
    remarkPlugins: [remarkToc],
    rehypePlugins: [rehypePresetMinify],
    remarkRehype: { footnoteLabel: 'Footnotes' },
    gfm: false,
  })],
  site: 'https://luludev.cn'
});
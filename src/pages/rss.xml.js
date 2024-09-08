import rss, { pagesGlobToRssItems } from '@astrojs/rss';

export async function GET(context) {
  return rss({
    title: 'Luludev | Blog',
    description: '一个程序员的开发日志',
    site: context.site,
    items: await pagesGlobToRssItems(import.meta.glob('./**/*.md*')),
    customData: `<language>en-us</language>`,
  });
}
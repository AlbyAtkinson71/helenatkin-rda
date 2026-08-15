// app/feed.xml/route.js
// Generates an RSS feed at /feed.xml listing all news articles

import { getSortedPostsData } from '../../lib/posts';

export async function GET() {
  const posts = getSortedPostsData();
  const baseUrl = 'https://helenatkinrda.org.uk';

  const items = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}/news/${post.slug}</link>
      <guid>${baseUrl}/news/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description><![CDATA[${post.excerpt || ''}]]></description>
    </item>`
    )
    .join('');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Helen Atkin Group RDA - News</title>
    <link>${baseUrl}</link>
    <description>Latest news from Helen Atkin Group, Riding for the Disabled</description>
    <language>en-gb</language>${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}

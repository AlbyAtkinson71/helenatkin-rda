// app/sitemap.js
// Automatically generates /sitemap.xml, including every news article

import { getAllPostSlugs } from '../lib/posts';

export default function sitemap() {
  const baseUrl = 'https://helenatkinrda.org.uk';

  const staticRoutes = [
    '',
    '/media-centre',
    '/documents',
    '/accessibility-statement',
    '/cookie-policy',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  const newsRoutes = getAllPostSlugs().map(({ slug }) => ({
    url: `${baseUrl}/news/${slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...newsRoutes];
}

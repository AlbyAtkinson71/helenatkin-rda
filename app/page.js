// app/page.js
import Hero from './components/Hero';
import { NewsGrid } from './components/NewsCard';
import { getRecentPosts } from '../lib/posts';

export const metadata = {
  title: 'Helen Atkin Group - Riding for the Disabled',
  description: 'Providing riding and carriage driving therapy for local disabled children and adults in Buxton.',
};

export default function HomePage() {
  const recentPosts = getRecentPosts(6);

  return (
    <main id="main-content">
      <Hero />
      <NewsGrid articles={recentPosts} />
    </main>
  );
}
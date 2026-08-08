// app/media-centre/page.js
import { getSortedPostsData } from '../../lib/posts';
import NewsCard from '../components/NewsCard';

export const metadata = {
  title: 'Media Centre',
  description: 'Latest news and updates from Helen Atkin Group, Riding for the Disabled',
};

export default function MediaCentre() {
  const allPosts = getSortedPostsData();

  return (
    <main id="main-content" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Media Centre
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Latest news and updates from Helen Atkin Group, Riding for the Disabled
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {allPosts.map((article) => (
            <NewsCard key={article.slug} article={article} />
          ))}
        </div>

        {allPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No news articles found.</p>
          </div>
        )}

        <div className="mt-12 text-center text-gray-600">
          <p>Showing all {allPosts.length} articles</p>
        </div>
      </div>
    </main>
  );
}
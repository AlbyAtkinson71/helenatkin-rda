// app/components/NewsCard.jsx
// Accessible news article card component
// NOTE: Uses standard <img> tags (not next/image) to avoid path/optimization issues

export default function NewsCard({ article }) {
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Featured image */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-[#e8f4f0] to-[#dff0ea]">
        {article.image ? (
          <img
            src={article.image}
            alt={article.imageAlt || ''}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#2d5f4f]">
            <svg className="w-16 h-16 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>

      <div className="p-6">
        {/* Category badge */}
        {article.category && (
          <span className="inline-block bg-emerald-100 text-emerald-800 text-sm font-semibold px-3 py-1 rounded-full mb-3">
            {article.category}
          </span>
        )}

        {/* Article title */}
        <h3 className="text-xl font-bold mb-3 text-gray-900">
          <a
            href={`/news/${article.slug}`}
            className="hover:text-emerald-700 focus:text-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded"
          >
            {article.title}
          </a>
        </h3>

        {/* Publication date */}
        <time
          dateTime={article.date}
          className="block text-sm text-gray-600 mb-3"
        >
          {new Date(article.date).toLocaleDateString('en-GB', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </time>

        {/* Excerpt */}
        <p className="text-gray-700 mb-4 line-clamp-3">
          {article.excerpt}
        </p>

        {/* Read more link */}
        <a
          href={`/news/${article.slug}`}
          className="inline-flex items-center text-emerald-700 hover:text-emerald-800 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded"
          aria-label={`Read more about ${article.title}`}
        >
          Read more
          <svg
            className="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </a>
      </div>
    </article>
  );
}

// NewsGrid component - grid container for displaying multiple news articles
export function NewsGrid({ articles }) {
  return (
    <section 
      className="py-16 bg-gray-50"
      aria-labelledby="news-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 
          id="news-heading"
          className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center"
        >
          Latest News
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <NewsCard key={article.slug} article={article} />
          ))}
        </div>

        {/* View all news link */}
        <div className="text-center mt-12">
          <a
            href="/media-centre"
            className="inline-block bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-emerald-300"
          >
            View All News
          </a>
        </div>
      </div>
    </section>
  );
}
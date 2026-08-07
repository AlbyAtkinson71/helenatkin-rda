// app/components/NewsCard.jsx
// Accessible news article card component
//
// Security notes:
// - article.title, excerpt, imageAlt are rendered as JSX children (plain text).
//   React escapes these automatically — do NOT switch to dangerouslySetInnerHTML
//   without running content through DOMPurify (isomorphic-dompurify) first.
// - article.image is passed to Next.js <Image> which enforces the domain whitelist
//   configured in next.config.mjs — only add trusted domains there.
// - article.slug is interpolated into hrefs. Validate slugs server-side to ensure
//   they contain only [a-z0-9-] characters before storing/returning them.

import Image from 'next/image';

export default function NewsCard({ article }) {
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Featured image — uses Next.js <Image> for domain enforcement and optimisation */}
      {article.image && (
        <div className="relative h-48 overflow-hidden">
          <Image
            src={article.image}
            alt={article.imageAlt || ''}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}

      <div className="p-6">
        {/* Category badge */}
        {article.category && (
          <span className="inline-block bg-emerald-100 text-emerald-800 text-sm font-semibold px-3 py-1 rounded-full mb-3">
            {article.category}
          </span>
        )}

        {/* Article title — React escapes this; do not use dangerouslySetInnerHTML */}
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

        {/* Excerpt — React escapes this; do not use dangerouslySetInnerHTML */}
        <p className="text-gray-700 mb-4 line-clamp-3" style={{ lineHeight: '1.6' }}>
          {article.excerpt}
        </p>

        {/* Read more link */}
        <a
          href={`/news/${article.slug}`}
          className="inline-flex items-center text-emerald-700 hover:text-emerald-800 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded min-h-[44px]"
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

// app/components/NewsGrid.jsx
// Grid container for displaying multiple news articles

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
            className="inline-flex items-center justify-center bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-emerald-300 min-h-[44px]"
          >
            View All News
          </a>
        </div>
      </div>
    </section>
  );
}

// Example usage with sample data
export const sampleArticles = [
  {
    slug: 'life-saving-defibrillator-live-at-buxton-riding-school',
    title: 'Life-saving defibrillator live at Buxton Riding School',
    excerpt: 'Emergency – and potentially life-saving – treatment is now available at Buxton Riding School thanks to a £3,000 defibrillator installed by Helen Atkin Group Riding for the Disabled Association (RDA).',
    date: '2025-10-15',
    category: 'News',
    image: '/images/defibrillator1.jpg',
    imageAlt: 'Defibrillator installed at Buxton Riding School'
  },
  {
    slug: 'silver-success-on-the-world-stage-for-para-dressage-rider-jessica',
    title: 'Silver success on the world stage for para-dressage rider Jessica',
    excerpt: 'Derbyshire rider Jessica Limb – who receives on-going support from a Buxton based disabled riding charity – has scored success on her international debut in the inaugural Virtus World Para-Dressage Championships.',
    date: '2025-09-20',
    category: 'News',
    image: '/images/jessica-success.jpg',
    imageAlt: 'Jessica Limb competing in para-dressage'
  },
  {
    slug: 'top-royal-award-for-vintage-volunteer-julie',
    title: 'Top Royal award for vintage volunteer Julie',
    excerpt: 'One of the key founders of a High Peak charity providing life-changing therapy for disabled people of all ages has been awarded the highest accolade bestowed by the Riding for the Disabled Association (RDA).',
    date: '2025-08-10',
    category: 'News',
    image: '/images/julie-award.jpg',
    imageAlt: 'Julie receiving her Royal award'
  }
];

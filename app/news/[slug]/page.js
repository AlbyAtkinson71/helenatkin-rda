// app/news/[slug]/page.js
import { getPostData, getAllPostSlugs } from '../../../lib/posts';
import Gallery from '../../components/Gallery';

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const postData = await getPostData(slug);
  return {
    title: postData.title,
    description: postData.excerpt || postData.title,
  };
}

export default async function NewsArticle({ params }) {
  const { slug } = await params;
  const postData = await getPostData(slug);

  return (
    <main id="main-content" className="py-16 bg-gray-50">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-8">
          {postData.category && (
            <span className="inline-block bg-emerald-100 text-emerald-800 text-sm font-semibold px-3 py-1 rounded-full mb-4">
              {postData.category}
            </span>
          )}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {postData.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-gray-600">
            <time dateTime={postData.date}>
              {new Date(postData.date).toLocaleDateString('en-GB', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
            {postData.author && (
              <>
                <span aria-hidden="true">-</span>
                <span>By {postData.author}</span>
              </>
            )}
          </div>
        </header>

        {postData.image && (
          <div
            className="mb-8 rounded-lg overflow-hidden h-64 md:h-96"
          >
            <img
              src={postData.image}
              alt={postData.imageAlt || ''}
              className="w-full h-full object-cover"
              style={{ objectPosition: postData.imagePosition || 'center' }}
            />
          </div>
        )}

        <div
          className="prose prose-lg max-w-none bg-white rounded-lg shadow-sm p-8 md:p-12"
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        />

        {postData.gallery && postData.gallery.length > 0 && (
          <Gallery images={postData.gallery} />
        )}

        {postData.tags && postData.tags.length > 0 && (
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {postData.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12 text-center">
          <a href="/media-centre" className="inline-flex items-center text-emerald-700 hover:text-emerald-800 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Media Centre
          </a>
        </div>
      </article>
    </main>
  );
}
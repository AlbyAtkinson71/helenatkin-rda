// app/not-found.js
// Custom 404 page, shown for any unmatched route

export default function NotFound() {
  return (
    <main id="main-content" className="py-24 bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-[#2d5f4f] font-bold text-lg mb-2">404</p>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Page not found
        </h1>
        <p className="text-lg text-gray-600 mb-10">
          Sorry, we couldn&rsquo;t find the page you were looking for. It may have
          been moved, or the link may be out of date.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="/"
            className="inline-block bg-[#2d5f4f] hover:bg-[#4a8270] text-white font-bold py-3 px-8 rounded-lg transition-colors focus:outline-none focus:ring-4 focus:ring-emerald-300"
          >
            Back to homepage
          </a>
          <a
            href="/media-centre"
            className="inline-block bg-white hover:bg-gray-100 text-[#2d5f4f] font-bold py-3 px-8 rounded-lg border-2 border-[#2d5f4f] transition-colors focus:outline-none focus:ring-4 focus:ring-emerald-300"
          >
            Browse news
          </a>
        </div>
      </div>
    </main>
  );
}

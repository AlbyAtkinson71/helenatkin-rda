// app/documents/page.js
import { getDocumentsByCategory } from '../../lib/documents';

export const metadata = {
  title: 'Documents',
  description: 'Policies, guides and other documents from Helen Atkin Group, Riding for the Disabled',
};

// Icons per file type - shown visually AND described in text for screen readers
function FileIcon({ fileType }) {
  return (
    <svg
      className="w-6 h-6 flex-shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  );
}

export default function DocumentsPage() {
  const groupedDocuments = getDocumentsByCategory();
  const categories = Object.keys(groupedDocuments).sort();

  return (
    <main id="main-content" className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Documents
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Policies, guides and other documents available to download
          </p>
        </header>

        {categories.length === 0 && (
          <p className="text-center text-gray-600">No documents available yet.</p>
        )}

        {categories.map((category) => (
          <section key={category} className="mb-10" aria-labelledby={`category-${category}`}>
            <h2
              id={`category-${category}`}
              className="text-2xl font-bold text-[#2d5f4f] mb-4"
            >
              {category}
            </h2>

            <ul className="space-y-3">
              {groupedDocuments[category].map((doc) => (
                <li key={doc.filename}>
                  {doc.fileMissing ? (
                    // Visible warning for site admin if a listed file is missing - not a real download link
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <p className="font-semibold text-amber-800">{doc.title}</p>
                      <p className="text-sm text-amber-700">
                        File not yet uploaded (expected: {doc.filename})
                      </p>
                    </div>
                  ) : (
                    <a
                      href={doc.href}
                      download
                      className="flex items-start gap-4 bg-white rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow duration-200 focus:outline-none focus:ring-4 focus:ring-emerald-300"
                    >
                      <span className="text-[#2d5f4f] mt-1">
                        <FileIcon fileType={doc.fileType} />
                      </span>
                      <span className="flex-1">
                        <span className="block font-semibold text-gray-900 text-lg">
                          {doc.title}
                        </span>
                        {doc.description && (
                          <span className="block text-gray-600 mt-1">
                            {doc.description}
                          </span>
                        )}
                        <span className="block text-sm text-gray-500 mt-2">
                          {doc.fileType} document
                          {doc.fileSize && ` \u2013 ${doc.fileSize}`}
                          {doc.updatedDate && ` \u2013 updated ${new Date(doc.updatedDate).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}`}
                        </span>
                      </span>
                      <span className="text-[#2d5f4f] mt-1" aria-hidden="true">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </span>
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}

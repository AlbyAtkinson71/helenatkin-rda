// app/accessibility-statement/page.js

export const metadata = {
  title: 'Accessibility Statement',
  description: 'Accessibility statement for the Helen Atkin Group RDA website.',
};

export default function AccessibilityStatement() {
  return (
    <main id="main-content" className="py-16 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Accessibility Statement
          </h1>
          <p className="text-gray-600">
            This statement applies to the Helen Atkin Group RDA website at{' '}
            <a href="https://helenatkinrda.org.uk" className="text-emerald-700 underline hover:text-emerald-800">
              helenatkinrda.org.uk
            </a>.
          </p>
        </header>

        <div className="prose prose-lg max-w-none bg-white rounded-lg shadow-sm p-8 md:p-12">
          <h2>Our commitment</h2>
          <p>
            We want as many people as possible to be able to use this website. We have designed
            it with accessibility in mind, including support for keyboard navigation, screen
            readers, and users who need to enlarge text or reduce colour contrast requirements.
          </p>

          <h2>Conformance status</h2>
          <p>
            This website is <strong>partially conformant</strong> with{' '}
            <a
              href="https://www.w3.org/TR/WCAG21/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 underline hover:text-emerald-800"
            >
              WCAG 2.1
            </a>{' '}
            at level AA. &ldquo;Partially conformant&rdquo; means that some parts of the content
            do not yet fully meet every success criterion, but we are actively working to
            identify and fix these.
          </p>
          <p>
            We have used a combination of automated accessibility testing tools and manual
            review to check this site. We have not yet carried out a formal audit by an
            accessibility specialist or testing with users of assistive technology, and we
            treat this as an ongoing process rather than a one-off task.
          </p>

          <h2>What we have done so far</h2>
          <ul>
            <li>Used semantic HTML and clear heading structure throughout the site</li>
            <li>Provided text alternatives for images</li>
            <li>Ensured the site can be fully navigated using a keyboard alone</li>
            <li>Included visible focus indicators on interactive elements</li>
            <li>Checked and corrected colour contrast to meet WCAG AA requirements</li>
            <li>Added a &ldquo;skip to main content&rdquo; link for keyboard and screen reader users</li>
            <li>Ensured photo galleries and pop-up content trap and return keyboard focus correctly</li>
            <li>Reduced motion for users who have set that preference in their browser or device</li>
            <li>Labelled downloadable documents with their file type and size before you download them</li>
          </ul>

          <h2>Known limitations</h2>
          <p>
            We are not currently aware of any specific accessibility barriers on this site.
            If you find one, please let us know using the contact details below, and we will
            aim to fix it as quickly as we can.
          </p>

          <h2>Technical information</h2>
          <p>
            This website is built using modern web standards (HTML5, CSS, and JavaScript) and
            is designed to work with recent versions of major browsers &ndash; including Chrome,
            Firefox, Safari and Edge &ndash; on both desktop and mobile devices.
          </p>

          <h2>Feedback and contact information</h2>
          <p>
            If you have any difficulty using this website, or have feedback on its
            accessibility, please get in touch:
          </p>
          <ul>
            <li>Email: <a href="mailto:wardsinbuxton@gmail.com" className="text-emerald-700 underline hover:text-emerald-800">wardsinbuxton@gmail.com</a></li>
            <li>Phone: 07940 516 060</li>
          </ul>
          <p>We aim to respond to accessibility queries within a reasonable timeframe.</p>

          <h2>Preparation of this statement</h2>
          <p>
            This statement was last reviewed on <strong>[INSERT DATE]</strong>.
          </p>
        </div>
      </div>
    </main>
  );
}
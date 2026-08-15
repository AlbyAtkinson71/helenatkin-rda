// app/cookie-policy/page.js

export const metadata = {
  title: 'Cookie Policy',
  description: 'Cookie policy for the Helen Atkin Group RDA website.',
};

export default function CookiePolicy() {
  return (
    <main id="main-content" className="py-16 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Cookie Policy
          </h1>
          <p className="text-gray-600">
            This policy explains how helenatkinrda.org.uk uses cookies and similar technologies.
          </p>
        </header>

        <div className="prose prose-lg max-w-none bg-white rounded-lg shadow-sm p-8 md:p-12">
          <h2>Our approach to cookies</h2>
          <p>
            This website does not use cookies to track you or store personal information on
            your device. We have deliberately chosen tools that do not require a cookie consent
            banner, because they do not set cookies in the first place.
          </p>

          <h2>Website analytics and performance monitoring</h2>
          <p>
            We use Vercel Analytics and Vercel Speed Insights to understand, in general terms,
            how many people visit this website, which pages are most useful to them, and how
            well the site is performing technically. These tools are{' '}
            <strong>cookieless</strong> &ndash; they do not use cookies or local storage, and
            they do not track individual visitors across websites. The information collected is
            aggregated and anonymised, and typically includes:
          </p>
          <ul>
            <li>Which pages were viewed</li>
            <li>Approximate location (country or region, not precise location)</li>
            <li>General device type (e.g. mobile or desktop) and browser</li>
            <li>How visitors arrived at the site (e.g. via a search engine or another website)</li>
            <li>Technical page-loading speed and performance metrics</li>
          </ul>
          <p>
            This information cannot be used to identify you personally, and is used only to help
            us understand how the website is used and performing so we can improve it.
          </p>

          <h2>Embedded video content</h2>
          <p>
            Some articles on this website include videos hosted on YouTube, shown using
            YouTube&rsquo;s privacy-enhanced mode. In this mode, YouTube does not store
            information about visitors who do not click play. If you choose to play a video,
            YouTube may set its own cookies in line with{' '}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 underline hover:text-emerald-800"
            >
              Google&rsquo;s own privacy policy
            </a>
            , which is outside of our control.
          </p>

          <h2>External links</h2>
          <p>
            This website contains links to external websites, including our online donation
            page and Facebook page. These websites have their own privacy and cookie policies,
            which we encourage you to review separately &ndash; we are not responsible for the
            content or practices of external sites.
          </p>

          <h2>Changes to this policy</h2>
          <p>
            If we ever introduce additional cookies or tracking tools in the future, we will
            update this policy and, where required by law, seek your consent first.
          </p>
          <p>This policy was last reviewed on <strong>[INSERT DATE]</strong>.</p>

          <h2>Questions</h2>
          <p>
            If you have any questions about this policy, please contact us at{' '}
            <a href="mailto:wardsinbuxton@gmail.com" className="text-emerald-700 underline hover:text-emerald-800">
              wardsinbuxton@gmail.com
            </a>.
          </p>
        </div>
      </div>
    </main>
  );
}
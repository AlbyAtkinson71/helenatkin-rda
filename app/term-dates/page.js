
// app/term-dates/page.js
 
export const metadata = {
  title: 'Term Dates',
  description: 'Term dates for Helen Atkin Group, Riding for the Disabled, at Buxton Riding School',
};
 
// Riding and carriage driving sessions run during these weeks. Update this
// list each time trustees confirm dates for a new term.
const termGroups = [
  {
    year: '2026',
    terms: [
      { dates: '15th September – 22nd October', weeks: 6 },
      { dates: '3rd November – 10th December', weeks: 6 },
    ],
  },
  {
    year: '2027',
    terms: [
      { dates: '9th March – 25th March', weeks: 3 },
      { dates: '13th April – 27th May', weeks: 7 },
      { dates: '8th June – 22nd July', weeks: 7 },
      { dates: '14th September – 21st October', weeks: 6 },
    ],
  },
];
 
const address = 'Buxton Riding School, Fern Farm, Fern Road, Buxton, Derbyshire SK17 9NP';
const mapEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;
const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
 
function CalendarIcon() {
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
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  );
}
 
function PhoneIcon() {
  return (
    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
      />
    </svg>
  );
}
 
function MailIcon() {
  return (
    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );
}
 
function MapPinIcon() {
  return (
    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}
 
export default function TermDatesPage() {
  return (
    <main id="main-content" className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Term Dates</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            When we&apos;re open for riding and carriage driving sessions at Buxton Riding School
          </p>
        </header>
 
        {/* Term dates */}
        {termGroups.map((group) => (
          <section key={group.year} className="mb-10" aria-labelledby={`year-${group.year}`}>
            <h2 id={`year-${group.year}`} className="text-2xl font-bold text-[#2d5f4f] mb-4">
              {group.year}
            </h2>
            <ul className="space-y-3">
              {group.terms.map((term) => (
                <li key={term.dates}>
                  <div className="flex items-start gap-4 bg-white rounded-lg p-5 shadow-sm">
                    <span className="text-[#2d5f4f] mt-1">
                      <CalendarIcon />
                    </span>
                    <span className="flex-1">
                      <span className="block font-semibold text-gray-900 text-lg">{term.dates}</span>
                      <span className="block text-sm text-gray-500 mt-1">
                        {term.weeks} {term.weeks === 1 ? 'week' : 'weeks'}
                      </span>
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
 
        <p className="text-gray-600 mb-16">
          Sessions run during the weeks listed above; we&apos;re closed between terms. Dates are confirmed by our
          trustees and updated here as each new term is set &ndash; if you&apos;re unsure whether we&apos;re open on
          a particular day, please get in touch using the details below.
        </p>
 
        {/* Location */}
        <section className="mb-16" aria-labelledby="location-heading">
          <h2 id="location-heading" className="text-2xl font-bold text-[#2d5f4f] mb-4">
            Where we ride
          </h2>
          <div className="bg-white rounded-lg p-5 shadow-sm mb-4">
            <div className="flex items-start gap-3">
              <span className="text-[#2d5f4f] mt-1">
                <MapPinIcon />
              </span>
              <div>
                <p className="font-semibold text-gray-900">Buxton Riding School</p>
                <p className="text-gray-600">Fern Farm, Fern Road (off London Road)</p>
                <p className="text-gray-600">Buxton, Derbyshire SK17 9NP</p>
                <a
                  href={directionsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3 text-[#2d5f4f] font-semibold underline focus:outline-none focus:ring-4 focus:ring-emerald-300 rounded"
                >
                  Get directions
                </a>
              </div>
            </div>
          </div>
 
          <div className="rounded-lg overflow-hidden shadow-sm">
            <iframe
              title="Map showing Buxton Riding School, Fern Farm, Fern Road, Buxton, Derbyshire SK17 9NP"
              src={mapEmbedSrc}
              width="100%"
              height="350"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>
 
        {/* Contact */}
        <section aria-labelledby="contact-heading">
          <h2 id="contact-heading" className="text-2xl font-bold text-[#2d5f4f] mb-4">
            Get in touch
          </h2>
          <div className="bg-white rounded-lg p-5 shadow-sm">
            <p className="font-semibold text-gray-900 text-lg mb-1">Janine Frost, Chairperson</p>
            <p className="text-gray-600 mb-3">For new rider enquiries, including questions about term dates</p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
              <a
                href="tel:+447960961605"
                className="flex items-center gap-2 text-[#2d5f4f] font-semibold focus:outline-none focus:ring-4 focus:ring-emerald-300 rounded"
              >
                <PhoneIcon />
                07960 961 605
              </a>
              <a
                href="mailto:janinefrostrda@gmail.com"
                className="flex items-center gap-2 text-[#2d5f4f] font-semibold focus:outline-none focus:ring-4 focus:ring-emerald-300 rounded"
              >
                <MailIcon />
                janinefrostrda@gmail.com
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
// app/components/Hero.jsx
// Redesigned hero - content-dominant, cards above the fold

export default function Hero() {
  return (
    <section
      className="relative bg-emerald-800 text-white overflow-hidden"
      aria-labelledby="hero-heading"
      style={{ minHeight: 'min(100vh, 900px)' }}
    >
      {/* Background image with stronger overlay for readability */}
      <div className="absolute inset-0">
        <img
          src="/images/NewImagesMay2024/RideOut.jpg"
          alt=""
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center 30%' }}
        />
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(135deg, rgba(6,78,59,0.93) 0%, rgba(4,60,46,0.88) 50%, rgba(6,78,59,0.82) 100%)'
        }} />
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)',
            backgroundSize: '12px 12px'
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">

        {/* === TOP ROW: Title + CTA === */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1
              id="hero-heading"
              className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
              style={{ fontFamily: "'Georgia', 'Times New Roman', serif", letterSpacing: '-0.5px' }}
            >
              Helen Atkin Group
            </h1>
            <p className="text-emerald-200 text-lg md:text-xl font-light mt-1 tracking-wide">
              Riding for the Disabled
            </p>
          </div>

          <div className="flex flex-row sm:flex-col gap-3 items-start sm:items-end">
            <a
              href="https://cafdonate.cafonline.org/22521#!/DonationDetails"
              className="inline-block font-bold py-3 px-7 rounded-lg text-base transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-amber-300 shadow-lg"
              style={{ background: 'linear-gradient(135deg, #b45309, #92400e)', color: '#fff' }}
              target="_blank"
              rel="noopener noreferrer"
            >
              ♥ Donate Now
            </a>
            <a
              href="https://www.facebook.com/BuxtonRDA/"
              className="inline-flex items-center gap-2 text-sm text-emerald-100 hover:text-amber-300 focus:text-amber-300 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-300 rounded"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
            </a>
          </div>
        </div>

        {/* === DESCRIPTION - Now dominant and wide === */}
        <div
          className="rounded-xl p-6 md:p-8 mb-6"
          style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.15)' }}
        >
          <p className="text-lg md:text-xl lg:text-2xl leading-relaxed font-light mb-3" style={{ lineHeight: '1.65' }}>
            We are a voluntary group that provides <strong className="text-amber-300 font-semibold">riding and carriage driving therapy</strong> for
            local disabled children and adults using selected horses and ponies.
          </p>
          <p className="text-base md:text-lg text-emerald-100">
            We work from the{' '}
            <a
              href="https://goo.gl/maps/6kidcMeuDRE9Uhko8"
              className="text-amber-300 underline hover:text-amber-200 focus:text-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-300 rounded"
              target="_blank"
              rel="noopener noreferrer"
            >
              Buxton Riding School, Fern Farm, London Rd, Buxton, SK17 9NP
            </a>
            {' '}with riders from local schools and adult centres.{' '}
            <a
              href="https://beta.charitycommission.gov.uk/charity-details/?regid=1182183&subid=0"
              className="opacity-70 hover:opacity-100 underline text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 rounded"
              target="_blank"
              rel="noopener noreferrer"
            >
              Registered Charity No. 1182183
            </a>
          </p>
        </div>

        {/* === 3 CONTACT CARDS - Compact, still above fold === */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* Volunteer enquiries */}
          <div
            className="bg-white text-gray-900 rounded-xl p-5 shadow-xl"
            style={{ borderTop: '4px solid #059669' }}
          >
            <div className="flex items-start gap-3 mb-3">
              <span className="text-2xl" role="img" aria-hidden="true">🤝</span>
              <h2 className="text-lg font-bold text-emerald-800 leading-tight">Become a Volunteer</h2>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              We're always looking for volunteers to help during our group sessions.
            </p>
            <div className="space-y-1 text-sm">
              <p className="font-semibold text-gray-800">Deborah Ward, Secretary</p>
              <p>
                <a
                  href="tel:+447940516060"
                  className="text-emerald-700 hover:text-emerald-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded"
                >
                  07940 516 060
                </a>
              </p>
              <p>
                <a
                  href="mailto:wardsinbuxton@gmail.com"
                  className="text-emerald-700 hover:text-emerald-800 underline focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded break-all"
                >
                  wardsinbuxton@gmail.com
                </a>
              </p>
            </div>
          </div>

          {/* New rider enquiries */}
          <div
            className="bg-white text-gray-900 rounded-xl p-5 shadow-xl"
            style={{ borderTop: '4px solid #f59e0b' }}
          >
            <div className="flex items-start gap-3 mb-3">
              <span className="text-2xl" role="img" aria-hidden="true">🐴</span>
              <h2 className="text-lg font-bold text-emerald-800 leading-tight">New Rider Enquiries</h2>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Interested in riding with us? Get in touch to find out more.
            </p>
            <div className="space-y-1 text-sm">
              <p className="font-semibold text-gray-800">Janine Frost, Chairperson</p>
              <p>
                <a
                  href="tel:+447960961605"
                  className="text-emerald-700 hover:text-emerald-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded"
                >
                  07960 961 605
                </a>
              </p>
              <p>
                <a
                  href="mailto:janinefrostrda@gmail.com"
                  className="text-emerald-700 hover:text-emerald-800 underline focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded break-all"
                >
                  janinefrostrda@gmail.com
                </a>
              </p>
            </div>
          </div>

          {/* Carriage driving enquiries */}
          <div
            className="bg-white text-gray-900 rounded-xl p-5 shadow-xl"
            style={{ borderTop: '4px solid #0d9488' }}
          >
            <div className="flex items-start gap-3 mb-3">
              <span className="text-2xl" role="img" aria-hidden="true">🪄</span>
              <h2 className="text-lg font-bold text-emerald-800 leading-tight">Carriage Driving</h2>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Interested in carriage driving? Get in touch to find out more.
            </p>
            <div className="space-y-1 text-sm">
              <p className="font-semibold text-gray-800">Joanna Taylor</p>
              <p>
                <a
                  href="tel:+447947138437"
                  className="text-emerald-700 hover:text-emerald-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded"
                >
                  07947 138 437
                </a>
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

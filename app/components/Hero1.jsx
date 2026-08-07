// app/components/Hero.jsx
// Accessible hero component for Helen Atkin Group RDA with hero image

export default function Hero() {
  return (
    <section 
      className="relative bg-gradient-to-br from-emerald-700 to-emerald-600 text-white overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Hero Background Image */}
      <div className="absolute inset-0">
        <img 
          src="/images/NewImagesMay2024/RideOut.jpg" 
          alt=""
          className="w-full h-full object-cover opacity-95"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-700/90 to-emerald-600/90" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center">
          {/* Main heading with proper semantic markup */}
          <h1 
            id="hero-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            Helen Atkin Group
          </h1>
          
          <p className="text-2xl md:text-3xl mb-8 font-light">
            Riding for the Disabled
          </p>
          
          {/* Primary CTA - Donate button */}
          <div className="mb-12">
            <a
              href="https://cafdonate.cafonline.org/22521#!/DonationDetails"
              className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-amber-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              Donate Now
            </a>
          </div>

          {/* Welcome message */}
          <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-sm rounded-lg p-8 mb-8">
            <p className="text-lg md:text-xl leading-relaxed mb-6">
              We are a voluntary group that provides riding and carriage driving therapy for local 
              disabled children and adults using selected horses and ponies.
            </p>
            <p className="text-base md:text-lg">
              We work from the{' '}
              <a 
                href="https://goo.gl/maps/6kidcMeuDRE9Uhko8"
                className="underline hover:text-amber-300 focus:text-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-300 rounded"
                target="_blank"
                rel="noopener noreferrer"
              >
                Buxton Riding School, Fern Farm, London Rd, Buxton, SK17 9NP
              </a>
              {' '}with riders from local schools and adult centres.
            </p>
          </div>
        </div>

        {/* Contact information cards - Now 3 cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mt-12">
          {/* Volunteer enquiries */}
          <div className="bg-white text-gray-900 rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-emerald-700">
              Become a Volunteer
            </h2>
            <p className="mb-4">
              We are always looking for volunteers to help during our group sessions.
            </p>
            <div className="space-y-2">
              <p className="font-semibold">Deborah Ward, Secretary</p>
              <p>
                <a 
                  href="tel:+447940516060"
                  className="text-emerald-700 hover:text-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded"
                >
                  07940 516 060
                </a>
              </p>
              <p>
                <a 
                  href="mailto:wardsinbuxton@gmail.com"
                  className="text-emerald-700 hover:text-emerald-800 underline focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded"
                >
                  wardsinbuxton@gmail.com
                </a>
              </p>
            </div>
          </div>

          {/* New rider enquiries */}
          <div className="bg-white text-gray-900 rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-emerald-700">
              New Rider Enquiries
            </h2>
            <p className="mb-4">
              Interested in riding with us? Get in touch to find out more.
            </p>
            <div className="space-y-2">
              <p className="font-semibold">Janine Frost, Chairperson</p>
              <p>
                <a 
                  href="tel:+447960961605"
                  className="text-emerald-700 hover:text-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded"
                >
                  07960 961 605
                </a>
              </p>
              <p>
                <a 
                  href="mailto:janinefrostrda@gmail.com"
                  className="text-emerald-700 hover:text-emerald-800 underline focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded"
                >
                  janinefrostrda@gmail.com
                </a>
              </p>
            </div>
          </div>

          {/* Carriage driving enquiries - NEW */}
          <div className="bg-white text-gray-900 rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-emerald-700">
              Carriage Driving
            </h2>
            <p className="mb-4">
              Interested in carriage driving? Get in touch.
            </p>
            <div className="space-y-2">
              <p className="font-semibold">Joanna Taylor</p>
              <p>
                <a 
                  href="tel:+447947138437"
                  className="text-emerald-700 hover:text-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded"
                >
                  07947 138 437
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Social media and charity info */}
        <div className="text-center mt-12 space-y-4">
          <p>
            <a
              href="https://www.facebook.com/BuxtonRDA/"
              className="inline-flex items-center gap-2 text-white hover:text-amber-300 focus:text-amber-300 underline focus:outline-none focus:ring-2 focus:ring-amber-300 rounded"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg 
                className="w-6 h-6" 
                fill="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Find us on Facebook
            </a>
          </p>
          <p className="text-sm opacity-90">
            Registered Charity Number:{' '}
            <a
              href="https://beta.charitycommission.gov.uk/charity-details/?regid=1182183&subid=0"
              className="underline hover:text-amber-300 focus:text-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-300 rounded"
              target="_blank"
              rel="noopener noreferrer"
            >
              1182183
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
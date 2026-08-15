// app/layout.js
// Root layout with navigation and footer

import Navigation from './components/Navigation';
import './globals.css';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata = {
  title: {
    default: 'Helen Atkin Group - Riding for the Disabled',
    template: '%s | Helen Atkin Group RDA',
  },
  description: 'Providing riding therapy for local disabled children and adults in Buxton.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navigation />
        {children}
        <Analytics />
        <SpeedInsights />

        <footer className="bg-gray-900 text-white py-12 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              {/* About */}
              <div>
                <h3 className="text-xl font-bold mb-4">About Us</h3>
                <p className="text-gray-300 text-sm">
                  Helen Atkin Group provides riding therapy for local disabled
                  children and adults using selected horses and ponies at
                  Buxton Riding School.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                <ul className="space-y-1">
                  <li>
                    <a
                      href="/"
                      className="inline-block py-2 text-gray-300 hover:text-white transition-colors"
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <a
                      href="/media-centre"
                      className="inline-block py-2 text-gray-300 hover:text-white transition-colors"
                    >
                      Media Centre
                    </a>
                  </li>
                  <li>
                    <a
                      href="/documents"
                      className="inline-block py-2 text-gray-300 hover:text-white transition-colors"
                    >
                      Documents
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://cafdonate.cafonline.org/22521#!/DonationDetails"
                      className="inline-block py-2 text-gray-300 hover:text-white transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Donate
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.facebook.com/BuxtonRDA/"
                      className="inline-block py-2 text-gray-300 hover:text-white transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Facebook
                    </a>
                  </li>
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h3 className="text-xl font-bold mb-4">Contact</h3>
                <div className="text-gray-300 text-sm space-y-3">
                  <div>
                    <p className="font-semibold text-white">Volunteers:</p>
                    <p>Deborah Ward</p>
                    <a
                      href="tel:+447940516060"
                      className="inline-block py-2 hover:text-white transition-colors"
                    >
                      07940 516 060
                    </a>
                  </div>
                  <div>
                    <p className="font-semibold text-white">New Riders:</p>
                    <p>Janine Frost</p>
                    <a
                      href="tel:+447960961605"
                      className="inline-block py-2 hover:text-white transition-colors"
                    >
                      07960 961 605
                    </a>
                  </div>
                  <div>
                    <p className="font-semibold text-white">Carriage Driving:</p>
                    <p>Joanna Taylor</p>
                    <a
                      href="tel:+447947138437"
                      className="inline-block py-2 hover:text-white transition-colors"
                    >
                      07947 138 437
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
              <p>© {new Date().getFullYear()} Helen Atkin Group, Riding for the Disabled</p>
              <p className="mt-2">
                Registered Charity Number:{' '}
                <a
                  href="https://beta.charitycommission.gov.uk/charity-details/?regid=1182183&subid=0"
                  className="inline-block py-2 underline hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  1182183
                </a>
              </p>
              <p className="mt-4">
                <a
                  href="/accessibility-statement"
                  className="inline-block py-2 px-1 hover:text-white transition-colors"
                >
                  Accessibility Statement
                </a>
                {' • '}
                <a
                  href="/cookie-policy"
                  className="inline-block py-2 px-1 hover:text-white transition-colors"
                >
                  Cookie Policy
                </a>
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
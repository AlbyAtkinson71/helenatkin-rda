// app/components/Navigation.jsx
// Accessible, responsive navigation with mobile menu

'use client';

import { useState } from 'react';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Close menu when escape key is pressed
  const handleKeyDown = (e) => {
    if (e.key === 'Escape' && mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav 
      className="bg-white shadow-md sticky top-0 z-50"
      role="navigation"
      aria-label="Main navigation"
      onKeyDown={handleKeyDown}
    >
      {/* Skip to main content link for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 bg-emerald-700 text-white px-4 py-2 rounded focus:outline-none focus:ring-4 focus:ring-emerald-300"
      >
        Skip to main content
      </a>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and site title */}
          <div className="flex items-center">
            <a 
              href="/"
              className="flex items-center space-x-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded"
            >
              <img
                src="/images/rda-logo.png"
                alt="Helen Atkin Group RDA Logo"
                className="h-10 w-auto"
              />
              <span className="text-xl font-bold text-gray-900 hidden sm:block">
                Helen Atkin Group RDA
              </span>
            </a>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <a
              href="/"
              className="text-gray-700 hover:text-emerald-700 px-3 py-2 rounded font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              Home
            </a>
            <a
              href="/media-centre"
              className="text-gray-700 hover:text-emerald-700 px-3 py-2 rounded font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              Media Centre
            </a>
            <a
              href="/documents"
              className="text-gray-700 hover:text-emerald-700 px-3 py-2 rounded font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              Documents
            </a>
            <a
              href="https://cafdonate.cafonline.org/22521#!/DonationDetails"
              className="bg-amber-700 hover:bg-amber-800 text-white px-6 py-2 rounded-lg font-bold transition-colors focus:outline-none focus:ring-4 focus:ring-amber-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              Donate
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-700 hover:text-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded p-2"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                // Close icon
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                // Hamburger icon
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div 
          id="mobile-menu"
          className="md:hidden border-t border-gray-200 bg-white"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a
              href="/"
              className="block text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 px-3 py-2 rounded font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </a>
            <a
              href="/media-centre"
              className="block text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 px-3 py-2 rounded font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
              onClick={() => setMobileMenuOpen(false)}
            >
              Media Centre
            </a>
            <a
              href="/documents"
              className="block text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 px-3 py-2 rounded font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
              onClick={() => setMobileMenuOpen(false)}
            >
              Documents
            </a>
            <a
              href="https://cafdonate.cafonline.org/22521#!/DonationDetails"
              className="bg-amber-700 hover:bg-amber-800 text-white px-6 py-2 rounded-lg font-bold transition-colors focus:outline-none focus:ring-4 focus:ring-amber-300"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
            >
              Donate
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
// app/components/Gallery.jsx
// Accessible photo gallery with lightbox - click a thumbnail to view larger,
// navigate with arrow keys or on-screen buttons, close with Escape.

'use client';

import { useState, useEffect, useCallback } from 'react';

export default function Gallery({ images }) {
  const [activeIndex, setActiveIndex] = useState(null); // null = lightbox closed

  const isOpen = activeIndex !== null;

  const closeLightbox = useCallback(() => setActiveIndex(null), []);

  const goPrev = useCallback(() => {
    setActiveIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  }, [images.length]);

  const goNext = useCallback(() => {
    setActiveIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  }, [images.length]);

  // Keyboard controls while lightbox is open
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    }

    document.addEventListener('keydown', handleKeyDown);
    // Prevent background scrolling while lightbox is open
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, closeLightbox, goPrev, goNext]);

  if (!images || images.length === 0) return null;

  return (
    <div className="my-10">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Photo Gallery</h2>

      {/* Thumbnail grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {images.map((img, index) => (
          <button
            key={img.src}
            onClick={() => setActiveIndex(index)}
            className="relative h-40 rounded-lg overflow-hidden group focus:outline-none focus:ring-4 focus:ring-emerald-500"
            aria-label={`View larger image: ${img.alt || `Photo ${index + 1}`}`}
          >
            <img
              src={img.src}
              alt={img.alt || ''}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            <span className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          </button>
        ))}
      </div>

      {/* Lightbox overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-emerald-300 focus:outline-none focus:ring-4 focus:ring-white/50 rounded-full p-2"
            aria-label="Close image viewer"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Previous button */}
          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute left-4 text-white hover:text-emerald-300 focus:outline-none focus:ring-4 focus:ring-white/50 rounded-full p-2"
              aria-label="Previous image"
            >
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Image + caption */}
          <div
            className="max-w-4xl max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[activeIndex].src}
              alt={images[activeIndex].alt || ''}
              className="max-w-full max-h-[75vh] object-contain rounded-lg"
            />
            {images[activeIndex].alt && (
              <p className="text-white text-center mt-4 px-4">
                {images[activeIndex].alt}
              </p>
            )}
            <p className="text-white/60 text-sm mt-2">
              {activeIndex + 1} of {images.length}
            </p>
          </div>

          {/* Next button */}
          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-4 text-white hover:text-emerald-300 focus:outline-none focus:ring-4 focus:ring-white/50 rounded-full p-2"
              aria-label="Next image"
            >
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
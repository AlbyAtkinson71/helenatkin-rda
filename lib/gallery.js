// lib/gallery.js
//
// Shared photo list. Used by the standalone /gallery page and by any news
// article that sets `gallery: true` in its frontmatter.
//
// Each entry needs a src (path under /public) and alt text describing the photo.
// Keep to 50 photos or fewer. Resize images to roughly 1600px wide and under
// 300KB each so pages load quickly on phones.

export const galleryPhotos = [
  { src: '/images/autumnShowcase261.jpg', alt: 'Autumn Showcase 2026 photo 1' },
  { src: '/images/autumnShowcase262.jpg', alt: 'Autumn Showcase 2026 photo 2' },
  { src: '/images/autumnShowcase263.jpg', alt: 'Autumn Showcase 2026 photo 3' },
  { src: '/images/autumnShowcase264.jpg', alt: 'Autumn Showcase 2026 photo 4' },
  { src: '/images/autumnShowcase265.jpg', alt: 'Autumn Showcase 2026 photo 5' },
  { src: '/images/autumnShowcase266.jpg', alt: 'Autumn Showcase 2026 photo 6' },
  { src: '/images/autumnShowcase267.jpg', alt: 'Autumn Showcase 2026 photo 7' },
  { src: '/images/autumnShowcase268.jpg', alt: 'Autumn Showcase 2026 photo 8' },
  { src: '/images/autumnShowcase269.jpg', alt: 'Autumn Showcase 2026 photo 9' },
  { src: '/images/autumnShowcase2610.jpg', alt: 'Autumn Showcase 2026 photo 10' },
  { src: '/images/autumnShowcase2611.jpg', alt: 'Autumn Showcase 2026 photo 11' },
  { src: '/images/autumnShowcase2612.jpg', alt: 'Autumn Showcase 2026 photo 12' },
  { src: '/images/autumnShowcase2613.jpg', alt: 'Autumn Showcase 2026 photo 13' },
  { src: '/images/autumnShowcase2614.jpg', alt: 'Autumn Showcase 2026 photo 14' },
  { src: '/images/autumnShowcase2615.jpg', alt: 'Autumn Showcase 2026 photo 15' },
  { src: '/images/autumnShowcase2616.jpg', alt: 'Autumn Showcase 2026 photo 16' },
  { src: '/images/autumnShowcase2617.jpg', alt: 'Autumn Showcase 2026 photo 17' },
  { src: '/images/autumnShowcase2618.jpg', alt: 'Autumn Showcase 2026 photo 18' },
  { src: '/images/autumnShowcase2619.jpg', alt: 'Autumn Showcase 2026 photo 19' },
  { src: '/images/autumnShowcase2620.jpg', alt: 'Autumn Showcase 2026 photo 20' },
  { src: '/images/autumnShowcase2621.jpg', alt: 'Autumn Showcase 2026 photo 21' },
  { src: '/images/autumnShowcase2622.jpg', alt: 'Autumn Showcase 2026 photo 22' },
  { src: '/images/autumnShowcase2623.jpg', alt: 'Autumn Showcase 2026 photo 23' },
  { src: '/images/autumnShowcase2624.jpg', alt: 'Autumn Showcase 2026 photo 24' },
  { src: '/images/autumnShowcase2625.jpg', alt: 'Autumn Showcase 2026 photo 25' },
  { src: '/images/autumnShowcase2626.jpg', alt: 'Autumn Showcase 2026 photo 26' },
  { src: '/images/autumnShowcase2627.jpg', alt: 'Autumn Showcase 2026 photo 27' },
  { src: '/images/autumnShowcase2628.jpg', alt: 'Autumn Showcase 2026 photo 28' },
  { src: '/images/autumnShowcase2629.jpg', alt: 'Autumn Showcase 2026 photo 29' },
  { src: '/images/autumnShowcase2630.jpg', alt: 'Autumn Showcase 2026 photo 30' },
  { src: '/images/autumnShowcase2631.jpg', alt: 'Autumn Showcase 2026 photo 31' },
  { src: '/images/autumnShowcase2632.jpg', alt: 'Autumn Showcase 2026 photo 32' },
  { src: '/images/autumnShowcase2633.jpg', alt: 'Autumn Showcase 2026 photo 33' },
  { src: '/images/autumnShowcase2634.jpg', alt: 'Autumn Showcase 2026 photo 34' },
  { src: '/images/autumnShowcase2635.jpg', alt: 'Autumn Showcase 2026 photo 35' },
  { src: '/images/autumnShowcase2636.jpg', alt: 'Autumn Showcase 2026 photo 36' },
  { src: '/images/autumnShowcase2637.jpg', alt: 'Autumn Showcase 2026 photo 37' },
  { src: '/images/autumnShowcase2638.jpg', alt: 'Autumn Showcase 2026 photo 38' },
  { src: '/images/autumnShowcase2639.jpg', alt: 'Autumn Showcase 2026 photo 39' },
  { src: '/images/autumnShowcase2640.jpg', alt: 'Autumn Showcase 2026 photo 40' },
  { src: '/images/autumnShowcase2641.jpg', alt: 'Autumn Showcase 2026 photo 41' },
  { src: '/images/autumnShowcase2642.jpg', alt: 'Autumn Showcase 2026 photo 42' },
  { src: '/images/autumnShowcase2643.jpg', alt: 'Autumn Showcase 2026 photo 43' },
  { src: '/images/autumnShowcase2644.jpg', alt: 'Autumn Showcase 2026 photo 44' },
  { src: '/images/autumnShowcase2645.jpg', alt: 'Autumn Showcase 2026 photo 45' },
  { src: '/images/autumnShowcase2646.jpg', alt: 'Autumn Showcase 2026 photo 46' },
  { src: '/images/autumnShowcase2647.jpg', alt: 'Autumn Showcase 2026 photo 47' },
  { src: '/images/autumnShowcase2648.jpg', alt: 'Autumn Showcase 2026 photo 48' },
  { src: '/images/autumnShowcase2649.jpg', alt: 'Autumn Showcase 2026 photo 49' },
];

export const MAX_GALLERY_PHOTOS = 50;

export function getGalleryPhotos() {
  if (galleryPhotos.length > MAX_GALLERY_PHOTOS) {
    console.warn(
      `Gallery has ${galleryPhotos.length} photos; only the first ${MAX_GALLERY_PHOTOS} will show.`
    );
  }
  return galleryPhotos.slice(0, MAX_GALLERY_PHOTOS);
}

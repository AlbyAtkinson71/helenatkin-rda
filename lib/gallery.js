// lib/gallery.js
//
// Shared photo list. Used by the standalone /gallery page and by any news
// article that sets `gallery: true` in its frontmatter.
//
// Each entry needs a src (path under /public) and alt text describing the photo.
// Keep to 50 photos or fewer. Resize images to roughly 1600px wide and under
// 300KB each so pages load quickly on phones.
//
// Currently showing the first 20 photos. Add the remaining autumnShowcase
// photos (2621 to 2649) here once they have been resized.

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

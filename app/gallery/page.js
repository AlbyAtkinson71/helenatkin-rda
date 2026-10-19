// app/gallery/page.js
import Gallery from '../components/Gallery';
import { getGalleryPhotos } from '../../lib/gallery';

export const metadata = {
  title: 'Photo Gallery',
  description: 'Photos from Helen Atkin Group RDA: riders, volunteers and events in Buxton',
};

export default function GalleryPage() {
  const photos = getGalleryPhotos();

  return (
    <main id="main-content" className="py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Photo Gallery
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Photos from Helen Atkin Group RDA: riders, volunteers and events in Buxton
          </p>
        </header>

        {photos.length > 0 ? (
          <Gallery images={photos} />
        ) : (
          <p className="text-center text-gray-600 text-lg">Photos will appear here soon.</p>
        )}

        <div className="mt-12 text-center text-gray-600">
          <p>Showing {photos.length} photos</p>
        </div>
      </div>
    </main>
  );
}

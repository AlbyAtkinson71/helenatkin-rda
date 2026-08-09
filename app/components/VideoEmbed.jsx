// app/components/VideoEmbed.jsx
// Accessible, responsive YouTube video embed (privacy-enhanced mode)

export default function VideoEmbed({ youtubeId, title }) {
  if (!youtubeId) return null;

  return (
    <div className="my-8">
      <div className="relative w-full rounded-lg overflow-hidden shadow-sm" style={{ paddingBottom: '56.25%' /* 16:9 aspect ratio */ }}>
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}`}
          title={title || 'Embedded video'}
          frameBorder="0"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </div>
  );
}

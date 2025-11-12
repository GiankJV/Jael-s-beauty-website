export const metadata = {
  title: "Gallery | Jael's Beauty Salon",
  description: 'Browse the latest hair transformations and beauty creations from Jael’s Beauty Salon.',
};

/**
 * Gallery page showing a simple grid of placeholders. Swap these blocks for
 * your own photos and implement a lightbox effect to allow users to view
 * full‑size images.
 */
export default function GalleryPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="font-display text-4xl text-rose text-center mb-8">Gallery</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="aspect-square bg-rose/20 rounded-2xl flex items-center justify-center text-ink font-medium hover:bg-rose/30 cursor-pointer"
          >
            Photo {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
}
import GalleryContent from "@/components/GalleryContent";

export const metadata = {
  title: "Gallery | Jael's Beauty Salon",
  description:
    "Browse the latest hair transformations and beauty creations from Jael’s Beauty Salon.",
};

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-beige">
      <GalleryContent />
    </main>
  );
}

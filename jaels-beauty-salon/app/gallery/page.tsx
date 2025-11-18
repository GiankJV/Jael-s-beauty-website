import GalleryContent from "@/components/GalleryContent";

export const metadata = {
  title: "Gallery | Jael's Beauty Salon",
  description:
    "Browse the latest spa-worthy hair transformations and color work from Jael’s Beauty Salon across the Mississippi Gulf Coast.",
};

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-beige">
      <GalleryContent />
    </main>
  );
}

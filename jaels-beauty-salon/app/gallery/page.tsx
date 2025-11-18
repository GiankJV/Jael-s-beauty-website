import BeforeAfterGallery from "@/components/BeforeAfterGallery";

export const metadata = {
  title: "Gallery | Jael's Beauty Salon",
  description:
    "Browse the latest hair transformations and beauty creations from Jael’s Beauty Salon.",
};

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-beige">
      <section className="max-w-7xl mx-auto px-6 py-16 space-y-10">
        <header className="space-y-3 text-center">
          <h1
            className="text-4xl font-semibold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Before &amp; After Transformations
          </h1>
          <p className="text-ink/70 max-w-2xl mx-auto">
            Real guests, real results. Explore Jael&apos;s custom color and dimensional work.
          </p>
        </header>

        <BeforeAfterGallery />
      </section>
    </main>
  );
}

"use client";

import { useLang } from "@/context/LanguageContext";
import BeforeAfterGallery from "@/components/BeforeAfterGallery";

export default function GalleryContent() {
  const { lang } = useLang();

  return (
    <section className="max-w-7xl mx-auto px-6 py-16 space-y-10">
      <header className="space-y-3 text-center">
        <h1
          className="text-4xl font-semibold"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {lang === "en" ? "Before & After Transformations" : "Transformaciones de antes y después"}
        </h1>
        <p className="text-ink/70 max-w-2xl mx-auto">
          {lang === "en"
            ? "Real guests, real results. Explore Jael's custom color and dimensional work."
            : "Clientes reales, resultados reales. Explora el color y los looks dimensionales personalizados de Jael."}
        </p>
      </header>

      <BeforeAfterGallery />
    </section>
  );
}

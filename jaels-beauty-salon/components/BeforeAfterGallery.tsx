"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const BASE_PATH = "/Jael_before_after_gallery";

const models = Array.from({ length: 13 }, (_, i) => {
  const num = String(i + 1).padStart(2, "0");
  return {
    id: i + 1,
    before: `${BASE_PATH}/jaels-model-${num}-before.webp`,
    after: `${BASE_PATH}/jaels-model-${num}-after.webp`,
  };
});

export default function BeforeAfterGallery() {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i - 1 + models.length) % models.length);
  const next = () => setIndex((i) => (i + 1) % models.length);

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % models.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative max-w-5xl mx-auto">
      {/* Carousel viewport */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-[800ms] ease-[cubic-bezier(0.22,0.61,0.36,1)]"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {models.map((model) => (
            <article
              key={model.id}
              className="w-full flex-shrink-0 px-2 md:px-4"
            >
              <div className="grid gap-4 md:grid-cols-2 items-start">
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-wide text-ink/60">
                    Before
                  </p>
                  <div className="overflow-hidden rounded-2xl border border-rose/20 bg-white aspect-[3/4] max-w-[420px] mx-auto">
                    <Image
                      src={model.before}
                      alt={`Before – Jael's model ${String(model.id).padStart(
                        2,
                        "0"
                      )}`}
                      width={500}
                      height={660}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-wide text-ink/60">
                    After
                  </p>
                  <div className="overflow-hidden rounded-2xl border border-rose/20 bg-white aspect-[3/4] max-w-[420px] mx-auto">
                    <Image
                      src={model.after}
                      alt={`After – Jael's model ${String(model.id).padStart(
                        2,
                        "0"
                      )}`}
                      width={500}
                      height={660}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Navigation arrows beside the carousel */}
      <button
        onClick={prev}
        aria-label="Previous"
        className="hidden md:flex absolute left-[-70px] top-1/2 -translate-y-1/2 items-center justify-center px-6 py-2 rounded-full bg-[#e8b3b3] text-ink text-xl font-semibold shadow-md hover:shadow-lg transition"
      >
        ‹
      </button>
      <button
        onClick={next}
        aria-label="Next"
        className="hidden md:flex absolute right-[-70px] top-1/2 -translate-y-1/2 items-center justify-center px-6 py-2 rounded-full bg-[#e8b3b3] text-ink text-xl font-semibold shadow-md hover:shadow-lg transition"
      >
        ›
      </button>

      {/* Mobile arrows below */}
      <div className="mt-6 flex md:hidden items-center justify-between gap-4">
        <button
          onClick={prev}
          className="flex-1 px-5 py-2 rounded-full bg-[#e8b3b3] text-ink text-lg font-medium shadow-md hover:shadow-lg transition"
        >
          ‹
        </button>
        <button
          onClick={next}
          className="flex-1 px-5 py-2 rounded-full bg-[#e8b3b3] text-ink text-lg font-medium shadow-md hover:shadow-lg transition"
        >
          ›
        </button>
      </div>
    </section>
  );
}

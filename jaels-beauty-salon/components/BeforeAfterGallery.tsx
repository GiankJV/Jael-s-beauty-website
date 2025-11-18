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
  const current = models[index];

  const prev = () => setIndex((i) => (i - 1 + models.length) % models.length);
  const next = () => setIndex((i) => (i + 1) % models.length);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % models.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative max-w-4xl mx-auto">
      <article key={current.id} className="space-y-4 slide-fade">
        <div className="grid gap-4 md:grid-cols-2 items-start">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-wide text-ink/60">Before</p>
            <div className="overflow-hidden rounded-2xl border border-rose/20 bg-white">
              <Image
                src={current.before}
                alt={`Before – Jael's model ${String(current.id).padStart(2, "0")}`}
                width={350}
                height={450}
                className="h-full w-full object-cover"
                priority={index === 0}
              />
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xs uppercase tracking-wide text-ink/60">After</p>
            <div className="overflow-hidden rounded-2xl border border-rose/20 bg-white">
              <Image
                src={current.after}
                alt={`After – Jael's model ${String(current.id).padStart(2, "0")}`}
                width={350}
                height={450}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </article>

      {/* Navigation */}
      <div className="mt-6 flex items-center justify-between gap-4">
        <button
          aria-label="Previous transformation"
          className="inline-flex items-center justify-center px-6 py-2 rounded-full bg-[#e8b3b3] text-ink font-semibold shadow hover:bg-rose/80 transition"
          onClick={prev}
        >
          ‹
        </button>
        <button
          aria-label="Next transformation"
          className="inline-flex items-center justify-center px-6 py-2 rounded-full bg-[#e8b3b3] text-ink font-semibold shadow hover:bg-rose/80 transition"
          onClick={next}
        >
          ›
        </button>
      </div>

      <style jsx>{`
        @keyframes slideFade {
          from {
            opacity: 0;
            transform: translateX(35px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .slide-fade {
          animation: slideFade 0.7s ease;
        }
      `}</style>
    </section>
  );
}

"use client";

import { useEffect, useState } from 'react';

interface Testimonial {
  name: string;
  quote: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Sarah M.',
    quote:
      'The stylists at Jael’s always make me feel pampered and gorgeous. I wouldn’t trust my hair anywhere else!',
  },
  {
    name: 'Lena R.',
    quote:
      'Absolutely love their balayage and blowout services. The salon is warm, welcoming and so chic!',
  },
  {
    name: 'Trina D.',
    quote:
      'My bridal hair trial was perfection. Jael’s team listened to every detail and brought my vision to life.',
  },
  {
    name: 'Kim S.',
    quote:
      'Best facial in Gulfport! My skin is glowing and I feel rejuvenated after every visit.',
  },
  {
    name: 'Dana H.',
    quote:
      'Friendly staff, clean salon and stunning results every time. Highly recommend for anyone in Biloxi.',
  },
  {
    name: 'Amanda B.',
    quote:
      'From the moment you walk in you’re treated like royalty. Their spa packages are a dream!',
  },
];

/**
 * A simple carousel that cycles through client testimonials. The component
 * auto‑advances every 7 seconds and provides manual navigation controls.
 */
export default function TestimonialCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const current = testimonials[index];
  return (
    <div className="relative w-full max-w-xl mx-auto">
      <blockquote className="text-center px-6">
        <p className="text-lg italic mb-4">“{current.quote}”</p>
        <footer className="text-sm font-semibold">— {current.name}</footer>
      </blockquote>
      {/* Navigation */}
      <div className="absolute inset-y-0 left-0 flex items-center">
        <button
          aria-label="Previous testimonial"
          className="p-2 text-rose hover:text-ink"
          onClick={() => setIndex((index - 1 + testimonials.length) % testimonials.length)}
        >
          ‹
        </button>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center">
        <button
          aria-label="Next testimonial"
          className="p-2 text-rose hover:text-ink"
          onClick={() => setIndex((index + 1) % testimonials.length)}
        >
          ›
        </button>
      </div>
    </div>
  );
}
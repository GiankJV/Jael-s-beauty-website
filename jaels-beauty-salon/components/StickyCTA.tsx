"use client";

import Link from 'next/link';
import { useLang } from '@/context/LanguageContext';

/**
 * Sticky call‑to‑action button that stays pinned to the bottom of the viewport
 * on mobile screens. It now routes guests into the vision experience instead
 * of opening the Square booking modal directly.
 */
export default function StickyCTA() {
  const { lang } = useLang();
  return (
    <Link
      href="/hair/start"
      className="fixed bottom-4 left-1/2 transform -translate-x-1/2 md:hidden bg-rose text-white px-6 py-3 rounded-full shadow-lg z-40 hover:bg-rose/90 transition"
      aria-label={lang === 'en' ? 'Start with your vision' : 'Empezar con tu visión'}
    >
      {lang === 'en' ? 'Start with your vision' : 'Empezar con tu visión'}
    </Link>
  );
}

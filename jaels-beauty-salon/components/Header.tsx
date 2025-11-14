"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useLang } from '@/context/LanguageContext';

export interface HeaderProps {
  /**
   * Header no longer controls the booking modal directly.
   * All booking starts from the "What's your vision?" flow.
   */
}

/**
 * Responsive site header that hides when scrolling down and reappears on
 * scroll up. Includes navigation links plus the bilingual vision CTA.
 */
export default function Header({}: HeaderProps) {
  const [hidden, setHidden] = useState(false);
  const [lastY, setLastY] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, toggleLang } = useLang();

  useEffect(() => {
    function onScroll() {
      const currentY = window.scrollY;
      setHidden(currentY > lastY && currentY > 100);
      setLastY(currentY);
    }
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [lastY]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-transform duration-300 bg-pink/90 backdrop-blur-md ${
        hidden ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
        <Link href="/" aria-label="Jael's Beauty Salon home" className="flex items-center">
          <span className="flex items-baseline gap-1">
            <span className="font-script text-2xl leading-none text-ink">Jael&apos;s</span>
            <span className="font-display text-xs md:text-sm tracking-[0.25em] uppercase text-ink/80">
              Beauty Salon
            </span>
          </span>
        </Link>
        <nav className="hidden md:flex gap-6 items-center font-medium">
          <Link href="/services" className="hover:text-rose transition-colors">Services</Link>
          <Link href="/about" className="hover:text-rose transition-colors">About</Link>
          <Link href="/gallery" className="hover:text-rose transition-colors">Gallery</Link>
          <Link href="/testimonials" className="hover:text-rose transition-colors">Testimonials</Link>
          <Link href="/contact" className="hover:text-rose transition-colors">Contact</Link>
          <button
            onClick={toggleLang}
            className="px-3 py-1 rounded-full border border-rose text-rose text-sm hover:bg-rose hover:text-white transition"
            aria-label="Toggle language"
          >
            {lang === 'en' ? 'ES' : 'EN'}
          </button>
        </nav>
        <button
          className="md:hidden flex items-center justify-center p-2 rounded-md hover:bg-rose/10"
          aria-label="Open menu"
          onClick={() => setMobileOpen((open) => !open)}
        >
          <svg
            className="h-6 w-6 text-ink"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
      {/* Mobile menu overlay */}
      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
    </header>
  );
}

// Separate component for mobile menu to avoid re-rendering entire header
interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

function MobileMenu({ open, onClose }: MobileMenuProps) {
  const { lang, toggleLang } = useLang();
  return (
    <div
      className={`md:hidden fixed inset-0 z-30 bg-ink/70 backdrop-blur-sm transition-opacity duration-300 ${
        open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      onClick={onClose}
    >
      <div
        className={`absolute top-16 left-4 right-4 bg-beige rounded-xl p-6 transform transition-transform duration-300 ${
          open ? 'translate-y-0' : '-translate-y-4'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <nav className="flex flex-col gap-4 text-lg">
          <Link href="/services" onClick={onClose}>Services</Link>
          <Link href="/about" onClick={onClose}>About</Link>
          <Link href="/gallery" onClick={onClose}>Gallery</Link>
          <Link href="/testimonials" onClick={onClose}>Testimonials</Link>
          <Link href="/contact" onClick={onClose}>Contact</Link>
          <button
            onClick={() => {
              toggleLang();
            }}
            className="px-3 py-1 rounded-full border border-rose text-rose text-sm hover:bg-rose hover:text-white transition"
          >
            {lang === 'en' ? 'ES' : 'EN'}
          </button>
        </nav>
      </div>
    </div>
  );
}

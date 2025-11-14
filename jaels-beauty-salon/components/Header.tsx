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
type NavLinkConfig = {
  href: string;
  label: { en: string; es: string };
};

const navLinks: NavLinkConfig[] = [
  { href: '/services', label: { en: 'Services', es: 'Servicios' } },
  { href: '/about', label: { en: 'About', es: 'Nosotras' } },
  { href: '/gallery', label: { en: 'Gallery', es: 'Galería' } },
  { href: '/testimonials', label: { en: 'Testimonials', es: 'Testimonios' } },
  { href: '/contact', label: { en: 'Contact', es: 'Contacto' } },
];

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

  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const handleScroll = () => setMobileOpen(false);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-transform duration-300 bg-pink/95 ${
        hidden ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between py-5 md:py-6 px-6">
        <Link href="/" aria-label="Jael's Beauty Salon home">
          <BrandLogo />
        </Link>
        <nav className="hidden md:flex gap-6 items-center font-body text-[15px] md:text-base">
          {navLinks.map(({ href, label }) => (
            <Link key={href} href={href} className="hover:text-rose transition-colors">
              {label[lang]}
            </Link>
          ))}
          <button
            onClick={toggleLang}
            className="px-4 py-1.5 rounded-full border border-rose text-rose text-sm hover:bg-rose hover:text-white transition"
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
      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        navLinks={navLinks.map(({ href, label }) => ({ href, label: label[lang] }))}
      />
    </header>
  );
}

type NavLink = {
  href: string;
  label: string;
};

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  navLinks: NavLink[];
};

function MobileMenu({ open, onClose, navLinks }: MobileMenuProps) {
  const { toggleLang, lang } = useLang();

  return (
    <div
      className={`
        fixed inset-0 z-[9999] md:hidden
        ${open ? 'pointer-events-auto' : 'pointer-events-none'}
      `}
    >
      {/* Solid full-screen background */}
      <div
        className={`
          absolute inset-0 bg-[#e8b3b3]
          transition-opacity duration-300
          ${open ? 'opacity-100' : 'opacity-0'}
        `}
      />

      {/* Sliding panel with the nav items */}
      <div
        className={`
          relative flex h-full w-full flex-col
          transition-transform duration-300
          ${open ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <nav className="pt-28 px-8 flex flex-col space-y-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="font-heading text-3xl leading-tight tracking-wide text-ink text-left"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="mt-auto px-8 pb-10">
          <button
            onClick={() => {
              toggleLang();
              onClose();
            }}
            className="w-full rounded-full border border-rose/60 px-6 py-3 text-base font-body text-rose hover:bg-rose/20 transition"
          >
            {lang === 'en' ? 'ES' : 'EN'}
          </button>
        </div>
      </div>
    </div>
  );
}

function BrandLogo() {
  return (
    <span className="flex items-center gap-2 text-ink">
      <span className="font-logo text-2xl md:text-3xl leading-none">Jael&apos;s</span>
      <span className="font-brand-small text-[0.7rem] md:text-xs">Beauty Salon</span>
    </span>
  );
}

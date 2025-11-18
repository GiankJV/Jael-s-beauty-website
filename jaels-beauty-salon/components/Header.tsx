"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useLang } from '@/context/LanguageContext';
import { LanguageToggle } from '@/components/LanguageToggle';

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
  const { lang } = useLang();

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
      className={`
        fixed left-0 right-0 z-40 bg-pink/95
        transition-[top] duration-300
        ${hidden ? '-top-24' : 'top-0'}
      `}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between py-5 md:py-6 px-6">
        <Link href="/" aria-label="Jael's Beauty Salon home">
          <BrandLogo />
        </Link>

        {/* Right side: language + nav/menu */}
        <div className="flex items-center gap-4">
          {/* Mobile language pill */}
          <div className="md:hidden">
            <LanguageToggle />
          </div>

          {/* Desktop nav + pill */}
          <nav className="hidden md:flex gap-6 items-center font-body text-[15px] md:text-base">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="hover:text-rose transition-colors"
              >
                {label[lang]}
              </Link>
            ))}
            <LanguageToggle />
          </nav>

          {/* Mobile menu button */}
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
      </div>
      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        navLinks={navLinks.map(({ href, label }) => ({ href, label: label[lang] }))}
        lang={lang}
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

function MobileMenu({ open, onClose, navLinks, lang }: MobileMenuProps & { lang: string }) {
  return (
    <div
      className={`
        fixed inset-0 z-[9999] md:hidden
        ${open ? 'pointer-events-auto' : 'pointer-events-none'}
      `}
    >
      {/* Rose background overlay */}
      <div
        className={`
          absolute inset-0 bg-[#e8b3b3]
          transition-opacity duration-300
          ${open ? 'opacity-100' : 'opacity-0'}
        `}
      />

      {/* Sliding panel */}
      <div
        className={`
          relative flex h-full w-full flex-col
          transition-transform duration-300
          ${open ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* Top row: X + language pill */}
        <div className="flex items-center justify-between px-8 pt-10">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="p-2 -ml-2 rounded-full hover:bg-rose/20"
          >
            <svg
              className="h-6 w-6 text-ink"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <LanguageToggle />
        </div>
        <div className="px-8 pt-4">
          <ReviewCTA lang={lang} />
        </div>

        {/* Nav links */}
        <nav className="mt-20 px-8 flex flex-col space-y-12">
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

function ReviewCTA({ lang }: { lang: string }) {
  const [canReview, setCanReview] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const flag = window.localStorage.getItem('jaels_hair_onboarded');
    if (flag === 'true') setCanReview(true);
  }, []);

  if (!canReview) return null;

  return (
    <Link
      href="/reviews"
      className="inline-flex rounded-full border border-rose/40 px-4 py-2 text-xs md:text-sm hover:bg-rose/5"
    >
      {lang === 'en' ? 'Leave a review' : 'Dejar una reseña'}
    </Link>
  );
}

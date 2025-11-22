"use client";

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyCTA from '@/components/StickyCTA';

/**
 * Shared layout wrapper that keeps the sticky header/footer around every page
 * and preserves the mobile CTA pointing to the vision flow.
 */
export default function LayoutWithBooking({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Header is fixed at top; add top padding to main content equal to header height */}
      <Header mobileOpen={mobileMenuOpen} setMobileOpen={setMobileMenuOpen} />
      <main className="pt-20">{children}</main>
      <Footer />
      {/* Sticky CTA appears only on mobile */}
      <StickyCTA onBeforeNavigate={() => setMobileMenuOpen(false)} />
    </>
  );
}

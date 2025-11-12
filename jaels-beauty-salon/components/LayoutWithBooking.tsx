"use client";

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyCTA from '@/components/StickyCTA';
import BookingModal from '@/components/BookingModal';
import { useBooking } from '@/context/BookingContext';

/**
 * Internal component that consumes the booking context and passes open/close
 * handlers down to the header, sticky CTA and booking modal. Having this
 * component separate from the root layout allows us to call the
 * `useBooking` hook safely within the provider.
 */
export default function LayoutWithBooking({ children }: { children: React.ReactNode }) {
  const { open, openBooking, closeBooking } = useBooking();
  return (
    <>
      {/* Header is fixed at top; add top padding to main content equal to header height */}
      <Header onOpenBooking={openBooking} />
      <main className="pt-20">{children}</main>
      <Footer />
      {/* Sticky CTA appears only on mobile */}
      <StickyCTA onOpenBooking={openBooking} />
      {/* Booking modal overlay */}
      <BookingModal open={open} onClose={closeBooking} />
    </>
  );
}


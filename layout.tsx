import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyCTA from '@/components/StickyCTA';
import BookingModal from '@/components/BookingModal';
import { Fraunces, Quicksand } from 'next/font/google';
import Script from 'next/script';
import { BookingProvider, useBooking } from '@/context/BookingContext';

// Load Google fonts and attach them to CSS variables.  The `variable`
// properties correspond to the custom CSS variables defined in
// `globals.css`.
const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-display' });
const quicksand = Quicksand({ subsets: ['latin'], variable: '--font-body' });

export const metadata = {
  title: "Jael's Beauty Salon",
  description:
    'Luxury beauty salon in Gulfport serving Biloxi, Gulfport and the surrounding 100‑mile area. Hair, spa and bridal services by appointment.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${quicksand.variable}`}> 
      <head>
        {/* Insert the Nanochat script here if provided. Replace `YOUR_NANOCHAT_SCRIPT` with your snippet */}
        {process.env.NEXT_PUBLIC_NANOCHAT_SCRIPT && (
          <Script
            id="nanochat-script"
            dangerouslySetInnerHTML={{ __html: process.env.NEXT_PUBLIC_NANOCHAT_SCRIPT }}
          />
        )}
      </head>
      <body>
        {/* Wrap the children within the BookingProvider so any component
            can access the booking context via useBooking. */}
        <BookingProvider>
          <LayoutWithBooking>{children}</LayoutWithBooking>
        </BookingProvider>
      </body>
    </html>
  );
}

/**
 * Internal component that consumes the booking context and passes open/close
 * handlers down to the header, sticky CTA and booking modal. Having this
 * component separate from the root layout allows us to call the
 * `useBooking` hook safely within the provider.
 */
function LayoutWithBooking({ children }: { children: React.ReactNode }) {
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
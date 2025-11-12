"use client";

import { useEffect } from 'react';

export interface BookingModalProps {
  open: boolean;
  onClose: () => void;
}

/**
 * A fullscreen modal that houses the Square appointments widget. The URL for
 * the widget should be provided via the `NEXT_PUBLIC_SQUARE_BOOKING_URL`
 * environment variable. If not present, a helpful message is displayed to
 * assist the developer in configuring the booking integration.
 */
export default function BookingModal({ open, onClose }: BookingModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;
  const bookingUrl = process.env.NEXT_PUBLIC_SQUARE_BOOKING_URL || '';
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 backdrop-blur-sm">
      <div className="relative bg-beige rounded-2xl w-[90vw] max-w-3xl max-h-[90vh] overflow-hidden shadow-xl">
        <button
          onClick={onClose}
          aria-label="Close booking dialog"
          className="absolute top-4 right-4 text-2xl font-bold text-ink hover:text-rose"
        >
          &times;
        </button>
        {bookingUrl ? (
          <iframe
            src={bookingUrl}
            className="w-full h-[85vh] border-0"
            allow="payment"
            title="Square Appointment Booking"
          ></iframe>
        ) : (
          <div className="p-8 text-center space-y-4">
            <h2 className="font-display text-2xl">Booking widget not configured</h2>
            <p className="max-w-prose mx-auto">
              To enable online booking, set the{' '}
              <code className="bg-rose/10 px-1 py-0.5 rounded">NEXT_PUBLIC_SQUARE_BOOKING_URL</code>{' '}
              environment variable with your Square booking embed URL. You can find this in your Square
              Dashboard under Appointments → Online Booking → Website Embed.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
"use client";

export interface StickyCTAProps {
  onOpenBooking?: () => void;
}

/**
 * Sticky call‑to‑action button that stays pinned to the bottom of the viewport
 * on mobile screens. It triggers the booking modal when clicked. Hidden on
 * medium and larger screens where the header includes the CTA.
 */
export default function StickyCTA({ onOpenBooking }: StickyCTAProps) {
  return (
    <button
      onClick={onOpenBooking}
      className="fixed bottom-4 left-1/2 transform -translate-x-1/2 md:hidden bg-rose text-white px-6 py-3 rounded-full shadow-lg z-40 hover:bg-rose/90 transition"
      aria-label="Book an appointment"
    >
      Book Now
    </button>
  );
}
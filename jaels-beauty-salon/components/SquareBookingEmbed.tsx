'use client';

import { useEffect, useRef } from 'react';

export default function SquareBookingEmbed() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const src = process.env.NEXT_PUBLIC_SQUARE_BOOKING_URL;

  useEffect(() => {
    if (!src || !containerRef.current) return;

    containerRef.current.innerHTML = '';
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    containerRef.current.appendChild(script);
  }, [src]);

  if (!src) {
    return (
      <p className="text-sm text-center opacity-70">
        Booking widget not configured. Please add NEXT_PUBLIC_SQUARE_BOOKING_URL.
      </p>
    );
  }

  return <div ref={containerRef} />;
}

'use client';

export default function SquareBookingEmbed() {
  const src = process.env.NEXT_PUBLIC_SQUARE_BOOKING_URL;

  if (!src) {
    return (
      <p className="text-sm text-center opacity-70">
        Booking widget not configured. Please add NEXT_PUBLIC_SQUARE_BOOKING_URL to your
        environment variables.
      </p>
    );
  }

  return (
    <div className="w-full">
      <iframe
        src={src}
        className="w-full h-[700px] rounded-2xl border-0 bg-white"
        loading="lazy"
        allow="payment app.squareup.com"
        title="Jael's Beauty Salon spa booking"
      />
    </div>
  );
}

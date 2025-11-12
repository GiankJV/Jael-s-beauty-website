export const metadata = {
  title: "Book | Jael's Beauty Salon",
  description: 'Schedule your appointment with Jael’s Beauty Salon using our online booking widget.',
};

/**
 * Full‑page booking experience. Embeds the Square booking widget when the
 * `NEXT_PUBLIC_SQUARE_BOOKING_URL` environment variable is set. Otherwise
 * displays instructions to configure it.
 */
export default function BookPage() {
  const bookingUrl = process.env.NEXT_PUBLIC_SQUARE_BOOKING_URL || '';
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="font-display text-4xl text-rose text-center mb-6">Book an Appointment</h1>
      {bookingUrl ? (
        <iframe
          src={bookingUrl}
          className="w-full h-[1200px] border-0 rounded-2xl shadow"
          allow="payment"
          title="Square Appointment Booking"
        ></iframe>
      ) : (
        <div className="bg-beige rounded-2xl p-8 text-center">
          <h2 className="font-display text-2xl mb-4">Booking widget not configured</h2>
          <p>
            To embed your Square appointments widget, set the{' '}
            <code className="bg-rose/10 px-1 py-0.5 rounded">NEXT_PUBLIC_SQUARE_BOOKING_URL</code>{' '}
            environment variable with the URL obtained from your Square Dashboard.
          </p>
        </div>
      )}
    </div>
  );
}
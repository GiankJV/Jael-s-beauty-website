'use client';
import { useBooking } from '@/context/BookingContext';

export default function SpaCard({
  name,
  duration,
  price,
  bullets,
}: {
  name: string;
  duration: string;
  price: number;
  bullets: string[];
}) {
  const { openBooking } = useBooking();
  return (
    <article className="card p-6 shadow-sm border border-black/5">
      <header className="mb-3">
        <h3 className="text-2xl font-semibold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
          {name}
        </h3>
        <p className="text-sm opacity-80" style={{ fontFamily: 'var(--font-body)' }}>
          {duration} · ${price}
        </p>
      </header>
      <ul className="space-y-2 text-sm leading-relaxed">
        {bullets.map((b, i) => (
          <li key={i} className="list-disc ml-5">
            {b}
          </li>
        ))}
      </ul>
      <button
        onClick={openBooking}
        className="mt-5 inline-flex items-center justify-center rounded-full px-5 py-2 text-white"
        style={{ background: '#D7ABA5' }}
        aria-label={`Book ${name}`}
      >
        Book Now
      </button>
    </article>
  );
}

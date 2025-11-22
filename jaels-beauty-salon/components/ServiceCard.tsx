"use client";

import Link from 'next/link';
import { useLang } from '@/context/LanguageContext';

export interface Service {
  title: string;
  description: string;
  price?: string;
  duration?: string;
  bookingUrl?: string;
}

export interface ServiceCardProps {
  service: Service;
}

/**
 * Card component used on the Services page. Displays a service name,
 * description, optional duration and price, and now routes to the vision flow.
 */
export default function ServiceCard({ service }: ServiceCardProps) {
  const { lang } = useLang();
  const label = service.bookingUrl
    ? (lang === 'en' ? 'Book this ritual' : 'Reservar este ritual')
    : (lang === 'en' ? 'Start with your vision' : 'Empezar con tu visión');
  return (
    <div className="card flex flex-col justify-between h-full">
      <div>
        <h3 className="font-display text-xl text-rose mb-2">{service.title}</h3>
        <p className="mb-2 text-sm leading-relaxed">{service.description}</p>
        {service.duration && (
          <p className="text-sm"><strong>Duration:</strong> {service.duration}</p>
        )}
        {service.price && (
          <p className="text-sm"><strong>Price:</strong> {service.price}</p>
        )}
      </div>
      {service.bookingUrl ? (
        <a
          href={service.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center justify-center rounded-full px-5 py-2 text-white self-start"
          style={{ background: '#D7ABA5' }}
        >
          {label}
        </a>
      ) : (
        <Link
          href="/vision"
          className="mt-4 inline-flex items-center justify-center rounded-full px-5 py-2 text-white self-start"
          style={{ background: '#D7ABA5' }}
        >
          {label}
        </Link>
      )}
    </div>
  );
}

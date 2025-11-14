'use client';
import { useLang } from '@/context/LanguageContext';
import { SpaService } from '@/lib/services/spa';

export default function SpaCard({ service }: { service: SpaService }) {
  const { lang } = useLang();
  return (
    <article className="card p-6 shadow-sm border border-black/5">
      <header className="mb-3">
        <h3 className="text-2xl font-semibold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
          {service.name[lang]}
        </h3>
        <p className="text-sm opacity-80" style={{ fontFamily: 'var(--font-body)' }}>
          {service.duration} · ${service.price}
        </p>
      </header>
      <p className="text-sm leading-relaxed">{service.description[lang]}</p>
      <a
        href="#book-spa"
        className="mt-5 inline-flex items-center justify-center rounded-full px-5 py-2 text-white"
        style={{ background: '#D7ABA5' }}
      >
        {lang === 'en' ? 'Book this ritual' : 'Reservar este ritual'}
      </a>
    </article>
  );
}

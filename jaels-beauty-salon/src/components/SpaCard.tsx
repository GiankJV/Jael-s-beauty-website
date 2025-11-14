'use client';
import Link from 'next/link';
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
      <Link
        href="/vision"
        className="mt-5 inline-flex items-center justify-center rounded-full px-5 py-2 text-white"
        style={{ background: '#D7ABA5' }}
        aria-label={lang === 'en' ? `Start vision quiz` : 'Comienza con tu visión'}
      >
        {lang === 'en' ? 'Start with your vision' : 'Empezar con tu visión'}
      </Link>
    </article>
  );
}

"use client";

import Link from 'next/link';
import { useLang } from '@/context/LanguageContext';

const cards = [
  {
    key: 'hair',
    title: { en: 'Hair', es: 'Cabello' },
    description: {
      en: 'Cuts, color, extensions, and styling tailored to every hair type.',
      es: 'Cortes, color, extensiones y peinados a medida para cada tipo de cabello.',
    },
    href: '/hair/start',
    cta: { en: 'Start with your vision', es: 'Empezar con tu visión' },
  },
  {
    key: 'spa',
    title: { en: 'Spa', es: 'Spa' },
    description: {
      en: 'Japanese-inspired scalp rituals that melt stress and revive shine.',
      es: 'Rituales japoneses para el cuero cabelludo que alivian el estrés y devuelven el brillo.',
    },
    href: '/services#spa',
    cta: { en: 'Book spa', es: 'Reservar spa' },
  },
];

export default function QuickBookGrid() {
  const { lang } = useLang();
  return (
    <section className="mt-10 md:mt-12">
      <h2
        className="font-display text-center text-2xl md:text-3xl mb-8"
      >
        {lang === 'en' ? 'How can we pamper you?' : '¿Cómo podemos consentirte?'}
      </h2>
      <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map((card) => (
          <div key={card.key} className="card flex flex-col justify-between text-left">
            <div>
              <h3 className="font-display text-xl mb-2 text-rose">{card.title[lang]}</h3>
              <p className="text-sm md:text-base opacity-80">{card.description[lang]}</p>
            </div>
            <Link
              href={card.href}
              className="mt-6 inline-flex items-center justify-center rounded-full px-5 py-2 text-white shadow hover:bg-rose/90 transition"
              style={{ background: '#D7ABA5' }}
            >
              {card.cta[lang]}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

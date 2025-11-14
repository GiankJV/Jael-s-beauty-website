"use client";

import Link from 'next/link';
import { useLang } from '@/context/LanguageContext';

interface Category {
  title: string;
  description: string;
}

const categories: Category[] = [
  {
    title: 'Hair',
    description: 'Cuts, colour, extensions and styling for every hair type.',
  },
  {
    title: 'Spa',
    description: 'Facials, waxing, brows and relaxing spa treatments.',
  },
];

/**
 * Display a grid of key service categories for quick explorations. Each card
 * now nudges guests into the vision quiz instead of the Square modal.
 */
export default function QuickBookGrid() {
  const { lang } = useLang();
  return (
    <div className="grid sm:grid-cols-3 gap-6 mt-8">
      {categories.map((cat) => {
        const isSpa = cat.title === 'Spa';
        return (
          <div key={cat.title} className="card flex flex-col justify-between">
            <div>
              <h3 className="font-display text-xl mb-2 text-rose">{cat.title}</h3>
              <p className="text-sm mb-4">{cat.description}</p>
            </div>
            <Link
              href={isSpa ? '/services#spa' : '/vision'}
              className="self-start mt-auto inline-flex items-center justify-center rounded-full px-4 py-2 text-white shadow hover:bg-rose/90 transition"
              style={{ background: '#D7ABA5' }}
            >
              {isSpa
                ? lang === 'en'
                  ? 'Book spa treatments'
                  : 'Reservar spa'
                : lang === 'en'
                ? 'Start with your vision'
                : 'Empezar con tu visión'}
            </Link>
          </div>
        );
      })}
    </div>
  );
}

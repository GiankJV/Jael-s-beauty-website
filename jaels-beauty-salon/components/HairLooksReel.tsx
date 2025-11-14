'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useLang } from '@/context/LanguageContext';

function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function HairLooksReel() {
  const { lang } = useLang();
  const [order, setOrder] = useState<string[]>([]);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    let cancelled = false;
    async function loadImages() {
      try {
        const res = await fetch('/api/hair-images');
        if (!res.ok) return;
        const data = await res.json();
        const list = Array.isArray(data?.images) ? data.images : [];
        if (!cancelled && list.length > 0) {
          setOrder(shuffle(list));
        }
      } catch (err) {
        console.error('Failed to load hair images', err);
      }
    }
    loadImages();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (order.length === 0) return;

    const interval = setInterval(
      () => setStartIndex((prev) => (prev + 1) % order.length),
      3000
    );
    return () => clearInterval(interval);
  }, [order]);

  if (order.length === 0) return null;

  const visible = [
    order[startIndex],
    order[(startIndex + 1) % order.length],
    order[(startIndex + 2) % order.length],
  ];

  return (
    <section className="mt-10 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-3 gap-4">
        <h3
          className="text-xl md:text-2xl"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {lang === 'en' ? 'Hair transformations' : 'Transformaciones de cabello'}
        </h3>
        <a
          href="/vision"
          className="hidden md:inline-flex items-center justify-center rounded-full px-4 py-2 text-xs md:text-sm text-white"
          style={{ background: '#D7ABA5' }}
        >
          {lang === 'en' ? "What's your vision?" : '¿Cuál es tu visión?'}
        </a>
      </div>

      <p className="text-xs md:text-sm opacity-80 mb-4">
        {lang === 'en'
          ? 'A peek at some of our color, cuts and styling work. Share your own hair photos and vision to receive a personalized quote.'
          : 'Un vistazo a algunos de nuestros trabajos de color, cortes y peinados. Comparte tus fotos y tu visión para recibir una cotización personalizada.'}
      </p>

      <div className="overflow-hidden">
        <div className="flex gap-4 transition-transform duration-500 ease-out">
          {visible.map((src) => (
            <div
              key={src}
              className="relative w-1/3 min-w-[33%] aspect-[3/4] rounded-2xl overflow-hidden shadow-sm"
            >
              <Image
                src={src}
                alt="Hair transformation at Jael's Beauty Salon"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 33vw, 50vw"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 md:hidden">
        <a
          href="/vision"
          className="inline-flex items-center justify-center rounded-full px-4 py-2 text-xs text-white"
          style={{ background: '#D7ABA5' }}
        >
          {lang === 'en' ? "What's your vision?" : '¿Cuál es tu visión?'}
        </a>
      </div>
    </section>
  );
}

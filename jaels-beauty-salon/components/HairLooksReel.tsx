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

const photoList = Array.from({ length: 132 }, (_, i) => {
  const num = i + 1;
  const suffix = num < 10 ? `0${num}` : `${num}`;
  return `/Services_people_photos_only/services-photo-${suffix}.webp`;
});

type HairLooksReelProps = {
  hideIntro?: boolean;
};

export default function HairLooksReel({ hideIntro = false }: HairLooksReelProps) {
  const { lang } = useLang();
  const [order, setOrder] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function loadImages() {
      try {
        const res = await fetch('/api/hair-images');
        const data = res.ok ? await res.json() : null;
        const apiImages = Array.isArray(data?.images) ? data.images : [];
        const combined = shuffle([...photoList, ...apiImages]);
        if (!cancelled) {
          setOrder(combined);
        }
      } catch (err) {
        console.error('Failed to load hair images', err);
        if (!cancelled) {
          setOrder(shuffle(photoList));
        }
      }
    }

    loadImages();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (order.length <= 3) return;

    const maxIndex = order.length - 3;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= maxIndex) return 0;
        return prev + 1;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [order]);

  if (order.length === 0) return null;

  const canSlide = order.length > 3;

  return (
    <section className="mt-10 max-w-5xl mx-auto">
      {!hideIntro && (
        <>
          <div className="flex items-center justify-between mb-3 gap-4">
            <h3 className="font-display text-xl md:text-2xl">
              {lang === 'en' ? 'Hair transformations' : 'Transformaciones de cabello'}
            </h3>
            <a
              href="/hair/start"
              className="hidden md:inline-flex items-center justify-center rounded-full px-4 py-2 text-xs md:text-sm text-white"
              style={{ background: '#D7ABA5' }}
            >
              {lang === 'en' ? "What's your vision?" : '¿Cuál es tu visión?'}
            </a>
          </div>

          <p className="text-sm md:text-base opacity-80 mb-4">
            {lang === 'en'
              ? 'A peek at some of our color, cuts and styling work. Share your own hair photos and vision to receive a personalized quote.'
              : 'Un vistazo a algunos de nuestros trabajos de color, cortes y peinados. Comparte tus fotos y tu visión para recibir una cotización personalizada.'}
          </p>
        </>
      )}

      <div className="overflow-hidden">
        <div
          className={
            'flex ' +
            (canSlide
              ? 'transition-transform duration-1000 ease-[cubic-bezier(0.22,0.61,0.36,1)]'
              : '')
          }
          style={
            canSlide
              ? { transform: `translateX(-${currentIndex * (100 / 3)}%)` }
              : undefined
          }
        >
          {order.map((src) => (
            <div key={src} className="w-1/3 flex-none px-1 md:px-2">
              <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-sm">
                <Image
                  src={src}
                  alt="Hair transformation at Jael's Beauty Salon"
                  fill
                  className="object-cover transition-transform duration-1000 ease-out hover:scale-[1.03]"
                  sizes="(min-width: 1024px) 33vw, 50vw"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {!hideIntro && (
        <div className="mt-4 md:hidden">
          <a
            href="/hair/start"
            className="inline-flex items-center justify-center rounded-full px-4 py-2 text-xs text-white"
            style={{ background: '#D7ABA5' }}
          >
            {lang === 'en' ? "What's your vision?" : '¿Cuál es tu visión?'}
          </a>
        </div>
      )}
    </section>
  );
}

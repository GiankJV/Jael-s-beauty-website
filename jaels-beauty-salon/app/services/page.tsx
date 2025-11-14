"use client";

import Link from 'next/link';
import SpaCard from '@/components/SpaCard';
import HairLooksReel from '@/components/HairLooksReel';
import { useLang } from '@/context/LanguageContext';
import { spaServices } from '@/lib/services/spa';

export default function ServicesPage() {
  const { lang } = useLang();
  const servicesHeading = lang === 'en' ? 'Our Services' : 'Nuestros servicios';
  const spaHeading = lang === 'en' ? 'Spa' : 'Spa';
  const spaSubheading =
    lang === 'en' ? 'Japanese Head Spa Rituals' : 'Rituales Japoneses para la Cabeza';
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
      <section className="text-center mb-8">
        <h1
          className="text-4xl md:text-5xl mb-4 text-rose"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {servicesHeading}
        </h1>
        <p className="text-sm md:text-base opacity-80 mb-4 max-w-2xl mx-auto">
          {lang === 'en'
            ? 'Discover our signature Japanese head spa rituals, or start with your vision if you’re dreaming of a custom hair transformation.'
            : 'Descubre nuestros rituales de spa capilar japonés o empieza con tu visión si buscas una transformación de color o peinado a medida.'}
        </p>
        <Link
          href="/vision"
          className="inline-flex items-center justify-center rounded-full px-5 py-2 text-white"
          style={{ background: '#D7ABA5' }}
        >
          {lang === 'en' ? "What's your vision?" : '¿Cuál es tu visión?'}
        </Link>
      </section>

      <HairLooksReel />

      <section className="mt-8 max-w-2xl mx-auto text-center">
        <h3
          className="text-xl md:text-2xl mb-3"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {lang === 'en' ? 'What to expect' : 'Qué puedes esperar'}
        </h3>
        <ol className="space-y-2 text-sm md:text-base opacity-85 text-left md:text-center list-decimal list-inside">
          <li>
            {lang === 'en'
              ? 'A brief consultation to understand your scalp, hair, and relaxation goals.'
              : 'Una breve consulta para entender tu cuero cabelludo, cabello y objetivos de relajación.'}
          </li>
          <li>
            {lang === 'en'
              ? 'Deep cleansing, massage, and ritual tailored to your needs.'
              : 'Limpieza profunda, masaje y ritual adaptado a tus necesidades.'}
          </li>
          <li>
            {lang === 'en'
              ? 'Finishing touches and at-home care guidance to extend your results.'
              : 'Toques finales y guía de cuidado en casa para prolongar tus resultados.'}
          </li>
        </ol>
      </section>

      <section id="spa" className="scroll-mt-24 py-12">
        <header className="mb-6 text-center">
          <h2 className="text-2xl md:text-3xl" style={{ fontFamily: 'var(--font-display)' }}>
            {spaHeading}
          </h2>
          <p className="mt-2 text-sm md:text-base opacity-80">
            {spaSubheading}
          </p>
        </header>

        <div className="max-w-2xl mx-auto mb-6 text-sm md:text-base">
          <h3 className="font-semibold mb-2 text-center">
            {lang === 'en' ? "Perfect if you're feeling…" : 'Perfecto si te sientes…'}
          </h3>
          <ul className="list-disc list-inside space-y-1 opacity-85 text-left">
            <li>
              {lang === 'en'
                ? 'Stressed, heavy, or mentally overloaded.'
                : 'Estresada, cargada o mentalmente saturada.'}
            </li>
            <li>
              {lang === 'en'
                ? 'Experiencing scalp tightness, dryness, or buildup.'
                : 'Con tensión, resequedad o acumulación en el cuero cabelludo.'}
            </li>
            <li>
              {lang === 'en'
                ? 'Wanting a luxurious reset without changing your haircut or color.'
                : 'Con ganas de un reset de lujo sin cambiar corte o color.'}
            </li>
          </ul>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {spaServices.map((s) => (
            <SpaCard key={s.id} service={s} />
          ))}
        </div>
      </section>
    </div>
  );
}

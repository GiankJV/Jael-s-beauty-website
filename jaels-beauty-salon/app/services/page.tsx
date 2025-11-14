"use client";

import Link from 'next/link';
import SpaCard from '@/components/SpaCard';
import SquareBookingEmbed from '@/components/SquareBookingEmbed';
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
      <section className="max-w-4xl mx-auto text-center mb-8">
        <h1
          className="text-4xl md:text-5xl mb-3 text-rose"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {servicesHeading}
        </h1>
        <p className="text-sm md:text-base opacity-80 mb-4">
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

      <section id="spa" className="scroll-mt-24 py-12">
        <header className="mb-8 text-center">
          <h2 className="text-3xl md:text-4xl" style={{ fontFamily: 'var(--font-display)' }}>
            {spaHeading}
          </h2>
          <p className="mt-2 text-sm opacity-80">{spaSubheading}</p>
        </header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {spaServices.map((s) => (
            <SpaCard key={s.id} service={s} />
          ))}
        </div>
      </section>

      <section className="mt-12 max-w-4xl mx-auto grid gap-8 md:grid-cols-2">
        <div>
          <h3
            className="text-xl mb-3"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {lang === 'en' ? 'What to expect' : 'Qué puedes esperar'}
          </h3>
          <ol className="text-sm space-y-2 list-decimal list-inside opacity-90">
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
        </div>
        <div>
          <h3
            className="text-xl mb-3"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {lang === 'en' ? "Perfect if you're feeling…" : 'Perfecto si te sientes…'}
          </h3>
          <ul className="text-sm space-y-2 list-disc list-inside opacity-90">
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
      </section>

      <section id="book-spa" className="mt-12 max-w-3xl mx-auto text-center">
        <h3
          className="text-2xl mb-2"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {lang === 'en' ? 'Ready to book your spa ritual?' : '¿Lista para reservar tu ritual de spa?'}
        </h3>
        <p className="text-sm opacity-80 mb-6">
          {lang === 'en'
            ? 'Choose a time that works for you using our secure Square booking below.'
            : 'Elige un horario que te funcione usando nuestra agenda segura de Square.'}
        </p>
        <div className="bg-beige rounded-2xl p-4 shadow-sm">
          <SquareBookingEmbed />
        </div>
      </section>
    </div>
  );
}

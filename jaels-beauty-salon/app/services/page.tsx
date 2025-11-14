"use client";

import SpaCard from '@/components/SpaCard';
import { useLang } from '@/context/LanguageContext';
import { spaServices } from '@/lib/services/spa';

export default function ServicesPage() {
  const { lang } = useLang();
  const servicesHeading = lang === 'en' ? 'Our Services' : 'Nuestros Servicios';
  const spaHeading = lang === 'en' ? 'Spa' : 'Spa';
  const spaSubheading =
    lang === 'en' ? 'Japanese Head Spa Rituals' : 'Rituales Japoneses para la Cabeza';
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
      <header className="text-center">
        <h1 className="font-display text-4xl text-rose">{servicesHeading}</h1>
      </header>

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
    </div>
  );
}

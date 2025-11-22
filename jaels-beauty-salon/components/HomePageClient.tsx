"use client";

import Image from 'next/image';
import QuickBookGrid from '@/components/QuickBookGrid';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import InstagramGrid from '@/components/InstagramGrid';
import { useLang } from '@/context/LanguageContext';

export default function HomePageClient() {
  const { lang } = useLang();
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BeautySalon',
    name: "Jael's Beauty Salon",
    telephone: '+1-657-353-7263',
    email: 'jaels3beautysalon@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '729 E Pass Rd h',
      addressLocality: 'Gulfport',
      addressRegion: 'MS',
      postalCode: '39507',
      addressCountry: 'US',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday'],
        opens: '08:00',
        closes: '15:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Sunday'],
        opens: '00:00',
        closes: '00:00',
      },
    ],
    areaServed: 'Biloxi, MS and surrounding 100 miles',
    sameAs: ['https://www.facebook.com/Jaels3beautysalon/about'],
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="relative h-[80vh] flex items-center justify-center text-center">
        <div className="absolute inset-0 bg-pink/60 backdrop-blur-sm"></div>
        <div className="relative z-10 max-w-2xl px-6">
          <div className="flex flex-col items-center gap-4">
            <Image
              src="/jaels-logo.png"
              alt="Jael's Beauty Salon logo alongside spa and hair treatment guests on the Mississippi Gulf Coast"
              width={300}
              height={300}
              className="object-contain"
            />
            <h1 className="font-display text-4xl sm:text-5xl text-rose drop-shadow-sm">
              {lang === 'en' ? 'Beauty Beyond Expectations' : 'Belleza más allá de tus expectativas'}
            </h1>
            <p className="mt-4 text-lg text-ink max-w-prose">
              {lang === 'en'
                ? 'Jael’s Beauty Salon is a destination studio on the Mississippi Gulf Coast, serving Biloxi, Gulfport, Ocean Springs, Pascagoula, Mobile, Hattiesburg and beyond. We specialize in spa rituals, custom color grounded in color theory, and hair repair treatments designed to last beyond the chair.'
                : 'Jael’s Beauty Salon es un estudio de destino en la Costa del Golfo de Mississippi, atendiendo a Biloxi, Gulfport, Ocean Springs, Pascagoula, Mobile, Hattiesburg y más. Nos especializamos en rituales de spa, color personalizado basado en teoría del color y tratamientos de reparación capilar que duran más allá de la cita.'}
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 pb-12 pt-8">
        <QuickBookGrid />
      </section>

      <section className="bg-beige py-12 px-6">
        <h2 className="font-display text-3xl text-center text-rose mb-8">
          {lang === 'en' ? 'What Our Clients Say' : 'Lo que dicen nuestras clientas'}
        </h2>
        <TestimonialCarousel />
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="font-display text-3xl text-center text-rose mb-8">
          {lang === 'en' ? 'Follow us on Instagram' : 'Síguenos en Instagram'}
        </h2>
        <InstagramGrid />
      </section>
    </div>
  );
}

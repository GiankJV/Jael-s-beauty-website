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
          className="font-display text-4xl md:text-5xl mb-4 text-rose"
        >
          {servicesHeading}
        </h1>
        <p className="text-sm md:text-base opacity-80 mb-4 max-w-2xl mx-auto">
          {lang === 'en'
            ? 'Discover our signature Japanese head spa rituals, or start with your vision if you’re dreaming of a custom hair transformation.'
            : 'Descubre nuestros rituales de spa capilar japonés o empieza con tu visión si buscas una transformación de color o peinado a medida.'}
        </p>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl md:text-3xl text-center mb-2">
          {lang === 'en' ? 'Hair transformations' : 'Transformaciones de cabello'}
        </h2>
        <p className="text-sm md:text-base max-w-2xl mx-auto text-center opacity-80 mb-4">
          {lang === 'en'
            ? 'A peek at some of our color, cuts and styling work. Share your own hair photos and vision to receive a personalized quote.'
            : 'Un vistazo a algunos de nuestros trabajos de color, cortes y peinados. Comparte tus fotos y tu visión para recibir una cotización personalizada.'}
        </p>
        <div className="flex justify-center mb-6">
          <Link
            href="/vision"
            className="px-6 py-2 rounded-full bg-rose text-white text-sm md:text-base shadow hover:bg-rose/90 transition"
          >
            {lang === 'en' ? "What's your vision?" : '¿Cuál es tu visión?'}
          </Link>
        </div>
        <section className="max-w-3xl mx-auto rounded-2xl bg-beige/70 border border-rose/15 px-6 py-5 shadow-sm">
          <h3 className="font-display text-xl mb-2">
            {lang === 'en'
              ? 'What to expect from your hair transformation'
              : 'Qué puedes esperar de tu transformación de cabello'}
          </h3>
          <p className="text-sm md:text-base leading-relaxed">
            {lang === 'en'
              ? 'We’ll start with a brief consultation to understand your scalp, hair, and goals, then tailor color, cut, and styling to your vision.'
              : 'Comenzamos con una breve consulta para entender tu cuero cabelludo, tu cabello y tus metas, y luego adaptamos color, corte y peinado a tu visión.'}
          </p>
        </section>
        <HairLooksReel hideIntro />
      </section>

      <section id="spa" className="scroll-mt-24 py-12">
        <h2 className="font-display text-2xl md:text-3xl text-center mb-1">
          {spaHeading}
        </h2>
        <p className="text-sm md:text-base text-center opacity-80 mb-3">
          {spaSubheading}
        </p>

        <section className="mt-8 mb-6">
          <div className="max-w-3xl mx-auto rounded-2xl bg-beige/70 border border-rose/15 px-6 py-5 text-center shadow-sm">
            <h3 className="font-display text-xl mb-2">
              {lang === 'en' ? "Perfect if you're feeling…" : 'Perfecto si te sientes…'}
            </h3>
            <p className="text-sm md:text-base leading-relaxed">
              {lang === 'en'
                ? 'Stressed, heavy, or mentally overloaded • Experiencing scalp tightness, dryness, or buildup • Wanting a luxurious reset without changing your haircut or color.'
                : 'Estresada, cargada o mentalmente saturada • Con tensión, resequedad o acumulación en el cuero cabelludo • Con ganas de un reset de lujo sin cambiar tu corte o color.'}
            </p>
          </div>
        </section>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {spaServices.map((s) => (
            <SpaCard key={s.id} service={s} />
          ))}
        </div>
      </section>
    </div>
  );
}

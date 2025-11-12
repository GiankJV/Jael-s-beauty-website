"use client";

import ServiceCard, { Service } from '@/components/ServiceCard';
import SpaCard from '@/components/SpaCard';
import { useBooking } from '@/context/BookingContext';
import { spaServices } from '@/lib/services/spa';

const services: Service[] = [
  {
    title: 'Women’s Haircut',
    description: 'Precision cuts tailored to your face shape and lifestyle.',
    duration: '45–60 min',
    price: 'From $45',
  },
  {
    title: 'Balayage & Colour',
    description: 'Hand‑painted highlights and full colour services for a sun‑kissed look.',
    duration: '2–3 hrs',
    price: 'From $120',
  },
  {
    title: 'Blowout & Styling',
    description: 'Smooth blowouts, curls and updos for every occasion.',
    duration: '60–90 min',
    price: 'From $50',
  },
  {
    title: 'Facials & Skin Care',
    description: 'Custom facials using high‑end products to cleanse, exfoliate and rejuvenate.',
    duration: '60–90 min',
    price: 'From $80',
  },
  {
    title: 'Bridal Hair & Makeup',
    description: 'Elegantly crafted looks for your special day, including trials.',
    duration: 'Varies',
    price: 'Custom Quote',
  },
  {
    title: 'Spa Packages',
    description: 'Combos of hair, skin and body treatments for a head‑to‑toe glow.',
    duration: 'Varies',
    price: 'From $200',
  },
];

export default function ServicesPage() {
  const { openBooking } = useBooking();
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
      <section>
        <h1 className="font-display text-4xl text-rose text-center mb-8">Our Services</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} onOpenBooking={openBooking} />
          ))}
        </div>
      </section>

      <section id="spa" className="scroll-mt-24 py-12">
        <header className="mb-8 text-center">
          <h2 className="text-3xl md:text-4xl" style={{ fontFamily: 'var(--font-display)' }}>
            Spa
          </h2>
          <p className="mt-2 text-sm opacity-80">Japanese Head Spa Rituals</p>
        </header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {spaServices.map((s) => (
            <SpaCard
              key={s.id}
              name={s.name}
              duration={s.duration}
              price={s.price}
              bullets={s.bullets}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

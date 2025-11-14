"use client";

import ContactForm from '@/components/ContactForm';
import Link from 'next/link';
import { useLang } from '@/context/LanguageContext';

export default function ContactPage() {
  const { lang } = useLang();
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-12">
      <section className="text-center">
        <h1
          className="text-3xl md:text-4xl mb-4"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {lang === 'en' ? 'Contact' : 'Contacto'}
        </h1>
        <p className="text-sm md:text-base opacity-80 max-w-2xl mx-auto">
          {lang === 'en'
            ? 'Have questions or ready to schedule? Reach out and we’ll be happy to help.'
            : '¿Tienes preguntas o quieres agendar? Escríbenos y con gusto te ayudamos.'}
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div>
          <h2 className="font-semibold mb-2">
            {lang === 'en' ? 'Call or text us' : 'Llámanos o mándanos mensaje'}
          </h2>
          <p>
            <a href="tel:+16573537263" className="hover:text-rose">
              (657) 353‑7263
            </a>
          </p>

          <h2 className="font-semibold mt-4 mb-2">
            {lang === 'en' ? 'Email' : 'Correo electrónico'}
          </h2>
          <p>
            <a href="mailto:jaels3beautysalon@gmail.com" className="hover:text-rose">
              jaels3beautysalon@gmail.com
            </a>
          </p>

          <h2 className="font-semibold mt-4 mb-2">
            {lang === 'en' ? 'Hours' : 'Horario'}
          </h2>
          <p>
            {lang === 'en'
              ? 'Mon–Fri, 8 am–6 pm (by appointment only)'
              : 'Lunes a viernes, 8 am–6 pm (solo con cita)'}
          </p>

          <h2 className="font-semibold mt-4 mb-2">
            {lang === 'en' ? 'Visit us' : 'Visítanos'}
          </h2>
          <p>Jael’s Beauty Salon</p>
          <p>729 E Pass Rd h</p>
          <p>Gulfport, MS 39507</p>

          <Link
            href="/vision"
            className="mt-6 inline-flex items-center justify-center bg-rose text-white px-6 py-3 rounded-full shadow hover:bg-rose/90 transition"
          >
            {lang === 'en' ? 'Start with your vision' : 'Empieza con tu visión'}
          </Link>

          <div className="mt-8">
            <iframe
              src="https://www.google.com/maps?q=729%20E%20Pass%20Rd%20h,%20Gulfport,%20MS%2039507&output=embed"
              width="100%"
              height="300"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-2xl border-0 shadow"
              title="Salon location on map"
            ></iframe>
          </div>
        </div>

        <div>
          <h2 className="font-display text-3xl text-rose mb-4">
            {lang === 'en' ? 'Send a message' : 'Envíanos un mensaje'}
          </h2>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}

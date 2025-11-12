"use client";

import ContactForm from '@/components/ContactForm';
import { useBooking } from '@/context/BookingContext';

export default function ContactPage() {
  const { openBooking } = useBooking();
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-12">
      {/* Contact details and map */}
      <div>
        <h1 className="font-display text-4xl text-rose mb-4">Contact Us</h1>
        <p className="mb-4">
          We’d love to hear from you! Whether you have questions about our services, want to plan a
          bridal package or simply need directions, please get in touch.
        </p>
        <p>
          <strong>Address:</strong> 729 E Pass Rd h, Gulfport, MS 39507
        </p>
        <p>
          <strong>Phone:</strong>{' '}
          <a href="tel:+16573537263" className="hover:text-rose">
            (657) 353‑7263
          </a>
        </p>
        <p>
          <strong>Email:</strong>{' '}
          <a href="mailto:jaels3beautysalon@gmail.com" className="hover:text-rose">
            jaels3beautysalon@gmail.com
          </a>
        </p>
        <p>
          <strong>Hours:</strong> Mon–Fri, 8 am–6 pm (by appointment only)
        </p>
        <button
          onClick={openBooking}
          className="mt-6 bg-rose text-white px-6 py-3 rounded-full shadow hover:bg-rose/90 transition"
        >
          Book Now
        </button>
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
      {/* Contact form */}
      <div>
        <h2 className="font-display text-3xl text-rose mb-4">Send a Message</h2>
        <ContactForm />
      </div>
    </div>
  );
}
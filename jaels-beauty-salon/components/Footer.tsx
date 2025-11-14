import Link from 'next/link';
import Image from 'next/image';

/**
 * Site footer containing business contact information, a mini map, and
 * social media links. This component is rendered on every page via
 * `app/layout.tsx`.
 */
export default function Footer() {
  return (
    <footer className="bg-beige text-ink mt-16 border-t border-ink/10">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact details */}
        <div>
          <h3 className="font-display text-xl mb-4">Visit Us</h3>
          <p>Jael’s Beauty Salon</p>
          <p>729 E Pass Rd h</p>
          <p>Gulfport, MS 39507</p>
          <p className="mt-4">
            <strong>Hours:</strong> Mon–Fri, 8 am–6 pm
          </p>
        </div>
        {/* Map embed */}
        <div>
          <h3 className="font-display text-xl mb-4">Our Location</h3>
          <iframe
            src="https://www.google.com/maps?q=729%20E%20Pass%20Rd%20h,%20Gulfport,%20MS%2039507&output=embed"
            width="100%"
            height="200"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-2xl border-0"
            title="Salon location on map"
          ></iframe>
        </div>
        {/* Social & newsletter */}
        <div>
          <h3 className="font-display text-xl mb-4">Stay Connected</h3>
          <p className="mb-4">Follow us on social media for the latest styles and promotions.</p>
          <div className="flex gap-4">
            <a
              href="https://www.facebook.com/Jaels3beautysalon/about"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Jael's Beauty Salon on Facebook"
              className="hover:text-rose"
            >
              {/* Simple Facebook icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="h-6 w-6"
              >
                <path d="M22.675 0h-21.35C.6 0 0 .6 0 1.343v21.314C0 23.4.6 24 1.325 24H12.82v-9.294H9.692V11.07h3.128V8.41c0-3.1 1.894-4.787 4.66-4.787 1.325 0 2.464.099 2.794.142v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.312h3.587l-.467 3.637h-3.12V24h6.116C23.4 24 24 23.4 24 22.657V1.343C24 .6 23.4 0 22.675 0z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Jael's Beauty Salon on Instagram"
              className="hover:text-rose"
            >
              {/* Simple Instagram icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="h-6 w-6"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.344 3.608 1.32.975.975 1.258 2.242 1.32 3.608.058 1.266.07 1.645.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.344 2.633-1.32 3.608-.975.975-2.242 1.258-3.608 1.32-1.266.058-1.645.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.344-3.608-1.32-.975-.975-1.258-2.242-1.32-3.608C2.175 15.584 2.163 15.205 2.163 12s.012-3.584.07-4.85c.062-1.366.344-2.633 1.32-3.608.975-.975 2.242-1.258 3.608-1.32 1.266-.058 1.645-.07 4.85-.07zm0-2.163C8.691 0 8.271.012 7.002.07 5.73.128 4.366.428 3.142 1.652 1.918 2.876 1.618 4.24 1.56 5.513.999 8.271.999 8.691.999 12c0 3.309.012 3.729.07 5.998.058 1.272.358 2.636 1.582 3.86 1.224 1.224 2.588 1.524 3.86 1.582C8.271 23.988 8.691 24 12 24s3.729-.012 5.998-.07c1.272-.058 2.636-.358 3.86-1.582 1.224-1.224 1.524-2.588 1.582-3.86.058-1.269.07-1.689.07-4.998s-.012-3.729-.07-5.998c-.058-1.272-.358-2.636-1.582-3.86C20.634.428 19.27.128 17.998.07 16.729.012 16.309 0 12 0zM12 5.838A6.162 6.162 0 0 0 5.838 12 6.162 6.162 0 0 0 12 18.162 6.162 6.162 0 0 0 18.162 12 6.162 6.162 0 0 0 12 5.838zm0 10.164A4.002 4.002 0 1 1 12 7.998 4.002 4.002 0 0 1 12 16.002zm6.406-11.845a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="text-center text-sm py-4 bg-beige border-t border-ink/10">
        &copy; {new Date().getFullYear()} Jael’s Beauty Salon. All rights reserved.
      </div>
    </footer>
  );
}

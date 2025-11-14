"use client";

import { useLang } from '@/context/LanguageContext';

const testimonials = [
  {
    author: 'Sarah M.',
    body:
      'The stylists at Jael’s always make me feel pampered and gorgeous. I wouldn’t trust my hair anywhere else!',
    rating: 5,
  },
  {
    author: 'Lena R.',
    body: 'Absolutely love their balayage and blowout services. The salon is warm, welcoming and so chic!',
    rating: 5,
  },
  {
    author: 'Trina D.',
    body: 'My bridal hair trial was perfection. Jael’s team listened to every detail and brought my vision to life.',
    rating: 5,
  },
  {
    author: 'Kim S.',
    body: 'Best facial in Gulfport! My skin is glowing and I feel rejuvenated after every visit.',
    rating: 5,
  },
  {
    author: 'Dana H.',
    body: 'Friendly staff, clean salon and stunning results every time. Highly recommend for anyone in Biloxi.',
    rating: 5,
  },
  {
    author: 'Amanda B.',
    body: 'From the moment you walk in you’re treated like royalty. Their spa packages are a dream!',
    rating: 5,
  },
];

const reviewsCopy = {
  heading: {
    en: 'What our clients are saying',
    es: 'Lo que dicen nuestras clientas',
  },
  subheading: {
    en: 'Read real experiences and share your own review to help others discover Jael’s Beauty Salon.',
    es: 'Lee experiencias reales y comparte tu reseña para ayudar a otras personas a descubrir Jael’s Beauty Salon.',
  },
  ctasTitle: {
    en: 'Share or read a review',
    es: 'Comparte o lee una reseña',
  },
  google: {
    en: 'View Google reviews',
    es: 'Ver reseñas en Google',
  },
  facebook: {
    en: 'View Facebook reviews',
    es: 'Ver reseñas en Facebook',
  },
  survey: {
    en: 'Leave a review',
    es: 'Dejar una reseña',
  },
} as const;

export default function TestimonialsContent() {
  const { lang } = useLang();
  const t = <K extends keyof typeof reviewsCopy>(key: K) => reviewsCopy[key][lang];
  const googleUrl = process.env.NEXT_PUBLIC_GOOGLE_REVIEWS_URL;
  const facebookUrl = process.env.NEXT_PUBLIC_FACEBOOK_REVIEWS_URL;
  const surveyUrl = process.env.NEXT_PUBLIC_SURVEYMONKEY_URL;

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-16">
      <section className="space-y-6 text-center">
        <h1 className="font-heading text-4xl md:text-5xl text-rose">{t('heading')}</h1>
        <p className="max-w-3xl mx-auto text-base leading-relaxed">{t('subheading')}</p>
      </section>

      <section className="space-y-8">
        {testimonials.map((testimonial, idx) => (
          <article
            key={idx}
            className="bg-beige rounded-2xl p-6 shadow-sm"
            itemScope
            itemType="http://schema.org/Review"
          >
            <p className="mb-2" itemProp="reviewBody">
              “{testimonial.body}”
            </p>
            <div className="flex items-center gap-2 mb-1">
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 text-rose"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.948a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.357 2.44a1 1 0 00-.364 1.118l1.286 3.949c.3.921-.755 1.688-1.54 1.118l-3.357-2.44a1 1 0 00-1.175 0l-3.357 2.44c-.784.57-1.838-.197-1.539-1.118l1.286-3.95a1 1 0 00-.364-1.117l-3.357-2.44c-.783-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.286-3.949z" />
                </svg>
              ))}
            </div>
            <p className="font-semibold" itemProp="author">
              — {testimonial.author}
            </p>
          </article>
        ))}
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-3xl text-rose">{t('ctasTitle')}</h2>
        <div className="flex flex-wrap gap-3">
          {googleUrl && (
            <a
              href={googleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-rose/40 px-5 py-2 text-sm text-rose hover:bg-rose/10 transition"
            >
              {t('google')}
            </a>
          )}
          {facebookUrl && (
            <a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-rose/40 px-5 py-2 text-sm text-rose hover:bg-rose/10 transition"
            >
              {t('facebook')}
            </a>
          )}
          {surveyUrl && (
            <a
              href={surveyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-rose text-white px-5 py-2 text-sm shadow hover:bg-rose/90 transition"
            >
              {t('survey')}
            </a>
          )}
        </div>
      </section>
    </div>
  );
}

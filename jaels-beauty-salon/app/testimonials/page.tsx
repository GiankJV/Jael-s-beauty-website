export const metadata = {
  title: "Testimonials | Jael's Beauty Salon",
  description: 'Read real client reviews about their experiences at Jael’s Beauty Salon.',
};

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

/**
 * Testimonials page listing reviews with basic schema.org Review markup. In a
 * production site you might fetch these from a CMS or a Google Reviews API.
 */
export default function TestimonialsPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-8">
      <h1 className="font-display text-4xl text-rose text-center mb-6">Client Testimonials</h1>
      {testimonials.map((t, idx) => (
        <article
          key={idx}
          className="bg-beige rounded-2xl p-6 shadow-sm"
          itemScope
          itemType="http://schema.org/Review"
        >
          <p className="mb-2" itemProp="reviewBody">“{t.body}”</p>
          <div className="flex items-center gap-2 mb-1">
            {Array.from({ length: t.rating }).map((_, i) => (
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
            — {t.author}
          </p>
        </article>
      ))}
    </div>
  );
}
"use client";

import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-12">
      <h1 className="font-display text-4xl text-rose text-center">Our Story</h1>
      <div className="prose prose-lg max-w-none">
        <p>
          Founded with a passion for beauty and self‑care, Jael’s Beauty Salon has been serving the
          Gulfport and Biloxi community for years. Our mission is to provide a sanctuary where clients
          can unwind, transform and feel their absolute best.
        </p>
        <p>
          From meticulous haircuts and vibrant colour to indulgent facials and bridal styling, every
          service is personalised to celebrate your individuality. We pride ourselves on using
          high‑quality products, staying current with trends and techniques and fostering a warm,
          inclusive environment.
        </p>
        <p>
          Our talented team of stylists, colourists and estheticians are continually honing their
          craft to deliver outstanding results. We believe beauty is more than skin deep—it’s about
          feeling confident, empowered and cared for.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="font-display text-3xl text-rose mb-4">Meet the Team</h2>
          <p className="mb-4">
            Our professionals are artists in their own right, bringing creativity, precision and a
            genuine love for their craft. From master stylists to skincare specialists, we work
            collaboratively to ensure you leave feeling fabulous.
          </p>
          <Link
            href="/vision"
            className="inline-flex items-center justify-center bg-rose text-white px-6 py-3 rounded-full shadow hover:bg-rose/90 transition"
          >
            Start with your vision
          </Link>
        </div>
        <div className="overflow-hidden rounded-2xl">
          {/* Placeholder team photo; replace with your own images */}
          <Image
            src="/jaels-logo.png"
            alt="Our team photo placeholder"
            width={600}
            height={400}
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
      <div className="mt-12">
        <h2 className="font-display text-3xl text-rose mb-4">Stay Connected</h2>
        <p className="mb-4">
          Follow us on Facebook to see our latest work, client transformations and salon updates.
        </p>
        <div className="w-full" style={{ maxWidth: '500px', margin: '0 auto' }}>
          <iframe
            src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FJaels3beautysalon%2Fabout&tabs=timeline&width=500&height=300&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
            width="100%"
            height="300"
            style={{ border: 'none', overflow: 'hidden' }}
            scrolling="no"
            frameBorder="0"
            allowFullScreen={true}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

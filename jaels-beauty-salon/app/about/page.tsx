"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useLang } from '@/context/LanguageContext';

export const metadata = {
  title: "About Jael’s Beauty Salon | Gulf Coast Spa & Color Studio",
  description:
    'Learn about Jael’s Beauty Salon, a destination spa and color studio on the Mississippi Gulf Coast, welcoming clients from Biloxi, Gulfport, Ocean Springs, Pascagoula, Mobile and Hattiesburg.',
};

const copy = {
  title: {
    en: 'Our Story',
    es: 'Nuestra historia',
  },
  intro: {
    en: "Founded with a passion for beauty and self-care, Jael’s Beauty Salon has been serving the Gulfport and Biloxi community for years. Our mission is to provide a sanctuary where clients can unwind, transform and feel their absolute best.",
    es: 'Fundado con una pasión por la belleza y el autocuidado, Jael’s Beauty Salon ha atendido a la comunidad de Gulfport y Biloxi durante años. Nuestra misión es ofrecer un santuario donde puedas relajarte, transformarte y sentirte en tu mejor versión.',
  },
  paragraph2: {
    en: 'From meticulous haircuts and vibrant colour to indulgent facials and bridal styling, every service is personalised to celebrate your individuality. We pride ourselves on using high-quality products, staying current with trends and techniques, and fostering a warm, inclusive environment.',
    es: 'Desde cortes meticulosos y color vibrante hasta faciales indulgentes y peinados de novia, cada servicio se personaliza para celebrar tu individualidad. Nos enorgullece usar productos de alta calidad, mantenernos al día con las tendencias y crear un ambiente cálido e inclusivo.',
  },
  paragraph3: {
    en: 'Our talented team of stylists, colourists and estheticians are continually honing their craft to deliver outstanding results. We believe beauty is more than skin deep—it’s about feeling confident, empowered and cared for.',
    es: 'Nuestro talentoso equipo de estilistas, coloristas y esteticistas perfecciona continuamente su oficio para ofrecer resultados excepcionales. Creemos que la belleza va más allá de la apariencia: se trata de sentirte segura, empoderada y cuidada.',
  },
  meetTitle: {
    en: 'Meet the Team',
    es: 'Conoce al equipo',
  },
  meetBody: {
    en: 'Our professionals are artists in their own right, bringing creativity, precision and a genuine love for their craft. From master stylists to skincare specialists, we work collaboratively to ensure you leave feeling fabulous.',
    es: 'Nuestras profesionales son artistas en toda regla, aportando creatividad, precisión y un auténtico amor por su oficio. Desde maestras estilistas hasta especialistas en cuidado de la piel, trabajamos en conjunto para que salgas sintiéndote fabulosa.',
  },
  stayTitle: {
    en: 'Stay Connected',
    es: 'Mantente conectada',
  },
  stayBody: {
    en: 'Follow us on Facebook to see our latest work, client transformations and salon updates.',
    es: 'Síguenos en Facebook para ver nuestro trabajo más reciente, transformaciones de clientas y novedades del salón.',
  },
  cta: {
    en: 'Start with your vision',
    es: 'Empieza con tu visión',
  },
} as const;

export default function AboutPage() {
  const { lang } = useLang();
  const t = <K extends keyof typeof copy>(key: K) => copy[key][lang];

  const reachParagraph =
    lang === 'en'
      ? 'We welcome guests from across the Mississippi Gulf Coast and beyond—Biloxi, Gulfport, Ocean Springs, Pascagoula, Mobile, and Hattiesburg—who travel for our one-on-one spa rituals, color rooted in color theory, and thoughtful hair treatments.'
      : 'Recibimos clientas de toda la Costa del Golfo de Mississippi y más allá—Biloxi, Gulfport, Ocean Springs, Pascagoula, Mobile y Hattiesburg—que viajan por nuestros rituales de spa personalizados, color basado en teoría del color y tratamientos capilares cuidadosos.';

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-12">
      <h1 className="font-heading text-4xl md:text-5xl text-rose text-center">{t('title')}</h1>
      <div className="space-y-5 text-base leading-relaxed">
        <p>{t('intro')}</p>
        <p>{t('paragraph2')}</p>
        <p>{t('paragraph3')}</p>
        <p>{reachParagraph}</p>
      </div>
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <h2 className="font-heading text-3xl text-rose">{t('meetTitle')}</h2>
          <p className="leading-relaxed">{t('meetBody')}</p>
          <Link
            href="/hair/start"
            className="inline-flex items-center justify-center bg-rose text-white px-6 py-3 rounded-full shadow hover:bg-rose/90 transition"
          >
            {t('cta')}
          </Link>
        </div>
        <div className="overflow-hidden rounded-2xl">
          <Image
            src="/jaels-logo.png"
            alt="Jael's Beauty Salon"
            width={600}
            height={400}
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
      <div className="mt-12 space-y-4 text-center">
        <h2 className="font-heading text-3xl text-rose">{t('stayTitle')}</h2>
        <p>{t('stayBody')}</p>
        <div className="w-full max-w-lg mx-auto">
          <iframe
            src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FJaels3beautysalon%2Fabout&tabs=timeline&width=500&height=300&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
            width="100%"
            height="300"
            style={{ border: 'none', overflow: 'hidden' }}
            scrolling="no"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            title="Jael's Beauty Salon Facebook feed"
          ></iframe>
        </div>
      </div>

      <div className="mt-10 space-y-4">
        <h2 className="font-heading text-3xl text-rose text-center">
          {lang === 'en' ? 'FAQ' : 'Preguntas frecuentes'}
        </h2>
        <div className="space-y-4 text-sm md:text-base leading-relaxed">
          <FAQItem
            q={
              lang === 'en'
                ? 'How far in advance should I book spa or color services?'
                : '¿Con cuánta anticipación debo reservar servicios de spa o color?'
            }
            a={
              lang === 'en'
                ? 'We recommend booking 2–4 weeks ahead, especially for spa rituals and custom color. Many Gulf Coast guests plan their visit around travel, so earlier is better.'
                : 'Recomendamos reservar con 2–4 semanas de anticipación, especialmente para rituales de spa y color personalizado. Muchas clientas de la Costa del Golfo coordinan su visita con sus viajes, así que antes es mejor.'
            }
          />
          <FAQItem
            q={
              lang === 'en'
                ? 'Do you work with guests traveling from out of town?'
                : '¿Atienden a clientas que vienen de fuera?'
            }
            a={
              lang === 'en'
                ? 'Yes. We regularly see guests from Biloxi, Gulfport, Ocean Springs, Pascagoula, Mobile, and Hattiesburg. Let us know your travel dates and we’ll help you plan services.'
                : 'Sí. Atendemos con frecuencia a clientas de Biloxi, Gulfport, Ocean Springs, Pascagoula, Mobile y Hattiesburg. Comparte tus fechas de viaje y te ayudamos a planear tus servicios.'
            }
          />
          <FAQItem
            q={
              lang === 'en'
                ? 'What types of color do you specialize in?'
                : '¿En qué tipos de color se especializan?'
            }
            a={
              lang === 'en'
                ? 'We focus on custom color grounded in color theory: dimensional brunettes, lived-in blonding, balayage, and corrective work tailored to your skin tone and goals.'
                : 'Nos enfocamos en color personalizado basado en teoría del color: castaños dimensionales, rubios naturales, balayage y correcciones adaptadas a tu tono de piel y objetivos.'
            }
          />
          <FAQItem
            q={
              lang === 'en'
                ? 'Do you offer treatments for damaged or over-processed hair?'
                : '¿Ofrecen tratamientos para cabello dañado o sobreprocesado?'
            }
            a={
              lang === 'en'
                ? 'Yes. We design repair and scalp treatments for compromised hair, often paired with our spa services to calm the scalp and strengthen strands.'
                : 'Sí. Diseñamos tratamientos de reparación y cuero cabelludo para cabello comprometido, a menudo combinados con nuestros servicios de spa para calmar el cuero cabelludo y fortalecer la hebra.'
            }
          />
          <FAQItem
            q={
              lang === 'en'
                ? 'Can I combine spa services with hair color or treatments?'
                : '¿Puedo combinar servicios de spa con color o tratamientos capilares?'
            }
            a={
              lang === 'en'
                ? 'Absolutely. Many guests schedule a spa ritual before custom color or repair treatments for the best scalp prep and long-lasting results.'
                : 'Por supuesto. Muchas clientas reservan un ritual de spa antes del color personalizado o tratamientos de reparación para preparar el cuero cabelludo y lograr resultados duraderos.'
            }
          />
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'How far in advance should I book spa or color services?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text:
                    'We recommend booking 2–4 weeks ahead, especially for spa rituals and custom color. Many Gulf Coast guests plan their visit around travel, so earlier is better.',
                },
              },
              {
                '@type': 'Question',
                name: 'Do you work with guests traveling from out of town?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text:
                    'Yes. We regularly see guests from Biloxi, Gulfport, Ocean Springs, Pascagoula, Mobile, and Hattiesburg. Share your travel dates and we will help schedule your services.',
                },
              },
              {
                '@type': 'Question',
                name: 'What types of color do you specialize in?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text:
                    'We focus on custom color grounded in color theory—dimensional brunettes, lived-in blonding, balayage, and corrective work tailored to your skin tone and goals.',
                },
              },
              {
                '@type': 'Question',
                name: 'Do you offer treatments for damaged or over-processed hair?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text:
                    'Yes. We design repair and scalp treatments for compromised hair, often paired with spa services to calm the scalp and strengthen strands.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can I combine spa services with hair color or treatments?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text:
                    'Absolutely. Many guests book a spa ritual before custom color or repair treatments for the best scalp prep and long-lasting results.',
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  return (
    <div className="rounded-2xl border border-rose/20 bg-rose-50/50 p-4 shadow-sm">
      <p className="font-semibold">{q}</p>
      <p className="mt-2 opacity-80">{a}</p>
    </div>
  );
}

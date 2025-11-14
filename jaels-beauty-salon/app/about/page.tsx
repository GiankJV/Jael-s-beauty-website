"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useLang } from '@/context/LanguageContext';

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

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-12">
      <h1 className="font-heading text-4xl md:text-5xl text-rose text-center">{t('title')}</h1>
      <div className="space-y-5 text-base leading-relaxed">
        <p>{t('intro')}</p>
        <p>{t('paragraph2')}</p>
        <p>{t('paragraph3')}</p>
      </div>
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <h2 className="font-heading text-3xl text-rose">{t('meetTitle')}</h2>
          <p className="leading-relaxed">{t('meetBody')}</p>
          <Link
            href="/vision"
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
    </div>
  );
}

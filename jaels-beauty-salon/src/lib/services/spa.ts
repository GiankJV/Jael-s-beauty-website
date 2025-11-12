export type SpaService = {
  id: string;
  name: string;
  duration: string;
  price: number;
  bullets: string[];
};

export const spaServices: SpaService[] = [
  {
    id: 'bloom-ritual',
    name: 'Bloom Ritual',
    duration: '60 minutes',
    price: 145,
    bullets: [
      'Deep analysis with oxygen-rich exfoliation',
      'Relaxing aromatherapy',
      'Gentle scalp exfoliation with purifying foam cleanse',
      'Soothing massage for neck, shoulders and head',
      'Personalized facial mask for refreshed, radiant skin',
      '15-minute full body massage',
    ],
  },
  {
    id: 'esencia-kaori',
    name: 'Esencia Kaori',
    duration: '90 minutes',
    price: 175,
    bullets: [
      'Deep analysis with oxygen-rich exfoliation',
      'Therapeutic aromatherapy for total relaxation',
      'Nourishing hand massage with serum infusion',
      'Application of refined facial ingredients',
      'Stress-relieving neck, shoulder and head massage',
      '15-minute full body massage',
      'Bioactive growth treatment',
      'Hair styling',
    ],
  },
  {
    id: 'ritual-imperial',
    name: 'Ritual Imperial',
    duration: '120 minutes',
    price: 225,
    bullets: [
      'In-depth analysis with professional scalp evaluation and intensive exfoliation',
      'Premium Japanese aromatherapy',
      'Japanese massage on neck, shoulders and head',
      'Advanced radiofrequency therapy to stimulate follicles',
      'Steam treatment with premium facial mask',
      'Full body massage',
      'Luxurious finish with visible, lasting results',
      'Hair styling',
    ],
  },
];

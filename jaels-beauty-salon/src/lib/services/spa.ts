export type SpaService = {
  id: string;
  name: { en: string; es: string };
  duration: string;
  price: number;
  description: { en: string; es: string };
};

export const spaServices: SpaService[] = [
  {
    id: 'bloom-ritual',
    name: { en: 'Bloom Ritual', es: 'Ritual Bloom' },
    duration: '60 minutes',
    price: 145,
    description: {
      en: `A restorative 60-minute Japanese head spa ritual focused on detoxifying and re-energizing the scalp. The experience begins with a deep analysis and oxygen-rich exfoliation to purify the skin, followed by soothing aromatherapy and a gentle foam cleanse. A neck, shoulder, and head massage melts away tension while a customized facial mask revives the complexion. The ritual concludes with a 15-minute full-body massage to leave you glowing and refreshed.`,
      es: `Un ritual restaurador de 60 minutos inspirado en la tradición japonesa del spa capilar. Comienza con un análisis profundo y una exfoliación oxigenante que purifica el cuero cabelludo, seguido de aromaterapia relajante y una limpieza en espuma suave. El masaje en cuello, hombros y cabeza disuelve la tensión mientras una mascarilla facial personalizada revitaliza la piel. Finaliza con un masaje corporal completo de 15 minutos para dejarte radiante y renovada.`,
    },
  },
  {
    id: 'esencia-kaori',
    name: { en: 'Esencia Kaori', es: 'Esencia Kaori' },
    duration: '90 minutes',
    price: 175,
    description: {
      en: `A deeply indulgent 90-minute ritual blending therapeutic aromatherapy with advanced scalp and facial care. The treatment begins with an oxygen-infused exfoliation, followed by a nourishing hand massage with serum infusion and the application of refined botanical ingredients. A tension-relieving neck, shoulder, and head massage promotes full relaxation before a hydrating facial mask and 15-minute body massage. Includes a bioactive growth treatment and professional hair styling finish.`,
      es: `Un ritual de 90 minutos que combina aromaterapia terapéutica con cuidado avanzado del cuero cabelludo y del rostro. Comienza con una exfoliación oxigenante, seguida de un masaje nutritivo de manos con suero y la aplicación de ingredientes botánicos refinados. Un masaje relajante en cuello, hombros y cabeza libera toda la tensión antes de aplicar una mascarilla facial hidratante y un masaje corporal de 15 minutos. Incluye tratamiento bioactivo de crecimiento y peinado profesional.`,
    },
  },
  {
    id: 'ritual-imperial',
    name: { en: 'Ritual Imperial', es: 'Ritual Imperial' },
    duration: '120 minutes',
    price: 225,
    description: {
      en: `Our signature 120-minute luxury treatment offering total renewal from scalp to soul. Begins with a professional scalp evaluation and intensive exfoliation, followed by premium Japanese aromatherapy. The ritual continues with a traditional head and shoulder massage, advanced radio-frequency therapy to stimulate follicles, and a steam session with a premium facial mask. Concludes with a full-body massage and flawless hair styling for visible, lasting results.`,
      es: `Nuestro tratamiento de lujo de 120 minutos ofrece una renovación total desde el cuero cabelludo hasta el alma. Inicia con una evaluación profesional del cuero cabelludo y una exfoliación intensiva, seguida de aromaterapia japonesa premium. El ritual continúa con un masaje tradicional de cabeza y hombros, terapia de radiofrecuencia para estimular los folículos y una sesión de vapor con mascarilla facial premium. Finaliza con un masaje corporal completo y un peinado impecable con resultados visibles y duraderos.`,
    },
  },
];

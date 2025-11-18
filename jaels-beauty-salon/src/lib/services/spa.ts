export type SpaService = {
  id: string;
  name: { en: string; es: string };
  duration: string;
  price: number;
  description: { en: string; es: string };
  bookingUrl?: string;
};

export const spaServices: SpaService[] = [
  {
    id: 'bloom-ritual',
    name: { en: 'Bloom Ritual', es: 'Ritual Bloom' },
    duration: '60 minutes',
    price: 145,
    bookingUrl:
      'https://book.squareup.com/appointments/btoamb4um3r0sj/location/LHYR13WK1GCD2/services/6OFPMAHVRHIP6JN2BRG327UU',
    description: {
      en: `A restorative 60-minute Japanese head spa ritual that guests travel across the Gulf Coast for—detoxifying, oxygenating, and easing tension from scalp to shoulders with a soothing massage and tailored mask.`,
      es: `Un ritual restaurador de 60 minutos al que viajan clientas de toda la Costa del Golfo: detoxifica, oxigena y libera tensión desde el cuero cabelludo hasta los hombros con masaje relajante y mascarilla personalizada.`,
    },
  },
  {
    id: 'esencia-kaori',
    name: { en: 'Esencia Kaori', es: 'Esencia Kaori' },
    duration: '90 minutes',
    price: 175,
    bookingUrl:
      'https://book.squareup.com/appointments/btoamb4um3r0sj/location/LHYR13WK1GCD2/services/4WOGO3YQNTUCMLDGHB5LMQGG',
    description: {
      en: `A deeply indulgent 90-minute spa service blending aromatherapy with advanced scalp + facial care—perfect for Gulf Coast guests seeking a luxurious reset before color or treatments.`,
      es: `Un servicio de spa de 90 minutos que combina aromaterapia con cuidado avanzado de cuero cabelludo y rostro, ideal para clientas de la Costa del Golfo que buscan un reset de lujo antes del color o tratamientos.`,
    },
  },
  {
    id: 'ritual-imperial',
    name: { en: 'Ritual Imperial', es: 'Ritual Imperial' },
    duration: '120 minutes',
    price: 225,
    bookingUrl:
      'https://book.squareup.com/appointments/btoamb4um3r0sj/location/LHYR13WK1GCD2/services/VILVK72LMIH76UDGZMUTGZG4',
    description: {
      en: `A signature 120-minute luxury head spa that pairs Japanese aromatherapy with radio-frequency scalp care and a full-body massage—chosen by travelers from Biloxi to Mobile for visible renewal.`,
      es: `Un spa capilar de lujo de 120 minutos que combina aromaterapia japonesa con cuidado de cuero cabelludo por radiofrecuencia y masaje corporal completo, elegido por clientas de Biloxi a Mobile para una renovación visible.`,
    },
  },
];

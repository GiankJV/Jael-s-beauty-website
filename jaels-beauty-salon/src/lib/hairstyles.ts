export type HairGoal =
  | 'lived-in'
  | 'balayage'
  | 'brunette'
  | 'vivid'
  | 'grey-blend'
  | 'dimensional'
  | 'blowout'
  | 'keratin'
  | 'haircut'
  | 'treatment'
  | 'perm';

export type HairLength = 'short' | 'medium' | 'long' | 'extra';
export type HairTexture = 'straight' | 'wavy' | 'curly' | 'coily';
export type ColorHistory = 'virgin' | 'pro-colored' | 'bleached' | 'box-dye';

export type Hairstyle = {
  id: string;
  name: { en: string; es: string };
  description: { en: string; es: string };
  goals: HairGoal[];
  lengths: HairLength[];
  textures: HairTexture[];
  colorHistory: ColorHistory[];
  maintenance: 'low' | 'moderate' | 'high';
  requiresConsult: boolean;
  sessionMinutes: { min: number; max: number };
  images: string[];
};

export const hairstyles: Hairstyle[] = [
  {
    id: 'lived-in-blonde',
    name: { en: 'Lived-in Blonde', es: 'Rubio Natural' },
    description: {
      en: 'Soft, sun-kissed ribbons with a blended grow-out for a low-maintenance, beachy feel.',
      es: 'Mechas suaves y luminosas con un crecimiento difuminado para un look natural y de poco mantenimiento.',
    },
    goals: ['lived-in', 'balayage', 'dimensional'],
    lengths: ['medium', 'long', 'extra'],
    textures: ['straight', 'wavy', 'curly'],
    colorHistory: ['virgin', 'pro-colored', 'bleached'],
    maintenance: 'low',
    requiresConsult: false,
    sessionMinutes: { min: 150, max: 210 },
    images: ['/looks/lived-in-1.jpg', '/looks/lived-in-2.jpg'],
  },
  {
    id: 'dimensional-brunette',
    name: { en: 'Dimensional Brunette', es: 'Castaño Dimensional' },
    description: {
      en: 'Rich brunette tones with soft dimension and shine, perfect for a glossy, luxe finish.',
      es: 'Tonos castaños profundos con dimensión suave y brillo, perfecto para un acabado lujoso y pulido.',
    },
    goals: ['brunette', 'dimensional'],
    lengths: ['short', 'medium', 'long', 'extra'],
    textures: ['straight', 'wavy', 'curly'],
    colorHistory: ['virgin', 'pro-colored'],
    maintenance: 'moderate',
    requiresConsult: false,
    sessionMinutes: { min: 120, max: 180 },
    images: ['/looks/brunette-1.jpg'],
  },
  {
    id: 'vivid-fashion-color',
    name: { en: 'Vivid Color', es: 'Color Fantasía' },
    description: {
      en: 'Bold, custom placement vivid color with serious shine. Best for guests comfortable with maintenance.',
      es: 'Color de fantasía con colocación personalizada y mucho brillo. Ideal para quienes aceptan un mantenimiento más alto.',
    },
    goals: ['vivid'],
    lengths: ['short', 'medium', 'long', 'extra'],
    textures: ['straight', 'wavy', 'curly', 'coily'],
    colorHistory: ['virgin', 'pro-colored', 'bleached', 'box-dye'],
    maintenance: 'high',
    requiresConsult: true,
    sessionMinutes: { min: 180, max: 270 },
    images: ['/looks/vivid-1.jpg'],
  },
  {
    id: 'grey-blend',
    name: { en: 'Grey Blending', es: 'Difuminado de Canas' },
    description: {
      en: 'Soft blending of natural greys with dimensional tones for a graceful, low-stress grow-out.',
      es: 'Difuminado suave de las canas con tonos dimensionales para un crecimiento elegante y sin estrés.',
    },
    goals: ['grey-blend', 'dimensional'],
    lengths: ['short', 'medium', 'long'],
    textures: ['straight', 'wavy', 'curly'],
    colorHistory: ['virgin', 'pro-colored'],
    maintenance: 'low',
    requiresConsult: false,
    sessionMinutes: { min: 150, max: 210 },
    images: ['/looks/grey-1.jpg'],
  },
  {
    id: 'precision-cut',
    name: { en: 'Precision Haircut', es: 'Corte de Precisión' },
    description: {
      en: 'A tailored cut with custom shaping for your texture and face frame—perfect for refreshes, big chops, or seasonal updates.',
      es: 'Un corte a medida con forma personalizada para tu textura y contorno—ideal para un refresh, un gran cambio o ajustes de temporada.',
    },
    goals: ['haircut'],
    lengths: ['short', 'medium', 'long', 'extra'],
    textures: ['straight', 'wavy', 'curly', 'coily'],
    colorHistory: ['virgin', 'pro-colored', 'bleached', 'box-dye'],
    maintenance: 'moderate',
    requiresConsult: false,
    sessionMinutes: { min: 60, max: 90 },
    images: ['/looks/cut-1.jpg'],
  },
  {
    id: 'repair-treatment',
    name: { en: 'Repair & Scalp Treatment', es: 'Tratamiento Reparador y Cuero Cabelludo' },
    description: {
      en: 'Targeted treatment to fortify over-processed or fragile hair, paired with scalp care to soothe and rebalance before color or cuts.',
      es: 'Tratamiento enfocado para fortalecer cabello sobreprocesado o frágil, combinado con cuidado del cuero cabelludo para calmar y reequilibrar antes de color o cortes.',
    },
    goals: ['treatment', 'keratin'],
    lengths: ['short', 'medium', 'long', 'extra'],
    textures: ['straight', 'wavy', 'curly', 'coily'],
    colorHistory: ['virgin', 'pro-colored', 'bleached', 'box-dye'],
    maintenance: 'moderate',
    requiresConsult: false,
    sessionMinutes: { min: 75, max: 105 },
    images: ['/looks/treatment-1.jpg'],
  },
  {
    id: 'texture-perm',
    name: { en: 'Texture Perm / Body Wave', es: 'Perm / Ondulado con Volumen' },
    description: {
      en: 'Adds soft movement or defined texture with a modern perm approach tailored to your density and desired wave pattern.',
      es: 'Aporta movimiento suave o textura definida con una permanente moderna adaptada a tu densidad y patrón de onda deseado.',
    },
    goals: ['perm', 'dimensional'],
    lengths: ['medium', 'long'],
    textures: ['straight', 'wavy'],
    colorHistory: ['virgin', 'pro-colored'],
    maintenance: 'high',
    requiresConsult: true,
    sessionMinutes: { min: 150, max: 210 },
    images: ['/looks/perm-1.jpg'],
  },
];

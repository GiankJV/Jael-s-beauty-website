'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLang } from '@/context/LanguageContext';
import { hairstyles } from '@/lib/hairstyles';
import { scoreHairstyles, VisionAnswers } from '@/lib/visionQuiz';

const goalsOptions = [
  { value: 'lived-in', label: { en: 'Lived-in blonde / balayage', es: 'Rubio natural / balayage' } },
  { value: 'brunette', label: { en: 'Rich brunette dimension', es: 'Castaño dimensional' } },
  { value: 'grey-blend', label: { en: 'Grey blending', es: 'Difuminado de canas' } },
  { value: 'vivid', label: { en: 'Vivid / fantasy color', es: 'Color fantasía' } },
  { value: 'blowout', label: { en: 'Blowout / styling', es: 'Secado / peinado' } },
  { value: 'keratin', label: { en: 'Smoothing / keratin', es: 'Alisado / keratina' } },
];

const lengthOptions = [
  { value: 'short', label: { en: 'Short', es: 'Corto' } },
  { value: 'medium', label: { en: 'Medium', es: 'Medio' } },
  { value: 'long', label: { en: 'Long', es: 'Largo' } },
  { value: 'extra', label: { en: 'Extra long', es: 'Extra largo' } },
];

const textureOptions = [
  { value: 'straight', label: { en: 'Straight', es: 'Lacio' } },
  { value: 'wavy', label: { en: 'Wavy', es: 'Ondulado' } },
  { value: 'curly', label: { en: 'Curly', es: 'Rizado' } },
  { value: 'coily', label: { en: 'Coily', es: 'Afro / muy rizado' } },
];

const colorHistoryOptions = [
  { value: 'virgin', label: { en: 'Virgin hair (never colored)', es: 'Cabello virgen (sin color)' } },
  { value: 'pro-colored', label: { en: 'Colored at a salon', es: 'Color profesional en salón' } },
  { value: 'bleached', label: { en: 'Previously lightened / highlighted', es: 'Aclarante / mechas previas' } },
  { value: 'box-dye', label: { en: 'Box dye at home', es: 'Tinte de caja en casa' } },
];

const maintenanceOptions = [
  { value: 'low', label: { en: 'Low (few visits a year)', es: 'Bajo (pocas visitas al año)' } },
  { value: 'moderate', label: { en: 'Moderate', es: 'Moderado' } },
  { value: 'high', label: { en: 'High (frequent upkeep)', es: 'Alto (mantenimiento frecuente)' } },
];

const steps = ['goal', 'length', 'texture', 'colorHistory', 'maintenance'] as const;
type StepKey = (typeof steps)[number];

export default function VisionPage() {
  const { lang } = useLang();
  const [answers, setAnswers] = useState<VisionAnswers>({});
  const [stepIndex, setStepIndex] = useState(0);
  const router = useRouter();

  const currentStep = steps[stepIndex];
  const scored = scoreHairstyles(hairstyles, answers);
  const topMatches = scored.filter((s) => s.score > 0).slice(0, 4);

  const updateAnswer = (key: StepKey, value: any) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const next = () => setStepIndex((i) => Math.min(i + 1, steps.length));
  const back = () => setStepIndex((i) => Math.max(i - 1, 0));

  const openQuote = (id?: string) => {
    const params = new URLSearchParams();
    if (id) params.set('hairstyleId', id);
    const filteredAnswers = Object.fromEntries(
      Object.entries(answers).filter(([, value]) => value)
    );
    if (Object.keys(filteredAnswers).length > 0) {
      params.set('answers', JSON.stringify(filteredAnswers));
    }
    const query = params.toString();
    router.push(`/vision/quote${query ? `?${query}` : ''}`);
  };

  const renderOptions = () => {
    const commonClasses =
      'px-4 py-2 rounded-full border text-sm cursor-pointer transition';
    switch (currentStep) {
      case 'goal':
        return (
          <div className="flex flex-wrap gap-3">
            {goalsOptions.map((opt) => {
              const active = answers.goal === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => updateAnswer('goal', opt.value)}
                  className={
                    commonClasses +
                    (active
                      ? ' border-rose bg-rose text-white'
                      : ' border-rose/40 text-ink bg-beige')
                  }
                >
                  {opt.label[lang]}
                </button>
              );
            })}
          </div>
        );
      case 'length':
        return (
          <div className="flex flex-wrap gap-3">
            {lengthOptions.map((opt) => {
              const active = answers.length === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => updateAnswer('length', opt.value)}
                  className={
                    commonClasses +
                    (active
                      ? ' border-rose bg-rose text-white'
                      : ' border-rose/40 text-ink bg-beige')
                  }
                >
                  {opt.label[lang]}
                </button>
              );
            })}
          </div>
        );
      case 'texture':
        return (
          <div className="flex flex-wrap gap-3">
            {textureOptions.map((opt) => {
              const active = answers.texture === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => updateAnswer('texture', opt.value)}
                  className={
                    commonClasses +
                    (active
                      ? ' border-rose bg-rose text-white'
                      : ' border-rose/40 text-ink bg-beige')
                  }
                >
                  {opt.label[lang]}
                </button>
              );
            })}
          </div>
        );
      case 'colorHistory':
        return (
          <div className="flex flex-wrap gap-3">
            {colorHistoryOptions.map((opt) => {
              const active = answers.colorHistory === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => updateAnswer('colorHistory', opt.value)}
                  className={
                    commonClasses +
                    (active
                      ? ' border-rose bg-rose text-white'
                      : ' border-rose/40 text-ink bg-beige')
                  }
                >
                  {opt.label[lang]}
                </button>
              );
            })}
          </div>
        );
      case 'maintenance':
        return (
          <div className="flex flex-wrap gap-3">
            {maintenanceOptions.map((opt) => {
              const active = answers.maintenance === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => updateAnswer('maintenance', opt.value)}
                  className={
                    commonClasses +
                    (active
                      ? ' border-rose bg-rose text-white'
                      : ' border-rose/40 text-ink bg-beige')
                  }
                >
                  {opt.label[lang]}
                </button>
              );
            })}
          </div>
        );
      default:
        return null;
    }
  };

  const quizFinished = stepIndex >= steps.length;

  return (
    <div className="container mx-auto px-4 py-10">
      <header className="mb-8 text-center">
        <h1
          className="text-4xl md:text-5xl"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {lang === 'en' ? "What's your vision?" : '¿Cuál es tu visión?'}
        </h1>
        <p className="mt-3 max-w-xl mx-auto text-sm opacity-80">
          {lang === 'en'
            ? 'Answer a few quick questions so we can suggest looks that fit your hair, lifestyle, and maintenance level.'
            : 'Responde unas preguntas rápidas para sugerirte looks que se adapten a tu cabello, estilo de vida y mantenimiento.'}
        </p>
      </header>

      {!quizFinished && (
        <section className="max-w-xl mx-auto bg-beige rounded-2xl p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between text-xs uppercase tracking-wide opacity-70">
            <span>
              {lang === 'en' ? 'Step' : 'Paso'} {stepIndex + 1} / {steps.length}
            </span>
            <div className="h-1 flex-1 ml-4 bg-pink rounded-full overflow-hidden">
              <div
                className="h-full bg-rose transition-all"
                style={{
                  width: `${((stepIndex + 1) / steps.length) * 100}%`,
                }}
              />
            </div>
          </div>

          <div className="mb-5">
            <h2 className="text-xl mb-2" style={{ fontFamily: 'var(--font-display)' }}>
              {(() => {
                if (currentStep === 'goal') {
                  return lang === 'en' ? 'What are you hoping to achieve?' : '¿Qué resultado buscas?';
                }
                if (currentStep === 'length') {
                  return lang === 'en' ? 'How long is your hair?' : '¿Qué largo tiene tu cabello?';
                }
                if (currentStep === 'texture') {
                  return lang === 'en' ? 'What is your natural texture?' : '¿Cuál es tu textura natural?';
                }
                if (currentStep === 'colorHistory') {
                  return lang === 'en'
                    ? 'What is your color history?'
                    : '¿Cuál es tu historial de color?';
                }
                if (currentStep === 'maintenance') {
                  return lang === 'en'
                    ? 'How much maintenance feels realistic for you?'
                    : '¿Cuánto mantenimiento te resulta realista?';
                }
                return '';
              })()}
            </h2>
            {renderOptions()}
          </div>

          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={back}
              disabled={stepIndex === 0}
              className="text-xs px-3 py-1 rounded-full border border-rose/40 disabled:opacity-40"
            >
              {lang === 'en' ? 'Back' : 'Atrás'}
            </button>
            <button
              type="button"
              onClick={next}
              className="text-xs px-4 py-1 rounded-full bg-rose text-white"
            >
              {stepIndex === steps.length - 1
                ? lang === 'en'
                  ? 'See Matches'
                  : 'Ver opciones'
                : lang === 'en'
                ? 'Next'
                : 'Siguiente'}
            </button>
          </div>
        </section>
      )}

      {quizFinished && (
        <section className="mt-10">
          <h2
            className="text-2xl md:text-3xl mb-4 text-center"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {lang === 'en' ? 'Looks that fit your vision' : 'Looks que van con tu visión'}
          </h2>
          <p className="text-sm opacity-80 text-center mb-6 max-w-xl mx-auto">
            {lang === 'en'
              ? 'These are suggestions based on your answers. You can request a personalized quote by sending us photos of your hair.'
              : 'Estas son sugerencias basadas en tus respuestas. Puedes solicitar una cotización personalizada enviando fotos de tu cabello.'}
          </p>

          {topMatches.length === 0 && (
            <p className="text-center text-sm opacity-70">
              {lang === 'en'
                ? 'We would love to see your hair to make a recommendation. Please request a quote and share your photos.'
                : 'Nos encantaría ver tu cabello para recomendarte mejor. Solicita una cotización y comparte tus fotos.'}
            </p>
          )}

          <div className="grid gap-6 md:grid-cols-2">
            {topMatches.map((style) => (
              <article
                key={style.id}
                className="bg-beige rounded-2xl p-5 shadow-sm border border-black/5 flex flex-col"
              >
                <h3
                  className="text-xl mb-1"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {style.name[lang]}
                </h3>
                <p className="text-xs mb-2 opacity-80">
                  {lang === 'en'
                    ? `Approximate session: ${style.sessionMinutes.min}–${style.sessionMinutes.max} minutes`
                    : `Sesión aproximada: ${style.sessionMinutes.min}–${style.sessionMinutes.max} minutos`}
                </p>
                <p className="text-sm mb-4 flex-1">{style.description[lang]}</p>

                <button
                  type="button"
                  onClick={() => openQuote(style.id)}
                  className="mt-2 inline-flex items-center justify-center rounded-full px-5 py-2 text-white"
                  style={{ background: '#D7ABA5' }}
                >
                  {lang === 'en' ? 'Request a Quote' : 'Solicitar cotización'}
                </button>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

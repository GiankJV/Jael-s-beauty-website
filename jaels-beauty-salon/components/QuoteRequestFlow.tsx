'use client';

import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useSearchParams } from 'next/navigation';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useLang } from '@/context/LanguageContext';
import PhotoDropzone from '@/components/PhotoDropzone';
import SquareBookingEmbed from '@/components/SquareBookingEmbed';

import type { VisionAnswers } from '@/lib/visionQuiz';

type ContactPref = 'email' | 'whatsapp' | 'sms';
type Slot = { date: Date | null; time: string };

type Lang = 'en' | 'es';

const initialSlots: Slot[] = [
  { date: null, time: '' },
  { date: null, time: '' },
  { date: null, time: '' },
];

const TIME_OPTIONS = [
  '08:00 AM',
  '09:30 AM',
  '11:00 AM',
  '12:30 PM',
  '02:00 PM',
  '03:30 PM',
  '05:00 PM',
];

export default function QuoteRequestFlow() {
  const { lang } = useLang();
  const searchParams = useSearchParams();
  const hairstyleId = searchParams.get('hairstyleId') || '';
  const answersParam = searchParams.get('answers') || '';

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const maxStep = 3;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [contactPref, setContactPref] = useState<ContactPref>('email');
  const [notes, setNotes] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [slots, setSlots] = useState<Slot[]>(initialSlots);
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const answers: VisionAnswers | undefined = useMemo(() => {
    if (!answersParam) return undefined;
    try {
      return JSON.parse(answersParam);
    } catch (err) {
      console.warn('Unable to parse answers param', err);
      return undefined;
    }
  }, [answersParam]);

  const sanitizedAnswers = useMemo(() => {
    if (!answers) return '';
    return JSON.stringify(answers);
  }, [answers]);

  const formatSlotsForSubmission = () => {
    const locale = lang === 'en' ? 'en-US' : 'es-MX';
    const lines = slots
      .map((slot, idx) => {
        if (!slot.date && !slot.time) return null;
        const dateText = slot.date
          ? slot.date.toLocaleDateString(locale, {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })
          : lang === 'en'
          ? 'No date selected'
          : 'Sin fecha';
        const timeText = slot.time || (lang === 'en' ? 'No time selected' : 'Sin hora');
        return `Slot ${idx + 1}: ${dateText} ${timeText}`;
      })
      .filter(Boolean);

    return lines.join('\n');
  };

  const handleSubmit = async () => {
    if (!consent) {
      setError(
        lang === 'en'
          ? 'Please agree to be contacted so we can respond to your request.'
          : 'Por favor acepta ser contactada/o para responder a tu solicitud.'
      );
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const data = new FormData();
      data.append('name', name);
      data.append('email', email);
      data.append('phone', phone);
      data.append('contactPref', contactPref);
      data.append('notes', notes);
      data.append('lang', lang);
      if (hairstyleId) data.append('hairstyleId', hairstyleId);
      if (sanitizedAnswers) data.append('answers', sanitizedAnswers);
      if (consent) data.append('consent', 'true');

      files.slice(0, 3).forEach((file) => {
        data.append('photos', file);
      });

      const slotsText = formatSlotsForSubmission();
      if (slotsText) {
        data.append('slots', slotsText);
      }

      const res = await fetch('/api/quote', {
        method: 'POST',
        body: data,
      });

      if (!res.ok) {
        throw new Error('Request failed');
      }

      setStep(4);
    } catch (err) {
      console.error(err);
      setError(
        lang === 'en'
          ? 'Something went wrong. Please try again.'
          : 'Algo salió mal. Intenta de nuevo.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-beige px-4 py-10">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <ProgressBar step={Math.min(step, maxStep)} maxStep={maxStep} />

        {step === 1 && (
          <Step1Basics
            lang={lang}
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            phone={phone}
            setPhone={setPhone}
            contactPref={contactPref}
            setContactPref={setContactPref}
            notes={notes}
            setNotes={setNotes}
            onNext={() => setStep(2)}
          />
        )}

        {step === 2 && (
          <Step2Photos
            lang={lang}
            files={files}
            setFiles={setFiles}
            onNext={() => setStep(3)}
            onBack={() => setStep(1)}
          />
        )}

        {step === 3 && (
          <Step3TimingAndConsent
            lang={lang}
            slots={slots}
            setSlots={setSlots}
            consent={consent}
            setConsent={setConsent}
            onBack={() => setStep(2)}
            onSubmit={handleSubmit}
            submitting={submitting}
            error={error}
          />
        )}

        {step === 4 && <Step4Success />}
      </div>
    </div>
  );
}

type Step1Props = {
  lang: Lang;
  name: string;
  setName: (val: string) => void;
  email: string;
  setEmail: (val: string) => void;
  phone: string;
  setPhone: (val: string) => void;
  contactPref: ContactPref;
  setContactPref: (val: ContactPref) => void;
  notes: string;
  setNotes: (val: string) => void;
  onNext: () => void;
};

function Step1Basics({
  lang,
  name,
  setName,
  email,
  setEmail,
  phone,
  setPhone,
  contactPref,
  setContactPref,
  notes,
  setNotes,
  onNext,
}: Step1Props) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <h1
        className="text-2xl md:text-3xl mb-2 text-center"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {lang === 'en'
          ? 'Request a personalized quote'
          : 'Solicita una cotización personalizada'}
      </h1>
      <p className="text-sm text-center opacity-80 mb-4">
        {lang === 'en'
          ? 'Tell us a bit about you and your hair goals so we can estimate time and cost.'
          : 'Cuéntanos un poco sobre ti y tus objetivos de cabello para estimar tiempo y costo.'}
      </p>

      <div className="grid md:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs mb-1">{lang === 'en' ? 'Name' : 'Nombre'}</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full rounded-full border border-rose/40 px-3 py-2 text-sm bg-white"
          />
        </div>
        <div>
          <label className="block text-xs mb-1">
            {lang === 'en' ? 'Phone (optional)' : 'Teléfono (opcional)'}
          </label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-full border border-rose/40 px-3 py-2 text-sm bg-white"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full rounded-full border border-rose/40 px-3 py-2 text-sm bg-white"
        />
      </div>

      <div>
        <label className="block text-xs mb-1">
          {lang === 'en' ? 'Preferred contact' : 'Preferencia de contacto'}
        </label>
        <select
          value={contactPref}
          onChange={(e) => setContactPref(e.target.value as ContactPref)}
          className="w-full rounded-full border border-rose/40 px-3 py-2 text-sm bg-white"
        >
          <option value="email">Email</option>
          <option value="whatsapp">WhatsApp</option>
          <option value="sms">SMS</option>
        </select>
      </div>

      <div>
        <label className="block text-xs mb-1">
          {lang === 'en'
            ? 'Tell us about your dream look (optional)'
            : 'Cuéntanos sobre tu look ideal (opcional)'}
        </label>
        <textarea
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full rounded-2xl border border-rose/40 px-3 py-2 text-sm bg-white resize-none"
        />
      </div>

      <div className="flex justify-end pt-2">
        <button
          type="submit"
          className="px-6 py-2 rounded-full bg-rose text-white text-sm font-medium hover:bg-rose/90 transition"
        >
          {lang === 'en' ? 'Next: Photos' : 'Siguiente: Fotos'}
        </button>
      </div>
    </form>
  );
}

type Step2Props = {
  lang: Lang;
  files: File[];
  setFiles: (files: File[]) => void;
  onNext: () => void;
  onBack: () => void;
};

function Step2Photos({ lang, files, setFiles, onNext, onBack }: Step2Props) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <h2
        className="text-xl md:text-2xl"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {lang === 'en' ? 'Share your hair photos' : 'Comparte fotos de tu cabello'}
      </h2>
      <p className="text-sm opacity-80">
        {lang === 'en'
          ? 'This helps us see your current length, color and density so we can quote accurately.'
          : 'Esto nos ayuda a ver tu largo, color y densidad actuales para cotizar con precisión.'}
      </p>

      <PhotoDropzone files={files} setFiles={setFiles} />

      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-2 rounded-full border border-rose/40 text-sm"
        >
          {lang === 'en' ? 'Back' : 'Atrás'}
        </button>
        <button
          type="submit"
          className="px-6 py-2 rounded-full bg-rose text-white text-sm font-medium hover:bg-rose/90 transition"
        >
          {lang === 'en' ? 'Next: Times' : 'Siguiente: Horarios'}
        </button>
      </div>
    </form>
  );
}

type Step3Props = {
  lang: Lang;
  slots: Slot[];
  setSlots: Dispatch<SetStateAction<Slot[]>>;
  consent: boolean;
  setConsent: (val: boolean) => void;
  onBack: () => void;
  onSubmit: () => Promise<void>;
  submitting: boolean;
  error: string | null;
};

function Step3TimingAndConsent({
  lang,
  slots,
  setSlots,
  consent,
  setConsent,
  onBack,
  onSubmit,
  submitting,
  error,
}: Step3Props) {
  const handleSlotChange = (index: number, updates: Partial<Slot>) => {
    setSlots((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], ...updates };
      return next;
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await onSubmit();
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <h2
        className="text-xl md:text-2xl"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {lang === 'en'
          ? 'Preferred days / times (optional)'
          : 'Días / horarios preferidos (opcional)'}
      </h2>
      <p className="text-sm opacity-80">
        {lang === 'en'
          ? 'Pick a few windows that work for you. We’ll confirm once we review your quote.'
          : 'Elige algunos horarios que te funcionen. Confirmaremos después de revisar tu cotización.'}
      </p>

      <div className="space-y-3">
        {slots.map((slot, idx) => (
          <div key={idx} className="grid md:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs mb-1">
                {lang === 'en' ? `Date option ${idx + 1}` : `Fecha opción ${idx + 1}`}
              </label>
              <DatePicker
                selected={slot.date}
                onChange={(date: Date | null) => handleSlotChange(idx, { date })}
                className="w-full rounded-full border border-rose/40 px-3 py-2 text-sm bg-white"
                placeholderText={lang === 'en' ? 'Pick a date' : 'Elige una fecha'}
                minDate={new Date()}
              />
            </div>
            <div>
              <label className="block text-xs mb-1">
                {lang === 'en' ? 'Preferred time' : 'Horario preferido'}
              </label>
              <select
                value={slot.time}
                onChange={(e) => handleSlotChange(idx, { time: e.target.value })}
                className="w-full rounded-full border border-ink/10 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose/40 focus:border-rose/60 bg-white"
              >
                <option value="">
                  {lang === 'en' ? 'Select a time' : 'Selecciona un horario'}
                </option>
                {TIME_OPTIONS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-start gap-2 text-xs">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1"
          required
        />
        <span>
          {lang === 'en'
            ? 'I agree to be contacted about my quote request.'
            : 'Acepto ser contactada/o sobre mi solicitud de cotización.'}
        </span>
      </div>

      {error && <p className="text-xs text-red-600">{error}</p>}

      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-2 rounded-full border border-rose/40 text-sm"
          disabled={submitting}
        >
          {lang === 'en' ? 'Back' : 'Atrás'}
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="px-6 py-2 rounded-full bg-rose text-white text-sm font-medium hover:bg-rose/90 transition disabled:opacity-60"
        >
          {submitting
            ? lang === 'en'
              ? 'Sending...'
              : 'Enviando...'
            : lang === 'en'
            ? 'Send request'
            : 'Enviar solicitud'}
        </button>
      </div>
    </form>
  );
}

function Step4Success() {
  const { lang } = useLang();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('jaels_hair_onboarded', 'true');
    }
  }, []);

  return (
    <div className="space-y-6 text-center">
      <h2
        className="text-2xl md:text-3xl"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {lang === 'en'
          ? 'Thank you! Your request has been sent.'
          : '¡Gracias! Tu solicitud ha sido enviada.'}
      </h2>
      <p className="text-sm opacity-80 max-w-xl mx-auto">
        {lang === 'en'
          ? 'We’ll review your photos and preferences and reach out with a personalized quote within a few hours.'
          : 'Revisaremos tus fotos y preferencias y te contactaremos con una cotización personalizada en unas horas.'}
      </p>

      <div className="mt-4">
        <p className="text-sm font-medium mb-3">
          {lang === 'en'
            ? 'Want to pencil in a time now?'
            : '¿Quieres apartar un horario ahora?'}
        </p>
        <p className="text-xs opacity-70 mb-4 max-w-md mx-auto">
          {lang === 'en'
            ? 'Choose a day and time using the calendar below. We’ll confirm or adjust it when we send your quote.'
            : 'Elige día y horario usando el calendario abajo. Confirmaremos o ajustaremos al enviarte tu cotización.'}
        </p>
        <div className="bg-beige rounded-2xl p-4 shadow-sm">
          <SquareBookingEmbed />
        </div>
      </div>
    </div>
  );
}

type ProgressProps = { step: number; maxStep: number };

function ProgressBar({ step, maxStep }: ProgressProps) {
  const pct = Math.min(100, (step / maxStep) * 100);
  return (
    <div className="mb-6">
      <div className="h-1.5 rounded-full bg-rose/20 overflow-hidden">
        <div
          className="h-full bg-rose transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="mt-2 text-xs uppercase tracking-wide text-ink/60">
        Step {step} of {maxStep}
      </p>
    </div>
  );
}

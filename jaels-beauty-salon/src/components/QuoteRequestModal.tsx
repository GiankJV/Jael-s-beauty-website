'use client';

import { FormEvent, useState } from 'react';
import { useLang } from '@/context/LanguageContext';
import type { VisionAnswers } from '@/lib/visionQuiz';
import type { QuoteApprovalSlot } from '@/types/quoteApproval';
import { uploadToCloudinary } from '@/lib/uploadToCloudinary';

type Props = {
  open: boolean;
  onClose: () => void;
  selectedHairstyleId: string | null;
  answers: VisionAnswers;
};

export default function QuoteRequestModal({
  open,
  onClose,
  selectedHairstyleId,
  answers,
}: Props) {
  const { lang } = useLang();
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>([]);

  if (!open) return null;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const form = e.currentTarget;
      const data = new FormData(form);
      const limitedFiles = files.slice(0, 3);
      let photoUrls: string[] = [];
      if (limitedFiles.length > 0) {
        try {
          photoUrls = await Promise.all(limitedFiles.map((file) => uploadToCloudinary(file)));
        } catch (uploadErr) {
          console.error('Cloudinary upload failed', uploadErr);
          setError(
            lang === 'en'
              ? 'We could not upload your photos. Please try again.'
              : 'No pudimos subir tus fotos. Inténtalo nuevamente.'
          );
          return;
        }
      }

      const payload = {
        name: String(data.get('name') || ''),
        email: String(data.get('email') || ''),
        phone: String(data.get('phone') || ''),
        contactPref: String(data.get('contactPref') || 'email'),
        notes: String(data.get('notes') || ''),
        lang,
        hairstyleId: selectedHairstyleId || '',
        answers: JSON.stringify(answers),
        consent: Boolean(data.get('consent')),
        slotsText: String(data.get('preferredTimes') || ''),
        slots: [] as QuoteApprovalSlot[],
        photoUrls,
      };

      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error('Request failed');
      }

      setSuccess(true);
      form.reset();
      setFiles([]);
    } catch (err) {
      setError(
        lang === 'en'
          ? 'Something went wrong. Please try again.'
          : 'Algo salió mal. Intenta de nuevo.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const list = e.target.files;
    if (!list) return;

    const acceptedTypes = ['image/jpeg', 'image/png', 'image/heic', 'image/heif'];
    const picked = Array.from(list).slice(0, 3);
    const invalid = picked.find(
      (file) => file.size > 10 * 1024 * 1024 || !acceptedTypes.includes(file.type)
    );

    if (invalid) {
      setError(
        lang === 'en'
          ? 'Please upload JPG/PNG/HEIC files under 10MB.'
          : 'Sube archivos JPG/PNG/HEIC menores de 10MB.'
      );
      e.target.value = '';
      setFiles([]);
      return;
    }

    setError(null);
    setFiles(picked);
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
      <div className="bg-beige rounded-2xl max-w-lg w-full mx-4 p-6 relative shadow-lg">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-3 text-xs opacity-70"
        >
          ✕
        </button>

        {!success ? (
          <>
            <h2
              className="text-2xl mb-2"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {lang === 'en' ? 'Request a personalized quote' : 'Solicitar cotización personalizada'}
            </h2>
            <p className="text-xs opacity-80 mb-4">
              {lang === 'en'
                ? 'Upload a photo of your hair from behind in natural light so we can estimate time and cost. We will contact you within a few hours.'
                : 'Sube una foto de tu cabello desde atrás con luz natural para estimar tiempo y costo. Te contactaremos en unas horas.'}
            </p>

            <form className="space-y-3" onSubmit={handleSubmit}>
              <div>
                <label className="block text-xs mb-1">
                  {lang === 'en' ? 'Name' : 'Nombre'}
                </label>
                <input
                  name="name"
                  required
                  className="w-full rounded-full border border-rose/40 px-3 py-2 text-sm bg-white"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full rounded-full border border-rose/40 px-3 py-2 text-sm bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs mb-1">
                    {lang === 'en' ? 'Phone (optional)' : 'Teléfono (opcional)'}
                  </label>
                  <input
                    name="phone"
                    className="w-full rounded-full border border-rose/40 px-3 py-2 text-sm bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs mb-1">
                  {lang === 'en' ? 'Preferred contact' : 'Preferencia de contacto'}
                </label>
                <select
                  name="contactPref"
                  className="w-full rounded-full border border-rose/40 px-3 py-2 text-sm bg-white"
                  defaultValue="email"
                >
                  <option value="email">{lang === 'en' ? 'Email' : 'Email'}</option>
                  <option value="whatsapp">WhatsApp</option>
                  <option value="sms">
                    {lang === 'en' ? 'Text message' : 'Mensaje de texto'}
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-xs mb-1">
                  {lang === 'en'
                    ? 'Upload 1–3 photos (from behind, no filters)'
                    : 'Sube 1–3 fotos (desde atrás, sin filtros)'}
                </label>
                <input
                  type="file"
                  name="photoInput"
                  accept=".jpg,.jpeg,.png,.heic,.heif"
                  multiple
                  onChange={handleFiles}
                  className="block w-full text-xs"
                />
                <p className="text-[11px] opacity-70 mt-1">
                  {lang === 'en'
                    ? 'Natural daylight • hair down • up to 3 photos, max 10MB each.'
                    : 'Luz natural • cabello suelto • hasta 3 fotos, máximo 10MB cada una.'}
                </p>
              </div>

              <div>
                <label className="block text-xs mb-1">
                  {lang === 'en'
                    ? 'Anything else we should know? (optional)'
                    : '¿Algo más que debamos saber? (opcional)'}
                </label>
                <textarea
                  name="notes"
                  rows={3}
                  className="w-full rounded-2xl border border-rose/40 px-3 py-2 text-sm bg-white resize-none"
                />
              </div>

              <div>
                <label className="block text-xs mb-1">
                  {lang === 'en'
                    ? 'Preferred days / times (optional)'
                    : 'Días / horarios preferidos (opcional)'}
                </label>
                <textarea
                  name="preferredTimes"
                  rows={2}
                  className="w-full rounded-2xl border border-rose/40 px-3 py-2 text-sm bg-white resize-none"
                  placeholder={
                    lang === 'en'
                      ? 'Example: Any weekday after 3pm, ideally next week.'
                      : 'Ejemplo: Cualquier día entre semana después de las 3pm, idealmente la próxima semana.'
                  }
                />
              </div>

              <div className="flex items-start gap-2 text-[11px]">
                <input type="checkbox" name="consent" required className="mt-1" />
                <span>
                  {lang === 'en'
                    ? 'I agree to be contacted about my quote request.'
                    : 'Acepto ser contactada/o sobre mi solicitud de cotización.'}
                </span>
              </div>

              {error && <p className="text-xs text-red-600">{error}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="w-full mt-2 inline-flex items-center justify-center rounded-full px-5 py-2 text-white disabled:opacity-60"
                style={{ background: '#D7ABA5' }}
              >
                {submitting
                  ? lang === 'en'
                    ? 'Sending...'
                    : 'Enviando...'
                  : lang === 'en'
                  ? 'Send request'
                  : 'Enviar solicitud'}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-8">
            <h3
              className="text-2xl mb-2"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {lang === 'en' ? 'Thank you!' : '¡Gracias!'}
            </h3>
            <p className="text-sm opacity-80 mb-4">
              {lang === 'en'
                ? 'We have received your photos and information. A stylist will reach out with a personalized quote within a few hours.'
                : 'Hemos recibido tus fotos e información. Una estilista se pondrá en contacto contigo con una cotización personalizada en unas horas.'}
            </p>
            <button
              type="button"
              onClick={() => {
                setSuccess(false);
                onClose();
              }}
              className="mt-2 inline-flex items-center justify-center rounded-full px-5 py-2 text-white"
              style={{ background: '#D7ABA5' }}
            >
              {lang === 'en' ? 'Close' : 'Cerrar'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

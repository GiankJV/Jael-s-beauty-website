"use client";

import { useState, FormEvent } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLang } from "@/context/LanguageContext";
import type { QuoteApprovalSlot } from "@/types/quoteApproval";

 type ContactPref = "email" | "whatsapp" | "sms";
 type Slot = { date: Date | null; time: string };

const initialSlots: Slot[] = [
  { date: null, time: "" },
  { date: null, time: "" },
  { date: null, time: "" },
];

const TIME_OPTIONS = [
  "08:00 AM",
  "09:30 AM",
  "11:00 AM",
  "12:30 PM",
  "02:00 PM",
  "03:30 PM",
  "05:00 PM",
];

function combineDateAndTimeToIso(date: Date, time: string): string | null {
  const match = time.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return null;
  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  if (Number.isNaN(hours) || Number.isNaN(minutes)) return null;
  const period = match[3].toUpperCase();
  if (period === "PM" && hours !== 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;
  const composed = new Date(date);
  composed.setHours(hours, minutes, 0, 0);
  return composed.toISOString();
}

export default function HairBookingPage() {
  const { lang } = useLang();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [contactPref, setContactPref] = useState<ContactPref>("email");
  const [notes, setNotes] = useState("");
  const [slots, setSlots] = useState<Slot[]>(initialSlots);
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSlotChange = (index: number, updates: Partial<Slot>) => {
    setSlots((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], ...updates };
      return next;
    });
  };

  const formatSlotsForSubmission = () => {
    const locale = lang === "en" ? "en-US" : "es-MX";
    const lines: string[] = [];
    const slotOptions: QuoteApprovalSlot[] = [];

    slots.forEach((slot, idx) => {
      if (!slot.date && !slot.time) return;
      const dateText = slot.date
        ? slot.date.toLocaleDateString(locale, {
            month: "short",
            day: "numeric",
            year: "numeric",
          })
        : lang === "en"
        ? "No date selected"
        : "Sin fecha";
      const timeText = slot.time || (lang === "en" ? "No time selected" : "Sin hora");
      const label = `Slot ${idx + 1}: ${dateText} ${timeText}`;
      lines.push(label);

      if (slot.date && slot.time) {
        const iso = combineDateAndTimeToIso(slot.date, slot.time);
        if (iso) {
          slotOptions.push({ label, startAt: iso });
        }
      }
    });

    return { slotsText: lines.join("\n"), slotOptions };
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!consent) {
      setError(
        lang === "en"
          ? "Please agree to be contacted so we can respond to your request."
          : "Por favor acepta ser contactada/o para responder a tu solicitud."
      );
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const { slotsText, slotOptions } = formatSlotsForSubmission();
      const payload = {
        name,
        email,
        phone,
        contactPref,
        notes:
          notes ||
          (lang === "en"
            ? "Returning hair client scheduling request."
            : "Solicitud de horario para clienta/o de cabello que regresa."),
        lang,
        consent: true,
        requestType: "returning-hair",
        slotsText,
        slots: slotOptions,
        photoUrls: [] as string[],
      };

      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Request failed");

      setSuccess(true);
    } catch (err) {
      console.error(err);
      setError(
        lang === "en"
          ? "Something went wrong. Please try again."
          : "Algo salió mal. Intenta de nuevo."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-beige px-4 py-10">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-8 text-center">
          <h1
            className="text-2xl md:text-3xl mb-3"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {lang === "en"
              ? "Thank you! We received your preferred days and times."
              : "¡Gracias! Recibimos tus días y horarios preferidos."}
          </h1>
          <p className="text-sm opacity-80 max-w-xl mx-auto">
            {lang === "en"
              ? "We’ll review your availability and follow up to confirm your next hair appointment."
              : "Revisaremos tu disponibilidad y te contactaremos para confirmar tu próxima cita de cabello."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-beige px-4 py-10">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <h1
          className="text-2xl md:text-3xl mb-3 text-center"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {lang === "en"
            ? "Book your next hair appointment"
            : "Reserva tu próxima cita de cabello"}
        </h1>
        <p className="text-sm opacity-80 max-w-xl mx-auto text-center mb-6">
          {lang === "en"
            ? "Tell us how to reach you and pick a few days and times that work best for you."
            : "Cuéntanos cómo contactarte y elige algunos días y horarios que te funcionen mejor."}
        </p>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs mb-1">
                {lang === "en" ? "Name" : "Nombre"}
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full rounded-full border border-rose/40 px-3 py-2 text-sm bg-white"
              />
            </div>
            <div>
              <label className="block text-xs mb-1">
                {lang === "en" ? "Phone (optional)" : "Teléfono (opcional)"}
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
              {lang === "en" ? "Preferred contact" : "Preferencia de contacto"}
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
              {lang === "en"
                ? "Anything else we should know? (optional)"
                : "¿Algo más que debamos saber? (opcional)"}
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full rounded-2xl border border-rose/40 px-3 py-2 text-sm bg-white resize-none"
            />
          </div>

          <div className="space-y-3">
            <h2
              className="text-lg md:text-xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {lang === "en" ? "Preferred days / times" : "Días / horarios preferidos"}
            </h2>
            <p className="text-xs opacity-80">
              {lang === "en"
                ? "Pick up to three options that work for you. We’ll confirm once we review your request."
                : "Elige hasta tres opciones que te funcionen. Confirmaremos después de revisar tu solicitud."}
            </p>

            {slots.map((slot, idx) => (
              <div key={idx} className="grid md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs mb-1">
                    {lang === "en"
                      ? `Date option ${idx + 1}`
                      : `Fecha opción ${idx + 1}`}
                  </label>
                  <DatePicker
                    selected={slot.date}
                    onChange={(date: Date | null) =>
                      handleSlotChange(idx, { date })
                    }
                    className="w-full rounded-full border border-rose/40 px-3 py-2 text-sm bg-white"
                    placeholderText={
                      lang === "en" ? "Pick a date" : "Elige una fecha"
                    }
                    minDate={new Date()}
                  />
                </div>
                <div>
                  <label className="block text-xs mb-1">
                    {lang === "en" ? "Preferred time" : "Horario preferido"}
                  </label>
                  <select
                    value={slot.time}
                    onChange={(e) =>
                      handleSlotChange(idx, { time: e.target.value })
                    }
                    className="w-full rounded-full border border-ink/10 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose/40 focus:border-rose/60 bg-white"
                  >
                    <option value="">
                      {lang === "en" ? "Select a time" : "Selecciona un horario"}
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
              {lang === "en"
                ? "I agree to be contacted about my request."
                : "Acepto ser contactada/o sobre mi solicitud."}
            </span>
          </div>

          {error && <p className="text-xs text-red-600">{error}</p>}

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2 rounded-full bg-rose text-white text-sm font-medium hover:bg-rose/90 transition disabled:opacity-60"
            >
              {submitting
                ? lang === "en"
                  ? "Sending..."
                  : "Enviando..."
                : lang === "en"
                ? "Send request"
                : "Enviar solicitud"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

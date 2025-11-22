"use client";

import { FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useLang } from "@/context/LanguageContext";
import StarRating from "@/components/StarRating";

type Lang = "en" | "es";
const serviceOptions = [
  "Color",
  "Blonding",
  "Extensions",
  "Cut",
  "Styling",
  "Other",
];

export default function ReviewsPage() {
  const { lang } = useLang();
  const searchParams = useSearchParams();
  const source = searchParams.get("source");

  const [name, setName] = useState("");
  const [serviceType, setServiceType] = useState("Color");
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState("");
  const [permissionToPublish, setPermissionToPublish] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isNfc = source?.toLowerCase().startsWith("nfc") ?? false;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          serviceType,
          rating,
          message,
          permissionToPublish,
          lang,
          source,
        }),
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }

      setSubmitted(true);
      setName("");
      setServiceType("Color");
      setRating(5);
      setMessage("");
      setPermissionToPublish(false);
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

  const heading = isNfc
    ? lang === "en"
      ? "Thanks for visiting Jael’s! Leave a quick review."
      : "Gracias por visitar Jael’s. Déjanos una reseña rápida."
    : lang === "en"
    ? "Leave a Review"
    : "Deja una reseña";

  const intro =
    lang === "en"
      ? "Share a few words about your experience. Your feedback helps Jael keep delivering amazing hair."
      : "Cuéntanos brevemente tu experiencia. Tus comentarios ayudan a Jael a seguir ofreciendo resultados increíbles.";

  return (
    <main className="min-h-screen bg-beige px-4 py-10">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <div className="space-y-3 text-center mb-6">
          <h1
            className="text-3xl md:text-4xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {heading}
          </h1>
          <p className="text-sm md:text-base opacity-80 max-w-2xl mx-auto">{intro}</p>
        </div>

        {submitted ? (
          <div className="text-center space-y-3">
            <h2 className="text-2xl md:text-3xl" style={{ fontFamily: "var(--font-display)" }}>
              {lang === "en"
                ? "Thank you so much for sharing your experience."
                : "Gracias por compartir tu experiencia."}
            </h2>
            <p className="text-sm opacity-80">
              {lang === "en"
                ? "Your review has been received."
                : "Tu reseña ha sido recibida."}
            </p>
          </div>
        ) : (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs mb-1">
                {lang === "en" ? "Name" : "Nombre"}
              </label>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-full border border-rose/40 px-3 py-2 text-sm bg-white"
              />
            </div>

            <div>
              <label className="block text-xs mb-1">
                {lang === "en" ? "Service type" : "Tipo de servicio"}
              </label>
              <select
                required
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                className="w-full rounded-full border border-rose/40 px-3 py-2 text-sm bg-white"
              >
                {serviceOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="rating"
                className="block text-sm font-medium text-slate-700"
              >
                {lang === "es" ? "Calificación" : "Rating"}
              </label>

              <StarRating value={rating} onChange={setRating} lang={lang} />
              <input type="hidden" name="rating" id="rating" value={rating} />
            </div>

            <div>
              <label className="block text-xs mb-1">
                {lang === "en" ? "Message" : "Mensaje"}
              </label>
              <textarea
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full rounded-2xl border border-rose/40 px-3 py-2 text-sm bg-white resize-none"
              />
            </div>

            <label className="flex items-start gap-2 text-xs">
              <input
                type="checkbox"
                checked={permissionToPublish}
                onChange={(e) => setPermissionToPublish(e.target.checked)}
                required
                className="mt-1"
              />
              <span>
                {lang === "en"
                  ? "I give permission for this review (first name only) to appear on Jael’s website and marketing."
                  : "Doy permiso para que esta reseña (solo nombre de pila) aparezca en el sitio web y marketing de Jael."}
              </span>
            </label>

            {error && <p className="text-xs text-red-600">{error}</p>}

            <div className="flex justify-end pt-2">
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
                  ? "Submit review"
                  : "Enviar reseña"}
              </button>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}

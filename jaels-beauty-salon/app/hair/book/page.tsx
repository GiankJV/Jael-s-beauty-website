"use client";

import { useLang } from "@/context/LanguageContext";
import SquareBookingEmbed from "@/components/SquareBookingEmbed";

export default function HairBookingPage() {
  const { lang } = useLang();

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
            ? "Choose the day and time that works best for you. We’ll confirm your appointment shortly."
            : "Elige el día y horario que mejor te funcione. Confirmaremos tu cita pronto."}
        </p>

        <div className="bg-beige rounded-2xl p-4 shadow-sm">
          <SquareBookingEmbed />
        </div>
      </div>
    </div>
  );
}

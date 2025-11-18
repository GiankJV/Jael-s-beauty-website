"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLang } from "@/context/LanguageContext";

export default function HairStartPage() {
  const { lang } = useLang();
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [isReturning, setIsReturning] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const flag = localStorage.getItem("jaels_hair_onboarded");

    if (flag === "true") {
      setIsReturning(true);
      setChecked(true);
    } else {
      router.replace("/vision");
    }
  }, [router]);

  if (!checked) {
    return (
      <div className="min-h-screen bg-beige flex items-center justify-center">
        <p className="text-sm opacity-70">
          {lang === "en" ? "Loading..." : "Cargando..."}
        </p>
      </div>
    );
  }

  if (!isReturning) return null;

  return (
    <div className="min-h-screen bg-beige px-4 py-10">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-8 text-center">
        <h1
          className="text-2xl md:text-3xl mb-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {lang === "en"
            ? "Have you visited us for hair services before?"
            : "¿Ya nos has visitado para servicios de cabello?"}
        </h1>
        <p className="text-sm opacity-80 mb-6">
          {lang === "en"
            ? "Returning guests can skip the full questionnaire and go straight to choosing a day and time."
            : "Si ya eres clienta/o, puedes saltar el cuestionario y elegir directamente día y horario."}
        </p>

        <div className="flex flex-col gap-3 md:flex-row md:justify-center">
          <button
            onClick={() => router.push("/hair/book")}
            className="px-6 py-2 rounded-full bg-rose text-white text-sm font-medium hover:bg-rose/90 transition"
          >
            {lang === "en"
              ? "Yes, take me to booking"
              : "Sí, ir a reservar"}
          </button>
          <button
            onClick={() => router.push("/vision")}
            className="px-6 py-2 rounded-full border border-rose/40 text-sm font-medium hover:bg-rose/10 transition"
          >
            {lang === "en"
              ? "I'm a new hair client"
              : "Soy nueva/o en cabello"}
          </button>
        </div>
      </div>
    </div>
  );
}

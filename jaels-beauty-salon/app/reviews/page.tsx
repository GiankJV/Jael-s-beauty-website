"use client";

import { useState } from "react";

type Lang = "en" | "es";

interface StarRatingProps {
  value: number; // current rating 1-5
  onChange: (value: number) => void;
  lang: Lang;
}

export default function StarRating({ value, onChange, lang }: StarRatingProps) {
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const displayValue = hoverValue ?? value;

  const labelText =
    lang === "es" ? `${displayValue} de 5` : `${displayValue}/5`;

  return (
    <div className="inline-flex flex-col items-start gap-1">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => {
          const isActive = displayValue >= star;

          return (
            <button
              key={star}
              type="button"
              aria-label={
                lang === "es" ? `${star} estrellas` : `${star} star${star > 1 ? "s" : ""}`
              }
              onClick={() => onChange(star)}
              onMouseEnter={() => setHoverValue(star)}
              onMouseLeave={() => setHoverValue(null)}
              className={`text-2xl transition-transform duration-150 ease-out focus:outline-none ${
                isActive ? "text-amber-400 scale-110" : "text-slate-300 hover:scale-110"
              }`}
            >
              {isActive ? "★" : "☆"}
            </button>
          );
        })}
      </div>
      <span className="text-xs text-slate-500">{labelText}</span>
    </div>
  );
}

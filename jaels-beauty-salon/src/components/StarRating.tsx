"use client";

import { useState } from "react";

type Lang = "en" | "es";

export type StarRatingProps = {
  value: number; // 1–5
  onChange: (value: number) => void;
  lang: Lang;
};

const STAR_COUNT = 5;

export default function StarRating({ value, onChange, lang }: StarRatingProps) {
  const [poppingStar, setPoppingStar] = useState<number | null>(null);

  const handleClick = (starValue: number) => {
    onChange(starValue);
    setPoppingStar(starValue);

    setTimeout(() => setPoppingStar(null), 160);
  };

  return (
    <div className="inline-flex flex-col gap-1">
      <div className="flex items-center">
        {Array.from({ length: STAR_COUNT }, (_, i) => {
          const starValue = i + 1;
          const isActive = starValue <= value;
          const isPopping = poppingStar === starValue;

          return (
            <button
              key={starValue}
              type="button"
              onClick={() => handleClick(starValue)}
              className={[
                "mx-0.5 text-2xl md:text-3xl",
                "transition-transform duration-150",
                "focus:outline-none",
                "cursor-pointer select-none",
                isPopping ? "scale-125" : "scale-100",
                isActive ? "text-[#d99393]" : "text-[#e3d3d0]",
              ].join(" ")}
              aria-label={
                lang === "es"
                  ? `Calificación ${starValue} de 5`
                  : `Rating ${starValue} out of 5`
              }
            >
              ★
            </button>
          );
        })}
      </div>

      <span className="text-xs text-slate-500">
        {value}/{STAR_COUNT}
      </span>
    </div>
  );
}

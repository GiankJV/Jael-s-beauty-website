"use client";

import { useState } from "react";

export type StarRatingProps = {
  value: number;
  onChange: (value: number) => void;
  lang: "en" | "es";
};

export default function StarRating({ value, onChange, lang }: StarRatingProps) {
  const [poppingStar, setPoppingStar] = useState<number | null>(null);

  const handleClick = (starValue: number) => {
    onChange(starValue);
    setPoppingStar(starValue);

    // brief “pop” animation
    setTimeout(() => setPoppingStar(null), 180);
  };

  const pink = "#d99393";
  const grey = "#e2d8d8";

  return (
    <div className="flex items-center gap-3">
      <div className="flex gap-1">
        {Array.from({ length: 5 }, (_, i) => {
          const starValue = i + 1;
          const isActive = starValue <= value;
          const isPopping = poppingStar === starValue;

          return (
            <button
              key={starValue}
              type="button"
              onClick={() => handleClick(starValue)}
              className="relative h-8 w-8 flex items-center justify-center focus:outline-none"
              aria-label={
                lang === "en"
                  ? `${starValue} star${starValue > 1 ? "s" : ""}`
                  : `${starValue} estrella${starValue > 1 ? "s" : ""}`
              }
            >
              {/* Pop ring */}
              <span
                className={`pointer-events-none absolute inset-0 rounded-full border transition duration-150 ease-out opacity-0 scale-75 ${
                  isPopping ? "opacity-100 scale-125" : ""
                }`}
                style={{ borderColor: pink }}
              />

              {/* Star */}
              <span
                className={`text-2xl transition-transform duration-150 ease-out ${
                  isPopping ? "scale-125" : "scale-100"
                }`}
                style={{ color: isActive ? pink : grey }}
              >
                {isActive ? "★" : "☆"}
              </span>
            </button>
          );
        })}
      </div>

      <span className="text-xs text-slate-500">{value}/5</span>
    </div>
  );
}

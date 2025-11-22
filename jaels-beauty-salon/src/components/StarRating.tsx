"use client";

type Lang = "en" | "es";

export type StarRatingProps = {
  value: number;
  onChange: (value: number) => void;
  lang: Lang;
};

export default function StarRating({
  value,
  onChange,
  lang,
}: StarRatingProps) {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="inline-flex flex-col gap-1">
      <div className="flex gap-1">
        {stars.map((star) => {
          const active = star <= value;

          return (
            <button
              key={star}
              type="button"
              onClick={() => onChange(star)}
              aria-label={
                lang === "es"
                  ? `${star} de 5 estrellas`
                  : `${star} out of 5 stars`
              }
              className={[
                "h-8 w-8 flex items-center justify-center rounded-full",
                "transition-transform duration-150 ease-out",
                "hover:scale-110 active:scale-95",
                active ? "text-amber-400" : "text-slate-300",
              ].join(" ")}
            >
              <span className="text-2xl leading-none">
                {active ? "★" : "☆"}
              </span>
            </button>
          );
        })}
      </div>

      <span className="text-xs text-slate-500 mt-1">
        {lang === "es" ? `${value} de 5` : `${value}/5`}
      </span>
    </div>
  );
}

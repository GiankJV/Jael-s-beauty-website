'use client';

import * as React from 'react';

type StarRatingProps = {
  value: number;
  onChange: (value: number) => void;
  max?: number;
  lang?: 'en' | 'es';
};

const StarRating: React.FC<StarRatingProps> = ({ value, onChange, max = 5, lang = 'en' }) => {
  return (
    <div className="flex items-center gap-2">
      {[...Array(max)].map((_, index) => {
        const starValue = index + 1;
        const isActive = starValue <= value;
        const ariaLabel =
          lang === 'es'
            ? `${starValue} estrella${starValue > 1 ? 's' : ''}`
            : `${starValue} star${starValue > 1 ? 's' : ''}`;

        return (
          <button
            key={starValue}
            type="button"
            onClick={() => onChange(starValue)}
            aria-label={ariaLabel}
            className="
                 relative
                 focus:outline-none
                 focus-visible:ring-2 focus-visible:ring-rose-300 focus-visible:ring-offset-2 focus-visible:ring-offset-rose-50
               "
          >
            <svg
              className={`
                   h-8 w-8
                   transition-transform duration-150
                   hover:scale-110 active:scale-125
                   ${isActive ? 'scale-105' : 'scale-100'}
                 `}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                d="M12 2.5l2.69 5.45 6.01.87-4.35 4.24 1.03 6.02L12 16.9l-5.38 2.83 1.03-6.02L3.3 8.82l6.01-.87L12 2.5z"
                fill={isActive ? '#E4B0A8' : 'none'}
                stroke="#E4B0A8"
                strokeWidth={1.5}
              />
            </svg>
          </button>
        );
      })}

      <span className="ml-2 text-sm text-slate-500">
        {value}/{max}
      </span>
    </div>
  );
};

export default StarRating;

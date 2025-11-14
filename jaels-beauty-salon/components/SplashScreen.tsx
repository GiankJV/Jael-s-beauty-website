"use client";

import { useEffect, useState } from 'react';

export default function SplashScreen() {
  const [visible, setVisible] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.sessionStorage.getItem('jaels_splash_seen') === 'true') {
      setVisible(false);
      return;
    }

    window.sessionStorage.setItem('jaels_splash_seen', 'true');
    setVisible(true);

    const textTimer = setTimeout(() => setShowText(true), 1200);
    const fadeTimer = setTimeout(() => setFadeOut(true), 1700);
    const hideTimer = setTimeout(() => setVisible(false), 2300);
    const safetyTimer = setTimeout(() => {
      setFadeOut(true);
      setVisible(false);
    }, 4000);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
      clearTimeout(safetyTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`
        fixed inset-0 z-[99999] flex items-center justify-center
        bg-[#e8b3b3]
        transition-opacity duration-700
        ${fadeOut ? 'opacity-0' : 'opacity-100'}
      `}
    >
      <div className="relative flex flex-col items-center justify-center">
        <div className="w-40 h-40 sm:w-48 sm:h-48">
          <ScissorAnimation />
        </div>
        <div
          className={`
            mt-4 text-center
            font-heading text-2xl sm:text-3xl tracking-[0.12em] uppercase
            text-ink
            transition-opacity duration-500
            ${showText ? 'opacity-100' : 'opacity-0'}
          `}
        >
          Jael&apos;s Beauty Salon
        </div>
      </div>

      <style jsx>{`
        .scissor-blade {
          transform-origin: 50% 60%;
        }

        .scissor-blade-upper {
          animation: snip-upper 0.3s ease-in-out 0s 4 alternate;
        }

        .scissor-blade-lower {
          animation: snip-lower 0.3s ease-in-out 0s 4 alternate;
        }

        @keyframes snip-upper {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-16deg);
          }
        }

        @keyframes snip-lower {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(16deg);
          }
        }
      `}</style>
    </div>
  );
}

function ScissorAnimation() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full" aria-hidden="true">
      <circle cx="60" cy="130" r="18" fill="none" stroke="#2f2929" strokeWidth="4" />
      <circle cx="60" cy="70" r="18" fill="none" stroke="#2f2929" strokeWidth="4" />
      <circle cx="100" cy="100" r="4" fill="#2f2929" />
      <g className="scissor-blade scissor-blade-upper">
        <path d="M100 100 L170 45" stroke="#2f2929" strokeWidth="4" strokeLinecap="round" />
      </g>
      <g className="scissor-blade scissor-blade-lower">
        <path d="M100 100 L170 155" stroke="#2f2929" strokeWidth="4" strokeLinecap="round" />
      </g>
      <line x1="60" y1="130" x2="100" y2="100" stroke="#2f2929" strokeWidth="4" strokeLinecap="round" />
      <line x1="60" y1="70" x2="100" y2="100" stroke="#2f2929" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

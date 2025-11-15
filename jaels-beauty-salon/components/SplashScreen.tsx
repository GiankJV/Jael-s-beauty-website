"use client";

import { useEffect, useState } from "react";

export default function SplashScreen() {
  const [visible, setVisible] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [showWordmark, setShowWordmark] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // only show once per session
    if (window.sessionStorage.getItem("jaels_splash_seen") === "true") {
      setVisible(false);
      return;
    }

    window.sessionStorage.setItem("jaels_splash_seen", "true");
    setVisible(true);

    // line this up with the second snip
    const wordmarkTimer = setTimeout(() => setShowWordmark(true), 700);

    const fadeTimer = setTimeout(() => setFadeOut(true), 1800);
    const hideTimer = setTimeout(() => setVisible(false), 2400);

    const safetyTimer = setTimeout(() => {
      setFadeOut(true);
      setVisible(false);
    }, 4000);

    return () => {
      clearTimeout(wordmarkTimer);
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
      clearTimeout(safetyTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] flex items-center justify-center
        bg-[#e8b3b3]
        transition-opacity duration-700
        ${fadeOut ? "opacity-0" : "opacity-100"}`}
    >
      <div className="relative flex items-center justify-center">
        <AnimatedScissors />

        {/* wordmark appears BETWEEN the blades */}
        <div
          className={`pointer-events-none absolute inset-0 flex items-center justify-center
            text-center font-heading uppercase tracking-[0.35em]
            text-ink text-[10px] sm:text-xs md:text-sm
            transition-all duration-500
            ${
              showWordmark
                ? "opacity-100 scale-100 translate-y-0"
                : "opacity-0 scale-95 translate-y-1"
            }`}
        >
          <div className="leading-[1.4]">
            <div>JAEL&apos;S</div>
            <div>BEAUTY</div>
            <div>SALON</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scissor-wrapper {
          position: relative;
          width: 10rem;
          height: 10rem;
        }

        .scissor-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
          user-select: none;
          -webkit-user-drag: none;
        }

        /* tweak this pivot if the blades don't pivot exactly where you want */
        .scissor-blade-upper,
        .scissor-blade-lower {
          transform-origin: 50% 18%;
          animation-duration: 1.1s;
          animation-timing-function: ease-in-out;
          animation-fill-mode: forwards;
        }

        .scissor-blade-upper {
          animation-name: snip-upper;
        }

        .scissor-blade-lower {
          animation-name: snip-lower;
        }

        /* two snips, ending open */
        @keyframes snip-upper {
          0% {
            transform: rotate(0deg);
          }
          20% {
            transform: rotate(-18deg);
          }
          40% {
            transform: rotate(0deg);
          }
          60% {
            transform: rotate(-22deg);
          }
          100% {
            transform: rotate(-22deg);
          }
        }

        @keyframes snip-lower {
          0% {
            transform: rotate(0deg);
          }
          20% {
            transform: rotate(18deg);
          }
          40% {
            transform: rotate(0deg);
          }
          60% {
            transform: rotate(22deg);
          }
          100% {
            transform: rotate(22deg);
          }
        }
      `}</style>
    </div>
  );
}

function AnimatedScissors() {
  return (
    <div className="scissor-wrapper">
      {/* static center / handle piece */}
      <img
        src="/Vector.svg"
        alt=""
        className="scissor-img"
        draggable={false}
      />

      {/* moving blades — if they feel swapped, just swap which file is upper/lower */}
      <img
        src="/Vector-1.svg"
        alt=""
        className="scissor-img scissor-blade-upper"
        draggable={false}
      />
      <img
        src="/Vector-2.svg"
        alt=""
        className="scissor-img scissor-blade-lower"
        draggable={false}
      />
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import ScissorAnimation from "./ScissorAnimation";

export default function SplashScreen() {
  const [visible, setVisible] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.sessionStorage.getItem("jaels_splash_seen") === "true") {
      setVisible(false);
      return;
    }

    window.sessionStorage.setItem("jaels_splash_seen", "true");
    setVisible(true);

    // show text after second snip
    const textTimer = setTimeout(() => setShowText(true), 1200);
    const fadeTimer = setTimeout(() => setFadeOut(true), 4000);
    const hideTimer = setTimeout(() => setVisible(false), 4000);
    const safetyTimer = setTimeout(() => {
      setFadeOut(true);
      setVisible(false);
    }, 6000);

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
      className={`fixed inset-0 z-[99999] flex items-center justify-center
                  bg-[#e8b3b3] transition-opacity duration-700
                  ${fadeOut ? "opacity-0" : "opacity-100"}`}
    >
      <div className="relative flex items-center justify-center">
        {/* BIGGER, HORIZONTAL SCISSORS */}
        <div className="scissor-wrapper w-[80vw] max-w-[900px]">
          <div className="relative flex items-center justify-center">
            <div className="w-full">
              <ScissorAnimation />
            </div>

            {/* SINGLE-LINE BUSINESS NAME, BETWEEN BLADES */}
            <div
              className={`
                business-name
                absolute
                font-heading uppercase tracking-[0.35em]
                text-ink whitespace-nowrap
                text-[clamp(16px,2.1vw,22px)]
                transition-opacity duration-500
                ${showText ? "opacity-100" : "opacity-0"}
              `}
            >
              JAEL&apos;S&nbsp;BEAUTY&nbsp;SALON
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Rotate SVG so scissors are horizontal */
        .scissor-wrapper svg {
          transform: rotate(-90deg);
          transform-origin: 50% 50%;
        }

        /* Put the text roughly between the blades, slightly to the right */
        .business-name {
          left: 65%;
          top: 49.5%;
          transform: translate(-10%, -50%);
        }

        /* SNIP ANIMATION */
        .upper-blade,
        .lower-blade {
          transform-origin: 122px 200px; /* pivot around the screw area */
        }

        .upper-blade {
          animation: snip-upper 0.35s ease-in-out 0.1s 4 alternate;
        }

        .lower-blade {
          animation: snip-lower 0.35s ease-in-out 0.1s 4 alternate;
        }

        @keyframes snip-upper {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(18deg);
          }
        }

        @keyframes snip-lower {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-18deg);
          }
        }

        @media (max-width: 640px) {
          .scissor-wrapper {
            width: 90vw;
            margin-left: -37vw; /* nudge left on mobile to avoid overlap */
          }
          .business-name {
            left: 69%;
            top: 50%;
            transform: translate(-5%, -50%);
            font-size: 14px;
            letter-spacing: 0.3em;
          }
        }
      `}</style>
    </div>
  );
}

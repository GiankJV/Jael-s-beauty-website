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

    // First snip happens immediately (handled in CSS)
    // Show text on second snip (slightly later)
    const textTimer = setTimeout(() => setShowText(true), 1200);

    const fadeTimer = setTimeout(() => setFadeOut(true), 2000);
    const hideTimer = setTimeout(() => setVisible(false), 2600);

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
        ${fadeOut ? "opacity-0" : "opacity-100"}
      `}
    >
      {/* BIGGER, NO CLIPPING */}
      <div className="relative flex items-center justify-center">
        <div className="relative w-[260px] h-[360px] sm:w-[320px] sm:h-[440px]">
          {/* Scissors */}
          <ScissorAnimation />

          {/* TEXT INSIDE BLADES */}
          <div
            className={`
              pointer-events-none
              absolute left-1/2 top-[15%]
              -translate-x-1/2 -translate-y-1/2
              text-[9px] sm:text-[11px]
              tracking-[0.35em]
              leading-[1.4]
              text-[#2f2929]
              uppercase
              text-center
              transition-opacity duration-500
              ${showText ? "opacity-100" : "opacity-0"}
            `}
          >
            J A E L&apos; S
            <br />
            B E A U T Y
            <br />
            S A L O N
          </div>
        </div>
      </div>
    </div>
  );
}

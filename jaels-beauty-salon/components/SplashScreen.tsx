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

    // Text appears on second snip
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
      <div className="relative flex items-center justify-center">
        {/* Wider + a little taller for horizontal layout */}
        <div className="relative w-[360px] h-[260px] sm:w-[440px] sm:h-[300px]">
          {/* ROTATED SCISSORS */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-full origin-center rotate-90">
              <ScissorAnimation />
            </div>
          </div>

          {/* TEXT BETWEEN BLADES (NOT ROTATED) */}
          <div
            className={`
              pointer-events-none
              absolute left-1/2 top-1/2
              -translate-x-1/2 -translate-y-1/2
              text-[10px] sm:text-[12px]
              tracking-[0.35em]
              leading-[1.5]
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

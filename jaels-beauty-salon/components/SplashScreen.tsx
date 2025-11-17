"use client";

import { useEffect, useState } from "react";
import ScissorAnimation from "./ScissorAnimation";

export default function SplashScreen() {
  const [visible, setVisible] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // only show once per session
    if (window.sessionStorage.getItem("jaels_splash_seen") === "true") {
      setVisible(false);
      return;
    }

    window.sessionStorage.setItem("jaels_splash_seen", "true");
    setVisible(true);

    // fade the whole splash out after the animation
    const fadeTimer = setTimeout(() => setFadeOut(true), 1800);
    const hideTimer = setTimeout(() => setVisible(false), 2400);

    // safety kill-switch
    const safetyTimer = setTimeout(() => {
      setFadeOut(true);
      setVisible(false);
    }, 4000);

    return () => {
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
        <div className="w-[260px] h-[430px] sm:w-[320px] sm:h-[480px]">
          <ScissorAnimation />
        </div>
      </div>
    </div>
  );
}

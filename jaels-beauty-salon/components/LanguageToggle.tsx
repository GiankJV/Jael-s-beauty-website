"use client";

import { useLanguage } from "@/context/LanguageContext";

export function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  const toggle = () => setLang(lang === "en" ? "es" : "en");

  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex items-center rounded-full border border-rose-200 bg-rose-50/80 px-3 py-1 text-xs font-medium tracking-wide shadow-sm"
      aria-label="Toggle language"
    >
      <span className={lang === "en" ? "font-semibold" : "opacity-60"}>EN</span>
      <span className="mx-1 h-4 w-px bg-rose-200" />
      <span className={lang === "es" ? "font-semibold" : "opacity-60"}>ES</span>
    </button>
  );
}

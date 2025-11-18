"use client";

import { useLanguage } from "@/context/LanguageContext";

export function LanguageToggle() {
  const { lang, toggleLang } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggleLang}
      className="
        inline-flex items-center rounded-full
        border border-rose/70 bg-[#f6e8e8]
        px-1 py-1 text-xs font-body text-ink shadow-sm
      "
      aria-label="Toggle language"
    >
      <span
        className={`
          px-3 py-0.5 rounded-full transition-colors
          ${lang === 'en' ? 'bg-rose text-white' : 'text-ink'}
        `}
      >
        EN
      </span>
      <span
        className={`
          px-3 py-0.5 rounded-full transition-colors
          ${lang === 'es' ? 'bg-rose text-white' : 'text-ink'}
        `}
      >
        ES
      </span>
    </button>
  );
}

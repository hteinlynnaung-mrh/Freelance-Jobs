import { createContext, useContext, useMemo, useState } from "react";
import { translations, type Language, type TranslationKey } from "./translations";

type I18nValue = { language: Language; locale: string; setLanguage: (language: Language) => void; t: (key: TranslationKey, values?: Record<string, string | number>) => string };
const I18nContext = createContext<I18nValue | null>(null);

function initialLanguage(): Language {
  const saved = localStorage.getItem("archer-language");
  if (saved === "en" || saved === "my") return saved;
  return navigator.language.toLowerCase().startsWith("my") ? "my" : "en";
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(initialLanguage);
  const setLanguage = (next: Language) => { setLanguageState(next); localStorage.setItem("archer-language", next); document.documentElement.lang = next === "my" ? "my" : "en"; };
  const value = useMemo<I18nValue>(() => ({ language, locale: language === "my" ? "my-MM" : "en-US", setLanguage, t: (key, values) => { let text: string = translations[language][key] ?? translations.en[key]; for (const [name, replacement] of Object.entries(values ?? {})) text = text.replaceAll(`{${name}}`, String(replacement)); return text; } }), [language]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() { const value = useContext(I18nContext); if (!value) throw new Error("useI18n must be used inside I18nProvider"); return value; }

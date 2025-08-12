import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import EN from "./src/Local/en.json"
import AR from "./src/Local/ar.json"

import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: { translation: EN },
  ar: { translation: AR },

};

const languageDetector = new LanguageDetector();
languageDetector.init({
  order: ['localStorage', 'navigator'],
  caches: ['localStorage'],
});

i18n
.use(new LanguageDetector(null, { lookupLocalStorage: "language" }))
.use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || 'en',
    interpolation: { escapeValue: false },
    react: { useSuspense: false }
  });

export default i18n;
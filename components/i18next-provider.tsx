"use client"

import type React from "react"

import { useEffect, useState } from "react"
import i18n from "i18next"
import { initReactI18next, I18nextProvider as Provider } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import Backend from "i18next-http-backend"

// Initialize i18next
i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "ru",
    supportedLngs: ["ru", "en", "tg"],
    debug: process.env.NODE_ENV === "development",
    interpolation: {
      escapeValue: false, // not needed for React
    },
    ns: ["common"],
    defaultNS: "common",
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
  })

export function I18nextProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return <Provider i18n={i18n}>{children}</Provider>
}


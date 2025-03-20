"use client";

import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "@/components/language-switcher";
import DynamicSection from "@/components/dynamic-section";

export function HomeContent() {
  const { t } = useTranslation();

  return (
    <main className="relative">
      <DynamicSection />
    </main>
  );
}

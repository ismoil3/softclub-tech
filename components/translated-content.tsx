"use client"

import { useTranslation } from "react-i18next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function TranslatedContent() {
  const { t } = useTranslation()

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{t("welcome")}</CardTitle>
        <CardDescription>{t("changeLanguage")}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{t("description")}</p>
      </CardContent>
    </Card>
  )
}


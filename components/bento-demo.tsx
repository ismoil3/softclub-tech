import { Bell, Calendar, FileText, Globe, Keyboard } from "lucide-react";

import { BentoCard, BentoGrid } from "@/components/bento-grid";
import { useTranslation } from "react-i18next";

const features = [
  {
    Icon: FileText,
    name: {
      en: "Save your files",
      ru: "Сохраните свои файлы",
      tg: "Файлҳои худро захира кунед",
    },
    description: {
      en: "We automatically save your files as you type.",
      ru: "Мы автоматически сохраняем ваши файлы по мере ввода.",
      tg: "Мо файлҳои шуморо худкор ҳангоми чоп кардан нигоҳ медорем.",
    },
    href: "/",
    cta: { en: "Learn more", ru: "Узнать больше", tg: "Маълумоти бештар" },
    background: <div className="absolute -right-20 -top-20 opacity-60" />,
    className: "sm:col-span-2",
  },
  {
    Icon: Keyboard,
    name: {
      en: "Full text search",
      ru: "Полнотекстовый поиск",
      tg: "Ҷустуҷӯи пурра",
    },
    description: {
      en: "Search through all your files in one place.",
      ru: "Ищите во всех своих файлах в одном месте.",
      tg: "Дар ҳамаи файлҳои худ дар як ҷо ҷустуҷӯ кунед.",
    },
    href: "/",
    cta: { en: "Learn more", ru: "Узнать больше", tg: "Маълумоти бештар" },
    background: <div className="absolute -right-20 -top-20 opacity-60" />,
    className: "",
  },
  {
    Icon: Globe,
    name: { en: "Multilingual", ru: "Многоязычный", tg: "Бисёрзабона" },
    description: {
      en: "Supports 100+ languages and counting.",
      ru: "Поддерживает более 100 языков и продолжает расти.",
      tg: "Аз 100+ забонро дастгирӣ мекунад ва меафзояд.",
    },
    href: "/",
    cta: { en: "Learn more", ru: "Узнать больше", tg: "Маълумоти бештар" },
    background: <div className="absolute -right-20 -top-20 opacity-60" />,
    className: "",
  },
  {
    Icon: Calendar,
    name: { en: "Calendar", ru: "Календарь", tg: "Тақвим" },
    description: {
      en: "Use the calendar to filter your files by date.",
      ru: "Используйте календарь для фильтрации файлов по дате.",
      tg: "Тақвимро барои ҷудокунии файлҳо аз рӯи сана истифода баред.",
    },
    href: "/",
    cta: { en: "Learn more", ru: "Узнать больше", tg: "Маълумоти бештар" },
    background: <div className="absolute -right-20 -top-20 opacity-60" />,
    className: "",
  },
  {
    Icon: Bell,
    name: { en: "Notifications", ru: "Уведомления", tg: "Огоҳиномаҳо" },
    description: {
      en: "Get notified when someone shares a file or mentions you in a comment.",
      ru: "Получайте уведомления, когда кто-то делится файлом или упоминает вас в комментарии.",
      tg: "Ҳангоми мубодилаи файл ё зикри шумо дар шарҳ огоҳӣ гиред.",
    },
    href: "/",
    cta: { en: "Learn more", ru: "Узнать больше", tg: "Маълумоти бештар" },
    background: <div className="absolute -right-20 -top-20 opacity-60" />,
    className: "",
  },
];

export default function BentoDemo() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl py-[50px] font-semibold text-center mb-8 text-primary">
        Наши ценности
      </h1>
      <BentoGrid className="lg:grid-rows-3">
        {features.map((feature) => (
          <BentoCard key={feature.name[lang]} {...feature} />
        ))}
      </BentoGrid>
    </div>
  );
}

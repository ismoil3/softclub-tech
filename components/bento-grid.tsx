import type React from "react";
import { ArrowRightIcon } from "lucide-react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  className?: string;
}

interface BentoCardProps extends ComponentPropsWithoutRef<"div"> {
  name: string;
  className?: string;
  background?: ReactNode;
  Icon: React.ElementType;
  description: string;
  href: string;
  cta: string;
}

export function BentoGrid({ children, className, ...props }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function BentoCard({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  ...props
}: BentoCardProps) {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  return (
    <Card
      className={cn(
        "group relative h-[200px] flex flex-col justify-between overflow-hidden",
        "transition-all duration-200 hover:shadow-lg",
        className
      )}
      {...props}
    >
      {/* Background */}
      {/* <div className="absolute inset-0 z-0 overflow-hidden"></div> */}

      <div className="z-10 flex flex-col gap-1 p-6 transition-all duration-300 group-hover:hidden">
        <Icon className="h-12 w-12 origin-left transform-gpu text-primary transition-all duration-300 ease-in-out group-hover:scale-75" />
      </div>

      {/* Content moved to the bottom of the card */}
      <div
        className={cn(
          "flex flex-col justify-end absolute bottom-0 left-0 w-full p-6 transition-all duration-300 group-hover:hidden"
        )}
      >
        <h3 className="text-xl font-semibold">{name[lang]}</h3>
        {/* <p className="max-w-lg text-muted-foreground">{description[lang]}</p> */}
      </div>

      {/* CTA Button */}
      <div
        className={cn(
          "absolute inset-0 flex flex-col justify-start items-start p-[20px] bg-[#006AEA] translate-y-10 transform-gpu opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
        )}
      >
        <h3 className="text-xl text-white font-semibold mb-2">{name[lang]}</h3>
        <p className="text-white text-sm">{description[lang]}</p>
      </div>

      {/* Overlay effect */}
      <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />
    </Card>
  );
}

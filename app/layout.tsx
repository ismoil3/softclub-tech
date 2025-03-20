import type React from "react";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { I18nextProvider } from "@/components/i18next-provider";
import Header from "@/components/shared/header/header";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next.js i18n App",
  description: "Next.js app with i18next, TypeScript and shadcn/ui",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <I18nextProvider>
            <Header />
            <DynamicScript />
            {children}
          </I18nextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

import "./globals.css";
import DynamicScript from "@/components/DynamicScript";

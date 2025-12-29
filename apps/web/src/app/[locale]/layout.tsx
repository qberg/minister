import type React from "react";
import "./styles.css";
import { LenisScroll } from "@repo/design-system/components/ui/lenis-scroll";
import { hasLocale, NextIntlClientProvider } from "@repo/i18n";
import { routing } from "@repo/i18n/routing";
import { getMessages } from "@repo/i18n/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Footer } from "@/footer/Component";
import { Header } from "@/header/Component";
import {
  anek_tamil,
  dm_sans,
  tamil_sangam_mn,
  times_new_roman,
} from "@/lib/fonts";

export const metadata: Metadata = {
  description: "TMA, grassroots leader of Tamil Nadu.",
  title: {
    default: "T M Anbarasan",
    template: "%s | T M Anbarasan",
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  const enFontClasses = `${times_new_roman.variable} ${dm_sans.variable}`;
  const taFontClasses = `${anek_tamil.variable} ${tamil_sangam_mn.variable}`;

  return (
    <html className={`${enFontClasses} ${taFontClasses}`} lang={locale}>
      <body className="antialiased">
        <LenisScroll>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <NuqsAdapter>
              <Header />
              {children}
              <Footer />
            </NuqsAdapter>
          </NextIntlClientProvider>
        </LenisScroll>
      </body>
    </html>
  );
}

import type React from "react";
import "./styles.css";
import type { Metadata } from "next";
import {
  anek_tamil,
  dm_sans,
  tamil_sangam_mn,
  times_new_roman,
} from "@/lib/fonts";
import { hasLocale, NextIntlClientProvider } from "@repo/i18n";
import { routing } from "@repo/i18n/routing";
import { getMessages } from "@repo/i18n/server";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  description: "A blank template using Payload in a Next.js app.",
  title: "Payload Blank Template",
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
    <html lang="en">
      <body className={`${enFontClasses} ${taFontClasses} antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <main>{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

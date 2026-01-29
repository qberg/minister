import { ViewTransitions } from "next-view-transitions";
import type React from "react";
import "./styles.css";
import { LenisScroll } from "@repo/design-system/components/ui/lenis-scroll";
import { hasLocale, NextIntlClientProvider } from "@repo/i18n";
import { routing } from "@repo/i18n/routing";
import { getMessages } from "@repo/i18n/server";
import { createMetadata, defaultViewport } from "@repo/seo";
import { PersonJsonLd } from "@repo/seo/json-ld";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ConsoleBranding } from "@/components/console-branding";
import {
  anek_tamil,
  dm_sans,
  tamil_sangam_mn,
  times_new_roman,
} from "@/lib/fonts";

export const metadata: Metadata = createMetadata({
  metadataBase: new URL("https://alandur.minsky.dev"),
});
export const viewport = defaultViewport;

const TITLE_TEXT = `
░▒▓██████████████▓▒░░▒▓█▓▒░▒▓███████▓▒░ ░▒▓███████▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░ 
░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░ 
░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░ 
░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░░▒▓██████▓▒░░▒▓███████▓▒░ ░▒▓██████▓▒░  
░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░      ░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░  ░▒▓█▓▒░     
░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░      ░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░  ░▒▓█▓▒░     
░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓███████▓▒░░▒▓█▓▒░░▒▓█▓▒░  ░▒▓█▓▒░


Build simple,thoughtful software

VISIT US AT: https://minsky.in
`;

// biome-ignore lint: console for branding
console.log(TITLE_TEXT);

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
        <PersonJsonLd />
        <ConsoleBranding text={TITLE_TEXT} />
        <ViewTransitions>
          <LenisScroll>
            <NextIntlClientProvider locale={locale} messages={messages}>
              <NuqsAdapter>{children}</NuqsAdapter>
            </NextIntlClientProvider>
          </LenisScroll>
        </ViewTransitions>
      </body>
    </html>
  );
}

import type React from "react";
import "./styles.css";
import {
  anek_tamil,
  dm_sans,
  tamil_sangam_mn,
  times_new_roman,
} from "@/lib/fonts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  description: "A blank template using Payload in a Next.js app.",
  title: "Payload Blank Template",
};

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;

  const enFontClasses = `${times_new_roman.variable} ${dm_sans.variable}`;
  const taFontClasses = `${anek_tamil.variable} ${tamil_sangam_mn.variable}`;

  return (
    <html lang="en">
      <body className={`${enFontClasses} ${taFontClasses} antialiased`}>
        <main>{children}</main>
      </body>
    </html>
  );
}

import merge from "lodash.merge";
import type { Metadata, Viewport } from "next";

export const defaultMetadata: Metadata = {
  title: {
    default: "T M Anbarasan | Minister for MSME & Grassroots Leader",
    template: "%s | T M Anbarasan",
  },
  description:
    "Official portal of T M Anbarasan, Minister for MSME, Tamil Nadu. Stay updated on grassroots initiatives, rural development projects, and public service news.",
  openGraph: {
    type: "website",
    locale: "ta_IN",
    siteName: "T M Anbarasan",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@thamoanbarasan",
  },
  authors: [{ name: "Minsky", url: "https://minsky.in" }],
};

export const defaultViewport: Viewport = {
  themeColor: "#112955",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export function createMetadata(overrides: Metadata): Metadata {
  return merge({}, defaultMetadata, overrides);
}

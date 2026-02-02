import { Anek_Tamil, DM_Sans } from "next/font/google";
import localFont from "next/font/local";

export const times_new_roman = localFont({
  src: [
    {
      path: "../../public/fonts/tnr-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/tnr-bold.woff2",
      weight: "700",
      style: "bold",
    },
  ],
  display: "swap",
  variable: "--font-times-new-roman",
});

export const dm_sans = DM_Sans({
  display: "swap",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-dm-sans",
});

export const anek_tamil = Anek_Tamil({
  display: "swap",
  subsets: ["latin", "tamil"],
  weight: ["400", "600", "700"],
  variable: "--font-anek-tamil",
});

export const tamil_sangam_mn = localFont({
  src: [
    {
      path: "../../public/fonts/sangam-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/sangam-bold.woff2",
      weight: "700",
      style: "bold",
    },
  ],
  display: "swap",
  variable: "--font-tamil-sangam-mn",
});

"use client";

// Registering Syncfusion license key
import { registerLicense } from "@syncfusion/ej2-base";
import { LocalizationProvider } from "@/providers/LocalizationProvider";
import { QueryProvider } from "@/providers/QueryProvider";
import "./globals.css";

import { Kumbh_Sans } from "next/font/google";

export const font = Kumbh_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

registerLicense(process.env.EJ2_SYNCFUSION_LICENSE_KEY);

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={font.className}
        suppressHydrationWarning={true}
      >
        <QueryProvider>
          <LocalizationProvider>{children}</LocalizationProvider>
        </QueryProvider>
      </body>
    </html>
  );
}

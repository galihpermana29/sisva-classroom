"use client";

/** Registering Syncfusion license key */
import { registerLicense } from "@syncfusion/ej2-base";
registerLicense(process.env.EJ2_SYNCFUSION_LICENSE_KEY);

import { LocalizationProvider } from "@/providers/LocalizationProvider";
import { QueryProvider } from "@/providers/QueryProvider";
import "./globals.css";

/** Dayjs extensions */
import { extend } from "dayjs";

import customParseFormat from "dayjs/plugin/customParseFormat";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

extend(utc);
extend(timezone);
extend(customParseFormat);

/** Theme's primary font */
import { Kumbh_Sans } from "next/font/google";
export const font = Kumbh_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

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

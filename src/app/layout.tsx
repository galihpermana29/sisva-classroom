/** Registering Syncfusion license key */
import { registerLicense } from "@syncfusion/ej2-base";
registerLicense(process.env.EJ2_SYNCFUSION_LICENSE_KEY);

import "./globals.css";

import clsx from "clsx";
/** Dayjs extensions */
import { extend } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

import { LocalizationProvider } from "@/providers/LocalizationProvider";
import { QueryProvider } from "@/providers/QueryProvider";

extend(utc);
extend(timezone);
extend(customParseFormat);

/** Theme's primary font */
import { Kumbh_Sans } from "next/font/google";
const font = Kumbh_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-kumbh",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={clsx(font.className, font.variable)}
        suppressHydrationWarning={true}
      >
        <QueryProvider>
          <LocalizationProvider>{children}</LocalizationProvider>
        </QueryProvider>
      </body>
    </html>
  );
}

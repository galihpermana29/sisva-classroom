"use client";

// Registering Syncfusion license key
import { registerLicense } from "@syncfusion/ej2-base";
import { LocalizationProvider } from "@/providers/LocalizationProvider";
import "./globals.css";

registerLicense(process.env.EJ2_SYNCFUSION_LICENSE_KEY);

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <LocalizationProvider>{children}</LocalizationProvider>
      </body>
    </html>
  );
}

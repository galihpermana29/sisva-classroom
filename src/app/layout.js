"use client";

import { LocalizationProvider } from "@/providers/LocalizationProvider";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <LocalizationProvider>{children}</LocalizationProvider>
      </body>
    </html>
  );
}

"use client";

import "./globals.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { themeConfig } from "./theme";

const theme = createTheme(themeConfig);

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </body>
    </html>
  );
}

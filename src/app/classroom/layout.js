"use client";

import "../globals.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { themeConfig } from "./theme";
import { store } from "./shared/store/classroom-store";
import { Provider } from "react-redux";

const theme = createTheme(themeConfig);

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Provider store={store}>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}

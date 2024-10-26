"use client";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Check, X } from "@untitled-ui/icons-react";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import "../globals.css";
import { store } from "./shared/store/classroom-store";
import { themeConfig } from "./theme";

const theme = createTheme(themeConfig);

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <Toaster
              position="top-right"
              toastOptions={{
                success: {
                  icon: (
                    <Check width={20} height={20} className="text-green-500" />
                  ),
                },
                error: {
                  icon: <X width={20} height={20} className="text-red-500" />,
                },
                duration: 5000,
              }}
            />
            {children}
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}

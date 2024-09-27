"use client";

import "../globals.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { themeConfig } from "./theme";
import { store } from "./shared/store/classroom-store";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { Check, X } from "@untitled-ui/icons-react";

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

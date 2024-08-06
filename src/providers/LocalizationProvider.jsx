"use client";

import { LocalizationProvider as MUILocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/id";

export const LocalizationProvider = ({ children }) => {
  return (
    <MUILocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="id">
      {children}
    </MUILocalizationProvider>
  );
};

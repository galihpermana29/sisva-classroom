"use client";

import "dayjs/locale/id";

import { LocalizationProvider as MUILocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export const LocalizationProvider = ({ children }) => {
  return (
    <MUILocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale="id"
    >
      {children}
    </MUILocalizationProvider>
  );
};

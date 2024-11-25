import { Typography } from "@mui/material";
import { ReactNode } from "react";

export default function FormLabelSisva({ children }: { children: ReactNode }) {
  return (
    <Typography variant="body2" fontWeight={600} mb={0.5}>
      {children}
    </Typography>
  );
}

import { Stack } from "@mui/material";
import { ReactNode } from "react";

export default function FormContainerSisva({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Stack
      sx={{
        py: 1,
        px: 2,
        gap: 0.5,
      }}
    >
      {children}
    </Stack>
  );
}

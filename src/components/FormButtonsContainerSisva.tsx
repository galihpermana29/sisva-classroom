import { Stack } from "@mui/material";
import { ReactNode } from "react";

export default function FormButtonsContainerSisva({
  children,
}: {
  children: ReactNode;
}) {
  return <Stack sx={{ flexDirection: "row", gap: 1, p: 2 }}>{children}</Stack>;
}

import { Stack } from "@mui/material";
import { ExcelButton } from "../ExcelButton";
import { AddTagihanModal } from "../modals/tagihan/AddTagihanModal";

/** @description Component to show top level actions beside layout title */
export const TagihanActions = () => {
  return (
    <Stack flexDirection="row" alignItems="center" gap={1}>
      <ExcelButton />
      <AddTagihanModal />
    </Stack>
  );
};

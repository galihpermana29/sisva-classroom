import { Stack } from "@mui/material";
import { ExcelButton } from "../ExcelButton";
import { AddTagihanPenggunaModal } from "../modals/tagihan-pengguna/AddTagihanPenggunaModal";

/** @description Component to show top level actions beside layout title */
export const TagihanPenggunaActions = () => {
  return (
    <Stack
      flexDirection="row"
      alignItems="center"
      gap={1}
    >
      <ExcelButton />
      <AddTagihanPenggunaModal />
    </Stack>
  );
};

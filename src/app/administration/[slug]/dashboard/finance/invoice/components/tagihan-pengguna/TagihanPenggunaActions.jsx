import { Button, Stack } from "@mui/material";
import { ExcelButton } from "../ExcelButton";
import AddIcon from "@mui/icons-material/Add";

/** @description Component to show top level actions beside layout title */
export const TagihanPenggunaActions = () => {
  return (
    <Stack
      flexDirection="row"
      alignItems="center"
      gap={1}
    >
      <ExcelButton />
      <Button
        disableElevation
        variant="contained"
        startIcon={<AddIcon />}
      >
        Add
      </Button>
    </Stack>
  );
};

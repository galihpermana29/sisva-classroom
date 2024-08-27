import { Stack } from "@mui/material";
import { ExcelButton } from "../ExcelButton";
import { AddInvoiceModal } from "../modals/invoice/AddInvoiceModal";

/** @description Component to show top level actions beside layout title */
export const InvoiceActions = () => {
  return (
    <Stack
      flexDirection="row"
      alignItems="center"
      gap={1}
    >
      <ExcelButton />
      <AddInvoiceModal />
    </Stack>
  );
};

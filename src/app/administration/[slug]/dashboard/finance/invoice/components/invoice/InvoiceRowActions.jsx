import { Stack } from "@mui/material";
import { DeleteInvoiceModal } from "../modals/invoice/DeleteInvoiceModal";
import { EditInvoiceModal } from "../modals/invoice/EditInvoiceModal";

export const InvoiceRowActions = ({ id, status }) => {
  return (
    <Stack flexDirection="row" maxWidth="fit-content" gap={1}>
      <EditInvoiceModal id={id} />

      <DeleteInvoiceModal id={id} isDisabled={status !== "pending"} />
    </Stack>
  );
};

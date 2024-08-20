import { ModeEdit } from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";
import { DeleteInvoiceModal } from "../modals/invoice/DeleteInvoiceModal";

export const InvoiceRowActions = ({ id, status }) => {
  return (
    <Stack
      flexDirection="row"
      maxWidth="fit-content"
      gap={1}
    >
      <IconButton
        aria-label="edit"
        size="small"
      >
        <ModeEdit />
      </IconButton>

      <DeleteInvoiceModal
        id={id}
        isDisabled={status !== "pending"}
      />
    </Stack>
  );
};

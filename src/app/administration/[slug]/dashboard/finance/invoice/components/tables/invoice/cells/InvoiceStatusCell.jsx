import { TableCell } from "@mui/material";
import { InvoiceStatusBadge } from "../../../invoice/InvoiceStatusBadge";

export const InvoiceStatusCell = ({ status }) => {
  return (
    <TableCell>
      <InvoiceStatusBadge>{status}</InvoiceStatusBadge>
    </TableCell>
  );
};

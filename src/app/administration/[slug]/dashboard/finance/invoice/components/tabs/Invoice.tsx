import { Divider, Paper, Stack } from "@mui/material";

import useFilteredInvoices from "../../hooks/useFilteredInvoices";
import { InvoiceData } from "../invoice/InvoiceData";
import { InvoicePagination } from "../invoice/InvoicePagination";
import { TableInvoice } from "../tables/invoice";
/** @description Component showing the main content of tagihan pengguna tab */

export const Invoice = () => {
  return (
    <Stack flexDirection="column" flexGrow={1}>
      <Divider sx={{ display: { xs: "none", lg: "block" } }} />
      <Stack display={{ xs: "none", lg: "flex" }} className="thick-scrollbar">
        <TableInvoice />
      </Stack>
      <Stack display={{ xs: "flex", lg: "none" }} padding={2} flexGrow={1}>
        <InvoiceData />
      </Stack>
      <Stack padding={2} component={Paper} position="sticky" bottom={0}>
        <InvoicePagination />
      </Stack>
    </Stack>
  );
};

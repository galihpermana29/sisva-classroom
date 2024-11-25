import { TableCell } from "@mui/material";

import { formatToRupiah } from "@/utils/formatToRupiah";

export const NilaiInvoiceCell = ({ amount }) => {
  return <TableCell>{formatToRupiah(amount)}</TableCell>;
};

import { formatToRupiah } from "@/utils/formatToRupiah";
import { TableCell } from "@mui/material";

export const NilaiInvoiceCell = ({ amount }) => {
  return <TableCell>{formatToRupiah(amount)}</TableCell>;
};

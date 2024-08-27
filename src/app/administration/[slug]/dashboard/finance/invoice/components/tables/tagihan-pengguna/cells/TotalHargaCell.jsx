"use client";

import { TableCellLoading } from "@/components/CustomTable";
import { useGetBillById } from "../../../../hooks/useGetBillById";
import { TableCell } from "@mui/material";
import { formatToRupiah } from "@/utils/formatToRupiah";

export const TotalHargaCell = ({ billId }) => {
  const { data, isLoading, isError } = useGetBillById(billId);
  if (isLoading) return <TableCellLoading />;

  return <TableCell>{isError ? "-" : formatToRupiah(data.amount)}</TableCell>;
};

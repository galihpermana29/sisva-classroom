"use client";

import { TableCell } from "@mui/material";

import { TableCellLoading } from "@/components/CustomTable";
import { formatToRupiah } from "@/utils/formatToRupiah";

import { useGetBillById } from "../../../../hooks/useGetBillById";

export const TotalHargaCell = ({ billId }) => {
  const { data, isLoading, isError } = useGetBillById(billId);
  if (isLoading) return <TableCellLoading />;

  return <TableCell>{isError ? "-" : formatToRupiah(data.amount)}</TableCell>;
};

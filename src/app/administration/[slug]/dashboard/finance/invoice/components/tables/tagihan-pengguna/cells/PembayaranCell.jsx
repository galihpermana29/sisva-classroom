"use client";

import { TableCell } from "@mui/material";
import { useGetBillById } from "../../../../hooks/useGetBillById";
import { TableCellLoading } from "@/components/CustomTable";

export const PembayaranCell = ({ billId }) => {
  const { data, isLoading, isError } = useGetBillById(billId);
  if (isLoading) return <TableCellLoading />;

  return <TableCell>{isError ? "-" : data.name}</TableCell>;
};

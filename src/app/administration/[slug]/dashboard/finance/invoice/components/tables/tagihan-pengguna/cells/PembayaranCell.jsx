"use client";

import { TableCellLoading } from "@/components/CustomTable";
import { TableCell } from "@mui/material";
import { useGetBillById } from "../../../../hooks/useGetBillById";

export const PembayaranCell = ({ billId }) => {
  const { data, isLoading, isError } = useGetBillById(billId);
  if (isLoading) return <TableCellLoading />;

  return <TableCell>{isError ? "-" : data.name}</TableCell>;
};

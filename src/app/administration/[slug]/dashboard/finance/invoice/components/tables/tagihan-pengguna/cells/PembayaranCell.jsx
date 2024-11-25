"use client";

import { TableCell } from "@mui/material";

import { TableCellLoading } from "@/components/CustomTable";

import { useGetBillById } from "../../../../hooks/useGetBillById";

export const PembayaranCell = ({ billId }) => {
  const { data, isLoading, isError } = useGetBillById(billId);
  if (isLoading) return <TableCellLoading />;

  return <TableCell>{isError ? "-" : data.name}</TableCell>;
};

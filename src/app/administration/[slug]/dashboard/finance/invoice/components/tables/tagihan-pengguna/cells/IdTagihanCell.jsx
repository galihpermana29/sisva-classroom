"use client";

import { TableCell } from "@mui/material";
import { useGetBillById } from "../../../../hooks/useGetBillById";
import { TableCellLoading } from "@/components/CustomTable";

export const IdTagihanCell = ({ billId }) => {
  const { data, isLoading, isError } = useGetBillById(billId);
  if (isLoading) return <TableCellLoading />;

  return <TableCell>{isError ? "-" : `#${data.custom_id}`}</TableCell>;
};

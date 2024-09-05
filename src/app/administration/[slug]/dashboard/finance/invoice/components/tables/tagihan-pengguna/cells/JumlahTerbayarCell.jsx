"use client";

import { TableCellLoading } from "@/components/CustomTable";
import { TableCell } from "@mui/material";
import { useGetAllInvoices } from "../../../../hooks/useGetAllInvoices";
import { formatToRupiah } from "@/utils/formatToRupiah";
import { useMemo } from "react";

export const JumlahTerbayarCell = ({ userId }) => {
  const { data, isLoading, isError, isStale } = useGetAllInvoices({
    user_id: userId,
  });

  const amountPaid = useMemo(() => {
    const paidInvoices = data
      ? data.filter((invoice) => invoice.status === "done")
      : [];

    const amountPaid = paidInvoices.reduce(
      (acc, invoice) => acc + invoice.amount,
      0
    );

    return amountPaid;
  }, [isStale, userId]);

  if (isLoading) return <TableCellLoading />;
  return <TableCell>{isError ? "-" : formatToRupiah(amountPaid)}</TableCell>;
};

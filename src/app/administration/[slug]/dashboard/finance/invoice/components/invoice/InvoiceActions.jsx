"use client";

import { Skeleton, Stack } from "@mui/material";

import { useExcelExport } from "../../hooks/useExcelExport";
import { useExportInvoiceData } from "../../hooks/useExportInvoiceData";
import { ExcelButton } from "../ExcelButton";
import { AddInvoiceModal } from "../modals/invoice/AddInvoiceModal";

const headers = [
  "ID Invoice",
  "Name",
  "Tipe",
  "Pembayaran",
  "Total Harga",
  "Nilai Invoice",
  "Status",
];

/** @description Component to show top level actions beside layout title */
export const InvoiceActions = () => {
  const { finalRows, isLoading } = useExportInvoiceData();

  const exportToExcel = useExcelExport(finalRows, headers, "Invoice.xlsx");

  return (
    <Stack flexDirection="row" alignItems="center" gap={1}>
      {isLoading || finalRows.length === 0 ? (
        <Skeleton width={85} height={60} />
      ) : (
        <ExcelButton onClick={exportToExcel} />
      )}
      <AddInvoiceModal />
    </Stack>
  );
};

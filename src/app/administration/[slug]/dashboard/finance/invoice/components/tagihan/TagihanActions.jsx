"use client";

import { Skeleton, Stack } from "@mui/material";
import { useExcelExport } from "../../hooks/useExcelExport";
import { useExportTagihanData } from "../../hooks/useExportTagihanData";
import { ExcelButton } from "../ExcelButton";
import { AddTagihanModal } from "../modals/tagihan/AddTagihanModal";

const headers = [
  "ID Tagihan",
  "Custom ID",
  "Nama Tagihan",
  "Status",
  "Target",
  "Total Harga",
  "Tenggal Waktu",
  "Deskripsi",
  "Jumlah Pembayaran",
];

/** @description Component to show top level actions beside layout title */
export const TagihanActions = () => {
  const { finalRows, isLoading } = useExportTagihanData();

  const exportToExcel = useExcelExport(finalRows, headers, "Tagihan.xlsx");

  return (
    <Stack flexDirection="row" alignItems="center" gap={1}>
      {isLoading || finalRows.length === 0 ? (
        <Skeleton width={85} height={60} />
      ) : (
        <ExcelButton onClick={exportToExcel} />
      )}
      <AddTagihanModal />
    </Stack>
  );
};

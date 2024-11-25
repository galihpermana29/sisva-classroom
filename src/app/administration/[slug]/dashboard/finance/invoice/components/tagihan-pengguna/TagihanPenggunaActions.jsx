"use client";

import { Skeleton, Stack } from "@mui/material";

import { useExcelExport } from "../../hooks/useExcelExport";
import { useExportTagihanPenggunaData } from "../../hooks/useExportTagihanPenggunaData";
import { ExcelButton } from "../ExcelButton";
import { AddTagihanPenggunaModal } from "../modals/tagihan-pengguna/AddTagihanPenggunaModal";

const headers = [
  "ID Tagihan",
  "Custom ID",
  "Tenggat Waktu",
  "Nama",
  "Tipe",
  "Pembayaran",
  "Total Harga",
  "Jumlah Terbayar",
];

/** @description Component to show top level actions beside layout title */
export const TagihanPenggunaActions = () => {
  const { finalRows, isLoading } = useExportTagihanPenggunaData();

  const exportToExcel = useExcelExport(
    finalRows,
    headers,
    "Tagihan Pengguna.xlsx"
  );

  return (
    <Stack flexDirection="row" alignItems="center" gap={1}>
      {isLoading || finalRows.length === 0 ? (
        <Skeleton width={85} height={60} />
      ) : (
        <ExcelButton onClick={exportToExcel} />
      )}
      <AddTagihanPenggunaModal />
    </Stack>
  );
};

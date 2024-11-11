"use client";

import { Alert, AlertTitle, Box } from "@mui/material";
import { useFilterStatus } from "../hooks/filters/useFilterStatus";

export const PengaturanJadwalFilterAlert = () => {
  const { prodi, periode, tingkat } = useFilterStatus();

  const shouldRender = !prodi || !periode || !tingkat;
  if (!shouldRender) return null;

  return (
    <Box paddingX={3}>
      <Alert sx={{ borderRadius: "0.5rem" }} severity="warning">
        <AlertTitle>Peringatan: Filter Belum Lengkap!</AlertTitle>
        Untuk menampilkan data pada tabel, Anda perlu memilih ketiga filter yang
        tersedia: <b>periode</b>, <b>program studi</b>, dan <b>tingkatan</b>.
        Memilih hanya satu atau dua filter tidak akan menampilkan data yang
        diinginkan. Pastikan semua filter telah dipilih untuk melanjutkan.
      </Alert>
    </Box>
  );
};

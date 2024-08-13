"use client";

import { Alert, AlertTitle, Box } from "@mui/material";
import { useFilterStatus } from "../hooks/filters/useFilterStatus";

export const JadwalKelasFilterAlert = () => {
  const { prodi, periode, tingkat, kelas } = useFilterStatus();

  const shouldRender = !periode || !prodi || !tingkat || !kelas;
  if (!shouldRender) return null;

  return (
    <Box paddingX={3}>
      <Alert
        sx={{ borderRadius: "0.5rem" }}
        severity="warning"
      >
        <AlertTitle>Peringatan: Filter Belum Lengkap!</AlertTitle>
        Untuk menampilkan data pada tabel, Anda perlu memilih keempat filter
        yang tersedia: <b>periode</b>, <b>program studi</b>, <b>tingkatan</b>,
        dan <b>kelas</b>. Memilih hanya satu atau dua filter tidak akan
        menampilkan data yang diinginkan. Pastikan semua filter telah dipilih
        untuk melanjutkan.
      </Alert>
    </Box>
  );
};

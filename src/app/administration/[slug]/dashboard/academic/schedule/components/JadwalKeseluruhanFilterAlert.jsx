"use client";

import { Alert, AlertTitle, Box } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { PERIODE_FIELD_NAME } from "./filters/PeriodeSelect";
import { PRODI_FIELD_NAME } from "./filters/ProdiSelect";
import { TINGKAT_FIELD_NAME } from "./filters/TingkatSelect";

export const JadwalKeseluruhanFilterAlert = () => {
  const searchParams = useSearchParams();
  const periode = searchParams.get(PERIODE_FIELD_NAME);
  const prodi = searchParams.get(PRODI_FIELD_NAME);
  const tingkat = searchParams.get(TINGKAT_FIELD_NAME);

  const shouldRender = !prodi || !periode || !tingkat;
  if (!shouldRender) return null;

  return (
    <Box paddingX={3}>
      <Alert sx={{ borderRadius: "0.5rem" }} severity="warning">
        <AlertTitle>Peringatan: Filter Wajib Dipilih!</AlertTitle>
        Untuk menampilkan data pada tabel, Anda harus memilih minimal dua filter
        berikut: <b>periode</b> dan <b>program studi</b>. Tanpa memilih kedua
        filter ini, data tidak akan dapat ditampilkan. Pastikan Anda telah
        memilih kedua filter untuk melanjutkan.
      </Alert>
    </Box>
  );
};

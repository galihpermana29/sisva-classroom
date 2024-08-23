"use client";

import { Alert, AlertTitle, Box } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { JADWAL_KESELURUHAN_FIELD_NAME } from "./filters/JadwalKeseluruhanSwitch";
import { PERIODE_FIELD_NAME } from "./filters/PeriodeSelect";
import { PRODI_FIELD_NAME } from "./filters/ProdiSelect";

export const JadwalKeseluruhanFilterAlert = () => {
  const searchParams = useSearchParams();
  const periode = searchParams.get(PERIODE_FIELD_NAME);
  const prodi = searchParams.get(PRODI_FIELD_NAME);
  const jadwalKeseluruhan =
    searchParams.get(JADWAL_KESELURUHAN_FIELD_NAME) ?? "true";

  if (jadwalKeseluruhan === "true") {
    if (prodi && periode) return null;
  } else {
    if (periode) return null;
  }

  return (
    <Box paddingX={3}>
      <Alert sx={{ borderRadius: "0.5rem" }} severity="warning">
        <AlertTitle>Peringatan: Filter Wajib Dipilih!</AlertTitle>
        Untuk menampilkan data pada tabel, Anda harus memilih
        {jadwalKeseluruhan === "true" ? (
          <span>
            {" "}
            minimal dua filter berikut: <b>periode</b> dan <b>program studi</b>.
            Tanpa memilih kedua filter ini, data tidak akan dapat ditampilkan.
            Pastikan Anda telah memilih kedua filter untuk melanjutkan.
          </span>
        ) : (
          <span>
            {" "}
            filter berikut: <b>periode</b>. Tanpa memilih filter ini, data tidak
            akan dapat ditampilkan. Pastikan Anda telah memilih filter untuk
            melanjutkan.
          </span>
        )}
      </Alert>
    </Box>
  );
};

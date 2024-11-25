"use client";

import { useSearchParams } from "next/navigation";

import { GURU_FIELD_NAME } from "../../components/filters/GuruSelect";
import { HARI_FIELD_NAME } from "../../components/filters/HariSelect";
import { KELAS_FIELD_NAME } from "../../components/filters/KelasSelect";
import { PERIODE_FIELD_NAME } from "../../components/filters/PeriodeSelect";
import { PRODI_FIELD_NAME } from "../../components/filters/ProdiSelect";
import { TINGKAT_FIELD_NAME } from "../../components/filters/TingkatSelect";

export const useFilterStatus = () => {
  const searchParams = useSearchParams();
  const periode = searchParams.get(PERIODE_FIELD_NAME);
  const prodi = searchParams.get(PRODI_FIELD_NAME);
  const tingkat = searchParams.get(TINGKAT_FIELD_NAME);
  const kelas = searchParams.get(KELAS_FIELD_NAME);
  const guru = searchParams.get(GURU_FIELD_NAME);
  const hari = searchParams.get(HARI_FIELD_NAME);
  const tab = searchParams.get("tab");
  const isJadwalKeseluruhan = searchParams.get("jadwal_keseluruhan");

  return {
    periode,
    prodi,
    tingkat,
    kelas,
    guru,
    hari,
    tab,
    isJadwalKeseluruhan,
  };
};

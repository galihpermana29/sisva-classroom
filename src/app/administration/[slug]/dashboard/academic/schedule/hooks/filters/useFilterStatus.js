"use client";

import { useSearchParams } from "next/navigation";
import { PERIODE_FIELD_NAME } from "../../components/filters/PeriodeSelect";
import { PRODI_FIELD_NAME } from "../../components/filters/ProdiSelect";
import { TINGKAT_FIELD_NAME } from "../../components/filters/TingkatSelect";
import { KELAS_FIELD_NAME } from "../../components/filters/KelasSelect";
import { GURU_FIELD_NAME } from "../../components/filters/GuruSelect";

export const useFilterStatus = () => {
  const searchParams = useSearchParams();
  const periode = searchParams.get(PERIODE_FIELD_NAME);
  const prodi = searchParams.get(PRODI_FIELD_NAME);
  const tingkat = searchParams.get(TINGKAT_FIELD_NAME);
  const kelas = searchParams.get(KELAS_FIELD_NAME);
  const guru = searchParams.get(GURU_FIELD_NAME);

  return { periode, prodi, tingkat, kelas, guru };
};

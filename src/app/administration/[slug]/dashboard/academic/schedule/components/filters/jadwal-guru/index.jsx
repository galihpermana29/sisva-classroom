"use client";

import { useSearchParams } from "next/navigation";
import { PERIODE_FIELD_NAME, PeriodeSelect } from "../PeriodeSelect";
import { PRODI_FIELD_NAME, ProdiSelect } from "../ProdiSelect";
import { GuruSelect } from "../GuruSelect";

export const JadwalGuruFilters = () => {
  const searchParams = useSearchParams();
  const periode = searchParams.get(PERIODE_FIELD_NAME);
  const prodi = searchParams.get(PRODI_FIELD_NAME);

  const showProdi = Boolean(periode);
  const showGuru = Boolean(prodi);

  return (
    <>
      <PeriodeSelect />
      <ProdiSelect disabled={!showProdi} />
      <GuruSelect disabled={!showGuru} />
    </>
  );
};

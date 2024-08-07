"use client";

import { useSearchParams } from "next/navigation";
import { PERIODE_FIELD_NAME, PeriodeSelect } from "../PeriodeSelect";
import { PRODI_FIELD_NAME, ProdiSelect } from "../ProdiSelect";
import { TINGKAT_FIELD_NAME, TingkatSelect } from "../TingkatSelect";
import { KelasSelect } from "../KelasSelect";

export const JadwalKelasFilters = () => {
  const searchParams = useSearchParams();
  const periode = searchParams.get(PERIODE_FIELD_NAME);
  const prodi = searchParams.get(PRODI_FIELD_NAME);
  const tingkat = searchParams.get(TINGKAT_FIELD_NAME);

  const showProdi = Boolean(periode);
  const showTingkat = Boolean(prodi);
  const showKelas = Boolean(tingkat);

  return (
    <>
      <PeriodeSelect />
      <ProdiSelect disabled={!showProdi} />
      <TingkatSelect disabled={!showTingkat} />
      <KelasSelect disabled={!showKelas} />
    </>
  );
};

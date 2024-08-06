"use client";

import { PERIODE_FIELD_NAME, PeriodeSelect } from "./PeriodeSelect";
import { PRODI_FIELD_NAME, ProdiSelect } from "./ProdiSelect";
import { TingkatSelect } from "./TingkatSelect";
import { useSearchParams } from "next/navigation";

export const Filters = () => {
  const searchParams = useSearchParams();
  const periode = searchParams.get(PERIODE_FIELD_NAME);
  const prodi = searchParams.get(PRODI_FIELD_NAME);

  const showProdi = Boolean(periode);
  const showTingkat = Boolean(prodi);

  return (
    <>
      <PeriodeSelect />
      <ProdiSelect disabled={!showProdi} />
      <TingkatSelect disabled={!showTingkat} />
    </>
  );
};

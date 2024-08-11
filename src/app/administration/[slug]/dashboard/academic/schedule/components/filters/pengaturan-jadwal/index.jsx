"use client";

import { PeriodeSelect } from "../PeriodeSelect";
import { ProdiSelect } from "../ProdiSelect";
import { TingkatSelect } from "../TingkatSelect";
import { useGetFilterPengaturanJadwal } from "../../../hooks/useGetFilterPengaturanJadwal";

export const PengaturanJadwalFilters = () => {
  const {
    showProdi,
    showTingkat,
    availablePeriods,
    availableStudyPrograms,
    availableGrades,
  } = useGetFilterPengaturanJadwal();

  return (
    <>
      <PeriodeSelect data={availablePeriods} />
      <ProdiSelect
        data={availableStudyPrograms}
        disabled={!showProdi}
      />
      <TingkatSelect
        data={availableGrades}
        disabled={!showTingkat}
      />
    </>
  );
};

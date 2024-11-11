"use client";

import { useGetFilterPengaturanJadwal } from "../../../hooks/filters/pengaturan-jadwal";
import { useGetShowFilterStatus } from "../../../hooks/filters/useGetShowFilterStatus";
import { PeriodeSelect } from "../PeriodeSelect";
import { ProdiSelect } from "../ProdiSelect";
import { TingkatSelect } from "../TingkatSelect";

export const PengaturanJadwalFilters = () => {
  const { showProdi, showGrade } = useGetShowFilterStatus();
  const { availablePeriods, availableStudyPrograms, availableGrades } =
    useGetFilterPengaturanJadwal();

  return (
    <>
      <PeriodeSelect data={availablePeriods} />
      <ProdiSelect data={availableStudyPrograms} disabled={!showProdi} />
      <TingkatSelect data={availableGrades} disabled={!showGrade} />
    </>
  );
};

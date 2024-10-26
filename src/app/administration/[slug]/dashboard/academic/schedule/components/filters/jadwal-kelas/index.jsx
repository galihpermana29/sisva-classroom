"use client";

import { useGetFilterJadwalKelas } from "../../../hooks/filters/jadwal-kelas";
import { useGetShowFilterStatus } from "../../../hooks/filters/useGetShowFilterStatus";
import { KelasSelect } from "../KelasSelect";
import { PeriodeSelect } from "../PeriodeSelect";
import { ProdiSelect } from "../ProdiSelect";
import { TingkatSelect } from "../TingkatSelect";

export const JadwalKelasFilters = () => {
  const { showProdi, showGrade, showKelas } = useGetShowFilterStatus();
  const {
    availablePeriods,
    availableStudyPrograms,
    availableGrades,
    availableClasses,
  } = useGetFilterJadwalKelas();

  return (
    <>
      <PeriodeSelect data={availablePeriods} />
      <ProdiSelect
        data={availableStudyPrograms}
        disabled={!showProdi}
      />
      <TingkatSelect
        data={availableGrades}
        disabled={!showGrade}
      />
      <KelasSelect
        data={availableClasses}
        disabled={!showKelas}
      />
    </>
  );
};

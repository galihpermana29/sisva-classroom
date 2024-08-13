"use client";

import { PeriodeSelect } from "../PeriodeSelect";
import { ProdiSelect } from "../ProdiSelect";
import { TingkatSelect } from "../TingkatSelect";
import { KelasSelect } from "../KelasSelect";
import { useGetShowFilterStatus } from "../../../hooks/filters/useGetShowFilterStatus";
import { useGetFilterJadwalKelas } from "../../../hooks/filters/jadwal-kelas";

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

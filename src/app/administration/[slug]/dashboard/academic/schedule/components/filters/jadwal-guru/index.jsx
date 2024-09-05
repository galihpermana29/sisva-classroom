"use client";

import { PeriodeSelect } from "../PeriodeSelect";
import { ProdiSelect } from "../ProdiSelect";
import { GuruSelect } from "../GuruSelect";
import { useGetShowFilterStatus } from "../../../hooks/filters/useGetShowFilterStatus";
import { useGetFilterJadwalGuru } from "../../../hooks/filters/jadwal-guru";

export const JadwalGuruFilters = () => {
  const { showProdi, showGuru } = useGetShowFilterStatus();
  const { availablePeriods, availableStudyPrograms, availableTeachers } =
    useGetFilterJadwalGuru();

  return (
    <>
      <PeriodeSelect data={availablePeriods} />
      <ProdiSelect
        data={availableStudyPrograms}
        disabled={!showProdi}
      />
      <GuruSelect
        data={availableTeachers}
        disabled={!showGuru}
      />
    </>
  );
};

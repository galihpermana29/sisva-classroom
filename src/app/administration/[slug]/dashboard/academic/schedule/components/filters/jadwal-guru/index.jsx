"use client";

import { useGetFilterJadwalGuru } from "../../../hooks/filters/jadwal-guru";
import { useGetShowFilterStatus } from "../../../hooks/filters/useGetShowFilterStatus";
import { GuruSelect } from "../GuruSelect";
import { PeriodeSelect } from "../PeriodeSelect";
import { ProdiSelect } from "../ProdiSelect";

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

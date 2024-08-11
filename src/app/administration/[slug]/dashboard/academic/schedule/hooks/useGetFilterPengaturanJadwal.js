"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PERIODE_FIELD_NAME } from "../components/filters/PeriodeSelect";
import { PRODI_FIELD_NAME } from "../components/filters/ProdiSelect";
import { useGetAllPeriods } from "@/hooks/useGetAllPeriods";
import { useGetAllStudyPrograms } from "@/hooks/useGetAllStudyPrograms";
import { useEffect, useMemo } from "react";
import { TINGKAT_FIELD_NAME } from "../components/filters/TingkatSelect";

export const useGetFilterPengaturanJadwal = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const periode = searchParams.get(PERIODE_FIELD_NAME);
  const prodi = searchParams.get(PRODI_FIELD_NAME);

  const showProdi = Boolean(periode);
  const showTingkat = Boolean(prodi);

  const { data: periods, isStale: periodIsStale } = useGetAllPeriods();
  const { data: studyPrograms, isStale: studyProgramIsStale } =
    useGetAllStudyPrograms({
      enabled: showTingkat,
    });

  // reset filters that depends on periode
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(PRODI_FIELD_NAME);
    params.delete(TINGKAT_FIELD_NAME);

    return router.replace(pathname + "?" + params.toString());
  }, [periode]);

  // reset filters that depends on prodi
  useEffect(() => {
    if (!prodi) return;

    const params = new URLSearchParams(searchParams.toString());
    params.delete(TINGKAT_FIELD_NAME);

    return router.replace(pathname + "?" + params.toString());
  }, [prodi]);

  // ensuring order of filter is right
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (!periode) {
      params.delete(PRODI_FIELD_NAME);
      params.delete(TINGKAT_FIELD_NAME);
    }

    if (!prodi) {
      params.delete(TINGKAT_FIELD_NAME);
    }

    return router.replace(pathname + "?" + params.toString());
  }, []);

  const availableStudyPrograms = useMemo(
    () =>
      showProdi && periods
        ? periods
            .filter((period) => period.id === parseInt(periode))
            .flatMap((periods) => periods.study_programs)
            .filter((studyProgram) => studyProgram)
        : [],
    [periode, periodIsStale]
  );

  const availableGrades = useMemo(
    () =>
      showTingkat && studyPrograms
        ? studyPrograms
            .filter((studyProgram) => studyProgram.id === parseInt(prodi))
            .flatMap((studyProgram) => studyProgram.grades)
            .filter((grade) => grade)
        : [],
    [prodi, studyProgramIsStale]
  );

  return {
    showProdi,
    showTingkat,
    availablePeriods: periods,
    availableStudyPrograms,
    availableGrades,
  };
};

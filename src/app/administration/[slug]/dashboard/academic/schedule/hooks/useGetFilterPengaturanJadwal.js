"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PERIODE_FIELD_NAME } from "../components/filters/PeriodeSelect";
import { PRODI_FIELD_NAME } from "../components/filters/ProdiSelect";
import { useGetAllPeriods } from "@/hooks/useGetAllPeriods";
import { useGetAllStudyPrograms } from "@/hooks/useGetAllStudyPrograms";
import { useEffect, useMemo } from "react";
import { TINGKAT_FIELD_NAME } from "../components/filters/TingkatSelect";
import dayjs from "dayjs";
import { useFilterStatus } from "./useFilterStatus";

export const useGetFilterPengaturanJadwal = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { periode, prodi } = useFilterStatus();
  const showProdi = Boolean(periode);
  const showTingkat = Boolean(prodi);

  const { data: periods, isStale: periodIsStale } = useGetAllPeriods();
  const { data: studyPrograms, isStale: studyProgramIsStale } =
    useGetAllStudyPrograms({
      enabled: showTingkat,
    });

  // get the latest period data
  const defaultPeriod = useMemo(
    () =>
      periods
        ? periods
            .sort((period) =>
              dayjs(period.start_time, "DD/MM/YYYY h:mm a Z").diff(
                dayjs(period.end_time, "DD/MM/YYYY h:mm a Z")
              )
            )
            .at(-1).id
        : "",
    // recompute when periods changed or when query cache invalidated
    [periods, periodIsStale]
  );

  // reset filters that depends on periode
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(PRODI_FIELD_NAME);
    params.delete(TINGKAT_FIELD_NAME);

    return router.replace(pathname + "?" + params.toString());
    // run everytime periode changes
  }, [periode]);

  // reset filters that depends on prodi
  useEffect(() => {
    // prevent this effect from running if prodi is removed because of changes in periode
    if (!prodi) return;

    const params = new URLSearchParams(searchParams.toString());
    params.delete(TINGKAT_FIELD_NAME);

    return router.replace(pathname + "?" + params.toString());
    // run everytime prodi changes
  }, [prodi]);

  // ensuring order of filter is right
  // and set default values for filters
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (!periode) {
      // remove prodi and tingkat value as it needs periode
      params.delete(PRODI_FIELD_NAME);
      params.delete(TINGKAT_FIELD_NAME);

      // set to default period value
      params.set(PERIODE_FIELD_NAME, defaultPeriod);
    }

    if (!prodi) {
      // remove tingkat value as it needs prodi
      params.delete(TINGKAT_FIELD_NAME);
    }

    return router.replace(pathname + "?" + params.toString());
  }, [defaultPeriod]);

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

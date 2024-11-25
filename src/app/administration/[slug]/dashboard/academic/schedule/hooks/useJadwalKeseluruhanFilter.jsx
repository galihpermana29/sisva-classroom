"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import AcademicAPI from "@/api/academic";
import { formatDayToLabel } from "@/utils/formatDay";

import { JADWAL_KESELURUHAN_FIELD_NAME } from "../components/filters/JadwalKeseluruhanSwitch";
import { KELAS_FIELD_NAME } from "../components/filters/KelasSelect";
import { PERIODE_FIELD_NAME } from "../components/filters/PeriodeSelect";
import { PRODI_FIELD_NAME } from "../components/filters/ProdiSelect";
import { TINGKAT_FIELD_NAME } from "../components/filters/TingkatSelect";

function useJadwalKeseluruhanFilter() {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  const periode = searchParams.get(PERIODE_FIELD_NAME);
  const prodi = searchParams.get(PRODI_FIELD_NAME);
  const tingkat = searchParams.get(TINGKAT_FIELD_NAME);
  const kelas = searchParams.get(KELAS_FIELD_NAME);
  const tab = searchParams.get("tab");
  const jadwalKeseluruhan =
    searchParams.get(JADWAL_KESELURUHAN_FIELD_NAME) ?? "true";

  const [kelasData, setKelasData] = useState([]);
  const [periodeData, setPeriodeData] = useState([]);
  const [prodiData, setProdiData] = useState([]);
  const [jadwalKelasData, setJadwalKelasData] = useState([]);

  //* data for period select filter
  const periodeSelectData = periodeData?.map(({ id, name }) => ({
    name,
    id,
  }));

  //* data for study program select filter
  const prodiSelectData =
    periodeData
      ?.find(({ id }) => id === parseInt(periode))
      ?.study_programs?.map(({ id, code }) => ({
        code,
        id,
      })) || [];

  //* data for grade select filter
  const tingkatanSelectData = prodiData?.grades?.map((grade) => ({
    label: grade,
    value: grade,
  }));

  //* data for class select filter
  const kelasSelectData = kelasData
    .filter(
      ({ period_id, study_program_id, grade }) =>
        period_id === parseInt(periode ?? "-1") &&
        study_program_id === parseInt(prodi ?? "-1") &&
        (tingkat ? grade === tingkat : true)
    )
    .map(({ id, name }) => ({
      label: name,
      value: id,
    }));

  //* data for day select filter
  const hariSelectData = Array.from(
    new Set(
      jadwalKelasData
        ?.filter(({ study_program_id }) => study_program_id === parseInt(prodi))
        .map(({ day }) =>
          JSON.stringify({ label: formatDayToLabel(day), value: day })
        )
    )
  ).map((item) => JSON.parse(item));

  const getAllPeriode = async () => {
    const { data } = await AcademicAPI.getAllPeriod();
    setPeriodeData(data.data);
  };

  const getAllClasses = async () => {
    const { data } = await AcademicAPI.getAllStudentGroup();
    setKelasData(data.data);
  };

  const getDetailProdi = async () => {
    const { data } = await AcademicAPI.getDetailProdi(prodi);
    setProdiData(data.data);
  };

  const getAllClassSchedule = async () => {
    const { data } = await AcademicAPI.getAllClassSchedules({
      period_id: periode,
    });
    setJadwalKelasData(data.data);
  };

  const handleReset = () =>
    router.push(
      `${pathName}?tab=${tab}&jadwal_keseluruhan=${jadwalKeseluruhan}`
    );

  //* handle initial period data fetching
  useEffect(() => {
    getAllPeriode();
  }, []);

  useEffect(() => {
    if (periode) {
      getAllClasses();
      getAllClassSchedule();
    }
  }, [periode]);

  //! Harusnya update search params langsung dari event handler, bukan useEffect

  //* fetch grades data after selecting a study program
  useEffect(() => {
    if (prodi) getDetailProdi();
  }, [prodi]);

  //* reset all filters after period on period change
  useEffect(() => {
    if (prodi) {
      router.push(
        `${pathName}?tab=${tab}&jadwal_keseluruhan=${jadwalKeseluruhan}${
          periode ? `&periode=${periode}` : ""
        }`
      );
    }
  }, [periode]);

  //* reset all filters after study program on study program change
  useEffect(() => {
    if (tingkat) {
      router.push(
        `${pathName}?tab=${tab}&jadwal_keseluruhan=${jadwalKeseluruhan}&periode=${periode}${
          prodi ? `&prodi=${prodi}` : ""
        }`
      );
    }
  }, [prodi]);

  //* reset all filters after grade on grade change
  useEffect(() => {
    if (kelas) {
      router.push(
        `${pathName}?tab=${tab}&jadwal_keseluruhan=${jadwalKeseluruhan}&periode=${periode}&prodi=${prodi}${
          tingkat ? `&tingkat=${tingkat}` : ""
        }`
      );
    }
  }, [tingkat]);

  return {
    handleReset,
    periodeSelectData,
    prodiSelectData,
    tingkatanSelectData,
    kelasSelectData,
    hariSelectData,
  };
}

export default useJadwalKeseluruhanFilter;

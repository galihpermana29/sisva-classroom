"use client";

import AcademicAPI from "@/api/academic";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { JADWAL_KESELURUHAN_FIELD_NAME } from "../components/filters/JadwalKeseluruhanSwitch";
import { KELAS_FIELD_NAME } from "../components/filters/KelasSelect";
import { PERIODE_FIELD_NAME } from "../components/filters/PeriodeSelect";
import { PRODI_FIELD_NAME } from "../components/filters/ProdiSelect";
import { TINGKAT_FIELD_NAME } from "../components/filters/TingkatSelect";

const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

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

  //* data for period select filter
  const periodeSelectData = periodeData?.map(({ id, name }) => ({
    label: name,
    value: id,
  }));

  //* data for study program select filter
  const prodiSelectData =
    periodeData
      ?.find(({ id }) => id === parseInt(periode))
      ?.study_programs?.map(({ id, code }) => ({
        label: code,
        value: id,
      })) || [];

  //* data for grade select filter
  const tingkatanSelectData = prodiData?.grades?.map((grade) => ({
    label: grade,
    value: grade,
  }));

  //* data for class select filter
  const kelasSelectData = kelasData
    ?.filter(
      ({ study_program_id, grade }) =>
        study_program_id === parseInt(prodi) && grade === tingkat
    )
    .map(({ id, class_name }) => ({
      label: class_name,
      value: id,
    }));

  //* data for day select filter
  const hariSelectData = kelasData
    ?.filter(
      ({ study_program_id, grade, class_id }) =>
        study_program_id === parseInt(prodi) &&
        grade === tingkat &&
        class_id === parseInt(kelas)
    )
    .map(({ day }) => ({
      label: days[day - 1],
      value: day,
    }));

  const getAllPeriode = async () => {
    const { data } = await AcademicAPI.getAllPeriod();
    setPeriodeData(data.data);
  };

  const getAllClasses = async () => {
    const { data } = await AcademicAPI.getAllClassSchedules();
    setKelasData(data.data);
  };

  const getDetailProdi = async () => {
    const { data } = await AcademicAPI.getDetailProdi(prodi);
    setProdiData(data.data);
  };

  const handleReset = () =>
    router.push(
      `${pathName}?tab=${tab}&jadwal_keseluruhan=${jadwalKeseluruhan}`
    );

  //* handle initial period data fetching
  useEffect(() => {
    getAllPeriode();
    getAllClasses();
  }, []);

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

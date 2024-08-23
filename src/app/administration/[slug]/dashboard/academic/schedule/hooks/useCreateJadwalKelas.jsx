"use client";

import AcademicAPI from "@/api/academic";
import { formatDayToLabel } from "@/utils/formatDay";
import { useEffect, useState } from "react";

function useCreateJadwalKelas(formik, edit = false) {
  const { period_id, study_program_id, grade } = formik.values;

  const [isEdit, setIsEdit] = useState(edit);
  const [kelasData, setKelasData] = useState([]);
  const [periodeData, setPeriodeData] = useState([]);
  const [prodiData, setProdiData] = useState([]);
  const [schoolScheduleData, setSchoolScheduleData] = useState([]);

  //* data for period select filter
  const periodeSelectData = periodeData?.map(({ id, name }) => ({
    label: name,
    value: id,
  }));

  //* data for study program select filter
  const prodiSelectData =
    periodeData
      ?.find(({ id }) => id === parseInt(period_id))
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
  const kelasSelectData = kelasData.map(({ id, name }) => ({
    label: name,
    value: id,
  }));

  //* data for day select filter
  const hariSelectData = schoolScheduleData
    ?.filter(
      ({
        study_program_id: item_sp_id,
        grade: item_grade,
        period_id: item_p_id,
        status,
      }) =>
        status === "inactive" &&
        item_sp_id === parseInt(study_program_id) &&
        item_grade === grade &&
        item_p_id === parseInt(period_id)
    )
    .map(({ id, day }) => ({
      label: formatDayToLabel(day),
      value: `${id}:${day}`,
    }));

  const getAllPeriode = async () => {
    const { data } = await AcademicAPI.getAllPeriod();
    setPeriodeData(data.data);
  };

  const getAllClasses = async () => {
    const { data } = await AcademicAPI.getAllClasses({
      period_id,
    });

    setKelasData(data.data);
  };

  const getDetailProdi = async () => {
    const { data } = await AcademicAPI.getDetailProdi(study_program_id);
    setProdiData(data.data);
  };

  const getAllSchoolSchedules = async () => {
    const { data } = await AcademicAPI.getAllSchoolSchedules({ period_id });
    setSchoolScheduleData(data.data);
  };

  const handleReset = () => formik.resetForm();

  //* handle initial period data fetching
  useEffect(() => {
    getAllPeriode();
    getAllClasses();
  }, []);

  useEffect(() => {
    if (period_id) getAllSchoolSchedules();
  }, [period_id]);

  //* fetch grades data after selecting a study program
  useEffect(() => {
    if (study_program_id) getDetailProdi();
  }, [study_program_id]);

  //* reset study_program_id and grade on period_id change
  useEffect(() => {
    if (study_program_id && !isEdit) {
      formik.setFieldValue("study_program_id", "");
      formik.setFieldValue("grade", "");
      formik.setFieldValue("day", "");
    }
  }, [period_id]);

  //* reset  grade on study_program_id change
  useEffect(() => {
    if (grade && !isEdit) {
      formik.setFieldValue("grade", "");
      formik.setFieldValue("day", "");
    }
  }, [study_program_id]);

  return {
    handleReset,
    periodeSelectData,
    prodiSelectData,
    tingkatanSelectData,
    kelasSelectData,
    hariSelectData,
  };
}

export default useCreateJadwalKelas;

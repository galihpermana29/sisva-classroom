"use client";

import AcademicAPI from "@/api/academic";
import { formatDayToLabel } from "@/utils/formatDay";
import { useEffect, useState } from "react";

function useCreateJadwalKelas(formik) {
  const { period_id, study_program_id, grade, student_group_id, class_id } =
    formik.values;

  const [kelasData, setKelasData] = useState([]);
  const [periodeData, setPeriodeData] = useState([]);
  const [prodiData, setProdiData] = useState([]);
  const [schoolScheduleData, setSchoolScheduleData] = useState([]);
  const [studentGroupData, setStudentGroupData] = useState([]);
  const [subjectData, setSubjectData] = useState([]);

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

  //* data for student group select filter
  const studentGroupSelectData = studentGroupData
    ?.filter(
      ({
        period_id: item_period_id,
        study_program_id: item_sp_id,
        grade: item_grade,
      }) => {
        return (
          item_period_id === parseInt(period_id) &&
          item_sp_id === parseInt(study_program_id) &&
          item_grade === grade
        );
      }
    )
    .map(({ id, name }) => ({
      label: name,
      value: id,
    }));

  //* data for class select filter
  const kelasSelectData = kelasData
    .filter(({ student_group_id: item_sg_id }) =>
      Boolean(student_group_id) ? item_sg_id === student_group_id : true
    )
    .map(({ id, name }) => ({
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

  const subjectSelectData = subjectData
    ?.filter(
      ({ study_program_id }) =>
        studentGroupData.find(
          ({ id }) => id === formik.values["student_group_id"]
        )?.study_program_id === study_program_id
    )
    .map(({ id, name }) => ({
      label: name,
      value: id,
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

  const getAllStudentGroups = async () => {
    const { data } = await AcademicAPI.getAllStudentGroup();
    setStudentGroupData(data.data);
  };

  const getAllSubjects = async () => {
    const { data } = await AcademicAPI.getAllSubject();
    setSubjectData(data.data);
  };

  const handleReset = () => formik.resetForm();

  //* handle initial period data fetching
  useEffect(() => {
    const fetchInitialDatas = async () => {
      await Promise.all([
        getAllPeriode(),
        getAllClasses(),
        getAllStudentGroups(),
        getAllSubjects(),
      ]);
    };

    fetchInitialDatas();
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
    if (Boolean(study_program_id) && formik.dirty) {
      formik.setFieldValue("study_program_id", "");
      formik.setFieldValue("grade", "");
      formik.setFieldValue("student_group_id", "");
      formik.setFieldValue("class_id", "");
      formik.setFieldValue("day", "");
    }
  }, [period_id]);

  //* reset grade on study_program_id change
  useEffect(() => {
    if (grade && formik.dirty) {
      formik.setFieldValue("grade", "");
      formik.setFieldValue("student_group_id", "");
      formik.setFieldValue("class_id", "");
      formik.setFieldValue("day", "");
    }
  }, [study_program_id]);

  //* reset student group on grade change
  useEffect(() => {
    if (student_group_id && formik.dirty) {
      formik.setFieldValue("student_group_id", "");
      formik.setFieldValue("class_id", "");
      formik.setFieldValue("day", "");
    }
  }, [grade]);

  //* reset class on student group change
  useEffect(() => {
    if (class_id && formik.dirty) {
      formik.setFieldValue("class_id", "");
      formik.setFieldValue("day", "");
    }
  }, [student_group_id]);

  return {
    handleReset,
    periodeSelectData,
    prodiSelectData,
    studentGroupSelectData,
    tingkatanSelectData,
    kelasSelectData,
    hariSelectData,
    subjectSelectData,
  };
}

export default useCreateJadwalKelas;

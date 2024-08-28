import { useEffect, useState } from "react";
import { useFilterStatus } from "./filters/useFilterStatus";
import AcademicAPI from "@/api/academic";
import { formatDayToLabel } from "@/utils/formatDay";

function useCreateAktivitasNonKbm(formik) {
  const { study_program_id, grade, school_schedule_id } = formik.values;

  const { periode } = useFilterStatus();

  const [dayData, setDayData] = useState([]);
  const [periodeData, setPeriodeData] = useState([]);
  const [prodiData, setProdiData] = useState([]);

  const prodiSelectData =
    periodeData
      ?.find(({ id }) => id === parseInt(periode))
      ?.study_programs?.map(({ id, code }) => ({
        label: code,
        value: id,
      })) || [];

  const tingkatanSelectData =
    prodiData?.grades?.map((grade) => ({
      label: grade,
      value: grade,
    })) || [];

  const daySelectData = dayData
    .filter(
      ({
        period_id: ext_period_id,
        study_program_id: ext_sg_id,
        grade: ext_grade,
      }) =>
        ext_period_id === parseInt(periode) &&
        ext_sg_id === parseInt(study_program_id) &&
        ext_grade === grade
    )
    .map(({ id, day }) => ({
      label: formatDayToLabel(day),
      value: `${id}:${day}`,
    }));

  const getDayData = async () => {
    const { data } = await AcademicAPI.getAllSchoolSchedules({
      period_id: periode,
    });

    setDayData(
      data.data
        .filter(({ status }) => status === "inactive")
        .sort((a, b) => a.day - b.day)
    );
  };

  const getAllPeriode = async () => {
    const { data } = await AcademicAPI.getAllPeriod();
    setPeriodeData(data.data);
  };

  const getDetailProdi = async () => {
    const { data } = await AcademicAPI.getDetailProdi(study_program_id);
    setProdiData(data.data);
  };

  useEffect(() => {
    if (periode) {
      getAllPeriode();
      getDayData();
    }
  }, [periode]);

  useEffect(() => {
    if (study_program_id) getDetailProdi();
  }, [study_program_id]);

  //* reset grade on study program change
  useEffect(() => {
    if (grade && formik.dirty) {
      formik.setFieldValue("grade", "");
      formik.setFieldValue("school_schedule_id", "");
    }
  }, [study_program_id]);

  //* reset day on grade change
  useEffect(() => {
    if (school_schedule_id && formik.dirty) {
      formik.setFieldValue("school_schedule_id", "");
    }
  }, [grade]);

  return { prodiSelectData, tingkatanSelectData, daySelectData };
}

export default useCreateAktivitasNonKbm;

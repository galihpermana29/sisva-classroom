"use client";

import AcademicAPI from "@/api/academic";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { JADWAL_KESELURUHAN_FIELD_NAME } from "../components/filters/JadwalKeseluruhanSwitch";
import { PERIODE_FIELD_NAME } from "../components/filters/PeriodeSelect";
import { PRODI_FIELD_NAME } from "../components/filters/ProdiSelect";
import { TINGKAT_FIELD_NAME } from "../components/filters/TingkatSelect";
import { KELAS_FIELD_NAME } from "../components/filters/KelasSelect";
import { HARI_FIELD_NAME } from "../components/filters/HariSelect";
import { useQueryParam } from "@/hooks/useQueryParam";

dayjs.extend(isoWeek);

const getGroupId = (grade) => {
  let group_id = -1;

  if (grade === "X") {
    group_id = 1;
  } else if (grade === "XI") {
    group_id = 2;
  } else if (grade === "XII") {
    group_id = 3;
  }

  return group_id;
};

const parseTime = (time) => {
  const [hourMinute, period] = time.split(" ");
  let [hour, minute] = hourMinute.split(":").map(Number);
  if (period === "PM" && hour !== 12) hour += 12;
  if (period === "AM" && hour === 12) hour = 0;
  return { hour, minute };
};

const addDateToTime = (day, time) => {
  const date = dayjs().isoWeekday(day);
  const { hour, minute } = parseTime(time);

  const result = date
    .set("hour", hour + 7)
    .set("minute", minute)
    .set("second", 0);

  return result;
};

function useJadwalKeseluruhanCalendar() {
  const { updateQueryParam } = useQueryParam();
  const searchParams = useSearchParams();

  const refetch = searchParams.get("rf") ?? "false";
  const periode = searchParams.get(PERIODE_FIELD_NAME) ?? "-1";
  const prodi = searchParams.get(PRODI_FIELD_NAME) ?? "-1";
  const tingkat = searchParams.get(TINGKAT_FIELD_NAME);
  const kelas = searchParams.get(KELAS_FIELD_NAME);
  const hari = searchParams.get(HARI_FIELD_NAME);
  const isJadwalKeseluruhan =
    searchParams.get(JADWAL_KESELURUHAN_FIELD_NAME) ?? "true";

  const [classData, setClassData] = useState([]);
  const [studentGroup, setStudentGroup] = useState([]);
  const [learningSchedule, setLearningSchedule] = useState([]);
  const [nonLearningSchedule, setNonLearningSchedule] = useState([]);

  const learningScheduleData = learningSchedule.filter(
    ({ grade, class_id, day }) => {
      const gradeMatch = tingkat ? tingkat === grade : true;
      const classMatch = kelas ? parseInt(kelas) === class_id : true;
      const dayMatch = hari ? parseInt(hari) === day : true;

      return gradeMatch && classMatch && dayMatch;
    }
  );

  const nonLearningScheduleData = studentGroup.flatMap(({ group_id, id }) => {
    const res = nonLearningSchedule
      .filter((nl_data) => group_id === nl_data.group_id)
      .map((nl_data) => ({
        ...nl_data,
        sg_id: id,
      }));

    return res;
  });

  let data =
    isJadwalKeseluruhan === "true"
      ? [...nonLearningScheduleData, ...learningScheduleData]
      : nonLearningScheduleData;

  let studentGroupData = studentGroup.filter((sg) => {
    const periodeMatch =
      periode !== "-1" ? sg.period_id === parseInt(periode) : true;
    const prodiMatch =
      prodi !== "-1" ? sg.study_program_id === parseInt(prodi) : true;
    const tingkatMatch = tingkat ? sg.grade === tingkat : true;

    return periodeMatch && prodiMatch && tingkatMatch;
  });

  useEffect(() => {
    data = data.filter(({ type, grade, day, class_id }) => {
      if (type === "non-learning") {
        return (
          (grade ? grade === tingkat : true) &&
          (day ? day === parseInt(hari) : true)
        );
      } else {
        return (
          (grade ? grade === tingkat : true) &&
          (day ? day === parseInt(hari) : true) &&
          (class_id ? class_id === parseInt(kelas) : true)
        );
      }
    });
  }, [searchParams]);

  const getAllClasses = async () => {
    const { data } = await AcademicAPI.getAllClasses();
    setClassData(data.data);
  };

  const getAllClassSchedules = async () => {
    const { data } = await AcademicAPI.getAllClassSchedules({
      period_id: periode,
    });

    const newData = data.data
      .filter(({ study_program_id }) => study_program_id === parseInt(prodi))
      .map((data) => {
        const startTimeWithDate = addDateToTime(data.day, data.start_time);
        const endTimeWithDate = addDateToTime(data.day, data.end_time);

        let sg_id =
          classData.find((item) => item.id === data.class_id)
            ?.student_group_id ?? -1;

        return {
          ...data,
          name: data.subject_name,
          start_time: startTimeWithDate.toDate(),
          end_time: endTimeWithDate.toDate(),
          type: "learning",
          group_id: getGroupId(data.grade),
          sg_id,
        };
      });

    setLearningSchedule(newData);
  };

  const getAllNonLearningSchedule = async () => {
    const { data } = await AcademicAPI.getAllNonLearningSchedules({
      period_id: periode,
    });

    const newData = data.data.map((data) => {
      const startTimeWithDate = addDateToTime(data.day, data.start_time);
      const endTimeWithDate = addDateToTime(data.day, data.end_time);

      return {
        ...data,
        start_time: startTimeWithDate.toDate(),
        end_time: endTimeWithDate.toDate(),
        group_id: 1,
        type: "non-learning",
      };
    });

    setNonLearningSchedule(newData);
  };

  const getAllStudentGroup = async () => {
    const { data } = await AcademicAPI.getAllStudentGroup();

    setStudentGroup(
      data.data.map((value) => {
        let group_id;

        if (value.grade === "X") {
          group_id = 1;
        } else if (value.grade === "XI") {
          group_id = 2;
        } else if (value.grade === "XII") {
          group_id = 3;
        }

        return {
          ...value,
          group_id,
          group_color: "#ACDEE7",
        };
      })
    );
  };

  useEffect(() => {
    getAllStudentGroup();
    getAllClasses();
  }, []);

  useEffect(() => {
    if (refetch === "true") {
      getAllNonLearningSchedule();
      getAllClassSchedules();
    }

    updateQueryParam("rf", false);
  }, [refetch]);

  useEffect(() => {
    if (periode !== "-1") {
      getAllNonLearningSchedule();
      if (prodi !== "-1") getAllClassSchedules();
    }

    if (periode === "-1") {
      setNonLearningSchedule([]);
      data = [];
    }
    if (prodi === "-1") {
      setLearningSchedule([]);
      data = [...nonLearningSchedule];
    }
  }, [periode, prodi]);

  return {
    studentGroup,
    setStudentGroup,
    studentGroupData,
    data,
  };
}

export default useJadwalKeseluruhanCalendar;

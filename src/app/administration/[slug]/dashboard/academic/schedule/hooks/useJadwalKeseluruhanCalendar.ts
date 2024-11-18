"use client";

import AcademicAPI from "@/api/academic";
import { useClasses } from "@/hooks/useClasses";
import { useClassSchedules } from "@/hooks/useClassSchedules";
import { useNonLearningSchedules } from "@/hooks/useNonLearningSchedules";
import { useQueryParam } from "@/hooks/useQueryParam";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { HARI_FIELD_NAME } from "../components/filters/HariSelect";
import { JADWAL_KESELURUHAN_FIELD_NAME } from "../components/filters/JadwalKeseluruhanSwitch";
import { KELAS_FIELD_NAME } from "../components/filters/KelasSelect";
import { PERIODE_FIELD_NAME } from "../components/filters/PeriodeSelect";
import { PRODI_FIELD_NAME } from "../components/filters/ProdiSelect";
import { TINGKAT_FIELD_NAME } from "../components/filters/TingkatSelect";

dayjs.extend(isoWeek);

const parseTime = (time) => {
  const [hourMinute, period, offsetString] = time.split(" ");
  let [hour, minute] = hourMinute.split(":").map(Number);
  if (period === "PM" && hour !== 12) hour += 12;
  if (period === "AM" && hour === 12) hour = 0;

  // Extract the sign, hours, and minutes using a regular expression
  const regex = /^([+-])(\d{2}):(\d{2})$/;
  const match = offsetString.match(regex);

  if (!match) {
    throw new Error("Invalid offset format");
  }

  const sign = match[1]; // "+" or "-"
  const hours = parseInt(match[2], 10); // Extract hours as an integer
  const minutes = parseInt(match[3], 10); // Extract minutes as an integer

  const offsetInHours = hours + minutes / 60;
  const offset = sign === "+" ? offsetInHours : -offsetInHours;

  return { hour, minute, offset };
};

const addDateToTime = (day, time) => {
  const date = dayjs().isoWeekday(day);
  const { hour, minute } = parseTime(time);
  const result = date.set("hour", hour).set("minute", minute).set("second", 0);
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

  const [isLoading, setIsLoading] = useState(false);
  const [classData, setClassData] = useState([]);
  const [studentGroup, setStudentGroup] = useState([]);
  const [learningSchedule, setLearningSchedule] = useState([]);
  const [schoolSchedule, setSchoolSchedule] = useState([]);
  const [nonLearningSchedule, setNonLearningSchedule] = useState([]);

  const { data: classSchedules } = useClassSchedules(periode);
  const { data: nonLearningSchedules } = useNonLearningSchedules(periode);
  const { data: classes } = useClasses();

  const formattedClassSchedules = classSchedules
    .map((data) => {
      const startTimeWithDate = addDateToTime(data.day, data.start_time);
      const endTimeWithDate = addDateToTime(data.day, data.end_time);

      let sg_id = classes.find(
        (item) => item.id === data.class_id
      )?.student_group_id;

      return {
        ...data,
        start_time: startTimeWithDate.toDate(),
        end_time: endTimeWithDate.toDate(),
        type: "learning",
        sg_id,
      };
    })
    .filter(({ grade, sg_id, day }) => {
      const gradeMatch = tingkat ? tingkat === grade : true;
      const classMatch = sg_id
        ? kelas
          ? parseInt(kelas) === sg_id
          : true
        : false;
      const dayMatch = hari ? parseInt(hari) === day : true;
      return gradeMatch && classMatch && dayMatch;
    });

  const learningScheduleData = learningSchedule.filter(
    ({ grade, sg_id, day }) => {
      const gradeMatch = tingkat ? tingkat === grade : true;
      const classMatch = kelas ? parseInt(kelas) === sg_id : true;
      const dayMatch = hari ? parseInt(hari) === day : true;

      return gradeMatch && classMatch && dayMatch;
    }
  );

  const nonLearningScheduleData = studentGroup.flatMap(({ grade, id }) => {
    const res = nonLearningSchedule
      .filter((nl_data) => grade === nl_data.grade)
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

  let workDays = Array.from(
    new Set(
      schoolSchedule
        .filter(({ study_program_id, grade, day }) => {
          if (isJadwalKeseluruhan === "false") return true;

          return (
            study_program_id === parseInt(prodi) &&
            (Boolean(tingkat) ? grade === tingkat : true) &&
            (Boolean(hari) ? day === parseInt(hari) : true)
          );
        })
        .map(({ day }) => day)
    )
  );

  const scheduleStartTime = dayjs(
    schoolSchedule.reduce((earliest, current) => {
      const currentStartTime = dayjs(current.start_time, "h:mm A Z");
      const earliestTime = dayjs(earliest, "h:mm A Z");

      return !earliest || currentStartTime.isBefore(earliestTime)
        ? current.start_time
        : earliest;
    }, null),
    "h:mm A Z"
  ).format("H:mm");

  const scheduleEndTime = dayjs(
    schoolSchedule.reduce((latest, current) => {
      const currentEndTime = dayjs(current.end_time, "h:mm A Z");
      const latestTime = dayjs(latest, "h:mm A Z");

      return !latest || currentEndTime.isAfter(latestTime)
        ? current.end_time
        : latest;
    }, null),
    "h:mm A Z"
  ).format("H:mm");

  let studentGroupData = studentGroup.filter((sg) => {
    if (periode === "-1") return false;

    const periodeMatch =
      periode !== "-1" ? sg.period_id === parseInt(periode) : true;
    const prodiMatch =
      prodi !== "-1" ? sg.study_program_id === parseInt(prodi) : true;
    const tingkatMatch = tingkat ? sg.grade === tingkat : true;
    const kelasMatch = kelas ? sg.id === parseInt(kelas) : true;

    return periodeMatch && prodiMatch && tingkatMatch && kelasMatch;
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

  const getAllSchoolSchedule = async () => {
    const { data } = await AcademicAPI.getAllSchoolSchedules({
      period_id: periode,
    });
    setSchoolSchedule(data.data);
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
        type: "non-learning",
      };
    });

    setNonLearningSchedule(newData);
  };

  const getAllStudentGroup = async () => {
    const { data } = await AcademicAPI.getAllStudentGroup();

    setStudentGroup(data.data);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await Promise.all([getAllStudentGroup(), getAllClasses()]);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (refetch === "true") {
      const fetchData = async () => {
        setIsLoading(true);
        await Promise.all([
          getAllClassSchedules(),
          getAllNonLearningSchedule(),
        ]);
        setIsLoading(false);
      };

      fetchData();
    }

    updateQueryParam("rf", false);
  }, [refetch, classData]);

  useEffect(() => {
    if (periode !== "-1") {
      getAllNonLearningSchedule();
      getAllSchoolSchedule();
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
  }, [periode, prodi, classData]);

  return {
    isLoading,
    setIsLoading,
    setStudentGroup,
    studentGroupData,
    data,
    periode,
    prodi,
    isJadwalKeseluruhan,
    workDays,
    scheduleStartTime,
    scheduleEndTime,
  };
}

export default useJadwalKeseluruhanCalendar;

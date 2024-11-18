"use client";

import AcademicAPI from "@/api/academic";
import { useClasses } from "@/hooks/useClasses";
import { useClassSchedules } from "@/hooks/useClassSchedules";
import { useNonLearningSchedules } from "@/hooks/useNonLearningSchedules";
import { useQueryParam } from "@/hooks/useQueryParam";
import { useSchoolSchedules } from "@/hooks/useSchoolSchedules";
import { useStudentGroups } from "@/hooks/useStudentGroups";
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
  const periode = searchParams.get(PERIODE_FIELD_NAME);
  const prodi = searchParams.get(PRODI_FIELD_NAME);
  const tingkat = searchParams.get(TINGKAT_FIELD_NAME);
  const kelas = searchParams.get(KELAS_FIELD_NAME);
  const hari = searchParams.get(HARI_FIELD_NAME);
  const isJadwalKeseluruhan =
    searchParams.get(JADWAL_KESELURUHAN_FIELD_NAME) ?? "true";

  const [isLoading, setIsLoading] = useState(false);
  const { data: classSchedules } = useClassSchedules(periode);
  const { data: nonLearningSchedules } = useNonLearningSchedules(periode);
  const { data: classes } = useClasses();
  const { data: studentGroups } = useStudentGroups();
  const { data: schoolSchedules } = useSchoolSchedules(periode);

  // Todo remove name key
  const formattedClassSchedules = classSchedules
    .map((data) => {
      const startTimeWithDate = addDateToTime(data.day, data.start_time);
      const endTimeWithDate = addDateToTime(data.day, data.end_time);
      let sg_id = classes.find(
        (item) => item.id === data.class_id
      )?.student_group_id;
      return {
        ...data,
        name: data.subject_name,
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

  const formattedNonLearningSchedules = studentGroups.flatMap(({ grade, id }) =>
    nonLearningSchedules
      .map((data) => {
        const startTimeWithDate = addDateToTime(data.day, data.start_time);
        const endTimeWithDate = addDateToTime(data.day, data.end_time);
        return {
          ...data,
          start_time: startTimeWithDate.toDate(),
          end_time: endTimeWithDate.toDate(),
          type: "non-learning",
          sg_id: id,
          class_id: undefined,
        };
      })
      .filter((data) => grade === data.grade)
  );

  let data =
    isJadwalKeseluruhan === "true"
      ? [...formattedNonLearningSchedules, ...formattedClassSchedules]
      : formattedNonLearningSchedules;

  let workDays = Array.from(
    new Set(
      schoolSchedules
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
    schoolSchedules.reduce((earliest: string, current) => {
      const currentStartTime = dayjs(current.start_time, "h:mm A Z");
      const earliestTime = dayjs(earliest, "h:mm A Z");

      return !earliest || currentStartTime.isBefore(earliestTime)
        ? current.start_time
        : earliest;
    }, null) as string,
    "h:mm A Z"
  ).format("H:mm");

  const scheduleEndTime = dayjs(
    schoolSchedules.reduce((latest: string, current) => {
      const currentEndTime = dayjs(current.end_time, "h:mm A Z");
      const latestTime = dayjs(latest, "h:mm A Z");

      return !latest || currentEndTime.isAfter(latestTime)
        ? current.end_time
        : latest;
    }, null) as string,
    "h:mm A Z"
  ).format("H:mm");

  const studentGroupData = studentGroups.filter((sg) => {
    if (!periode) return false;

    const periodeMatch = periode ? sg.period_id === parseInt(periode) : true;
    const prodiMatch = prodi ? sg.study_program_id === parseInt(prodi) : true;
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

  useEffect(() => {
    if (refetch === "true") {
      const fetchData = async () => {
        setIsLoading(true);
        setIsLoading(false);
      };

      fetchData();
    }

    updateQueryParam("rf", false);
  }, [refetch]);

  useEffect(() => {
    if (!periode) {
      data = [];
    }

    if (!prodi) {
      data = [...formattedNonLearningSchedules];
    }
  }, [periode, prodi]);

  return {
    isLoading,
    setIsLoading,
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

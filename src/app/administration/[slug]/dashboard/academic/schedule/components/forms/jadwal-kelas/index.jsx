"use client";

import AcademicAPI from "@/api/academic";
import { invalidateClasses } from "@/hooks/query/academic/useClasses";
import { invalidateClassSchedules } from "@/hooks/query/academic/useClassSchedules";
import { formatTime } from "@/utils/formatTime";
import { Button, Stack } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import useCreateJadwalKelas from "../../../hooks/useCreateJadwalKelas";
import { PERIODE_FIELD_NAME } from "../../filters/PeriodeSelect";
import { DaySelectDynamic } from "../../form-items/DaySelectDynamic";
import { LevelSelect } from "../../form-items/LevelSelect";
import { PeriodSelect } from "../../form-items/PeriodSelect";
import { StudentGroupSelect } from "../../form-items/StudentGroupSelect";
import { StudyProgramSelect } from "../../form-items/StudyProgramSelect";
import { SubjectSelect } from "../../form-items/SubjectSelect";
import { TeacherSelect } from "../../form-items/TeacherSelect";
import { TimeSelect } from "../../form-items/TimeSelect";
import ErrorJadwalKelasModal from "../../modals/ErrorJadwalKelasModal";
import { jadwalKelasSchema } from "./jadwalKelasSchema";

function parseTime(timeString) {
  return dayjs(timeString, "h:mm A Z");
}

const hasTimeConflict = (startTime, endTime, extStartTime, extEndTime) => {
  const hasLowerConflict =
    (startTime.isBefore(extStartTime) || startTime.isSame(extStartTime)) &&
    startTime.isBefore(extEndTime) &&
    endTime.isAfter(extStartTime) &&
    (endTime.isBefore(extEndTime) || endTime.isSame(extEndTime));

  const hasWithinConflict =
    (startTime.isSame(extStartTime) || startTime.isAfter(extStartTime)) &&
    (endTime.isBefore(extEndTime) || endTime.isSame(extEndTime));

  const hasUpperConflict =
    (startTime.isSame(extStartTime) || startTime.isAfter(extStartTime)) &&
    startTime.isBefore(extEndTime) &&
    (endTime.isSame(extEndTime) || endTime.isAfter(extEndTime));

  return hasLowerConflict || hasWithinConflict || hasUpperConflict;
};

export const JadwalKelasForm = ({ handleClose, initialValues, edit }) => {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const periode = searchParams.get(PERIODE_FIELD_NAME);

  const [hasError, setHasError] = useState(false);

  if (initialValues) {
    initialValues = {
      ...initialValues,
      period_id: parseInt(periode),
      student_group_id: initialValues?.student_group_id ?? initialValues?.sg_id,
      day: Boolean(initialValues?.school_schedule_id)
        ? `${initialValues?.school_schedule_id}:${initialValues?.day}`
        : "",
    };
  }

  const formik = useFormik({
    initialValues: initialValues ?? {
      period_id: "",
      study_program_id: "",
      grade: "",
      student_group_id: "",
      day: "",
      start_time: null,
      end_time: null,
      subject_id: "",
      teacher_id: "",
    },
    enableReinitialize: true,
    validationSchema: jadwalKelasSchema,
    onSubmit: async ({
      start_time,
      end_time,
      grade,
      day,
      teacher_id,
      subject_id,
      student_group_id,
    }) => {
      const [school_schedule_id, day_num] = day.split(":");

      let errorDetected = false;

      const formattedStartTime =
        typeof start_time === "object"
          ? start_time.format("H:mm")
          : dayjs(start_time, "h:mm A Z").format("H:mm");
      const formattedEndTime =
        typeof end_time === "object"
          ? end_time.format("HH:mm")
          : dayjs(end_time, "h:mm A Z").format("H:mm");

      const parsedStartTime = parseTime(formatTime(formattedStartTime));
      const parsedEndTime = parseTime(formatTime(formattedEndTime));

      try {
        const [nonLearningScheduleData, classScheduleData, classData] =
          await Promise.all([
            AcademicAPI.getAllNonLearningSchedules({ period_id: periode }),
            AcademicAPI.getAllClassSchedules({ period_id: periode }),
            AcademicAPI.getAllClasses(),
          ]);

        if (nonLearningScheduleData && classScheduleData && classData) {
          nonLearningScheduleData?.data?.data?.forEach(
            ({
              start_time: ext_start_time,
              end_time: ext_end_time,
              day: ext_day,
              grade: ext_grade,
            }) => {
              const parsedExtStartTime = parseTime(ext_start_time);
              const parsedExtEndTime = parseTime(ext_end_time);

              //* checks for time conflict
              if (
                ext_grade === grade &&
                ext_day === parseInt(day_num) &&
                hasTimeConflict(
                  parsedStartTime,
                  parsedEndTime,
                  parsedExtStartTime,
                  parsedExtEndTime
                )
              ) {
                errorDetected = true;
              }
            }
          );

          classScheduleData.data.data.forEach(
            ({
              id: ext_id,
              start_time: ext_start_time,
              end_time: ext_end_time,
              day: ext_day,
              grade: ext_grade,
              teacher_id: ext_teacher_id,
            }) => {
              const parsedExtStartTime = parseTime(ext_start_time);
              const parsedExtEndTime = parseTime(ext_end_time);

              //* checks for teacher conflict
              if (
                ext_day === parseInt(day_num) &&
                ext_teacher_id === teacher_id &&
                hasTimeConflict(
                  parsedStartTime,
                  parsedEndTime,
                  parsedExtStartTime,
                  parsedExtEndTime
                )
              ) {
                errorDetected = true;
              }

              //* checks for time conflict
              if (
                (edit ? ext_id !== formik.initialValues?.id : true) &&
                ext_grade === grade &&
                ext_day === parseInt(day_num) &&
                hasTimeConflict(
                  parsedStartTime,
                  parsedEndTime,
                  parsedExtStartTime,
                  parsedExtEndTime
                )
              ) {
                errorDetected = true;
              }
            }
          );

          if (errorDetected) {
            setHasError(true);
            return;
          }

          //* get class id if it exists, otherwise create new class
          const newClassId =
            classData?.data?.data.find(
              (data) =>
                data.student_group_id === student_group_id &&
                data.subject_id === subject_id &&
                data.teacher_id === teacher_id
            )?.id ??
            (
              await AcademicAPI.createClass({
                name: `${subject_id} - ${teacher_id} - ${student_group_id}`,
                subject_id,
                teacher_id,
                student_group_id,
              })
            ).data.data;

          const newPayload = {
            class_id: newClassId,
            school_schedule_id: parseInt(school_schedule_id),
            start_time: formatTime(formattedStartTime),
            end_time: formatTime(formattedEndTime),
          };

          if (edit) {
            await AcademicAPI.updateClassSchedule(
              formik.initialValues?.id,
              newPayload
            );
          } else {
            await AcademicAPI.createClassSchedule(newPayload);
          }

          handleClose();
          invalidateClassSchedules(queryClient);
          invalidateClasses(queryClient);
        }
      } catch (err) {
        console.log(err);
      }
    },
  });

  const {
    periodeSelectData,
    prodiSelectData,
    tingkatanSelectData,
    studentGroupSelectData,
    hariSelectData,
    subjectSelectData,
    teacherSelectData,
  } = useCreateJadwalKelas(formik);

  return (
    <>
      <ErrorJadwalKelasModal
        open={hasError}
        handleClose={() => setHasError(false)}
      />

      {!hasError && (
        <form
          className="flex flex-col gap-6 max-h-[75vh] overflow-auto"
          onSubmit={formik.handleSubmit}
        >
          <Stack gap={2}>
            <PeriodSelect
              label={"Periode"}
              placeholder={"Pilih periode"}
              formik={formik}
              name={"period_id"}
              data={periodeSelectData}
            />
            <StudyProgramSelect
              label={"Program Studi"}
              placeholder={"Pilih program studi"}
              formik={formik}
              name={"study_program_id"}
              data={prodiSelectData}
              disabled={!edit && formik.values.period_id === ""}
            />
            <LevelSelect
              label={"Tingkatan"}
              placeholder={"Pilih tingkatan"}
              formik={formik}
              name={"grade"}
              data={tingkatanSelectData}
              disabled={!edit && formik.values.study_program_id === ""}
            />
            <StudentGroupSelect
              label={"Kelas"}
              placeholder={"Pilih kelas"}
              formik={formik}
              name={"student_group_id"}
              data={studentGroupSelectData}
              disabled={!edit && formik.values.grade === ""}
            />
            <SubjectSelect
              label={"Mata Pelajaran"}
              placeholder={"Pilih mata pelajaran"}
              formik={formik}
              name={"subject_id"}
              data={subjectSelectData}
              disabled={!edit && formik.values.student_group_id === ""}
            />
            <TeacherSelect
              label={"Guru"}
              placeholder={"Pilih guru"}
              formik={formik}
              name={"teacher_id"}
              data={teacherSelectData}
              disabled={!edit && formik.values.subject_id === ""}
            />
            <DaySelectDynamic
              label="Hari"
              placeholder="Pilih hari"
              formik={formik}
              name="day"
              data={hariSelectData}
              disabled={!edit && formik.values.teacher_id === ""}
            />
            <Stack
              width="100%"
              alignItems="start"
              flexDirection="row"
              justifyContent="center"
              gap={2}
            >
              <TimeSelect label="Jam Mulai" formik={formik} name="start_time" />
              <TimeSelect label="Jam Selesai" formik={formik} name="end_time" />
            </Stack>
          </Stack>
          <Stack flexDirection="row" gap={2}>
            <Button
              type="button"
              fullWidth
              variant="outlined"
              onClick={handleClose}
            >
              Batal
            </Button>
            <Button type="submit" fullWidth variant="contained">
              Simpan
            </Button>
          </Stack>
        </form>
      )}
    </>
  );
};

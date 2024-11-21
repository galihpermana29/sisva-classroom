"use client";

import AcademicAPI from "@/api/academic";
import { invalidateNonLearningSchedules } from "@/hooks/query/academic/useNonLearningSchedules";
import { formatTime } from "@/utils/formatTime";
import { Button, Stack } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { useState } from "react";
import { useFilterStatus } from "../../../hooks/filters/useFilterStatus";
import useCreateAktivitasNonKbm from "../../../hooks/useCreateAktivitasNonKbm";
import { ActivityNameInput } from "../../form-items/ActivityNameInput";
import { DaySelectDynamic } from "../../form-items/DaySelectDynamic";
import { LevelSelect } from "../../form-items/LevelSelect";
import { StudyProgramSelect } from "../../form-items/StudyProgramSelect";
import { TimeSelect } from "../../form-items/TimeSelect";
import ErrorJadwalKelasModal from "../../modals/ErrorJadwalKelasModal";
import { aktivitasNonKbmSchema } from "./aktivitasNonKbmSchema";

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

export const AktivitasNonKbmForm = ({ handleClose, initialValues, edit }) => {
  const queryClient = useQueryClient();

  if (initialValues) {
    initialValues = {
      ...initialValues,
      school_schedule_id: `${initialValues?.school_schedule_id}:${initialValues?.day}`,
    };
  }

  const { periode } = useFilterStatus();
  const [hasError, setHasError] = useState(false);

  const formik = useFormik({
    initialValues: initialValues ?? {
      name: "",
      study_program_id: "",
      grade: "",
      school_schedule_id: "",
      start_time: null,
      end_time: null,
    },
    validationSchema: aktivitasNonKbmSchema,
    onSubmit: async ({ name, school_schedule_id, start_time, end_time }) => {
      const [ss_id, day_num] = school_schedule_id.split(":");

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

      const newPayload = {
        name,
        school_schedule_id: parseInt(ss_id),
        start_time: formatTime(formattedStartTime),
        end_time: formatTime(formattedEndTime),
      };

      try {
        const [nonLearningScheduleData, classScheduleData] = await Promise.all([
          AcademicAPI.getAllNonLearningSchedules({ period_id: periode }),
          AcademicAPI.getAllClassSchedules({ period_id: periode }),
        ]);

        if (nonLearningScheduleData && classScheduleData) {
          nonLearningScheduleData.data.data.forEach(
            ({
              id: ext_id,
              start_time: ext_start_time,
              end_time: ext_end_time,
              day: ext_day,
              school_schedule_id: ext_school_schedule_id,
            }) => {
              const parsedExtStartTime = parseTime(ext_start_time);
              const parsedExtEndTime = parseTime(ext_end_time);

              if (
                (edit ? ext_id !== formik.initialValues?.id : true) &&
                ext_school_schedule_id === parseInt(ss_id) &&
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
              start_time: ext_start_time,
              end_time: ext_end_time,
              day: ext_day,
              school_schedule_id: ext_school_schedule_id,
            }) => {
              const parsedExtStartTime = parseTime(ext_start_time);
              const parsedExtEndTime = parseTime(ext_end_time);

              if (
                ext_school_schedule_id === parseInt(ss_id) &&
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

          if (edit) {
            await AcademicAPI.updateNonLearningSchedule(
              formik.initialValues?.id,
              newPayload
            );
          } else {
            await AcademicAPI.createNonLearningSchedule(newPayload);
          }

          handleClose();
          invalidateNonLearningSchedules(queryClient);
        }
      } catch (err) {
        console.log(err);
      }
    },
  });

  const { prodiSelectData, tingkatanSelectData, daySelectData } =
    useCreateAktivitasNonKbm(formik);

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
            <ActivityNameInput
              label="Nama Aktivitas"
              placeholder="Isi nama aktivitas"
              formik={formik}
              name="name"
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
              disabled={!edit && !Boolean(formik.values.study_program_id)}
            />
            <DaySelectDynamic
              label="Hari"
              placeholder="Pilih hari"
              formik={formik}
              name="school_schedule_id"
              data={daySelectData}
              disabled={!edit && !Boolean(formik.values.grade)}
            />

            <Stack
              width="100%"
              alignItems="center"
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

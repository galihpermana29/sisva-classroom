"use client";

import AcademicAPI from "@/api/academic";
import { useQueryParam } from "@/hooks/useQueryParam";
import { formatDayToLabel } from "@/utils/formatDay";
import { formatTime } from "@/utils/formatTime";
import { Button, Stack } from "@mui/material";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PERIODE_FIELD_NAME } from "../../filters/PeriodeSelect";
import { ActivityNameInput } from "../../form-items/ActivityNameInput";
import { DaySelectDynamic } from "../../form-items/DaySelectDynamic";
import ErrorJadwalKelasModal from "../../modals/ErrorJadwalKelasModal";
import { TimeSelect } from "../../TimeSelect";
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
  const { updateQueryParam } = useQueryParam();

  if (initialValues) {
    initialValues = {
      ...initialValues,
      school_schedule_id: `${initialValues?.school_schedule_id}:${initialValues?.day}`,
    };
  }

  const searchParam = useSearchParams();
  const periode = searchParam.get(PERIODE_FIELD_NAME);

  const [daySelectData, setDaySelectData] = useState([]);
  const [hasError, setHasError] = useState(false);

  const formik = useFormik({
    initialValues: initialValues ?? {
      name: "",
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
          ? start_time.format("HH:mm")
          : start_time;
      const formattedEndTime =
        typeof end_time === "object" ? end_time.format("HH:mm") : end_time;
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

        console.log(nonLearningScheduleData, classScheduleData);

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

          updateQueryParam("rf", true);
          handleClose();
        }
      } catch (err) {
        console.log(err);
      }
    },
  });

  const getDayData = async () => {
    const { data } = await AcademicAPI.getAllSchoolSchedules({
      period_id: periode,
    });

    setDaySelectData(
      data.data
        .filter(({ status }) => status === "inactive")
        .map(({ id, day }) => ({
          label: formatDayToLabel(day),
          value: `${id}:${day}`,
        }))
    );
  };

  useEffect(() => {
    if (periode) getDayData();
  }, [periode]);

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
            <DaySelectDynamic
              label="Hari"
              placeholder="Pilih hari"
              formik={formik}
              name="school_schedule_id"
              data={daySelectData}
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

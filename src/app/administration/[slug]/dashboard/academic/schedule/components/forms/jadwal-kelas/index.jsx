"use client";

import AcademicAPI from "@/api/academic";
import { formatTime } from "@/utils/formatTime";
import { Button, Stack } from "@mui/material";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import useCreateJadwalKelas from "../../../hooks/useCreateJadwalKelas";
import { TimeSelect } from "../../TimeSelect";
import { PERIODE_FIELD_NAME } from "../../filters/PeriodeSelect";
import { ClassSelect } from "../../form-items/ClassSelect";
import { DaySelectDynamic } from "../../form-items/DaySelectDynamic";
import { LevelSelect } from "../../form-items/LevelSelect";
import { PeriodSelect } from "../../form-items/PeriodSelect";
import { StudyProgramSelect } from "../../form-items/StudyProgramSelect";
import ErrorJadwalKelasModal from "../../modals/ErrorJadwalKelasModal";
import { jadwalKelasSchema } from "./jadwalKelasSchema";

function parseTime(timeString) {
  return dayjs(timeString, "h:mm A Z");
}

export const JadwalKelasForm = ({ handleClose, initialValues, edit }) => {
  const searchParams = useSearchParams();
  const periode = searchParams.get(PERIODE_FIELD_NAME);

  const [hasError, setHasError] = useState(false);

  if (initialValues) {
    initialValues = {
      ...initialValues,
      period_id: periode,
    };
  }

  console.log(initialValues);

  const formik = useFormik({
    initialValues: initialValues ?? {
      period_id: "",
      study_program_id: "",
      grade: "",
      class_id: "",
      day: "",
      start_time: null,
      end_time: null,
    },
    validationSchema: jadwalKelasSchema,
    onSubmit: async ({ start_time, end_time, class_id, day, grade }) => {
      const [school_schedule_id, day_num] = day.split(":");

      const formattedStartTime =
        typeof start_time === "object"
          ? start_time.format("HH:mm")
          : start_time;
      const formattedEndTime =
        typeof end_time === "object" ? end_time.format("HH:mm") : end_time;

      const newPayload = {
        class_id,
        school_schedule_id: parseInt(school_schedule_id),
        start_time: formatTime(formattedStartTime),
        end_time: formatTime(formattedEndTime),
      };

      try {
        const { data } = await AcademicAPI.getAllClassSchedules({
          period_id: periode,
        });

        data.data.forEach(
          ({
            id: ext_id,
            start_time: ext_start_time,
            end_time: ext_end_time,
            day: ext_day,
            grade: ext_grade,
          }) => {
            const parsedExtStartTime = parseTime(ext_start_time);
            const parsedExtEndTime = parseTime(ext_end_time);
            const parsedStartTime = parseTime(formatTime(formattedStartTime));
            const parsedEndTime = parseTime(formatTime(formattedEndTime));

            const hasTimeConflict =
              ((parsedStartTime.isAfter(parsedExtStartTime) ||
                parsedStartTime.isSame(parsedExtStartTime)) &&
                parsedStartTime.isBefore(parsedExtEndTime)) ||
              ((parsedEndTime.isAfter(parsedExtStartTime) ||
                parsedEndTime.isSame(parsedExtStartTime)) &&
                parsedEndTime.isBefore(parsedExtEndTime));

            if (
              ext_id !== formik.initialValues?.id &&
              ext_grade === grade &&
              parseInt(day_num) === ext_day &&
              hasTimeConflict
            ) {
              setHasError(true);
            } else {
              setHasError(false);
            }
          }
        );

        if (hasError) return;

        if (edit) {
          await AcademicAPI.updateClassSchedule(
            formik.initialValues?.id,
            newPayload
          );
        } else {
          await AcademicAPI.createClassSchedule(newPayload);
        }
        handleClose();
      } catch (err) {
        console.log(err);
      }
    },
  });

  const {
    periodeSelectData,
    prodiSelectData,
    tingkatanSelectData,
    kelasSelectData,
    hariSelectData,
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
            <ClassSelect
              label={"Kelas"}
              placeholder={"Pilih kelas"}
              formik={formik}
              name={"class_id"}
              data={kelasSelectData}
            />
            <DaySelectDynamic
              label="Hari"
              placeholder="Pilih hari"
              formik={formik}
              name="day"
              data={hariSelectData}
              disabled={!edit && formik.values.grade === ""}
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

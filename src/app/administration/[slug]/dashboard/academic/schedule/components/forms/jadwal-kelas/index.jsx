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
    onSubmit: async ({ start_time, end_time, class_id, day }) => {
      const [school_schedule_id, day_num] = day.split(":");

      const newPayload = {
        class_id,
        school_schedule_id,
        start_time: formatTime(start_time),
        end_time: formatTime(end_time),
      };

      try {
        const { data } = await AcademicAPI.getAllClassSchedules({
          period_id: periode,
        });

        data.data.forEach(
          ({
            start_time: ext_start_time,
            end_time: ext_end_time,
            day: ext_day,
          }) => {
            const parsedExtStartTime = parseTime(ext_start_time);
            const parsedExtEndTime = parseTime(ext_end_time);
            const parsedStartTime = parseTime(formatTime(start_time));
            const parsedEndTime = parseTime(formatTime(end_time));

            const hasTimeConflict =
              ((parsedStartTime.isAfter(parsedExtStartTime) ||
                parsedStartTime.isSame(parsedExtStartTime)) &&
                parsedStartTime.isBefore(parsedExtEndTime)) ||
              ((parsedEndTime.isAfter(parsedExtStartTime) ||
                parsedEndTime.isSame(parsedExtStartTime)) &&
                parsedEndTime.isBefore(parsedExtEndTime));

            if (parseInt(day_num) === ext_day && hasTimeConflict) {
              setHasError(true);
            } else {
              setHasError(false);
            }
          }
        );

        if (hasError) return;

        await AcademicAPI.createClassSchedule(newPayload);
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
              disabled={formik.values.period_id === ""}
            />
            <LevelSelect
              label={"Tingkatan"}
              placeholder={"Pilih tingkatan"}
              formik={formik}
              name={"grade"}
              data={tingkatanSelectData}
              disabled={formik.values.study_program_id === ""}
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
              disabled={formik.values.grade === ""}
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

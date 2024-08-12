"use client";

import { formatTime } from "@/utils/formatTime";
import { Button, Stack } from "@mui/material";
import { useFormik } from "formik";
import useCreateJadwalKelas from "../../../hooks/useCreateJadwalKelas";
import { TimeSelect } from "../../TimeSelect";
import { ClassSelect } from "../../form-items/ClassSelect";
import { DaySelectDynamic } from "../../form-items/DaySelectDynamic";
import { LevelSelect } from "../../form-items/LevelSelect";
import { PeriodSelect } from "../../form-items/PeriodSelect";
import { StudyProgramSelect } from "../../form-items/StudyProgramSelect";
import { jadwalKelasSchema } from "./jadwalKelasSchema";
import AcademicAPI from "@/api/academic";

export const JadwalKelasForm = ({ handleClose, initialValues, edit }) => {
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
      console.log(start_time, end_time, class_id, day);

      const newPayload = {
        class_id,
        school_schedule_id: day,
        start_time: formatTime(start_time),
        end_time: formatTime(end_time),
      };

      try {
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
  );
};

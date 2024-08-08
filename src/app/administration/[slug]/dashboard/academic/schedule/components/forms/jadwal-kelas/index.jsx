"use client";

import { useFormik } from "formik";
import { jadwalKelasSchema } from "./jadwalKelasSchema";
import { Button, Stack } from "@mui/material";
import { DaySelect } from "../../DaySelect";
import { TimeSelect } from "../../TimeSelect";
import { ClassSelect } from "../../form-items/ClassSelect";
import { LevelSelect } from "../../form-items/LevelSelect";
import { PeriodSelect } from "../../form-items/PeriodSelect";
import { StudyProgramSelect } from "../../form-items/StudyProgramSelect";

export const JadwalKelasForm = ({ handleClose, initialValues, edit }) => {
  const formik = useFormik({
    initialValues: initialValues ?? {
      periode: null,
      prodi: null,
      tingkatan: null,
      kelas: null,
      hari: null,
      jam_mulai: null,
      jam_selesai: null,
    },
    validationSchema: jadwalKelasSchema,
    onSubmit: (values) =>
      edit ? console.log("edit", values) : console.log("create", values),
  });

  return (
    <form className="flex flex-col gap-6" onSubmit={formik.handleSubmit}>
      <Stack gap={2}>
        <PeriodSelect
          label={"Periode"}
          placeholder={"Pilih periode"}
          formik={formik}
          name={"periode"}
        />
        <StudyProgramSelect
          label={"Program Studi"}
          placeholder={"Pilih program studi"}
          formik={formik}
          name={"prodi"}
        />
        <LevelSelect
          label={"Tingkatan"}
          placeholder={"Pilih tingkatan"}
          formik={formik}
          name={"tingkatan"}
        />
        <ClassSelect
          label={"Kelas"}
          placeholder={"Pilih kelas"}
          formik={formik}
          name={"kelas"}
        />
        <DaySelect
          label="Hari"
          placeholder="Pilih hari"
          formik={formik}
          name="hari"
        />
        <Stack
          width="100%"
          alignItems="center"
          flexDirection="row"
          justifyContent="center"
          gap={2}
        >
          <TimeSelect label="Jam Mulai" formik={formik} name="jam_mulai" />
          <TimeSelect label="Jam Selesai" formik={formik} name="jam_selesai" />
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

"use client";

import { Button, Stack } from "@mui/material";
import { useFormik } from "formik";
import { DaySelect } from "../../DaySelect";
import { ActivityNameInput } from "../../form-items/ActivityNameInput";
import { TimeSelect } from "../../TimeSelect";
import { aktiitasNonKbmSchema } from "./aktivitasNonKbmSchema";

export const AktivitasNonKbmForm = ({ handleClose, initialValues, edit }) => {
  const formik = useFormik({
    initialValues: initialValues ?? {
      nama: null,
      hari: null,
      jam_mulai: null,
      jam_selesai: null,
    },
    validationSchema: aktiitasNonKbmSchema,
    onSubmit: (values) =>
      edit ? console.log("edit", values) : console.log("create", values),
  });

  return (
    <form
      className="flex flex-col gap-6 max-h-[75vh] overflow-auto"
      onSubmit={formik.handleSubmit}
    >
      <Stack gap={2}>
        <ActivityNameInput
          label="Nama Aktivitas"
          placeholder="Isi nama aktivitas"
          formik={formik}
          name="nama"
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

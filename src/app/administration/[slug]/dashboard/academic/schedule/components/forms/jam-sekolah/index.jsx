"use client";

import { useFormik } from "formik";
import { jamSekolahSchema } from "./jamSekolahSchema";

import { Button, Stack } from "@mui/material";
import { DaySelect } from "../../DaySelect";
import { TimeSelect } from "../../TimeSelect";

export const JamSekolahForm = ({ handleClose, initialValues, edit }) => {
  const formik = useFormik({
    initialValues: initialValues ?? {
      day: "",
      start_time: null,
      end_time: null,
    },
    validationSchema: jamSekolahSchema,
    onSubmit: (values) =>
      edit ? console.log("edit", values) : console.log("create", values),
  });

  return (
    <form className="flex flex-col gap-6" onSubmit={formik.handleSubmit}>
      <Stack gap={2}>
        <DaySelect
          label="Hari"
          placeholder="Pilih hari"
          formik={formik}
          name="day"
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

"use client";

import { useFormik } from "formik";

import { Alert, Button, Stack } from "@mui/material";
import { DaySelect } from "../../DaySelect";
import { TimeSelect } from "../../TimeSelect";
import { useFilterStatus } from "../../../hooks/useFilterStatus";
import { useCreateSchoolSchedule } from "../../../hooks/useCreateSchoolSchedule";
import { getAddJamSekolahSchema } from "./addJamSekolahSchema";
import { useGetActiveSchoolSchedule } from "../../../hooks/useGetActiveSchoolSchedule";

export const AddJamSekolahForm = ({ handleClose }) => {
  const { data } = useGetActiveSchoolSchedule();
  const { periode, prodi, tingkat } = useFilterStatus();
  const { mutate: createSchedule } = useCreateSchoolSchedule({ handleClose });

  const schema = getAddJamSekolahSchema({
    periode,
    prodi,
    tingkat,
    scheduleData: data,
  });

  const formik = useFormik({
    initialValues: schema.getDefault(),
    validationSchema: schema,
    onSubmit: (values) => createSchedule(values),
  });

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={formik.handleSubmit}
    >
      <Stack gap={2}>
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
            <TimeSelect
              withError={false}
              label="Jam Mulai"
              formik={formik}
              name="start_time"
            />
            <TimeSelect
              withError={false}
              label="Jam Selesai"
              formik={formik}
              name="end_time"
            />
          </Stack>
        </Stack>

        {Boolean(
          (formik.touched.start_time || formik.touched.end_time) &&
            (formik.errors.start_time || formik.errors.end_time)
        ) && (
          <Stack gap={1}>
            {formik.touched.start_time && Boolean(formik.errors.start_time) ? (
              <Alert severity="error">{formik.errors.start_time}</Alert>
            ) : null}
            {formik.touched.end_time && Boolean(formik.errors.end_time) ? (
              <Alert severity="error">{formik.errors.end_time}</Alert>
            ) : null}
          </Stack>
        )}
      </Stack>

      <Stack
        flexDirection="row"
        gap={2}
      >
        <Button
          type="button"
          fullWidth
          variant="outlined"
          onClick={handleClose}
        >
          Batal
        </Button>
        <Button
          type="submit"
          fullWidth
          variant="contained"
        >
          Simpan
        </Button>
      </Stack>
    </form>
  );
};

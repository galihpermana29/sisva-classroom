"use client";

import AcademicAPI from "@/api/academic";
import { formatDayToLabel } from "@/utils/formatDay";
import { Button, Snackbar, Stack } from "@mui/material";
import { useFormik } from "formik";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PERIODE_FIELD_NAME } from "../../filters/PeriodeSelect";
import { ActivityNameInput } from "../../form-items/ActivityNameInput";
import { DaySelectDynamic } from "../../form-items/DaySelectDynamic";
import { TimeSelect } from "../../TimeSelect";
import { aktivitasNonKbmSchema } from "./aktivitasNonKbmSchema";
import { formatTime } from "@/utils/formatTime";

export const AktivitasNonKbmForm = ({ handleClose, initialValues, edit }) => {
  const formik = useFormik({
    initialValues: initialValues ?? {
      name: "",
      school_schedule_id: "",
      start_time: null,
      end_time: null,
    },
    validationSchema: aktivitasNonKbmSchema,
    onSubmit: async ({ name, school_schedule_id, start_time, end_time }) => {
      const newPayload = {
        name,
        school_schedule_id,
        start_time: formatTime(start_time),
        end_time: formatTime(end_time),
      };

      try {
        await AcademicAPI.createNonLearningSchedule(newPayload);
        setMessage("Aktivitas berhasil ditambahkan!");
        setOpenSnackBar(true);
        handleClose();
      } catch (err) {
        console.log(err);
        setMessage(err?.code);
        setOpenSnackBar(true);
      }
    },
  });

  const searchParam = useSearchParams();
  const periode = searchParam.get(PERIODE_FIELD_NAME);

  const [daySelectData, setDaySelectData] = useState([]);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [message, setMessage] = useState();

  const getDayData = async () => {
    const { data } = await AcademicAPI.getAllSchoolSchedules({
      period_id: periode,
    });

    setDaySelectData(
      data.data
        .filter(({ status }) => status === "inactive")
        .map(({ day, id }) => ({
          label: formatDayToLabel(day),
          value: id,
        }))
    );
  };

  useEffect(() => {
    if (periode) getDayData();
  }, [periode]);

  return (
    <>
      <Snackbar
        open={openSnackBar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackBar(false)}
        message={message}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
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
    </>
  );
};

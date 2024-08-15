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
import { useRouter } from "next/navigation";

export const AktivitasNonKbmForm = ({ handleClose, initialValues, edit }) => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: initialValues ?? {
      name: "",
      school_schedule_id: "",
      start_time: null,
      end_time: null,
    },
    validationSchema: aktivitasNonKbmSchema,
    onSubmit: async ({ name, school_schedule_id, start_time, end_time }) => {
      const formattedStartTime =
        typeof start_time === "object"
          ? start_time.format("HH:mm")
          : start_time;
      const formattedEndTime =
        typeof end_time === "object" ? end_time.format("HH:mm") : end_time;

      const newPayload = {
        name,
        school_schedule_id,
        start_time: formatTime(formattedStartTime),
        end_time: formatTime(formattedEndTime),
      };

      try {
        if (edit) {
          await AcademicAPI.updateNonLearningSchedule(
            formik.initialValues?.id,
            newPayload
          );
        } else {
          await AcademicAPI.createNonLearningSchedule(newPayload);
        }
        handleClose();
        router.refresh();
      } catch (err) {
        setMessage(err?.code);
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

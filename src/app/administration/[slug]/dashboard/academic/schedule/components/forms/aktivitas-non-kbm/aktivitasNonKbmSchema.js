import * as yup from "yup";

export const aktivitasNonKbmSchema = yup.object({
  name: yup.string().required("Wajib mengisi nama!"),
  school_schedule_id: yup.string().required("Wajib mengisi hari!"),
  start_time: yup.string().required("Wajib mengisi waktu mulai!"),
  end_time: yup.string().required("Wajib mengisi waktu akhir!"),
});

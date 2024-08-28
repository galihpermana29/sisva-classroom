import * as yup from "yup";

export const aktivitasNonKbmSchema = yup.object({
  name: yup.string().required("Wajib mengisi nama!"),
  study_program_id: yup.string().required("Wajib mengisi program studi!"),
  grade: yup.string().required("Wajib mengisi tingkat!"),
  school_schedule_id: yup.string().required("Wajib mengisi hari!"),
  start_time: yup.string().required("Wajib mengisi jam mulai!"),
  end_time: yup.string().required("Wajib mengisi jam selesai!"),
});

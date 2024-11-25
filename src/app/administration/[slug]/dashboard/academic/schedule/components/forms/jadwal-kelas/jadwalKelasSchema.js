import * as yup from "yup";

export const jadwalKelasSchema = yup.object({
  period_id: yup.string().required("Wajib memilih periode!"),
  study_program_id: yup.string().required("Wajib memilih program studi!"),
  grade: yup.string().required("Wajib memilih tingkat!"),
  student_group_id: yup.string().required("Wajib memilih kelas!"),
  subject_id: yup.string().required("Wajib memilih mata pelajaran!"),
  teacher_id: yup.string().required("Wajib memilih guru!"),
  day: yup.string().required("Wajib memilih hari!"),
  start_time: yup.string().required("Wajib mengisi jam mulai!"),
  end_time: yup.string().required("Wajib mengisi jam selesai!"),
});

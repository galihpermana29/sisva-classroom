import { timeStringToDayjs } from "@/utils/formatTimeString";
import * as yup from "yup";

export const jadwalKelasSchema = yup.object({
  id: yup.string().required("Wajib memilih periode!"),
  study_program_id: yup.string().required("Wajib memilih program studi!"),
  grade: yup.string().required("Wajib memilih tingkat!"),
  class_id: yup.string().required("Wajib memilih kelas mapel!"),
  student_group_id: yup.string().required("Wajib memilih kelas!"),
  day: yup.string().required("Wajib memilih hari!"),
  start_time: yup.string().required("Wajib mengisi waktu mulai!"),
  end_time: yup.string().required("Wajib mengisi waktu akhir!"),
});

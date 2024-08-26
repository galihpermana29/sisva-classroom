import * as yup from "yup";

export const jadwalKelasSchema = yup.object({
  period_id: yup.string().required(),
  study_program_id: yup.string().required(),
  grade: yup.string().required(),
  class_id: yup.string().required(),
  student_group_id: yup.string().required(),
  day: yup.string().required(),
  start_time: yup.string().required(),
  end_time: yup.string().required(),
});

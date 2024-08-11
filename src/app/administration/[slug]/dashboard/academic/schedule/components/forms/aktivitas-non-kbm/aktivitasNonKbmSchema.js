import * as yup from "yup";

export const aktivitasNonKbmSchema = yup.object({
  name: yup.string().required(),
  school_schedule_id: yup.number().required(),
  start_time: yup.string().required(),
  end_time: yup.string().required(),
});
